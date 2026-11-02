import Phaser from "phaser";
import {
  type StudentManifest,
  studentSprites,
  animationForMovement,
  type StudentAnimation,
} from "./studentAnimation";
import {
  movePlayer,
  nearDestination,
  type Area,
  type Point,
  type Destination,
} from "./area";
import { addAmbient, ambientMasks } from "./ambient";

export type AreaSnapshot = Point & {
  nearby?: Destination;
  animation?: StudentAnimation;
  frame?: number;
};
const FEET = 0.91; // where the feet sit within a sprite frame
const LEAN = 4; // degrees the character tilts into sideways movement
export function createAreaGame(
  area: Area,
  parent: HTMLElement,
  avatarId: string,
  getInput: () => Point,
  onReady: () => void,
  onUpdate: (state: AreaSnapshot) => void,
  onError: () => void,
  studentManifest: StudentManifest,
  reducedMotion = false,
) {
  const student = studentSprites(avatarId, studentManifest);
  const animations = Object.keys(student.animations) as StudentAnimation[];
  const frameConfig = {
    frameWidth: studentManifest.frameWidth,
    frameHeight: studentManifest.frameHeight,
  };
  const stillMotion = () =>
    reducedMotion ||
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  class AreaScene extends Phaser.Scene {
    private player!: Phaser.GameObjects.Sprite;
    private shadow!: Phaser.GameObjects.Image;
    private marker!: Phaser.GameObjects.Triangle;
    private position = { ...area.spawn };
    private current: StudentAnimation = "idle";
    private lastReport = 0;
    private updateAmbient?: (deltaSeconds: number) => void;
    preload() {
      this.load.once("loaderror", onError);
      this.load.image("area", area.art);
      if (area.ambient && !stillMotion())
        for (const mask of ambientMasks(area.ambient))
          this.load.image(mask, mask);
      for (const name of animations)
        this.load.spritesheet(
          name,
          `/sprites/students/${student.animations[name].file}`,
          frameConfig,
        );
      this.load.spritesheet(
        "student-shadow",
        `/sprites/students/${student.shadow.day}`,
        frameConfig,
      );
      this.load.svg("panthy", "/brand/panthy-pixel.svg", {
        width: 144,
        height: 138,
      });
    }
    create() {
      if (
        animations.some((name) => !this.textures.exists(name)) ||
        !this.textures.exists("student-shadow") ||
        !this.textures.exists("panthy") ||
        !this.textures.exists("area")
      )
        return;
      if (area.smoothSprites)
        for (const name of [...animations, "student-shadow", "panthy"])
          this.textures.get(name).setFilter(Phaser.Textures.FilterMode.LINEAR);
      this.add.image(0, 0, "area").setOrigin(0, 0).setDepth(0);
      // Background life stays off for students who asked for less motion.
      if (area.ambient && !stillMotion())
        this.updateAmbient = addAmbient(
          this,
          area.ambient,
          area.width,
          area.height,
        );
      if (area.doormat) {
        // Marks the way out where the artwork has no door.
        const { x, y, width, height } = area.doormat;
        const mat = this.add.graphics().setDepth(1);
        mat.fillStyle(0x1b4332).fillRect(x, y, width, height);
        mat.fillStyle(0x7a4e9d).fillRect(x + 6, y + 6, width - 12, height - 6);
        mat.fillStyle(0xc9b6e4).fillRect(x + 18, y + 14, width - 36, height - 14);
        mat.fillStyle(0x7a4e9d).fillRect(x + width / 2 - 10, y + 20, 20, height - 20);
      }
      if (area.panthy) {
        const { x, y, width, height } = area.panthy;
        const panthy = this.add
          .image(x, y, "panthy")
          .setOrigin(0.5, 1)
          .setDisplaySize(width, height)
          .setDepth(y);
        if (!stillMotion())
          this.tweens.add({
            targets: panthy,
            y: y - height * 0.06,
            duration: 900,
            yoyo: true,
            repeat: -1,
            ease: "Sine.easeInOut",
          });
      }
      for (const name of animations)
        this.anims.create({
          key: name,
          frames: this.anims.generateFrameNumbers(name, {
            start: 0,
            end: student.animations[name].frames - 1,
          }),
          frameRate: student.animations[name].fps,
          repeat: -1,
        });
      this.shadow = this.add
        .image(this.position.x, this.position.y, "student-shadow", 0)
        .setOrigin(0.5, FEET);
      this.player = this.add
        .sprite(this.position.x, this.position.y, "idle", 0)
        .setOrigin(0.5, FEET);
      // Bouncing arrow over whatever can be used right now.
      this.marker = this.add
        .triangle(0, 0, 0, 0, 36, 0, 18, 26, 0x7a4e9d)
        .setStrokeStyle(4, 0xefe6dd)
        .setDepth(3000)
        .setVisible(false);
      this.place();
      onUpdate({ ...this.position });
      onReady();
    }
    private place() {
      const scale = area.characterScale(this.position.y);
      this.player
        .setPosition(this.position.x, this.position.y)
        .setScale(scale)
        .setDepth(this.position.y);
      this.shadow
        .setPosition(this.position.x, this.position.y)
        .setScale(scale)
        .setDepth(this.position.y - 1);
    }
    update(time: number, delta: number) {
      if (!this.player) return;
      this.updateAmbient?.(Math.min(delta, 100) / 1000);
      const previous = this.position;
      this.position = movePlayer(area, this.position, getInput(), delta / 1000);
      const animation = animationForMovement(
        previous,
        this.position,
        this.current,
      );
      const still = stillMotion();
      if (still) {
        this.player.anims.stop();
        this.player.setTexture(animation, 0);
      } else if (animation !== this.current) {
        // Changing direction carries on from the same step instead of restarting.
        const walking = animation !== "idle" && this.current !== "idle";
        const startFrame = walking ? Number(this.player.frame.name) : 0;
        this.player.play({ key: animation, startFrame }, true);
      } else this.player.play(animation, true);
      this.current = animation;
      const frame = Number(this.player.frame.name);
      this.shadow.setFrame(frame % student.shadow.frames);
      const lean =
        still || animation === "idle"
          ? 0
          : Math.sign(this.position.x - previous.x) * LEAN;
      this.player.angle += (lean - this.player.angle) * 0.2;
      this.place();
      const nearby = nearDestination(area, this.position);
      this.marker.setVisible(!!nearby);
      if (nearby) {
        const overStudent =
          this.position.y -
          136 * FEET * area.characterScale(this.position.y) -
          24;
        const fixed = nearby.arrowY !== undefined;
        const bob = still ? 0 : Math.sin(time / 180) * 6;
        this.marker.setPosition(
          fixed ? nearby.x : this.position.x,
          (nearby.arrowY ?? overStudent) + bob,
        );
      }
      if (time - this.lastReport > 80) {
        onUpdate({ ...this.position, nearby, animation, frame });
        this.lastReport = time;
      }
    }
  }
  return new Phaser.Game({
    type: Phaser.AUTO,
    parent,
    width: area.width,
    height: area.height,
    backgroundColor: "#EFE6DD",
    pixelArt: true,
    antialias: false,
    roundPixels: !area.smoothSprites,
    input: { keyboard: false },
    audio: { noAudio: true },
    scene: AreaScene,
    scale: { mode: Phaser.Scale.FIT, autoCenter: Phaser.Scale.CENTER_BOTH },
  });
}
