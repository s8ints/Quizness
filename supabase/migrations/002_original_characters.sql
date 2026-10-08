-- Keep existing profile IDs and allow the remaining supplied character concepts.
alter table public.student_profiles drop constraint student_profiles_avatar_id_check;
alter table public.student_profiles add constraint student_profiles_avatar_id_check
  check (avatar_id in ('fern', 'sun', 'sky', 'headphones', 'books', 'glasses'));
