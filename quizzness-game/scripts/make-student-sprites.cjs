/*
  Builds walking/idle sprite sheets for the six student characters from the
  original sheet (public/brand/student-characters.png). The original art is
  only read: every frame is made by moving its pixels in whole steps.

  Output: public/sprites/students/
    <id>-idle.png          2 frames (slow breathing)
    <id>-walk-down.png     8 frames (toward the camera)
    <id>-walk-left.png     8 frames (stopgap: front view leaning left)
    <id>-walk-right.png    8 frames (stopgap: front view leaning right)
    <id>-shadow-day.png    8 frames, separate layer
    <id>-shadow-night.png  8 frames, faint separate layer
    students.json          frame size, order, fps and notes for the game
    preview.html           open via the dev server to review

  Run (sharp is not a project dependency):
    npm install --no-save sharp
    node scripts/make-student-sprites.cjs
*/
const fs = require("fs");
const path = require("path");
const sharp = require("sharp");

const ROOT = path.join(__dirname, "..");
const SRC = path.join(ROOT, "public/brand/student-characters.png");
const OUT = path.join(ROOT, "public/sprites/students");

// Native sprite: 1 sprite pixel ≈ 6 source pixels. Chosen as the smallest
// size that keeps faces readable. Frames sit in a slightly larger canvas.
const SCALE = 6;
const BODY_W = 57, BODY_H = 128;
const FW = 64, FH = 136, OX = 3, OY = 4;

// Measured on the source sheet (source pixels). Avatar IDs match src/components/Avatar.tsx.
const CHARACTERS = [
  { id: "fern", name: "Flower", col: 0, row: 0, split: 553, gap: 176 },
  { id: "sun", name: "Hoodie", col: 1, row: 0, split: 548, gap: 165, clearBelow: 746 },
  { id: "sky", name: "Bow", col: 2, row: 0, split: 588, gap: 156 },
  { id: "headphones", name: "Headphones", col: 0, row: 1, split: 525, gap: 175 },
  // Legs touch: split along the dark seam between them.
  { id: "books", name: "Books", col: 1, row: 1, split: 556, gap: 172 },
  { id: "glasses", name: "Glasses", col: 2, row: 1, split: 532, gap: 164 },
];

// One walk cycle, 8 frames. Units are sprite pixels.
//   ty: torso dip, tx: sway toward the planted foot,
//   liftL/liftR: foot lift, tuck: lifted foot steps 1px inward.
const WALK = [
  { ty: 1, tx: 0, liftL: 0, liftR: 0 },           // contact
  { ty: 0, tx: 0, liftL: 2, liftR: 0 },           // left foot rising
  { ty: 0, tx: 1, liftL: 3, liftR: 0, tuck: 1 },  // left foot up, weight right
  { ty: 0, tx: 1, liftL: 2, liftR: 0 },           // left foot coming down
  { ty: 1, tx: 0, liftL: 0, liftR: 0 },           // contact
  { ty: 0, tx: 0, liftL: 0, liftR: 2 },
  { ty: 0, tx: -1, liftL: 0, liftR: 3, tuck: 1 },
  { ty: 0, tx: -1, liftL: 0, liftR: 2 },
];
const IDLE = [{ ty: 0, tx: 0 }, { ty: 1, tx: 0, breathe: true }];
const NECK = 45; // sprite row between chin and shoulders (all six share proportions)

async function nativeBody(c) {
  const left = Math.round((c.col * 1024) / 3), right = Math.round(((c.col + 1) * 1024) / 3);
  const cell = await sharp(SRC).extract({ left, top: c.row * 768, width: right - left, height: 768 }).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  if (c.clearBelow) for (let y = c.clearBelow; y < 768; y++) for (let x = 0; x < cell.info.width; x++) cell.data[(y * cell.info.width + x) * 4 + 3] = 0;
  const small = await sharp(cell.data, { raw: cell.info }).resize(BODY_W, BODY_H, { kernel: "nearest", fit: "fill" }).raw().toBuffer();
  // Hard alpha, then remove the faint light halo left around outlines and isolated specks.
  for (let i = 3; i < small.length; i += 4) small[i] = small[i] < 128 ? 0 : 255;
  const at = (x, y) => (x < 0 || y < 0 || x >= BODY_W || y >= BODY_H ? 0 : small[(y * BODY_W + x) * 4 + 3]);
  const drop = [];
  for (let y = 0; y < BODY_H; y++) for (let x = 0; x < BODY_W; x++) {
    const i = (y * BODY_W + x) * 4; if (!small[i + 3]) continue;
    const n = [at(x - 1, y), at(x + 1, y), at(x, y - 1), at(x, y + 1)];
    const r = small[i], g = small[i + 1], b = small[i + 2];
    const light = r + g + b > 645 && Math.max(r, g, b) - Math.min(r, g, b) < 40;
    if ((light && n.includes(0)) || n.every((a) => a === 0)) drop.push(i);
  }
  drop.forEach((i) => (small[i + 3] = 0));
  // Place into the frame canvas.
  const canvas = Buffer.alloc(FW * FH * 4);
  for (let y = 0; y < BODY_H; y++) small.copy(canvas, ((y + OY) * FW + OX) * 4, y * BODY_W * 4, (y + 1) * BODY_W * 4);
  return canvas;
}

function makeFrame(src, c, pose, head) {
  const split = Math.round(c.split / SCALE) + OY, gap = Math.round(c.gap / SCALE) + OX;
  const waist = split - Math.round(80 / SCALE), neck = NECK + OY;
  const out = Buffer.alloc(src.length);
  const put = (sx, sy, dx, dy) => {
    if (dx < 0 || dx >= FW || dy < 0 || dy >= FH) return;
    const i = (sy * FW + sx) * 4; if (!src[i + 3]) return;
    src.copy(out, (dy * FW + dx) * 4, i, i + 4);
  };
  const tuckL = pose.tuck && pose.liftL ? pose.tuck : 0, tuckR = pose.tuck && pose.liftR ? -pose.tuck : 0;
  // 1) legs, each lifted (and tucked inward when fully up)
  for (let y = split; y < FH; y++) for (let x = 0; x < FW; x++) {
    const left = x < gap;
    put(x, y, x + (left ? tuckL : tuckR), y - (left ? pose.liftL || 0 : pose.liftR || 0));
  }
  // 2) hips lean smoothly from the torso offset to the planted legs
  for (let y = waist; y < split; y++) {
    const t = (split - y) / (split - waist);
    for (let x = 0; x < FW; x++) put(x, y, x + Math.round(pose.tx * t), y + Math.round(pose.ty * t));
  }
  // 3) torso, then 4) head + hair, which trails the body by one frame
  for (let y = neck; y < waist; y++) for (let x = 0; x < FW; x++) put(x, y, x + pose.tx, y + pose.ty);
  for (let y = 0; y < neck; y++) for (let x = 0; x < FW; x++) put(x, y, x + head.tx, y + head.ty);
  // Fill a 1px gap at the neck if the head sits higher than the torso.
  for (let x = 0; x < FW; x++) for (let y = neck - 2; y < neck + 3; y++) {
    const i = (y * FW + x) * 4, above = ((y - 1) * FW + x) * 4, below = ((y + 1) * FW + x) * 4;
    if (!out[i + 3] && out[above + 3] && out[below + 3]) out.copy(out, i, below, below + 4);
  }
  return out;
}

function shadowFrame(c, pose, footSpan, strength) {
  const out = Buffer.alloc(FW * FH * 4);
  const cx = (footSpan[0] + footSpan[1]) / 2 + pose.tx * 0.5;
  const lifted = (pose.liftL || 0) + (pose.liftR || 0) > 0;
  const rx = (footSpan[1] - footSpan[0]) / 2 + (lifted ? 1 : 2), ry = 2.4, cy = footSpan[2] + 1.5;
  for (let y = 0; y < FH; y++) for (let x = 0; x < FW; x++) {
    const d = ((x + 0.5 - cx) / rx) ** 2 + ((y + 0.5 - cy) / ry) ** 2;
    if (d > 1) continue;
    const i = (y * FW + x) * 4;
    out[i] = 0x1b; out[i + 1] = 0x43; out[i + 2] = 0x32;
    out[i + 3] = Math.round((d < 0.45 ? 1 : 0.6) * strength * 255);
  }
  return out;
}

function feetSpan(buf) {
  let bottom = 0;
  for (let y = FH - 1; y >= 0 && !bottom; y--) for (let x = 0; x < FW; x++) if (buf[(y * FW + x) * 4 + 3]) { bottom = y; break; }
  let minX = FW, maxX = 0;
  for (let y = bottom - 5; y <= bottom; y++) for (let x = 0; x < FW; x++) if (buf[(y * FW + x) * 4 + 3]) { minX = Math.min(minX, x); maxX = Math.max(maxX, x); }
  return [minX, maxX, bottom];
}

const sheet = (frames) => sharp({ create: { width: FW * frames.length, height: FH, channels: 4, background: { r: 0, g: 0, b: 0, alpha: 0 } } })
  .composite(frames.map((f, i) => ({ input: f, raw: { width: FW, height: FH, channels: 4 }, left: i * FW, top: 0 }))).png();

(async () => {
  fs.mkdirSync(OUT, { recursive: true });
  const manifest = { frameWidth: FW, frameHeight: FH, scaleNote: "Draw at whole-number scales only (x1, x2, x3) with pixelated rendering.", characters: {} };
  for (const c of CHARACTERS) {
    const body = await nativeBody(c);
    const span = feetSpan(body);
    const walk = (lean) => WALK.map((p, i) => {
      const prev = WALK[(i + WALK.length - 1) % WALK.length];
      const pose = { ...p, tx: p.tx + lean };
      return makeFrame(body, c, pose, { tx: prev.tx + lean, ty: prev.ty });
    });
    await sheet(walk(0)).toFile(path.join(OUT, `${c.id}-walk-down.png`));
    await sheet(walk(-1)).toFile(path.join(OUT, `${c.id}-walk-left.png`));
    await sheet(walk(1)).toFile(path.join(OUT, `${c.id}-walk-right.png`));
    const idle = IDLE.map((p) => makeFrame(body, c, { ...p, liftL: 0, liftR: 0 }, { tx: 0, ty: p.ty }));
    await sheet(idle).toFile(path.join(OUT, `${c.id}-idle.png`));
    await sheet(WALK.map((p) => shadowFrame(c, p, span, 0.38))).toFile(path.join(OUT, `${c.id}-shadow-day.png`));
    await sheet(WALK.map((p) => shadowFrame(c, p, span, 0.14))).toFile(path.join(OUT, `${c.id}-shadow-night.png`));
    manifest.characters[c.id] = {
      name: c.name,
      animations: {
        idle: { file: `${c.id}-idle.png`, frames: 2, fps: 1.5 },
        "walk-down": { file: `${c.id}-walk-down.png`, frames: 8, fps: 10 },
        "walk-left": { file: `${c.id}-walk-left.png`, frames: 8, fps: 10, stopgap: true },
        "walk-right": { file: `${c.id}-walk-right.png`, frames: 8, fps: 10, stopgap: true },
        "walk-up": { file: `${c.id}-walk-down.png`, frames: 8, fps: 10, stopgap: true },
      },
      shadow: { day: `${c.id}-shadow-day.png`, night: `${c.id}-shadow-night.png`, frames: 8, note: "Separate layer drawn under the character; sync its frame with the walk frame." },
    };
  }
  manifest.notes = [
    "Generated by scripts/make-student-sprites.cjs from the original sheet; only existing pixels are moved.",
    "Front view only. walk-left/right lean the front view toward the direction of travel and walk-up reuses walk-down: stopgaps until side/back views are drawn.",
    "Idle is the original pose with a slow 1px breathing dip.",
    "Day/night: show shadow-day or shadow-night (or none) depending on the area's lighting. How day/night is decided is still an open design question.",
  ];
  fs.writeFileSync(path.join(OUT, "students.json"), JSON.stringify(manifest, null, 2) + "\n");
  console.log("Sprites written to", OUT);
})();
