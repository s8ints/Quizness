import { inPolygon, type Area } from "./area";
// The shared campus, walkable on the paved paths of public/brand/quizzness-campus.png.
// Each line is one stretch of path, as [x, y] corners on the artwork.
export const campusPaths: number[][][] = [
  [[758, 936], [918, 936], [888, 790], [888, 700], [786, 700], [786, 790]], // south steps
  [[560, 690], [1110, 690], [1110, 708], [560, 708]], // below the fountain
  [[712, 632], [960, 632], [960, 700], [712, 700]], // fountain front, between the benches
  [[600, 448], [640, 448], [628, 600], [600, 620], [590, 695], [570, 695], [575, 610]], // left of the fountain
  [[1042, 448], [1078, 448], [1078, 600], [1110, 640], [1110, 700], [1085, 700], [1088, 620], [1042, 600]], // right of the fountain
  [[600, 450], [1078, 450], [1078, 476], [600, 476]], // above the fountain
  [[782, 340], [888, 340], [888, 460], [782, 460]], // up to the Main Hall
  [[415, 305], [455, 305], [520, 355], [575, 405], [640, 450], [605, 470], [550, 415], [480, 380]], // towards the cottage
  [[232, 425], [300, 415], [305, 440], [400, 440], [410, 462], [240, 464]], // cottage yard
  [[375, 455], [418, 455], [418, 492], [330, 540], [215, 548], [170, 560], [110, 612], [0, 612], [0, 582], [110, 572], [150, 530], [215, 520], [330, 512]], // west path, from the cottage steps
  [[84, 586], [165, 600], [300, 630], [500, 660], [600, 655], [600, 695], [500, 684], [380, 672], [260, 652], [150, 626], [84, 618]], // south-west path
  [[1040, 470], [1110, 425], [1170, 392], [1205, 392], [1215, 470], [1195, 470], [1190, 428], [1130, 445], [1060, 486]], // north-east path
  [[1195, 462], [1215, 462], [1330, 520], [1420, 528], [1420, 565], [1330, 552], [1205, 500]], // along the plaza wall
  [[1418, 488], [1486, 488], [1505, 548], [1418, 548]], // plaza steps
  [[1265, 412], [1320, 392], [1420, 380], [1495, 395], [1525, 420], [1530, 452], [1488, 456], [1486, 492], [1418, 492], [1418, 462], [1348, 438], [1265, 436]], // paw plaza
];
export const campusArea: Area = {
  id: "campus",
  art: "/brand/quizzness-campus.png",
  width: 1672,
  height: 941,
  spawn: { x: 836, y: 790 },
  speed: 150,
  depthSpeed: 0.8,
  reach: 80,
  canStand: (p) => campusPaths.some((path) => inPolygon(p, path)),
  // Smaller further away, up towards the Main Hall.
  characterScale: (y) => 0.5 + (Math.max(300, Math.min(940, y)) - 300) * 0.00056,
  smoothSprites: true,
  showPins: true,
  panthy: { x: 735, y: 672, width: 58, height: 55 },
  destinations: [
    {
      id: "hall",
      label: "Main Hall",
      x: 836,
      y: 372,
      path: "/courses",
      arrowY: 250,
      pin: { x: 836, y: 240 },
    },
    {
      id: "fountain",
      label: "Panther fountain",
      x: 836,
      y: 668,
      arrowY: 590,
      pin: { x: 836, y: 400 },
      dialog: {
        title: "Panthy at the fountain",
        message:
          "This is the heart of campus. The Main Hall leads to your courses, and the south steps take you home.",
      },
    },
    {
      id: "market",
      label: "Market cottage",
      x: 300,
      y: 452,
      arrowY: 375,
      pin: { x: 215, y: 250 },
      dialog: {
        title: "Market cottage",
        message:
          "The market will open here in a later update. Nothing is for sale yet.",
      },
    },
    {
      id: "plaza",
      label: "Paw plaza",
      x: 1410,
      y: 440,
      arrowY: 340,
      pin: { x: 1410, y: 262 },
      dialog: {
        title: "Paw plaza",
        message:
          "One day classmates will meet here. Meeting other students comes in a later update.",
      },
    },
    {
      id: "home",
      label: "Back to your room",
      x: 836,
      y: 905,
      path: "/room",
      arrowY: 850,
      pin: { x: 700, y: 900 },
    },
  ],
};
