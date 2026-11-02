// A walkable place (room, campus, ...). Areas are plain data plus the rules below,
// so new places can be added without touching the game scene or the page.
export type Point = { x: number; y: number };
export type Rect = Point & { width: number; height: number };
export type AreaDialog = { title: string; message: string };
export type Destination = Point & {
  id: string;
  label: string;
  // Where it leads. Destinations without a path open their dialog instead.
  path?: string;
  dialog?: AreaDialog;
  // Height of the bouncing arrow. Without it the arrow floats over the student.
  arrowY?: number;
  // Where the clickable pin sits on the map, when the area shows pins.
  pin?: Point;
};
export type Area = {
  id: string;
  art: string;
  width: number;
  height: number;
  spawn: Point;
  // Pixels per second, and how much slower walking "into" the picture is.
  speed: number;
  depthSpeed: number;
  // How close the student must be to use a destination.
  reach: number;
  canStand: (p: Point) => boolean;
  characterScale: (y: number) => number;
  destinations: Destination[];
  panthy?: Point & { width: number; height: number };
  doormat?: Rect;
  // Small sprites look better smoothed than with dropped pixels.
  smoothSprites?: boolean;
  showPins?: boolean;
};
export function inPolygon(p: Point, polygon: number[][]) {
  let inside = false;
  for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
    const [xi, yi] = polygon[i],
      [xj, yj] = polygon[j];
    if (yi > p.y !== yj > p.y && p.x < ((xj - xi) * (p.y - yi)) / (yj - yi) + xi)
      inside = !inside;
  }
  return inside;
}
export function movePlayer(
  area: Area,
  position: Point,
  input: Point,
  deltaSeconds: number,
): Point {
  const length = Math.hypot(input.x, input.y);
  if (!length || !Number.isFinite(length) || !Number.isFinite(deltaSeconds))
    return position;
  const distance =
    area.speed * Math.max(0, Math.min(deltaSeconds, 0.05)) * Math.min(1, length);
  const dx = (input.x / length) * distance,
    dy = (input.y / length) * distance * area.depthSpeed;
  // Small substeps prevent tunnelling; axis separation lets feet slide past obstacles.
  let result = { ...position };
  const steps = Math.max(1, Math.ceil(distance / 2));
  for (let i = 0; i < steps; i++) {
    const horizontal = { x: result.x + dx / steps, y: result.y };
    if (area.canStand(horizontal)) result = horizontal;
    const vertical = { x: result.x, y: result.y + dy / steps };
    if (area.canStand(vertical)) result = vertical;
  }
  return result;
}
// The closest destination within reach, so overlapping ones don't fight.
export function nearDestination(
  area: Area,
  position: Point,
): Destination | undefined {
  let best: Destination | undefined;
  let bestDistance = area.reach;
  for (const d of area.destinations) {
    const distance = Math.hypot(position.x - d.x, position.y - d.y);
    if (distance <= bestDistance) {
      best = d;
      bestDistance = distance;
    }
  }
  return best;
}
