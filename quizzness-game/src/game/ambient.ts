import Phaser from "phaser";
import type { AmbientConfig, Point, Rect } from "./area";

// Background life for an area: drifting clouds, moving water, sunlight, wildlife.
// Masks keep effects in the right places, so the artwork itself is never changed.
const CREAM = 0xefe6dd;
const WARM = 0xfff3d6;
const DARK = 0x1b4332;

export type AmbientController = {
  update: (deltaSeconds: number) => void;
  // Switches off the heavier effects if the device can't keep up.
  lower: () => void;
};
export function ambientMasks(config: AmbientConfig, lite = false) {
  return [
    config.clouds?.mask,
    config.water?.mask,
    config.falls?.mask,
    lite ? undefined : config.sway?.mask,
  ].filter((mask): mask is string => !!mask);
}
// Moves masked pixels a little, and only onto other masked pixels, so edges stay clean.
function swayShader(furthest: number) {
  return `
precision mediump float;
uniform float time;
uniform vec2 resolution;
uniform sampler2D iChannel0;
uniform sampler2D iChannel1;
varying vec2 fragCoord;
void main() {
  vec2 uv = vec2(fragCoord.x / resolution.x, 1.0 - fragCoord.y / resolution.y);
  float amount = texture2D(iChannel1, uv).r;
  if (amount < 0.03) discard;
  vec2 at = uv * resolution;
  float wind = sin(time * 1.3 + at.x * 0.016 + at.y * 0.022)
    + 0.55 * sin(time * 2.9 + at.x * 0.047 - at.y * 0.012);
  vec2 shifted = uv + vec2(wind, wind * 0.35) * amount * ${furthest.toFixed(2)} / resolution;
  if (texture2D(iChannel1, shifted).r < 0.03) discard;
  gl_FragColor = texture2D(iChannel0, shifted);
}`;
}
// A small puff of dust where a foot lands.
export function addFootsteps(scene: Phaser.Scene, scale: number) {
  bakeTexture(scene, "ambient-puff", 6, 6, (g) => {
    g.fillStyle(0xefe6dd, 1);
    g.fillRect(0, 0, 6, 6);
  });
  const puffs = scene.add
    .particles(0, 0, "ambient-puff", {
      speedX: { min: -22, max: 22 },
      speedY: { min: -18, max: -2 },
      scale: { start: 0.9 * scale * 0.5, end: 0.1 },
      alpha: { start: 0.65, end: 0 },
      lifespan: 420,
      emitting: false,
    })
    .setDepth(990);
  return (x: number, y: number) => {
    puffs.setDepth(y + 1);
    puffs.emitParticleAt(x, y, 4);
  };
}
// Small repeatable random numbers, so the scene looks the same on every visit.
function seeded(seed: number) {
  let value = seed;
  return () => {
    value = (value * 16807) % 2147483647;
    return value / 2147483647;
  };
}
function bakeTexture(
  scene: Phaser.Scene,
  key: string,
  width: number,
  height: number,
  draw: (g: Phaser.GameObjects.Graphics) => void,
) {
  if (scene.textures.exists(key)) return;
  const g = scene.make.graphics({}, false);
  draw(g);
  g.generateTexture(key, width, height);
  g.destroy();
}
function softCircle(scene: Phaser.Scene, key: string, color: string) {
  if (scene.textures.exists(key)) return;
  const size = 256;
  const canvas = scene.textures.createCanvas(key, size, size);
  if (!canvas) return;
  const c = canvas.getContext();
  const gradient = c.createRadialGradient(128, 128, 0, 128, 128, 128);
  gradient.addColorStop(0, color);
  gradient.addColorStop(1, "rgba(0,0,0,0)");
  c.fillStyle = gradient;
  c.fillRect(0, 0, size, size);
  canvas.refresh();
  canvas.setFilter(Phaser.Textures.FilterMode.LINEAR);
}
function bakeCloud(scene: Phaser.Scene, key: string, seed: number) {
  const random = seeded(seed);
  bakeTexture(scene, key, 240, 96, (g) => {
    const block = 8;
    // A flat base with stacked lumps, in chunky steps like the painted clouds.
    for (let lump = 0; lump < 6; lump++) {
      const cx = 40 + random() * 160,
        rise = 2 + Math.floor(random() * 6),
        spread = 3 + Math.floor(random() * 6);
      for (let row = 0; row < rise; row++) {
        const half = Math.max(1, spread - row);
        const y = 80 - row * block;
        g.fillStyle(row === 0 ? 0xdfe8f5 : 0xffffff, 1);
        g.fillRect(cx - half * block, y, half * 2 * block, block);
      }
    }
  });
}
function masked(scene: Phaser.Scene, key: string) {
  return scene.make.image({ x: 0, y: 0, key, add: false }, false).setOrigin(0, 0).createBitmapMask();
}
function wander(
  scene: Phaser.Scene,
  object: Phaser.GameObjects.Components.Transform & Phaser.GameObjects.GameObject,
  home: Point,
  range: number,
  random: () => number,
) {
  const hop = () => {
    scene.tweens.add({
      targets: object,
      x: home.x + (random() - 0.5) * range * 2,
      y: home.y + (random() - 0.5) * range,
      duration: 1400 + random() * 2200,
      ease: "Sine.easeInOut",
      onComplete: hop,
    });
  };
  hop();
}

export function addAmbient(
  scene: Phaser.Scene,
  config: AmbientConfig,
  width: number,
  height: number,
  lite = false,
): AmbientController {
  const webgl = scene.renderer.type === Phaser.WEBGL;
  const updates: ((delta: number) => void)[] = [];
  // The effects that cost the most, switched off first on slow devices.
  const heavy: { setVisible: (visible: boolean) => unknown }[] = [];
  const heavyEmitters: Phaser.GameObjects.Particles.ParticleEmitter[] = [];

  if (config.sway && webgl && !lite) {
    const shader = new Phaser.Display.BaseShader(
      "ambient-sway",
      swayShader(config.sway.furthest),
    );
    const sway = scene.add
      .shader(shader, 0, 0, width, height)
      .setOrigin(0, 0)
      .setDepth(0.5);
    // Must clamp: repeating a non-power-of-two image makes the GPU draw it black.
    const sampling = {
      wrapS: "clamp_to_edge",
      wrapT: "clamp_to_edge",
      minFilter: "nearest",
      magFilter: "nearest",
    };
    sway.setSampler2D("iChannel0", "area", 0, sampling);
    sway.setSampler2D("iChannel1", config.sway.mask, 1, sampling);
    heavy.push(sway);
  }

  // Soft shadows of passing clouds sweep across the ground.
  if (config.cloudShadows && !lite) {
    softCircle(scene, "ambient-shadow", "rgba(27,67,50,0.55)");
    const random = seeded(77);
    for (let i = 0; i < config.cloudShadows; i++) {
      const shadow = scene.add
        .image(random() * width, 200 + random() * (height - 200), "ambient-shadow")
        .setScale(1.6 + random() * 1.4, 0.8 + random() * 0.6)
        .setAlpha(0.32)
        .setDepth(2);
      heavy.push(shadow);
      const speed = 10 + random() * 8;
      updates.push((delta) => {
        shadow.x += speed * delta;
        if (shadow.x > width + 400) shadow.x = -400;
      });
    }
  }

  if (config.clouds && webgl) {
    const { mask, top, bottom, count, scale, speed, alpha } = config.clouds;
    const random = seeded(31);
    const layer = scene.add.container(0, 0).setDepth(1);
    layer.setMask(masked(scene, mask));
    for (let i = 0; i < count; i++) {
      const key = `ambient-cloud-${i % 3}`;
      bakeCloud(scene, key, 101 + (i % 3) * 37);
      const cloud = scene.add
        .image(random() * width, top + random() * (bottom - top), key)
        .setScale(scale * (0.7 + random() * 0.6))
        .setAlpha(alpha);
      layer.add(cloud);
      const drift = speed * (0.7 + random() * 0.6);
      updates.push((delta) => {
        cloud.x += drift * delta;
        if (cloud.x > width + 200) cloud.x = -200;
      });
    }
  }

  if (config.water && webgl) {
    const random = seeded(53);
    bakeTexture(scene, "ambient-ripple", 192, 96, (g) => {
      for (let i = 0; i < 26; i++) {
        g.fillStyle(0xffffff, 0.35 + random() * 0.5);
        const x = Math.floor(random() * 22) * 8,
          y = Math.floor(random() * 11) * 8;
        g.fillRect(x, y, 8 + Math.floor(random() * 3) * 8, 4);
      }
    });
    const mask = masked(scene, config.water.mask);
    const layer = (alpha: number, vx: number, vy: number, tileScale: number) => {
      const tile = scene.add
        .tileSprite(0, 0, width, height, "ambient-ripple")
        .setOrigin(0, 0)
        .setAlpha(alpha)
        .setDepth(1)
        .setTileScale(tileScale);
      tile.setMask(mask);
      updates.push((delta) => {
        tile.tilePositionX += vx * delta;
        tile.tilePositionY += vy * delta;
      });
      return tile;
    };
    layer(0.5, 26, 5, 1);
    if (!lite) heavy.push(layer(0.34, -16, 9, 1.4));
  }

  if (config.falls && webgl) {
    const random = seeded(19);
    bakeTexture(scene, "ambient-falls", 64, 128, (g) => {
      for (let i = 0; i < 16; i++) {
        g.fillStyle(0xffffff, 0.45 + random() * 0.5);
        g.fillRect(Math.floor(random() * 8) * 8, Math.floor(random() * 16) * 8, 4, 16 + random() * 28);
      }
    });
    const tile = scene.add
      .tileSprite(0, 0, width, height, "ambient-falls")
      .setOrigin(0, 0)
      .setAlpha(0.85)
      .setDepth(1);
    tile.setMask(masked(scene, config.falls.mask));
    updates.push((delta) => {
      tile.tilePositionY -= 210 * delta;
    });
  }

  bakeTexture(scene, "ambient-dot", 6, 6, (g) => {
    g.fillStyle(0xffffff, 1);
    g.fillRect(0, 0, 6, 6);
  });
  // Foam where each waterfall lands.
  for (const foam of config.foam ?? []) {
    scene.add
      .particles(foam.x, foam.y, "ambient-dot", {
        x: { min: -foam.width / 2, max: foam.width / 2 },
        speedY: { min: -38, max: -8 },
        speedX: { min: -16, max: 16 },
        scale: { start: 1, end: 0.2 },
        alpha: { start: 0.9, end: 0 },
        lifespan: 800,
        frequency: 45,
      })
      .setDepth(3);
  }
  // Droplets rising and falling back around the fountain.
  if (config.spray) {
    const { x, y, radius } = config.spray;
    scene.add
      .particles(x, y, "ambient-dot", {
        emitZone: {
          type: "edge",
          source: new Phaser.Geom.Ellipse(0, 0, radius * 2, radius * 0.7),
          quantity: 40,
        },
        speedY: { min: -70, max: -36 },
        speedX: { min: -8, max: 8 },
        gravityY: 120,
        scale: { start: 0.75, end: 0.3 },
        alpha: { start: 0.9, end: 0 },
        tint: [0xffffff, 0xd6ecff],
        lifespan: 850,
        frequency: 26,
      })
      .setDepth(3);
  }

  // Leaves carried across the map on the breeze.
  if (config.leaves && !lite) {
    bakeTexture(scene, "ambient-leaf", 8, 4, (g) => {
      g.fillStyle(0x40916c, 1);
      g.fillRect(0, 0, 8, 4);
    });
    heavyEmitters.push(
      scene.add
        .particles(0, 0, "ambient-leaf", {
          x: { min: -40, max: width * 0.4 },
          y: { min: 200, max: height * 0.8 },
          speedX: { min: 35, max: 70 },
          speedY: { min: 3, max: 16 },
          rotate: { start: 0, end: 360 },
          alpha: { start: 0.9, end: 0 },
          lifespan: 7000,
          frequency: config.leaves,
        })
        .setDepth(4),
    );
  }

  // Birds crossing the sky with flapping wings.
  if (config.birds) {
    const up = "ambient-bird-up",
      down = "ambient-bird-down";
    bakeTexture(scene, up, 22, 12, (g) => {
      g.fillStyle(DARK, 1);
      g.fillRect(0, 0, 4, 4);
      g.fillRect(4, 4, 4, 4);
      g.fillRect(8, 8, 6, 4);
      g.fillRect(14, 4, 4, 4);
      g.fillRect(18, 0, 4, 4);
    });
    bakeTexture(scene, down, 22, 12, (g) => {
      g.fillStyle(DARK, 1);
      g.fillRect(8, 0, 6, 4);
      g.fillRect(4, 4, 4, 4);
      g.fillRect(14, 4, 4, 4);
      g.fillRect(0, 8, 4, 4);
      g.fillRect(18, 8, 4, 4);
    });
    const random = seeded(9);
    for (let i = 0; i < config.birds; i++) {
      const bird = scene.add
        .image(random() * width, 24 + random() * 70, up)
        .setScale(0.7 + random() * 0.5)
        .setDepth(5);
      const speed = 34 + random() * 26;
      let clock = random() * 1000;
      updates.push((delta) => {
        clock += delta * 1000;
        bird.x += speed * delta;
        if (bird.x > width + 40) {
          bird.x = -40;
          bird.y = 24 + random() * 70;
        }
        bird.setTexture(Math.floor(clock / 170) % 2 ? up : down);
      });
    }
  }

  // Butterflies over the flower beds.
  const colors = [0xc9b6e4, CREAM, 0x7a4e9d];
  (config.butterflies ?? []).forEach((home, index) => {
    const random = seeded(200 + index * 13);
    const butterfly = scene.add
      .rectangle(home.x, home.y, 7, 7, colors[index % colors.length])
      .setDepth(4);
    scene.tweens.add({
      targets: butterfly,
      scaleX: 0.25,
      duration: 110,
      yoyo: true,
      repeat: -1,
    });
    wander(scene, butterfly, home, 46, random);
  });

  // Sunbeams through the window, slowly brightening and dimming.
  if (config.sunbeams?.length) {
    const beams = scene.add.graphics().setDepth(2).setBlendMode(Phaser.BlendModes.ADD);
    beams.fillStyle(WARM, 0.045);
    for (const points of config.sunbeams)
      beams.fillPoints(points.map(([x, y]) => new Phaser.Geom.Point(x, y)), true);
    scene.tweens.add({
      targets: beams,
      alpha: 0.5,
      duration: 4200,
      yoyo: true,
      repeat: -1,
      ease: "Sine.easeInOut",
    });
  }

  // Dust floating in the light.
  if (config.dust) {
    const { x, y, width: w, height: h } = config.dust as Rect;
    scene.add
      .particles(0, 0, "ambient-dot", {
        x: { min: x, max: x + w },
        y: { min: y, max: y + h },
        speedX: { min: -10, max: 12 },
        speedY: { min: -14, max: 7 },
        scale: { min: 0.35, max: 0.9 },
        alpha: { start: 0, end: 0, ease: (t: number) => Math.sin(t * Math.PI) * 0.7 },
        tint: WARM,
        lifespan: 5200,
        frequency: 150,
      })
      .setDepth(4);
  }

  // Gentle glows, such as the laptop screen and the desk lamp.
  for (const glow of config.glows ?? []) {
    softCircle(scene, "ambient-glow", "rgba(255,240,205,0.9)");
    const light = scene.add
      .image(glow.x, glow.y, "ambient-glow")
      .setScale(glow.radius / 128)
      .setAlpha(glow.alpha * 0.55)
      .setDepth(2)
      .setBlendMode(Phaser.BlendModes.ADD);
    scene.tweens.add({
      targets: light,
      alpha: glow.alpha,
      duration: 1500 + glow.radius * 12,
      yoyo: true,
      repeat: -1,
      ease: "Sine.easeInOut",
    });
  }

  return {
    update: (deltaSeconds) => {
      for (const update of updates) update(deltaSeconds);
    },
    lower: () => {
      for (const object of heavy) object.setVisible(false);
      for (const emitter of heavyEmitters) emitter.stop();
    },
  };
}
