import { supabase } from "../auth/client";
import { courses, learningGoals } from "../data/courses";
import { avatars } from "../components/Avatar";
import type { StudentProfile } from "../types/student";
export function validateProfile(profile: StudentProfile) {
  if (!profile.first_name.trim())
    throw new Error("Please enter your first name.");
  if (
    profile.first_name.length > 80 ||
    profile.last_name.length > 80 ||
    profile.study_field.length > 120 ||
    profile.institution.length > 160
  )
    throw new Error("Please shorten the profile fields.");
  if (profile.goals.some((goal) => !learningGoals.includes(goal)))
    throw new Error("Choose from the listed learning goals.");
  if (
    profile.selected_courses.some(
      (id) => !courses.some((course) => course.id === id),
    )
  )
    throw new Error("Choose an available course.");
  if (!avatars.some((avatar) => avatar.id === profile.avatar_id))
    throw new Error("Choose an available character.");
  return profile;
}
export async function loadProfile(
  userId: string,
): Promise<StudentProfile | null> {
  if (!supabase) throw new Error("Accounts are not connected yet.");
  const { data, error } = await supabase
    .from("student_profiles")
    .select("*")
    .eq("user_id", userId)
    .maybeSingle();
  if (error) throw error;
  return data;
}
export async function saveProfile(
  profile: StudentProfile,
): Promise<StudentProfile> {
  validateProfile(profile);
  if (!supabase) throw new Error("Accounts are not connected yet.");
  const { data, error } = await supabase
    .from("student_profiles")
    .upsert(profile, { onConflict: "user_id" })
    .select()
    .single();
  if (error) throw error;
  return data;
}
