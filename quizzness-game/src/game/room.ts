export type Point = { x: number; y: number };
export type Rect = Point & { width: number; height: number };
export type Destination = Point & { id: string; label: string; path: string };
// All positions are pixels on the room artwork (public/brand/student-room-pixel-v2.png).
// A position means where the character's feet touch the floor.
export const room = {
  width: 1536,
  height: 1024,
  // The floor: from the skirting board down to the front edge of the picture.
  bounds: { x: 0, y: 505, width: 1536, height: 505 },
  spawn: { x: 770, y: 760 },
  // Invisible walls fitted to the furniture in the artwork.
  furniture: [
    { x: 0, y: 480, width: 175, height: 544 }, // desk end and front plant
    { x: 175, y: 480, width: 160, height: 235 }, // desk and chair
    { x: 335, y: 480, width: 165, height: 50 }, // bookshelf base
    { x: 1100, y: 480, width: 110, height: 115 }, // head of the bed
    { x: 1165, y: 590, width: 255, height: 165 }, // foot of the bed
    { x: 1400, y: 480, width: 136, height: 400 }, // wardrobe
    { x: 985, y: 505, width: 100, height: 55 }, // Panthy
  ] satisfies Rect[],
  panthy: { x: 1035, y: 560 },
  destinations: [
    { id: "desk", label: "Study desk", x: 370, y: 650, path: "/courses" },
    { id: "books", label: "Bookshelf", x: 400, y: 565, path: "/courses" },
    { id: "wardrobe", label: "Wardrobe", x: 1360, y: 810, path: "/profile" },
    { id: "campus", label: "Campus door", x: 770, y: 985, path: "/campus" },
    { id: "panthy", label: "Talk to Panthy", x: 1035, y: 600, path: "" },
  ] satisfies Destination[],
};
const radius = 28;
const speed = 280;
// The floor is seen at an angle, so walking "up" the screen covers less of it.
const depthSpeed = 0.72;
const reach = 105;
function open(p: Point) {
  const b = room.bounds;
  return (
    p.x >= b.x + radius &&
    p.x <= b.x + b.width - radius &&
    p.y >= b.y &&
    p.y <= b.y + b.height &&
    !room.furniture.some(
      (r) =>
        p.x + radius > r.x &&
        p.x - radius < r.x + r.width &&
        p.y + radius / 2 > r.y &&
        p.y - radius / 2 < r.y + r.height,
    )
  );
}
export function movePlayer(
  position: Point,
  input: Point,
  deltaSeconds: number,
): Point {
  const length = Math.hypot(input.x, input.y);
  if (!length || !Number.isFinite(length) || !Number.isFinite(deltaSeconds))
    return position;
  const distance =
    speed * Math.max(0, Math.min(deltaSeconds, 0.05)) * Math.min(1, length);
  const dx = (input.x / length) * distance,
    dy = (input.y / length) * distance * depthSpeed;
  // Small substeps prevent tunnelling; axis separation lets feet slide past furniture.
  let result = { ...position };
  const steps = Math.max(1, Math.ceil(distance / 2));
  for (let i = 0; i < steps; i++) {
    const horizontal = { x: result.x + dx / steps, y: result.y };
    if (open(horizontal)) result = horizontal;
    const vertical = { x: result.x, y: result.y + dy / steps };
    if (open(vertical)) result = vertical;
  }
  return result;
}
// The closest object within reach, so overlapping ones don't fight.
export function nearDestination(position: Point): Destination | undefined {
  let best: Destination | undefined;
  let bestDistance = reach;
  for (const d of room.destinations) {
    const distance = Math.hypot(position.x - d.x, position.y - d.y);
    if (distance <= bestDistance) {
      best = d;
      bestDistance = distance;
    }
  }
  return best;
}
// Fake perspective: small by the window, larger near the front of the room.
export function characterScale(y: number) {
  const b = room.bounds;
  const t = Math.max(0, Math.min(1, (y - b.y) / b.height));
  return 2.05 + t * 0.85;
}
