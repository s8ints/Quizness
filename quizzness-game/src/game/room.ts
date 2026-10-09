export type Point = { x: number; y: number };
export type Rect = Point & { width: number; height: number };
export type Destination = Point & { id: string; label: string; path: string };
export const room = {
  width: 640,
  height: 400,
  bounds: { x: 32, y: 112, width: 576, height: 272 },
  spawn: { x: 320, y: 280 },
  furniture: [
    { x: 52, y: 118, width: 118, height: 56 },
    { x: 52, y: 216, width: 128, height: 68 },
    { x: 500, y: 148, width: 82, height: 144 },
    { x: 492, y: 112, width: 98, height: 32 },
    { x: 220, y: 120, width: 34, height: 32 },
  ] satisfies Rect[],
  destinations: [
    { id: "desk", label: "Study desk", x: 126, y: 304, path: "/courses" },
    { id: "books", label: "Bookshelf", x: 112, y: 196, path: "/courses" },
    { id: "wardrobe", label: "Wardrobe", x: 468, y: 132, path: "/profile" },
    { id: "campus", label: "Campus door", x: 320, y: 365, path: "/campus" },
    { id: "panthy", label: "Talk to Panthy", x: 255, y: 176, path: "" },
  ] satisfies Destination[],
};
const radius = 8;
function open(p: Point) {
  const b = room.bounds;
  return (
    p.x >= b.x + radius &&
    p.x <= b.x + b.width - radius &&
    p.y >= b.y + radius &&
    p.y <= b.y + b.height - radius &&
    !room.furniture.some(
      (r) =>
        p.x + radius > r.x &&
        p.x - radius < r.x + r.width &&
        p.y + radius > r.y &&
        p.y - radius < r.y + r.height,
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
    120 * Math.max(0, Math.min(deltaSeconds, 0.05)) * Math.min(1, length);
  const dx = (input.x / length) * distance,
    dy = (input.y / length) * distance;
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
export function nearDestination(position: Point): Destination | undefined {
  return room.destinations.find(
    (d) => Math.hypot(position.x - d.x, position.y - d.y) <= 34,
  );
}
