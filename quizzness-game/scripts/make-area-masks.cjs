/*
  Builds the masks that keep ambient animation in the right places: clouds only
  in the sky, ripples only on water. The artwork is only read, never changed.

  Output: public/brand/masks/
    campus-sky.png     open sky above the campus
    campus-water.png   lake, river and fountain
    campus-falls.png   the waterfalls
    room-window.png    the sky seen through the room's window

  Run (sharp is not a project dependency):
    npm install --no-save sharp
    node scripts/make-area-masks.cjs
*/
const fs = require("fs");
const path = require("path");
const sharp = require("sharp");

const ROOT = path.join(__dirname, "..");
const OUT = path.join(ROOT, "public/brand/masks");

async function load(file) {
  const { data, info } = await sharp(path.join(ROOT, file)).removeAlpha().raw().toBuffer({ resolveWithObject: true });
  const get = (x, y) => {
    const i = (y * info.width + x) * info.channels;
    return [data[i], data[i + 1], data[i + 2]];
  };
  return { width: info.width, height: info.height, get };
}
// Removes specks: keeps a pixel only when enough of its neighbours are also set.
function tidy(mask, w, h, needed = 4) {
  const out = new Uint8Array(mask.length);
  for (let y = 1; y < h - 1; y++)
    for (let x = 1; x < w - 1; x++) {
      if (!mask[y * w + x]) continue;
      let n = 0;
      for (let dy = -1; dy <= 1; dy++)
        for (let dx = -1; dx <= 1; dx++) if ((dx || dy) && mask[(y + dy) * w + x + dx]) n++;
      if (n >= needed) out[y * w + x] = 1;
    }
  return out;
}
async function save(mask, w, h, name) {
  const rgba = Buffer.alloc(w * h * 4);
  for (let i = 0; i < mask.length; i++) {
    rgba[i * 4] = rgba[i * 4 + 1] = rgba[i * 4 + 2] = 255;
    rgba[i * 4 + 3] = mask[i] ? 255 : 0;
  }
  await sharp(rgba, { raw: { width: w, height: h, channels: 4 } }).png({ compressionLevel: 9 }).toFile(path.join(OUT, name));
  console.log(name, mask.reduce((a, b) => a + b, 0), "pixels");
}
const isWater = ([r, g, b]) => g > r + 8 && b > g + 18 && b > 120;
const isSky = ([r, g, b]) => (b > r + 20 && b > 170 && g > 110) || (r > 205 && g > 215 && b > 225);

(async () => {
  fs.mkdirSync(OUT, { recursive: true });
  const campus = await load("public/brand/quizzness-campus.png");
  const w = campus.width, h = campus.height;

  // Sky: flood down from the top edge through sky colours, so white walls don't count.
  const sky = new Uint8Array(w * h);
  const stack = [];
  for (let x = 0; x < w; x++) if (isSky(campus.get(x, 0))) stack.push([x, 0]);
  while (stack.length) {
    const [x, y] = stack.pop();
    if (x < 0 || y < 0 || x >= w || y >= 240 || sky[y * w + x] || !isSky(campus.get(x, y))) continue;
    sky[y * w + x] = 1;
    stack.push([x + 1, y], [x - 1, y], [x, y + 1], [x, y - 1]);
  }
  await save(sky, w, h, "campus-sky.png");

  // Water: blue pixels below the skyline, away from sky colours.
  const water = new Uint8Array(w * h);
  for (let y = 175; y < h; y++)
    for (let x = 0; x < w; x++) if (isWater(campus.get(x, y))) water[y * w + x] = 1;
  await save(tidy(water, w, h), w, h, "campus-water.png");

  // Falls: the bright water inside the two waterfall areas.
  const falls = new Uint8Array(w * h);
  const areas = [{ x: 1320, y: 730, width: 110, height: 150 }, { x: 1610, y: 480, width: 62, height: 90 }];
  for (const a of areas)
    for (let y = a.y; y < a.y + a.height; y++)
      for (let x = a.x; x < Math.min(w, a.x + a.width); x++) {
        const [r, g, b] = campus.get(x, y);
        if (b > 170 && b >= r && g > 110) falls[y * w + x] = 1;
      }
  await save(tidy(falls, w, h, 3), w, h, "campus-falls.png");

  const room = await load("public/brand/student-room-pixel-v2.png");
  const rw = room.width, rh = room.height;
  const pane = new Uint8Array(rw * rh);
  for (let y = 66; y < 235; y++)
    for (let x = 600; x < 1016; x++) if (isSky(room.get(x, y))) pane[y * rw + x] = 1;
  await save(tidy(pane, rw, rh, 3), rw, rh, "room-window.png");
})();
