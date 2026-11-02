/*
  Makes fast-loading copies of the artwork. The original PNGs are only read and
  stay in public/brand as the source of truth.

  Output: public/brand/optimized/
    <name>.webp        high-quality copy used in the game and pages
    <name>-thumb.webp  tiny blurred placeholder shown while the real image loads
    student-characters.webp  avatar sheet at half size (avatars display small)

  Run (sharp is not a project dependency):
    npm install --no-save sharp
    node scripts/optimize-art.cjs
*/
const fs = require("fs");
const path = require("path");
const sharp = require("sharp");

const BRAND = path.join(__dirname, "..", "public/brand");
const OUT = path.join(BRAND, "optimized");
const kb = (file) => Math.round(fs.statSync(file).size / 1024);

(async () => {
  fs.mkdirSync(OUT, { recursive: true });
  for (const name of ["quizzness-campus", "student-room-pixel-v2"]) {
    const src = path.join(BRAND, `${name}.png`);
    const webp = path.join(OUT, `${name}.webp`);
    await sharp(src).webp({ quality: 88, alphaQuality: 100, smartSubsample: false, effort: 6 }).toFile(webp);
    const thumb = path.join(OUT, `${name}-thumb.webp`);
    await sharp(src).resize({ width: 48 }).webp({ quality: 50 }).toFile(thumb);
    console.log(name, kb(src), "KB ->", kb(webp), "KB, placeholder", kb(thumb), "KB");
  }
  // Final art for connected areas, dropped into design/source/areas/ as PNGs.
  const areaSource = path.join(__dirname, "..", "design/source/areas");
  if (fs.existsSync(areaSource)) {
    const areaOut = path.join(OUT, "areas");
    fs.mkdirSync(areaOut, { recursive: true });
    for (const file of fs.readdirSync(areaSource).filter((f) => f.endsWith(".png"))) {
      const name = file.replace(/\.png$/, "");
      const src = path.join(areaSource, file);
      const webp = path.join(areaOut, `${name}.webp`);
      await sharp(src).resize(1536, 1024, { fit: "cover" }).webp({ quality: 88, smartSubsample: false, effort: 6 }).toFile(webp);
      await sharp(src).resize({ width: 48 }).webp({ quality: 50 }).toFile(path.join(areaOut, `${name}-thumb.webp`));
      console.log(name, kb(src), "KB ->", kb(webp), "KB");
    }
  }
  const sheet = path.join(BRAND, "student-characters.png");
  const small = path.join(OUT, "student-characters.webp");
  await sharp(sheet).resize({ width: 512, kernel: "nearest" }).webp({ quality: 90, alphaQuality: 100, effort: 6 }).toFile(small);
  console.log("student-characters", kb(sheet), "KB ->", kb(small), "KB");
})();
