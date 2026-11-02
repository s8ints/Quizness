import type { Area, Point, Rect } from "./area";
// The student's room, on public/brand/student-room-pixel-v2.png.
// A position means where the character's feet touch the floor.
const bounds = { x: 0, y: 505, width: 1536, height: 505 };
// Invisible walls fitted to the furniture in the artwork.
export const roomFurniture: Rect[] = [
  { x: 0, y: 480, width: 175, height: 544 }, // desk end and front plant
  { x: 175, y: 480, width: 160, height: 235 }, // desk and chair
  { x: 335, y: 480, width: 165, height: 50 }, // bookshelf base
  { x: 1100, y: 480, width: 110, height: 115 }, // head of the bed
  { x: 1165, y: 590, width: 255, height: 165 }, // foot of the bed
  { x: 1400, y: 480, width: 136, height: 400 }, // wardrobe
  { x: 985, y: 505, width: 100, height: 55 }, // Panthy
];
const radius = 28;
function canStand(p: Point) {
  return (
    p.x >= bounds.x + radius &&
    p.x <= bounds.x + bounds.width - radius &&
    p.y >= bounds.y &&
    p.y <= bounds.y + bounds.height &&
    !roomFurniture.some(
      (r) =>
        p.x + radius > r.x &&
        p.x - radius < r.x + r.width &&
        p.y + radius / 2 > r.y &&
        p.y - radius / 2 < r.y + r.height,
    )
  );
}
export const roomArea: Area = {
  id: "room",
  art: "/brand/optimized/student-room-pixel-v2.webp",
  thumb: "/brand/optimized/student-room-pixel-v2-thumb.webp",
  width: 1536,
  height: 1024,
  spawn: { x: 770, y: 760 },
  // Coming home from campus means walking in through the doormat.
  entrances: { campus: { x: 770, y: 930 } },
  speed: 280,
  // The floor is seen at an angle, so walking "up" the screen covers less of it.
  depthSpeed: 0.72,
  reach: 105,
  canStand,
  // Fake perspective: small by the window, larger near the front of the room.
  characterScale: (y) =>
    2.05 + Math.max(0, Math.min(1, (y - bounds.y) / bounds.height)) * 0.85,
  showPins: true,
  ambient: {
    // Curtains and plants stir in the breeze from the window.
    sway: { mask: "/brand/masks/room-sway.png", furthest: 5 },
    clouds: {
      mask: "/brand/masks/room-window.png",
      top: 78,
      bottom: 175,
      count: 4,
      scale: 0.5,
      speed: 9,
      alpha: 0.95,
    },
    // Sunlight from the window landing on the floor, with softer outer edges.
    sunbeams: [
      [[610, 490], [1010, 490], [1230, 880], [400, 880]],
      [[650, 490], [970, 490], [1160, 860], [470, 860]],
      [[690, 490], [930, 490], [1090, 840], [540, 840]],
    ],
    dust: { x: 480, y: 340, width: 640, height: 520 },
    glows: [
      { x: 120, y: 468, radius: 90, alpha: 0.28 }, // laptop screen
      { x: 190, y: 372, radius: 120, alpha: 0.3 }, // desk lamp
    ],
  },
  panthy: { x: 1035, y: 560, width: 112, height: 107 },
  doormat: { x: 684, y: 984, width: 172, height: 40 },
  destinations: [
    {
      id: "desk",
      label: "Study desk",
      x: 370,
      y: 650,
      path: "/courses",
      pin: { x: 205, y: 400 },
    },
    {
      id: "books",
      label: "Bookshelf",
      x: 400,
      y: 565,
      path: "/courses",
      pin: { x: 360, y: 265 },
    },
    {
      id: "wardrobe",
      label: "Wardrobe",
      x: 1360,
      y: 810,
      path: "/profile",
      pin: { x: 1395, y: 215 },
    },
    {
      id: "campus",
      label: "Campus door",
      x: 770,
      y: 985,
      path: "/campus",
      arrowY: 925,
      pin: { x: 770, y: 980 },
    },
    {
      id: "panthy",
      label: "Talk to Panthy",
      x: 1035,
      y: 600,
      arrowY: 410,
      pin: { x: 1035, y: 440 },
      dialog: {
        title: "Panthy’s welcome",
        message:
          "Welcome home! Your desk leads to your courses, the wardrobe opens your character, and the door takes you to campus.",
      },
    },
  ],
};
