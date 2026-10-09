export type StudentProfile = {
  user_id: string;
  first_name: string;
  last_name: string;
  // Display label for the major; holds the student's own text when major_id is "other".
  study_field: string;
  major_id: string;
  year_of_study: string;
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
  major_id: "",
  year_of_study: "",
  institution: "",
  goals: [],
  avatar_id: "fern",
  selected_courses: [],
  onboarding_completed_at: null,
  reduced_motion: false,
});
