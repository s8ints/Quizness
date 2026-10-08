import type { Course } from "../types/student";
export const courses: Course[] = [
  {
    id: "mathematics",
    title: "A little logic. A lot of possibility.",
    subject: "Mathematics",
    description: "Find the patterns hiding in everyday problems.",
    area: "Pattern Valley",
    accent: "lime",
    symbol: "∑",
    topics: [
      "Patterns & relationships",
      "Algebra foundations",
      "Applied reasoning",
    ],
  },
  {
    id: "business",
    title: "Big ideas start with small decisions.",
    subject: "Business & Management",
    description: "Explore the decisions that make organisations work.",
    area: "Enterprise Quarter",
    accent: "peach",
    symbol: "↗",
    topics: ["Decision making", "Markets & value", "Leading people"],
  },
  {
    id: "biology",
    title: "Meet the world inside your world.",
    subject: "Biology",
    description: "Connect structures, processes, and living systems.",
    area: "Living Grove",
    accent: "blue",
    symbol: "✳",
    topics: [
      "Cells & structures",
      "Biological processes",
      "Systems & connections",
    ],
  },
  {
    id: "computing",
    title: "Turn curiosity into working ideas.",
    subject: "Computer Science",
    description: "Practise the thinking behind programs and algorithms.",
    area: "Logic District",
    accent: "purple",
    symbol: "{ }",
    topics: [
      "Programming fundamentals",
      "Conditions & loops",
      "Problem solving",
    ],
  },
];
export const getCourse = (id: string) =>
  courses.find((course) => course.id === id);
export const learningGoals = [
  "Understand difficult concepts",
  "Prepare for tests",
  "Practise regularly",
  "Track my progress",
  "Enjoy studying more",
];
