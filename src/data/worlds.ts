import type { World } from "../types/content";
// Mindscape Gardens, Justice Quarter and Story Harbour are provisional names.
export const worlds: World[] = [
  {
    id: "mathematics",
    name: "Pattern Valley",
    subject: "Mathematics",
    description: "Find the patterns hiding in everyday problems.",
    accent: "lime",
    symbol: "∑",
  },
  {
    id: "business",
    name: "Enterprise Quarter",
    subject: "Business & Management",
    description: "Explore the decisions that make organisations work.",
    accent: "peach",
    symbol: "↗",
  },
  {
    id: "biology",
    name: "Living Grove",
    subject: "Life sciences",
    description: "Connect structures, processes, and living systems.",
    accent: "blue",
    symbol: "✳",
  },
  {
    id: "computing",
    name: "Logic District",
    subject: "Computer Science",
    description: "Practise the thinking behind programs and algorithms.",
    accent: "purple",
    symbol: "{ }",
  },
  {
    id: "psychology",
    name: "Mindscape Gardens",
    subject: "Psychology",
    description: "Explore how people think, feel, and behave.",
    accent: "lime",
    symbol: "◎",
  },
  {
    id: "law",
    name: "Justice Quarter",
    subject: "Law",
    description: "Weigh arguments, rules, and the reasoning behind them.",
    accent: "peach",
    symbol: "§",
  },
  {
    id: "humanities",
    name: "Story Harbour",
    subject: "History & Languages",
    description: "Trace the stories, voices, and ideas that shape us.",
    accent: "blue",
    symbol: "✎",
  },
];
// The shared school hub every student can visit; home for majors without a world yet.
export const campus = {
  id: "campus",
  name: "Quizzness Campus",
};
export const getWorld = (id: string) => worlds.find((world) => world.id === id);
