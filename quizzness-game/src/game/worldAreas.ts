import { openFloor, type Area, type Destination } from "./area";
import { campusArea } from "./campus";
import { roomArea } from "./room";

// The connected slice beyond campus: Logic District → COMP-101 lobby → Variables.
// Walls and spots fit the temporary pictures; refit them when final art arrives.
const FLOOR = { x: 0, y: 470, width: 1536, height: 530 };
const scale = (y: number) =>
  1.75 + Math.max(0, Math.min(1, (y - FLOOR.y) / FLOOR.height)) * 0.7;
const later = (id: string, label: string, x: number, message: string): Destination => ({
  id,
  label,
  x,
  y: 500,
  arrowY: 250,
  pin: { x, y: 225 },
  dialog: { title: label, message },
});
const building = (x: number) => ({ x: x - 170, y: 440, width: 340, height: 50 });
const art = (name: string) => ({
  art: `/brand/optimized/areas/${name}.webp`,
  thumb: `/brand/optimized/areas/${name}-thumb.webp`,
  temporaryArt: true,
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
    "comp-101-lobby": { x: 430, y: 560 },
  },
  speed: 260,
  depthSpeed: 0.75,
  reach: 110,
  canStand: openFloor(FLOOR, [building(430), building(1106)], 30),
  characterScale: scale,
  showPins: true,
  guides: [{ avatar: "glasses", x: 768, y: 640 }],
  destinations: [
    {
      id: "comp-101",
      label: "QZ-COMP 101 building",
      x: 430,
      y: 515,
      path: "/explore/comp-101-lobby",
      arrowY: 250,
      pin: { x: 430, y: 225 },
    },
    later(
      "comp-102",
      "QZ-COMP 102 building",
      1106,
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
    "variables-topic": { x: 300, y: 560 },
  },
  speed: 240,
  depthSpeed: 0.75,
  reach: 110,
  canStand: openFloor(FLOOR, [building(300), building(768), building(1236)], 30),
  characterScale: scale,
  showPins: true,
  panthy: { x: 1130, y: 700, width: 112, height: 107 },
  destinations: [
    {
      id: "variables",
      label: "Variables and values",
      x: 300,
      y: 515,
      path: "/explore/variables-topic",
      arrowY: 250,
      pin: { x: 300, y: 225 },
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
      1236,
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
  canStand: openFloor(FLOOR, [building(430), building(1106)], 30),
  characterScale: scale,
  showPins: true,
  guides: [{ avatar: "books", x: 768, y: 620 }],
  missionPath: ["variables-values-types", "changing-values"],
  destinations: [
    {
      id: "mission-1",
      label: "Mission: Variables",
      x: 430,
      y: 515,
      arrowY: 250,
      pin: { x: 430, y: 225 },
      dialog: { title: "Mission preview", missionId: "variables-values-types" },
    },
    {
      id: "mission-2",
      label: "Locked: Changing values",
      x: 1106,
      y: 515,
      arrowY: 250,
      pin: { x: 1106, y: 225 },
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
