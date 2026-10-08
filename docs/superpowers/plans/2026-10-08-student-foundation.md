# Student Foundation Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans for inline execution, or superpowers:subagent-driven-development if the user selects delegation. Steps use checkbox syntax for tracking.

**Goal:** Build the Phase 1 student foundation with a running preview checkpoint, real Supabase accounts, onboarding, player hub, courses, and profile/settings.

**Architecture:** React routes and focused student screens consume typed profile/course/progress services. Supabase Auth owns sessions, Postgres owns user records, and fixtures clearly identify sample learning data. Fixed artwork ships with the app; no gameplay engine or R2 integration yet.

**Tech Stack:** Proposed Vite, React, TypeScript, Tailwind/custom CSS, React Router; selected Supabase Auth/Postgres. Vitest/Testing Library for meaningful behavior and Playwright for browser journeys. Phaser remains reserved for gameplay.

**Spec:** ../../PHASE_1_IMPLEMENTATION_SPEC.md

## Global constraints

- Work only in quizzness-game; preserve the school repository.
- Subject-agnostic tertiary education; sample courses cover multiple disciplines.
- No mission/boss engines, XP earning, adaptive systems, AI, tutoring, payments, or R2 uploads in this phase.
- Label fixture progress, preview identities, and unconfigured authentication honestly.
- Never store passwords or file binaries in profile tables; server-side ownership rules enforce private data access.
- Profile pictures use Supabase Storage if implemented; built-in avatars require no upload service.
- Do not provision paid services or publish the app as part of this local build.

## Review focus

- Deep links/unknown course IDs must yield useful routes, not blank screens.
- Session loading/expiry and incomplete onboarding must not expose another user's data.
- Preview edits and fixture XP must never enter real earned-progress records.
- Storage/profile failures must not display a false saved-success message.
- Narrow screens, keyboard focus, and reduced motion must retain the complete journey.

### Task 1: Routable foundation and labelled preview

**Files:** package.json, index.html, vite.config.ts, tsconfig files; src/app/App.tsx, src/main.tsx, src/styles/globals.css, src/components/AppShell.tsx; src/data/courses.ts, src/types/student.ts; src/screens/Landing.tsx, PreviewHub.tsx, CourseOverview.tsx; src/app/App.test.tsx.

**Interfaces:** Course { id, title, subject, description }; App(): ReactElement; getCourse(courseId: string): Course | undefined. Preview routes live under /preview; real student routes remain reserved.

- [ ] Configure minimal build/typecheck/dev scripts and meaningful component-test infrastructure. Explain dependencies before installing.
- [ ] Write failing route tests: unknown course shows recovery; Biology and Mathematics appear alongside computing; preview entry exposes the sample-data notice.
- [ ] Run `npm run test -- src/app/App.test.tsx`; verify the assertions fail before implementation.
- [ ] Implement shell, palette/tokens, landing, course cards, preview navigation and course learning-coming-soon state. No login simulation.
- [ ] Run that test and `npm run build`; verify success. Check 390px and desktop layout plus keyboard navigation before grouping this change for review.

### Task 2: Supabase identity and protected routing

**Files:** src/auth/client.ts, AuthProvider.tsx, RequireStudent.tsx; src/screens/Login.tsx, Signup.tsx, AuthCallback.tsx, Recovery.tsx; .env.example; src/auth/RequireStudent.test.tsx.

**Interfaces:** Auth state is loading, signed-out, or signed-in with userId/email; RequireStudent renders children only for an authenticated user. Configuration uses the project URL and public publishable client key, never an administrative key.

- [ ] Write failing tests for loading state, signed-out redirects, failed login, and expired-session handling.
- [ ] Run the targeted tests and confirm failure.
- [ ] Integrate established Supabase SDK session/signup/login/logout/recovery, configured redirects, and explicit unconfigured state. Do not silently switch to preview auth.
- [ ] Run targeted tests; with a configured development project verify real login/logout and confirmation/recovery callbacks. If project configuration is absent, report live verification as pending.

### Task 3: User-owned profile, onboarding, and course selections

**Files:** supabase/migrations/001_student_foundation.sql; src/services/profile.ts; src/features/onboarding/Onboarding.tsx; src/services/profile.test.ts; database ownership test script.

**Interfaces:** StudentProfile { userId, firstName, lastName, studyField, institution?, goals, avatarId, onboardingCompletedAt? }; loadProfile(userId): Promise<StudentProfile | null>; saveProfile(profile): Promise<StudentProfile>. Selected courses reference stable course IDs and user ownership.

- [ ] Write failing tests for independent learning, incomplete-onboarding redirects, failed saves, and invalid selections.
- [ ] Run targeted tests and confirm failure.
- [ ] Define minimal profile/selection schema with owner-only policies; implement four-step onboarding and saved/error states. No game tables.
- [ ] Run tests and verify owner access while another authenticated user and anonymous access are rejected by database rules. Apply migrations only to the selected development project, never an assumed existing database.

### Task 4: Student player hub and course journey

**Files:** src/features/dashboard/Dashboard.tsx; src/features/courses/Courses.tsx, CourseOverview.tsx; src/services/progress.ts; dashboard/course tests.

**Interfaces:** LearningPreview { source: 'fixture', xp, level, courseProgress }; progress fixtures remain separate from account data. Use Task 1 Course and Task 3 profile/selection contracts.

- [ ] Write failing tests for no selected courses, unknown course recovery, sample-progress notice, and Continue opening the course preview.
- [ ] Confirm tests fail; implement Continue Journey hierarchy, subjects/worlds, empty states and preview goal/progress displays.
- [ ] Run tests and verify new real accounts are not credited fixture XP or completed missions.

### Task 5: Profile/settings and asset boundaries

**Files:** src/features/profile/Profile.tsx; src/features/settings/Settings.tsx; src/assets/avatar placeholders; profile/settings tests.

**Interfaces:** Use saveProfile/loadProfile; selected avatarId references shipped artwork. Initial settings cover only implemented preferences. AuthProvider supplies logout and clears per-user caches.

- [ ] Write failing tests for saving error, avatar selection, logout/cache clearing, and reduced-motion preference.
- [ ] Confirm tests fail; implement profile/settings with built-in placeholder avatars and honest save states.
- [ ] Run tests. Profile-photo upload is optional follow-up, using Supabase Storage with owner policies/type/size checks; no binaries in Postgres and no R2 bucket now.

### Task 6: Complete flow and developer handoff

**Files:** playwright.config.ts; tests/e2e/student-foundation.spec.ts; README.md; current architecture/decision status.

- [ ] Write browser assertions for landing → account entry → onboarding → hub → course → profile/settings → logout. Use dedicated test identities in a configured development environment; never production credentials.
- [ ] Verify refresh/deep-link behavior, session expiry, account-switch cache isolation, empty state, storage/network error, keyboard flow, narrow viewport, and reduced motion.
- [ ] Run `npm run test`, `npm run build`, and `npm run test:e2e`; inspect failures and browser console. Distinguish mocked automation from real provider/database checks.
- [ ] Document local start commands, environment names, migration/setup steps, verified checks, and remaining limitations. Report complete Phase 1 only when real auth/profile ownership and the end-to-end journey are verified.

## Execution handoff

Review the plan before scaffolding. Recommended execution: inline in this chat because the tasks share the same route/profile/auth contracts and the user asked to start here. Delegation is optional only if selected by the user. Missing Supabase configuration does not prevent Task 1, but it prevents claiming live-auth verification. Review/group changes per task; do not commit unrelated initial documentation automatically.
