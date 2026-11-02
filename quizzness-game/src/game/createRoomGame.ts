import Phaser from "phaser";
import {
  type StudentManifest,
  studentSprites,
  animationForMovement,
  type StudentAnimation,
} from "./studentAnimation";
import {
  characterScale,
  movePlayer,
  nearDestination,
  room,
  type Point,
  type Destination,
} from "./room";

export type RoomSnapshot = Point & {
  nearby?: Destination;
  animation?: StudentAnimation;
  frame?: number;
};
const FEET = 0.91; // where the feet sit within a sprite frame
const LEAN = 4; // degrees the character tilts into sideways movement
export function createRoomGame(
  parent: HTMLElement,
  avatarId: string,
  getInput: () => Point,
  onReady: () => void,
  onUpdate: (state: RoomSnapshot) => void,
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
  class RoomScene extends Phaser.Scene {
    private player!: Phaser.GameObjects.Sprite;
    private shadow!: Phaser.GameObjects.Image;
    private marker!: Phaser.GameObjects.Triangle;
    private position = { ...room.spawn };
    private current: StudentAnimation = "idle";
    private lastReport = 0;
    preload() {
      this.load.once("loaderror", onError);
      this.load.image("room", "/brand/student-room-pixel-v2.png");
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
        !this.textures.exists("room")
      )
        return;
      this.add.image(0, 0, "room").setOrigin(0, 0).setDepth(0);
      // Doormat marking the way out to campus; the artwork has no door.
      const mat = this.add.graphics().setDepth(1);
      mat.fillStyle(0x1b4332).fillRect(684, 984, 172, 40);
      mat.fillStyle(0x7a4e9d).fillRect(690, 990, 160, 34);
      mat.fillStyle(0xc9b6e4).fillRect(702, 998, 136, 26);
      mat.fillStyle(0x7a4e9d).fillRect(760, 1004, 20, 20);
      const panthy = this.add
        .image(room.panthy.x, room.panthy.y, "panthy")
        .setOrigin(0.5, 1)
        .setDisplaySize(112, 107)
        .setDepth(room.panthy.y);
      if (!stillMotion())
        this.tweens.add({
          targets: panthy,
          y: room.panthy.y - 6,
          duration: 900,
          yoyo: true,
          repeat: -1,
          ease: "Sine.easeInOut",
        });
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
      const scale = characterScale(this.position.y);
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
      const previous = this.position;
      this.position = movePlayer(this.position, getInput(), delta / 1000);
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
      const nearby = nearDestination(this.position);
      this.marker.setVisible(!!nearby);
      if (nearby) {
        // Panthy and the doormat get the arrow; furniture shows it over the student.
        const fixed = nearby.id === "panthy" || nearby.id === "campus";
        const height = 136 * FEET * characterScale(this.position.y);
        const top = fixed
          ? nearby.id === "panthy"
            ? room.panthy.y - 150
            : nearby.y - 60
          : this.position.y - height - 24;
        const bob = still ? 0 : Math.sin(time / 180) * 6;
        this.marker.setPosition(fixed ? nearby.x : this.position.x, top + bob);
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
    width: room.width,
    height: room.height,
    backgroundColor: "#EFE6DD",
    pixelArt: true,
    antialias: false,
    roundPixels: true,
    input: { keyboard: false },
    audio: { noAudio: true },
    scene: RoomScene,
    scale: { mode: Phaser.Scale.FIT, autoCenter: Phaser.Scale.CENTER_BOTH },
  });
}
