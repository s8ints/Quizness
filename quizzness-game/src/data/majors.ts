import type { Major } from "../types/content";
import { campus, getWorld } from "./worlds";
export const majors: Major[] = [
  { id: "computer-science", label: "Computer Science", worldId: "computing" },
  { id: "mathematics", label: "Mathematics", worldId: "mathematics" },
  { id: "business", label: "Business & Management", worldId: "business" },
  { id: "accounting", label: "Accounting", worldId: "business" },
  { id: "biology", label: "Biology", worldId: "biology" },
  { id: "chemistry", label: "Chemistry", worldId: "biology" },
  { id: "psychology", label: "Psychology", worldId: "psychology" },
  { id: "law", label: "Law", worldId: "law" },
  { id: "history", label: "History", worldId: "humanities" },
  { id: "languages", label: "Languages", worldId: "humanities" },
  { id: "other", label: "Other", worldId: campus.id },
];
export const getMajor = (id: string) => majors.find((major) => major.id === id);
// Returns the student's home world, or undefined when their home is the campus.
export const homeWorldFor = (majorId: string) =>
  getWorld(getMajor(majorId)?.worldId ?? campus.id);
export const yearOptions = [
  "Year 1",
  "Year 2",
  "Year 3",
  "Year 4+",
  "Postgraduate",
];
