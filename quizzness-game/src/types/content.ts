// Authored learning content. Kept separate from student/profile data.
export type World = {
  id: string;
  name: string;
  subject: string;
  description: string;
  accent: string;
  symbol: string;
};
export type Major = {
  id: string;
  label: string;
  // The student's home world. Majors without one start on the campus.
  worldId: string;
};
export type Topic = { id: string; title: string };
export type Course = {
  id: string;
  code: string;
  title: string;
  worldId: string;
  description: string;
  topics: Topic[];
};
