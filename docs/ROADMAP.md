# Roadmap — current student-first sequence

## Latest binding sequence — 2026-10-08

1. **Phase 1: original identity + student foundation.** Import and preserve logo/mascot/student assets; extract exact palette; document original typography/button/card treatment; create tokens and reusable Panthy states; build landing, signup/login, onboarding, guild/player hub, course presentation, profile/settings; connect Supabase; verify responsive/accessibility and real account/data isolation. Mascot integration is required from the first screen. Missing expression/logo/font assets are tracked, never invented as approved originals.
2. **Phase 2: course worlds, maps, missions and subject-agnostic ActivityRenderer.** Verify non-programming content through the shared engine.
3. **Phase 3: bosses, connected XP and progression.** Replace labelled fixtures with earned/saved outcomes.
4. **Phase 4: adaptive mastery and weak-area review.** Recommendations follow actual evidence.
5. **Phase 5: more subjects and reviewed content systems.**
6. **Phase 6: tutoring, social and community.** Tutor screening and give-back recognition must be implemented/verified before claims are made.

This sequence supersedes the earlier breakdown preserved below. Vite/React Router and Supabase were selected; implementation exists, live Supabase setup remains pending.

## Earlier detailed roadmap — preserved history

All phases use subject-agnostic courses, topics, missions, activities, checkpoints, bosses, rewards, and progression. Phase 1 fixtures should demonstrate multiple disciplines. Phase 2 uses ActivityRenderer and verifies at least one non-programming authored activity through the shared mission/progress contracts. This does not require building every activity type or subject library at once.

## Phase 1 — Product foundation

Build the student-facing application: landing/welcome, signup, login and established authentication, onboarding, player hub, courses/overview, profile/avatar presentation, settings, navigation, and a responsive shell. Learning progress and XP may use clearly labelled fixtures. No mission engine or bosses yet.

Before integration, decide build tooling/application framework, authentication provider, and database/persistence provider. React + TypeScript + Tailwind/custom CSS remains selected; Phaser remains the later game rendering tool. Vite is still a proposal. Do not silently choose Next.js or a backend vendor.

Build incrementally: (1) resolve and record architecture decisions; (2) scaffold shell/routes/tokens; (3) integrate auth/session handling and user-owned profile storage; (4) implement onboarding; (5) build the player hub using a labelled preview-data adapter; (6) add course list/overview and useful empty states; (7) add profile/settings/logout; (8) verify the full account journey and responsive/accessibility/error states.

Completion: Visit → Create account → Login → Onboarding → Dashboard → Courses → Course overview/learning preview → Profile/settings → Logout. Verify private-route access, user-data isolation, reload/session expiry, incomplete onboarding, failed saves, unknown courses, keyboard use, and narrow screens. Real authentication is required; a simulated login is only an internal prototype checkpoint.

## Phase 2 — Gameplay vertical slice

Course map, missions, question renderer (multiple choice plus code choice), feedback/explanations, earned XP, mission results, boss encounters, and unlock progression. Preserve data-driven content and accessible interaction. BOSS_SYSTEM.md and QUESTION_SYSTEM.md guide this phase.

## Phase 3 — Connected progression

Replace dashboard learning fixtures with actual saved game outcomes. Dashboard, course map, XP/levels, completed bosses, and concept evidence use the same user-owned progress source. Resolve persistence/merge rules before connecting the local demo to account-backed saves; never silently assign mock XP to a user.

## Phase 4 — Adaptive learning

Designed concept mastery, weak-area recommendations, question/difficulty selection, targeted practice, mistake review, and spaced review. Basic explanations and concept evidence still belong in Phase 2; deeper adaptive behavior starts here.

## Phase 5 — Content and platform

Additional courses, content creation/imports, reviewed AI assistance, richer analytics and activity types, larger game worlds. Each requires a separate scoped request.

## Phase 6 — Tutoring and community

Tutor profiles/matching, requests, volunteer hours, optional paid sessions, study groups, and social challenges. Payments and institutional administration remain outside Phase 1.

# Earlier documentation — superseded where conflicting

The current scope above and DECISIONS.md take precedence. Old Phase 1 references describe the former gameplay-first plan.

# Roadmap — current expanded Phase 1

The latest Game Design Document supersedes the earlier session-only milestone. Goal: Course → Map → Missions → Questions → XP → Boss → Results → Saved Progress. Documentation is complete enough to guide implementation; there is still no playable application.

Implement as small working steps:

1. Scaffold React/TypeScript/Tailwind with proposed Vite tooling, shared tokens, and a typed app shell; explain dependencies first.
2. Author and validate one generic sample course/topic, map nodes, missions, questions, and boss.
3. Build accessible shared controls and course selection.
4. Build a small map with labelled availability/prerequisites and mission previews.
5. Complete one mission end to end with multiple choice, explanations, progress, and results.
6. Add code-output/code-choice rendering and verify both interaction types.
7. Add explicit reward rules, derived level, concept evidence, and mistake review.
8. Add the remaining mission path, mini challenge, and unlock progression.
9. Add Loopkeeper phases, HP, damage, feedback, victory/recovery, and retries using the shared question engine.
10. Save completed results in validated localStorage with idempotent rewards and visible failure recovery.
11. Integrate one avatar and boss presentation with Phaser; use CSS for interface motion and honest placeholders where needed.
12. Verify the whole journey, narrow-screen layout, keyboard use, reduced motion, storage errors, and refresh behavior.

Use the completed-session flow as the first internal checkpoint, not the whole Phase 1 deliverable. Do not build all steps in one change.

## Definition of done

A learner can choose a course, see the map, play missions with both question presentations, receive explanations, earn XP, review mistakes, unlock the next node, encounter and defeat the boss, retry after recovery, see concept evidence, and refresh while retaining completed progress. One avatar reacts to gameplay. No lockout follows mistakes.

Checks include unanswered/duplicate submission, XP totals and thresholds, prerequisite rules, attainable boss damage, zero-HP clamping, all-wrong recovery, retry resets, first-clear bonuses once, completed-result idempotency, malformed saves, blocked storage, and no false claim of mastery. Refresh during an unfinished session returns to the map without preserving that pending session.

Accounts, database, payments, tutoring, social/leaderboards, AI generation, institution integrations, multiplayer, and native apps are excluded. Later phases remain directional possibilities in the source notes, not authorised implementation work.

# Historical notes — superseded where conflicting

The current summary above and DECISIONS.md take precedence. Earlier proposals are retained for traceability.

# Roadmap

## Phase 1: one complete playable session

The vision and scope come from PROJECT_CONTEXT.md. The sample content, six-question length, true/false interaction, and XP formula in these documents are proposed defaults.

Implement in small, reviewable steps:

1. Inspect the repository and scaffold TypeScript + React + Tailwind CSS. Explain the build tooling choice before editing. Use CSS for interface motion and Phaser for character/game animation; do not add another animation library. There is no existing app to preserve here.
2. Add data-driven course, topic, concept, and question content. Check IDs and answer definitions.
3. Build course/topic selection and a reusable session controller.
4. Add multiple-choice and true/false rendering, selection, and submission.
5. Add feedback, explanations, progress, and session XP. Prevent duplicate scoring.
6. Add results with concept evidence, a transparent practice recommendation, and replay.
7. Verify the complete interaction on desktop, narrow screens, and with keyboard controls.

Integrate Phaser when introducing the first character or game scene. Keep scoring and concept tracking in shared TypeScript logic, with accessible question controls in React. Inspect separately supplied real-product assets first; animated characters need authored sprite frames. Missing sprite sheets should not block building the learning-session flow. Campus exploration and minigames remain later work.

## Acceptance checks

- A learner can select the sample course/topic and finish all six questions.
- Both interaction types work; an unanswered question cannot be submitted.
- Submission scores once and keeps feedback visible until Continue.
- Correct and incorrect answers both receive a useful explanation.
- Session totals and concept counts match the recorded answers.
- The final question leads to results, with a recommendation based on actual performance.
- Replay clears the prior session's answers and XP.
- Refresh behavior matches the documented temporary-state limitation.
- Controls work with a keyboard, focus remains visible, and feedback is understandable without colour.
- Question content is separate from UI logic and supports additional course IDs.

## Later milestones

The expanded notes propose the following sequence after Phase 1. These are future scopes, not authorisation to implement every feature or committed delivery dates:

2. Better game experience: avatar presence, feedback animation, optional muted sound, progress visuals, replay variation, and weak-concept reinforcement.
3. Persistence: accounts, saved progress/XP, enrollment, and settings.
4. Adaptive learning: designed mastery rules, difficulty adjustment, review scheduling, and recommendations.
5. Content platform: expanded courses, authoring, review, lecturer tools, and study imports.
6. Community and tutoring: help requests, tutor matching, availability, and volunteer-hour tracking; paid tutoring requires a separate request.
7. Institutional product: licensing, privacy-aware analytics, integrations, and single sign-on.

Authored sample content is still necessary in Phase 1; these later content tools should not delay it. Reinforcement can use transparent local rules before persistent, longitudinal adaptation exists.


## Supplied product notes

The following source sections preserve the expanded user-supplied vision. Possible features, schemas, numbers, and implementation examples remain proposals unless confirmed in DECISIONS.md. Source numbering is retained for traceability.

# 130. Admin Tools

Future internal tools may be needed for:

content moderation

course management

user support

question review

tutor verification

analytics

Do not build admin dashboards before there is a real operational need.

---

# 140. Current Development Stage

Quizzness is currently in early product development.

The goal is NOT production scale yet.

Current focus:

prove the core experience.

The most important questions are:

Is the learning loop enjoyable?

Is the interface clear?

Does feedback help?

Does progression feel rewarding?

Can content be added easily?

Do students want to continue?

---

# 141. Recommended Development Phases

## Phase 1 — Playable Core

Build:

basic application shell

course selection

topic selection

lesson session

multiple-choice questions

second question type

feedback

explanations

progress bar

XP

results screen

sample content

local/mock data

No backend required initially.

---

## Phase 2 — Better Game Experience

Add:

avatar presence

animations

sound effects

achievements

improved progress visuals

lesson map

better transitions

replay variation

weak-concept reinforcement

---

## Phase 3 — Persistence

Add:

user accounts

database

saved progress

saved XP

course enrollment

achievements

settings

---

## Phase 4 — Adaptive Learning

Add:

concept mastery

question selection rules

difficulty adjustment

review scheduling

personal recommendations

weak-area practice

---

## Phase 5 — Content Platform

Add:

more courses

content authoring

question management

lecturer tools

content review

study-material imports

---

## Phase 6 — Community and Tutoring

Add:

tutor profiles

help requests

student/tutor matching

availability

volunteer-hour tracking

optional paid tutoring

---

## Phase 7 — Institutional Product

Potential:

university licensing

institution dashboards

class integrations

analytics

single sign-on

course synchronization

---

# 142. MVP Success Criteria

The first real Quizzness MVP succeeds if a student can:

open the application

choose a course

choose a topic

complete an interactive learning session

understand why answers are correct or incorrect

earn visible progress

finish the session

see what they did well

see what needs improvement

want to play another session

The MVP does NOT require every long-term feature.

---


