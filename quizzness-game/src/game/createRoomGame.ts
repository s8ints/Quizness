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
  room,
  type Point,
  type Destination,
} from "./room";

export type RoomSnapshot = Point & {
  nearby?: Destination;
  animation?: StudentAnimation;
  frame?: number;
};
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
  class RoomScene extends Phaser.Scene {
    private player!: Phaser.GameObjects.Sprite;
    private shadow!: Phaser.GameObjects.Image;
    private marker!: Phaser.GameObjects.Rectangle;
    private position = { ...room.spawn };
    private lastReport = 0;
    preload() {
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
        width: 64,
        height: 64,
      });
      this.load.once("loaderror", onError);
    }
    create() {
      if (
        animations.some((name) => !this.textures.exists(name)) ||
        !this.textures.exists("student-shadow") ||
        !this.textures.exists("panthy")
      )
        return;
      const g = this.add.graphics();
      const dark = 0x1b4332,
        cream = 0xefe6dd,
        purple = 0x7a4e9d,
        lavender = 0xc9b6e4,
        green = 0x40916c;
      const block = (x: number, y: number, w: number, h: number, c: number) =>
        g.fillStyle(c).fillRect(x, y, w, h);
      // Prototype tile layout uses brand colours. Originals are untouched.
      block(0, 0, 640, 400, dark);
      block(24, 28, 592, 356, cream);
      block(32, 36, 576, 76, lavender);
      block(32, 104, 576, 12, purple);
      for (let y = 116; y < 380; y += 24)
        for (let x = 32; x < 608; x += 48) {
          g.lineStyle(1, green, 0.15).strokeRect(
            x + (y % 48 === 20 ? 0 : 24),
            y,
            48,
            24,
          );
        }
      block(230, 46, 180, 54, dark);
      block(238, 50, 164, 42, green);
      block(254, 68, 46, 24, cream);
      block(336, 60, 46, 32, cream);
      block(278, 56, 16, 12, purple);
      block(350, 50, 16, 10, purple);
      block(230, 46, 16, 54, purple);
      block(394, 46, 16, 54, purple);
      block(318, 50, 4, 42, cream);
      // Rug and its stepped border.
      block(238, 216, 210, 124, purple);
      block(246, 224, 194, 108, lavender);
      g.lineStyle(2, cream).strokeRect(254, 232, 178, 92);
      for (let x = 262; x < 430; x += 24) block(x, 238, 4, 4, purple);
      // Bookshelf, including book spines.
      block(52, 118, 118, 56, dark);
      block(58, 122, 106, 44, purple);
      for (let row = 0; row < 2; row++)
        for (let i = 0; i < 9; i++) {
          block(
            62 + i * 11,
            126 + row * 22,
            8,
            16,
            [cream, green, lavender][i % 3],
          );
        }
      block(56, 144, 110, 4, dark);
      // Desk and stool.
      block(52, 216, 128, 68, dark);
      block(56, 220, 120, 52, green);
      block(76, 230, 40, 26, cream);
      block(80, 230, 32, 19, purple);
      block(124, 236, 28, 18, cream);
      block(136, 238, 2, 14, purple);
      block(90, 280, 32, 8, purple);
      // Wardrobe and bed.
      block(492, 112, 98, 32, dark);
      block(496, 116, 90, 24, green);
      block(540, 116, 3, 24, cream);
      block(532, 126, 3, 4, lavender);
      block(548, 126, 3, 4, lavender);
      block(500, 148, 82, 144, dark);
      block(504, 152, 74, 134, cream);
      block(510, 158, 62, 26, lavender);
      block(504, 192, 74, 84, purple);
      block(510, 200, 62, 68, lavender);
      block(516, 206, 8, 8, cream);
      // Potted plant and doorway.
      block(228, 134, 16, 18, purple);
      block(222, 120, 28, 18, green);
      block(232, 114, 8, 28, dark);
      block(280, 378, 80, 6, purple);
      block(284, 360, 72, 18, lavender);
      this.add.image(236, 150, "panthy").setDisplaySize(32, 32).setDepth(150);
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
        .setOrigin(0.5, 0.91);
      this.player = this.add
        .sprite(this.position.x, this.position.y, "idle", 0)
        .setOrigin(0.5, 0.91);
      this.marker = this.add
        .rectangle(0, 0, 20, 10, lavender, 0.3)
        .setStrokeStyle(2, purple)
        .setVisible(false);
      onUpdate({ ...this.position });
      onReady();
    }
    update(time: number, delta: number) {
      if (!this.player) return;
      const previous = this.position;
      this.position = movePlayer(this.position, getInput(), delta / 1000);
      const animation = animationForMovement(previous, this.position);
      if (
        reducedMotion ||
        window.matchMedia("(prefers-reduced-motion: reduce)").matches
      ) {
        this.player.anims.stop();
        this.player.setTexture(animation, 0);
      } else this.player.play(animation, true);
      const frame = Number(this.player.frame.name);
      this.shadow.setFrame(frame % student.shadow.frames);
      this.player
        .setPosition(this.position.x, this.position.y)
        .setDepth(this.position.y);
      this.shadow
        .setPosition(this.position.x, this.position.y)
        .setDepth(this.position.y - 1);
      const nearby = nearDestination(this.position);
      this.marker.setVisible(!!nearby);
      if (nearby) this.marker.setPosition(nearby.x, nearby.y).setDepth(1);
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
    backgroundColor: "#1B4332",
    pixelArt: true,
    antialias: false,
    roundPixels: true,
    input: { keyboard: false },
    audio: { noAudio: true },
    scene: RoomScene,
    scale: { mode: Phaser.Scale.FIT, autoCenter: Phaser.Scale.CENTER_BOTH },
  });
}
