-- Course and character IDs are content, validated in src/services/profile.ts.
-- Dropping these lists means new courses/characters never need a schema change.
-- Text-length checks, row-level security and owner-only policies are unchanged.
alter table public.student_profiles drop constraint if exists student_profiles_avatar_id_check;
alter table public.student_profiles drop constraint if exists student_profiles_selected_courses_check;
