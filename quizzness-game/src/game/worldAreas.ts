import { openFloor, type Area, type Destination } from "./area";
import { campusArea } from "./campus";
import { roomArea } from "./room";

// The connected slice beyond campus: Logic District → COMP-101 lobby → Variables.
// Feet stay below the final art's back wall. All foreground paving is open.
const FLOOR = { x: 0, y: 525, width: 1536, height: 475 };
const scale = (y: number) =>
  1.75 + Math.max(0, Math.min(1, (y - FLOOR.y) / FLOOR.height)) * 0.7;
const later = (id: string, label: string, x: number, message: string): Destination => ({
  id,
  label,
  x,
  y: 535,
  arrowY: 345,
  pin: { x, y: 320 },
  dialog: { title: label, message },
});
const art = (name: string) => ({
  art: `/brand/optimized/areas/${name}.webp`,
  thumb: `/brand/optimized/areas/${name}-thumb.webp`,
  temporaryArt: false,
});

export const logicDistrictArea: Area = {
  id: "logic-district",
  ...art("logic-district"),
  title: "Logic District",
  eyebrow: "Computer Science region",
  hint: "Find a course building, or follow the path back to campus.",
  width: 1536,
  height: 1024,
  // Far enough from the exit that arriving doesn't trigger it.
  spawn: { x: 768, y: 850 },
  entrances: {
    "comp-101-lobby": { x: 375, y: 600 },
  },
  speed: 260,
  depthSpeed: 0.75,
  reach: 110,
  canStand: openFloor(FLOOR, [], 30),
  characterScale: scale,
  showPins: true,
  guides: [{ avatar: "glasses", x: 768, y: 640 }],
  ambient: {
    clouds: { mask: "/brand/masks/logic-district-sky.png", top: 15, bottom: 160, count: 3, scale: 0.8, speed: 6, alpha: 0.16 },
    sway: { mask: "/brand/masks/logic-district-sway.png", furthest: 1.4 },
    glows: [375, 1225].map(x => ({ x, y: 275, radius: 75, alpha: 0.08 })),
  },
  destinations: [
    {
      id: "comp-101",
      label: "QZ-COMP 101 building",
      x: 375,
      y: 535,
      path: "/explore/comp-101-lobby",
      arrowY: 345,
      pin: { x: 375, y: 320 },
    },
    later(
      "comp-102",
      "QZ-COMP 102 building",
      1225,
      "Data Structures isn't open yet. For now, QZ-COMP 101 is the one playable course.",
    ),
    {
      id: "guide",
      label: "District guide",
      x: 768,
      y: 690,
      arrowY: 440,
      pin: { x: 768, y: 450 },
      dialog: {
        title: "District guide",
        speaker: "Senior student · District guide",
        message:
          "Each building here is its own course. Start with QZ-COMP 101 on the left: it teaches the ideas behind programs, before any particular language.",
      },
    },
    {
      id: "back",
      label: "Back to campus",
      x: 768,
      y: 975,
      path: "/campus",
      arrowY: 945,
      pin: { x: 960, y: 985 },
    },
  ],
};

export const comp101LobbyArea: Area = {
  id: "comp-101-lobby",
  ...art("comp-101-lobby"),
  title: "QZ-COMP 101 lobby",
  eyebrow: "Sample course · Programming Fundamentals",
  hint: "Choose a topic door, or head back out to Logic District.",
  width: 1536,
  height: 1024,
  // Far enough from the exit that arriving doesn't trigger it.
  spawn: { x: 768, y: 850 },
  entrances: {
    "variables-topic": { x: 265, y: 620 },
  },
  speed: 240,
  depthSpeed: 0.75,
  reach: 110,
  canStand: openFloor(FLOOR, [], 30),
  characterScale: scale,
  showPins: true,
  panthy: { x: 1130, y: 700, width: 112, height: 107 },
  ambient: {
    sway: { mask: "/brand/masks/comp-101-lobby-sway.png", furthest: 1.1 },
    glows: [430, 940].map(x => ({ x, y: 235, radius: 90, alpha: 0.13 })),
    dust: { x: 100, y: 100, width: 1300, height: 650 },
  },
  destinations: [
    {
      id: "variables",
      label: "Variables and values",
      x: 265,
      y: 535,
      path: "/explore/variables-topic",
      arrowY: 345,
      pin: { x: 265, y: 320 },
    },
    later(
      "conditions",
      "Conditions and loops",
      768,
      "This topic isn't built yet. Variables and values comes first.",
    ),
    later(
      "problem-solving",
      "Problem solving",
      1270,
      "This topic isn't built yet. Variables and values comes first.",
    ),
    {
      id: "panthy",
      label: "Talk to Panthy",
      x: 1130,
      y: 745,
      arrowY: 560,
      pin: { x: 1130, y: 570 },
      dialog: {
        title: "Panthy in the lobby",
        message:
          "Each door is a topic in this course. Start on the left with variables and values, and I'll be close by.",
      },
    },
    {
      id: "back",
      label: "Back to Logic District",
      x: 768,
      y: 975,
      path: "/explore/logic-district",
      arrowY: 945,
      pin: { x: 980, y: 985 },
    },
  ],
};

export const variablesTopicArea: Area = {
  id: "variables-topic",
  ...art("variables-topic"),
  title: "Variables and values",
  eyebrow: "QZ-COMP 101 · Topic 1",
  hint: "Check the mission boards to see what's coming up.",
  width: 1536,
  height: 1024,
  // Far enough from the exit that arriving doesn't trigger it.
  spawn: { x: 768, y: 850 },
  speed: 240,
  depthSpeed: 0.75,
  reach: 110,
  canStand: openFloor(FLOOR, [], 30),
  characterScale: scale,
  showPins: true,
  guides: [{ avatar: "books", x: 768, y: 620 }],
  ambient: {
    sway: { mask: "/brand/masks/variables-topic-sway.png", furthest: 1.3 },
    glows: [485, 1050].map(x => ({ x, y: 230, radius: 80, alpha: 0.13 })),
  },
  missionPath: ["variables-values-types", "changing-values"],
  destinations: [
    {
      id: "mission-1",
      label: "Mission: Variables",
      x: 265,
      y: 535,
      arrowY: 325,
      pin: { x: 265, y: 300 },
      dialog: { title: "Mission preview", missionId: "variables-values-types" },
    },
    {
      id: "mission-2",
      label: "Locked: Changing values",
      x: 1270,
      y: 535,
      arrowY: 325,
      pin: { x: 1270, y: 300 },
      dialog: { title: "Locked mission", missionId: "changing-values" },
    },
    {
      id: "topic-guide",
      label: "Topic guide",
      x: 768,
      y: 670,
      arrowY: 420,
      pin: { x: 768, y: 430 },
      dialog: {
        title: "Topic guide",
        speaker: "Senior student · Topic guide",
        message:
          "A variable is just a labelled box for a value. The mission boards show what you'll practise here once missions open.",
      },
    },
    {
      id: "back",
      label: "Back to the lobby",
      x: 768,
      y: 975,
      path: "/explore/comp-101-lobby",
      arrowY: 945,
      pin: { x: 960, y: 985 },
    },
  ],
};

// Places that open at /explore/<id>.
export const exploreAreas = [
  logicDistrictArea,
  comp101LobbyArea,
  variablesTopicArea,
];
export const getExploreArea = (id: string) =>
  exploreAreas.find((area) => area.id === id);
// Every connected place, used by tests to check the whole journey.
export const allAreas: Area[] = [roomArea, campusArea, ...exploreAreas];
export const quickTravel = [
  { label: "Your room", path: "/room" },
  { label: "Campus", path: "/campus" },
  { label: "Logic District", path: "/explore/logic-district" },
  { label: "QZ-COMP 101 lobby", path: "/explore/comp-101-lobby" },
  { label: "Variables and values", path: "/explore/variables-topic" },
];
