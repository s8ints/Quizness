-- Major sets the student's home world; year of study is optional.
-- IDs are validated in src/services/profile.ts (see migration 003), so only lengths are checked here.
alter table public.student_profiles
  add column major_id text not null default '' check (char_length(major_id) <= 40),
  add column year_of_study text not null default '' check (char_length(year_of_study) <= 20);
