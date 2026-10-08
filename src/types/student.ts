export type Course = {
  id: string;
  title: string;
  subject: string;
  description: string;
  area: string;
  accent: string;
  symbol: string;
  topics: string[];
};
export type StudentProfile = {
  user_id: string;
  first_name: string;
  last_name: string;
  study_field: string;
  institution: string;
  goals: string[];
  avatar_id: string;
  selected_courses: string[];
  onboarding_completed_at: string | null;
  reduced_motion: boolean;
};
export const emptyProfile = (userId: string): StudentProfile => ({
  user_id: userId,
  first_name: "",
  last_name: "",
  study_field: "",
  institution: "",
  goals: [],
  avatar_id: "fern",
  selected_courses: [],
  onboarding_completed_at: null,
  reduced_motion: false,
});
