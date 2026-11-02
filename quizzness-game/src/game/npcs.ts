import Phaser from "phaser";
import type { Area, NpcRoute } from "./area";
import {
  animationForMovement,
  type StudentAnimation,
  type StudentManifest,
} from "./studentAnimation";

// Decorative students who walk set routes so a place feels lived in.
// They are not real players, and they never block the student.
const FEET = 0.91;
const AVATARS = ["sun", "sky", "headphones", "books", "glasses", "fern"];
const ANIMATIONS: StudentAnimation[] = [
  "idle",
  "walk-down",
  "walk-up",
  "walk-left",
  "walk-right",
];
const key = (id: string, animation: StudentAnimation) => `npc-${id}-${animation}`;

// Everyone except the player's own character, so nobody meets a twin.
export function npcAvatars(playerAvatar: string, count: number) {
  return AVATARS.filter((id) => id !== playerAvatar).slice(0, count);
}
export function loadNpcs(
  scene: Phaser.Scene,
  ids: string[],
  manifest: StudentManifest,
) {
  const frameConfig = {
    frameWidth: manifest.frameWidth,
    frameHeight: manifest.frameHeight,
  };
  for (const id of ids) {
    const character = manifest.characters[id as keyof typeof manifest.characters];
    for (const animation of ANIMATIONS)
      scene.load.spritesheet(
        key(id, animation),
        `/sprites/students/${character.animations[animation].file}`,
        frameConfig,
      );
  }
}
// Characters who stand in one spot, ready to talk.
export function loadGuides(
  scene: Phaser.Scene,
  area: Area,
  manifest: StudentManifest,
) {
  const frameConfig = {
    frameWidth: manifest.frameWidth,
    frameHeight: manifest.frameHeight,
  };
  for (const { avatar } of area.guides ?? []) {
    const character = manifest.characters[avatar as keyof typeof manifest.characters];
    scene.load.spritesheet(
      key(avatar, "idle"),
      `/sprites/students/${character.animations.idle.file}`,
      frameConfig,
    );
  }
}
export function addGuides(
  scene: Phaser.Scene,
  area: Area,
  manifest: StudentManifest,
  shadowTexture: string,
  still: boolean,
) {
  for (const { avatar, x, y } of area.guides ?? []) {
    const character = manifest.characters[avatar as keyof typeof manifest.characters];
    const scale = area.characterScale(y);
    const textureKey = key(avatar, "idle");
    scene.add
      .image(x, y, shadowTexture, 0)
      .setOrigin(0.5, FEET)
      .setScale(scale)
      .setDepth(y - 1);
    const sprite = scene.add
      .sprite(x, y, textureKey, 0)
      .setOrigin(0.5, FEET)
      .setScale(scale)
      .setDepth(y);
    if (!still) {
      scene.anims.create({
        key: textureKey,
        frames: scene.anims.generateFrameNumbers(textureKey, {
          start: 0,
          end: character.animations.idle.frames - 1,
        }),
        frameRate: character.animations.idle.fps,
        repeat: -1,
      });
      sprite.play(textureKey);
    }
  }
}
export function addNpcs(
  scene: Phaser.Scene,
  area: Area,
  routes: NpcRoute[],
  ids: string[],
  manifest: StudentManifest,
  shadowTexture: string,
) {
  const walkers = ids.map((id, index) => {
    const character = manifest.characters[id as keyof typeof manifest.characters];
    for (const animation of ANIMATIONS) {
      if (area.smoothSprites)
        scene.textures
          .get(key(id, animation))
          .setFilter(Phaser.Textures.FilterMode.LINEAR);
      scene.anims.create({
        key: key(id, animation),
        frames: scene.anims.generateFrameNumbers(key(id, animation), {
          start: 0,
          end: character.animations[animation].frames - 1,
        }),
        frameRate: character.animations[animation].fps,
        repeat: -1,
      });
    }
    const route = routes[index % routes.length];
    const start = route.points[0];
    return {
      id,
      route,
      x: start.x,
      y: start.y,
      target: 1,
      step: 1,
      rest: 400 + index * 900,
      current: "idle" as StudentAnimation,
      sprite: scene.add
        .sprite(start.x, start.y, key(id, "idle"), 0)
        .setOrigin(0.5, FEET)
        .play(key(id, "idle")),
      shadow: scene.add
        .image(start.x, start.y, shadowTexture, 0)
        .setOrigin(0.5, FEET),
    };
  });
  const place = (walker: (typeof walkers)[number]) => {
    const scale = area.characterScale(walker.y);
    walker.sprite
      .setPosition(walker.x, walker.y)
      .setScale(scale)
      .setDepth(walker.y);
    walker.shadow
      .setPosition(walker.x, walker.y)
      .setScale(scale)
      .setDepth(walker.y - 1);
  };
  walkers.forEach(place);
  return (deltaSeconds: number) => {
    for (const walker of walkers) {
      let next: StudentAnimation = "idle";
      if (walker.rest > 0) {
        walker.rest -= deltaSeconds * 1000;
      } else {
        const goal = walker.route.points[walker.target];
        const dx = goal.x - walker.x,
          dy = goal.y - walker.y;
        const distance = Math.hypot(dx, dy);
        const travel = walker.route.speed * deltaSeconds;
        if (distance <= travel) {
          walker.x = goal.x;
          walker.y = goal.y;
          // Walk the route back and forth, pausing at each end.
          const last = walker.route.points.length - 1;
          if (walker.target === last) walker.step = -1;
          if (walker.target === 0) walker.step = 1;
          if (walker.target === last || walker.target === 0) walker.rest = 2200;
          walker.target += walker.step;
        } else {
          const before = { x: walker.x, y: walker.y };
          walker.x += (dx / distance) * travel;
          walker.y += (dy / distance) * travel;
          next = animationForMovement(before, walker, walker.current);
        }
      }
      if (next !== walker.current) {
        walker.sprite.play(key(walker.id, next), true);
        walker.current = next;
      }
      const frame = Number(walker.sprite.frame.name);
      walker.shadow.setFrame(frame % 8);
      place(walker);
    }
  };
}
