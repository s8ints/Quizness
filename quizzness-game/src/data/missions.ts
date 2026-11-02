// Mission previews for the first course topic. Demo content, not checked against a
// real course. Playing a mission arrives in Phase 2 Stage 3.
export type MissionPreview = {
  id: string;
  title: string;
  objective: string;
  minutes: string;
  difficulty: string;
  teaser: string;
  learn: string;
  // What must be finished first, and where it is. Empty when nothing is needed.
  prerequisite?: { mission: string; location: string };
};
export const missionPreviews: MissionPreview[] = [
  {
    id: "variables-values-types",
    title: "Variables, values and data types",
    objective:
      "Store information in named variables and tell numbers, text and true/false values apart.",
    minutes: "10–15 minutes",
    difficulty: "Introductory",
    teaser:
      "The campus event starts tomorrow, and the sign-up sheet is a mess. Help sort it out.",
    learn:
      "A variable is a labelled box for a value. Change what's in the box, and the label stays the same.",
  },
  {
    id: "changing-values",
    title: "Changing values",
    objective: "Follow a value step by step as a program updates it.",
    minutes: "10–15 minutes",
    difficulty: "Introductory",
    teaser:
      "The event's ticket counter keeps showing the wrong total. Trace what went wrong.",
    learn:
      "Each line runs in order, so the value a variable holds depends on what ran before it.",
    prerequisite: {
      mission: "Variables, values and data types",
      location: "the Variables mission board",
    },
  },
];
export const getMissionPreview = (id: string) =>
  missionPreviews.find((mission) => mission.id === id);
