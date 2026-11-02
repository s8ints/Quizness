// A walkable place (room, campus, ...). Areas are plain data plus the rules below,
// so new places can be added without touching the game scene or the page.
export type Point = { x: number; y: number };
export type Rect = Point & { width: number; height: number };
export type AreaDialog = {
  title: string;
  message?: string;
  // Someone other than Panthy is talking.
  speaker?: string;
  // Shows a mission preview instead of a message.
  missionId?: string;
};
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
// Background life for an area. Every part is optional.
export type AmbientConfig = {
  clouds?: {
    mask: string;
    top: number;
    bottom: number;
    count: number;
    scale: number;
    speed: number;
    alpha: number;
  };
  water?: { mask: string };
  falls?: { mask: string };
  foam?: (Point & { width: number })[];
  spray?: Point & { radius: number };
  cloudShadows?: number;
  // Milliseconds between leaves.
  leaves?: number;
  birds?: number;
  butterflies?: Point[];
  sunbeams?: number[][][];
  dust?: Rect;
  glows?: (Point & { radius: number; alpha: number })[];
  // Moves the pixels picked out by a sway map; furthest is the most they shift.
  sway?: { mask: string; furthest: number };
};
export type NpcRoute = { points: Point[]; speed: number };
export type Area = {
  id: string;
  title?: string;
  eyebrow?: string;
  hint?: string;
  // Where to arrive when coming from another place, by that place's id.
  entrances?: Record<string, Point>;
  // Characters standing still who a student can talk to.
  guides?: (Point & { avatar: string })[];
  // Mission ids listed in order under the game.
  missionPath?: string[];
  // A stand-in picture until the final art arrives.
  temporaryArt?: boolean;
  art: string;
  // Tiny blurred copy of the art, shown while the real image loads.
  thumb: string;
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
  ambient?: AmbientConfig;
  // Decorative students walking set routes.
  npcs?: NpcRoute[];
};
// An open floor with rectangular walls, for simple indoor and street areas.
export function openFloor(bounds: Rect, walls: Rect[], radius: number) {
  return (p: Point) =>
    p.x >= bounds.x + radius &&
    p.x <= bounds.x + bounds.width - radius &&
    p.y >= bounds.y &&
    p.y <= bounds.y + bounds.height &&
    !walls.some(
      (w) =>
        p.x + radius > w.x &&
        p.x - radius < w.x + w.width &&
        p.y + radius / 2 > w.y &&
        p.y - radius / 2 < w.y + w.height,
    );
}
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
