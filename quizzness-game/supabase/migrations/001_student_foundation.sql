-- Run only in the selected Quizzness development project.
create table public.student_profiles (
  user_id uuid primary key references auth.users(id) on delete cascade,
  first_name text not null check (char_length(trim(first_name)) between 1 and 80),
  last_name text not null default '' check (char_length(last_name) <= 80),
  study_field text not null default '' check (char_length(study_field) <= 120),
  institution text not null default '' check (char_length(institution) <= 160),
  goals text[] not null default '{}',
  avatar_id text not null default 'fern' check (avatar_id in ('fern','sun','sky')),
  selected_courses text[] not null default '{}' check (selected_courses <@ array['mathematics','business','biology','computing']::text[]),
  onboarding_completed_at timestamptz,
  reduced_motion boolean not null default false
);
alter table public.student_profiles enable row level security;
revoke all on public.student_profiles from anon;
grant select, insert, update, delete on public.student_profiles to authenticated;
create policy "Students read own profile" on public.student_profiles for select to authenticated using ((select auth.uid()) = user_id);
create policy "Students create own profile" on public.student_profiles for insert to authenticated with check ((select auth.uid()) = user_id);
create policy "Students update own profile" on public.student_profiles for update to authenticated using ((select auth.uid()) = user_id) with check ((select auth.uid()) = user_id);
create policy "Students delete own profile" on public.student_profiles for delete to authenticated using ((select auth.uid()) = user_id);
-- No file binaries, passwords, mock XP, or game tables. Fixed avatars ship with the app.
