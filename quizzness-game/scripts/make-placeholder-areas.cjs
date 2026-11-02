/*
  Makes clearly temporary pictures for areas whose final art doesn't exist yet,
  so they can be walked and tested. Skips any area with final art in
  design/source/areas/ (scripts/optimize-art.cjs converts those instead).

  Run (sharp is not a project dependency):
    npm install --no-save sharp
    node scripts/make-placeholder-areas.cjs
*/
const fs = require("fs");
const path = require("path");
const sharp = require("sharp");

const ROOT = path.join(__dirname, "..");
const SOURCE = path.join(ROOT, "design/source/areas");
const OUT = path.join(ROOT, "public/brand/optimized/areas");
const W = 1536, H = 1024;
const AREAS = {
  "logic-district": { floor: "#b9c7b5", buildings: [430, 1106], roof: "#7A4E9D" },
  "comp-101-lobby": { floor: "#d9c7ae", buildings: [300, 768, 1236], roof: "#40916C" },
  "variables-topic": { floor: "#c9b6e4", buildings: [430, 1106], roof: "#1B4332" },
};
const svg = ({ floor, buildings, roof }) => `<svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">
  <rect width="${W}" height="${H}" fill="${floor}"/>
  <rect width="${W}" height="470" fill="#EFE6DD"/>
  ${buildings.map((x) => `
    <rect x="${x - 170}" y="170" width="340" height="300" fill="#EFE6DD" stroke="#1B4332" stroke-width="8"/>
    <rect x="${x - 190}" y="130" width="380" height="60" fill="${roof}" stroke="#1B4332" stroke-width="8"/>
    <rect x="${x - 45}" y="340" width="90" height="130" fill="#7A4E9D" stroke="#1B4332" stroke-width="8"/>`).join("")}
  <rect x="${W / 2 - 86}" y="984" width="172" height="40" fill="#1B4332"/>
  <text x="${W / 2}" y="70" font-family="Arial" font-size="38" font-weight="700" fill="#1B4332" text-anchor="middle" opacity="0.55">TEMPORARY ART</text>
</svg>`;
(async () => {
  fs.mkdirSync(OUT, { recursive: true });
  for (const [name, spec] of Object.entries(AREAS)) {
    if (fs.existsSync(path.join(SOURCE, `${name}.png`))) {
      console.log(name, "has final art, skipped");
      continue;
    }
    const picture = sharp(Buffer.from(svg(spec)));
    await picture.clone().webp({ quality: 80 }).toFile(path.join(OUT, `${name}.webp`));
    await picture.clone().resize({ width: 48 }).webp({ quality: 50 }).toFile(path.join(OUT, `${name}-thumb.webp`));
    console.log(name, "temporary picture written");
  }
})();
