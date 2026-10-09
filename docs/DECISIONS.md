# Decisions log

## 2026-10-08 — Majors set a home world; courses are separate; campus hub

Following the original requirements: a student's major sets their home world, and courses (chosen separately, from any world) are learning paths inside worlds. Related majors share a world (Accounting → Enterprise Quarter; Chemistry → Living Grove, now labelled "Life sciences"; History and Languages → Story Harbour). Three new worlds were added with **provisional** names: Mindscape Gardens (Psychology), Justice Quarter (Law), Story Harbour (History & Languages). "Other" majors start at Quizzness Campus, the shared school hub every student can visit, until their own world exists. The campus page is presentation only; meeting classmates, the market and exploring are later work. Year of study is an optional list. Sample courses use fictional `QZ-` codes. Migration 004 adds `major_id` and `year_of_study` (length checks only). No movement, spawn positions or per-school campuses are implemented.

## 2026-10-08 — Documentation cleanup and app-side content IDs

Outdated "provider unresolved", "no code exists yet" and "Phase 1 = gameplay slice" statements are corrected or marked `> Historical:` in place; no source text is deleted. Current status: Phase 1 is the student foundation built with Vite + React Router + Tailwind/custom CSS; Supabase Auth/Postgres is integrated in code but not live-verified; gameplay is Phase 2 and bosses/connected progression Phase 3.

Course and character IDs are validated in application code (src/services/profile.ts) rather than as hard-coded database CHECK lists. Migration 003 drops those two constraints so adding a course or character never needs a schema change. Text-length checks and row-level security are unchanged. Chosen by the user before any live migration.

## 2026-10-08 — Pixel visual language across the whole interface

The user clarified that the mismatch extends beyond the navigation layout. The latest implementation uses locally bundled Pixelify Sans display/controls, consistent hard-edged pixel frames, the original palette and a dark-green game shell for the room. Labelled top navigation returns in that same visual language, removing duplicate lower shortcuts. A new coarser room environment is saved as student-room-pixel-v2.png; earlier scenery is preserved. Original mascot and characters remain unchanged. This supersedes the prior rounded room-control and Courier fallback treatments. These changes remain a version for the user to assess, not an assertion of final visual approval.

## 2026-10-08 — Personal student room hub

The user rejected the panel-heavy hub and selected a cosy student room as the welcoming dashboard direction. The room is the main scene, with unchanged player/Panthy assets overlaid and labelled keyboard-accessible destinations. Original room scenery is generated to match the existing purple/green/cream world. Course selections, real/preview account separation and progress semantics remain unchanged. Room movement/customisation is not implied by these navigation links. This replaces the previous hub composition, not the original mascot/palette requirements.

## 2026-10-08 — Original identity is mandatory in Phase 1

User supplied the exact palette and original campus/student concepts, and identified ../Quizness/mascot as Panthy's source. Those mascot files alone are imported unchanged; the school project is not modified. Panthy is named per the current brief, while legacy SVG metadata names Rory/tiger. The palette is #7A4E9D, #C9B6E4, #1B4332, #40916C, #EFE6DD. Preserve artwork and student appearance. Logo/font/interface reference and distinct expression drawings are still needed; no new brand assets are approved implicitly. See design/README.md.

Current phases: 1 identity/accounts/onboarding/hub; 2 worlds/maps/missions/activity engine; 3 bosses/connected XP/progression; 4 adaptive mastery/review; 5 subjects/content; 6 tutoring/social. The group proposal is recorded as venture context in VENTURE_PROPOSAL.md. The old HTML school plan is archived as ORIGINAL_REQUIREMENTS_REFERENCE.md, not applied as current product scope.

## 2026-10-08 — Student foundation implementation

The user authorised the implementation plan by asking to continue. Vite, React Router, TypeScript and Tailwind/custom CSS now implement the student frontend. Supabase Auth uses PKCE callbacks; Postgres stores owner-scoped student profiles, preferences and selected course IDs. Preview state lives only in memory and never becomes earned progress. The user requested help creating a development project; organization selection and cost confirmation must precede creation. Live Auth/RLS verification remains pending. No deployment, upload bucket or gameplay engine has been provisioned.

## 2026-10-08 — Selected backend and asset storage

**Confirmed by user:** Supabase Auth + Postgres for identity and structured application data. Supabase Storage for Phase 1 profile pictures if uploads are implemented. Static built-in game artwork ships with the application, versioned in GitHub and served by its host. Vercel is an intended hosting reference, not a deployment created here.

**Later:** Cloudflare R2 for heavy/dynamic uploads, notes, PDFs, and media when that feature is requested. No second database, R2 integration, or general upload platform is needed now. Tables hold asset keys/references and metadata, not file binaries. Only foundation entities are implemented during Phase 1; future game/mastery records remain later work.

## 2026-10-08 — Subject-agnostic learning engine (latest clarification)

**Status:** Explicit user instruction. Quizzness's category is game-based adaptive tertiary education across subjects. Computer Science is an early demo, not the product category. Core hierarchy: Course → Topic/Area → Mission → Interactive Activity → Checkpoint → Boss. Courses, missions, evidence/mastery, rewards, progression, and boss controllers must not require programming.

**Terminology:** ActivityRenderer replaces QuestionRenderer as the general concept. QUESTION_SYSTEM.md retains its existing filename but now describes typed activities and evaluation contracts. Choice/code fields belong only to their relevant variants. The many activity types are architectural extension points, not simultaneous implementation tasks.

**Inspiration:** Codédex (game identity), Boot.dev (structured journey), Coddy (short interactions), Duolingo (feedback/motivation). These are principles supplied by the user, not evidence that Quizzness is a coding product or permission to copy assets, layouts, or mechanics.

**Phase impact:** Phase 1 remains the student platform foundation; gameplay remains Phase 2. Numeric Loopkeeper/reward rules remain limited proposals. Later reuse checks must include non-programming content; neither combat HP nor binary correctness is universal.

## 2026-10-08 — Student-first foundation (latest scope)

**Status:** User-supplied revised brief. Phase 1 is account/student experience; Phase 2 is the gameplay vertical slice; Phase 3 connects saved game outcomes to the dashboard; Phase 4 is adaptation; Phase 5 expands content/platform; Phase 6 adds tutoring/community. This supersedes both earlier gameplay-first Phase 1 plans and the earlier exclusion of accounts from Phase 1.

**Confirmed now:** Landing, signup/login/basic established authentication, onboarding, player hub, courses/overview, profile/avatar presentation, settings, and responsive navigation. Mock learning data is permitted with clear labels. Real authentication is required for completion; mock progress does not imply real earned XP/mastery.

**Resolved since (see "Student foundation implementation" and "Selected backend and asset storage" above):** Vite + React Router and Supabase Auth/Postgres. Deployment remains unselected beyond the Vercel reference.

> Historical: **Unresolved at the time:** Application build tooling/router, auth provider, database/profile persistence provider, deployment, provider-specific session/verification/recovery rules. React/TypeScript/Tailwind and later Phaser are retained. No backend vendor or Next.js migration has been selected. Choose and record these decisions before integration.

**Historical treatment:** Existing game specifications remain Phase 2 references. Their localStorage/reward rules are proposals; platform account data requires its own access-controlled persistence. STUDENT_EXPERIENCE.md and the current ROADMAP.md/TECH_ARCHITECTURE.md summaries define active scope. No game code or service provisioning is performed by this documentation update.

## 2026-10-08 — Expanded game-design direction (current)

> Historical: the student-first scope above moved this gameplay slice to Phase 2/3. Its design content remains the reference for those phases.

**Status:** Supplied as the new design brief. Phase 1 now includes a course map, missions, code-output/code-choice alongside multiple choice, one visible avatar, a boss encounter, XP/levels, concept evidence, and localStorage persistence. This supersedes the earlier session-only milestone, true/false demo proposal, and memory-only progress plan. It authorises documenting the expanded design here; application implementation has not begun.

**Retained decision:** TypeScript + React + Tailwind/custom CSS + Phaser. Vite is proposed, not yet installed or permanently selected. The latest source's CSS Modules/Motion suggestions do not replace the user's explicit stack choice.

**New proposals for review/testing:** Programming Fundamentals / JavaScript Loops; four missions plus a mini challenge; six-question, 100-HP Loopkeeper; 10/15/25 damage; 5 participation XP plus 5/10/15 correct bonus; 25 first-completion XP; 150 first-victory XP; derived level thresholds; completion-based node unlocks. See BOSS_SYSTEM.md and PROGRESSION_SYSTEM.md for exact proposed transitions and edge cases. These replace the older proposed demo and reward defaults below, without asserting tested balance.

**Save boundary proposal:** Commit progress once at results, keyed by session ID. Completed progress survives refresh; an unfinished session restarts from the map. LocalStorage is device-local demo persistence, not accounts/cloud sync. Full mid-session resume and cross-tab merging are undecided.

**Document precedence:** Explicit user stack choices and latest supplied scope take precedence. Current summaries at the top of each document resolve older examples. Historical sections remain traceable references; they are not simultaneous requirements. Future mastery scores, boss ratings, cosmetics, and currency remain proposals.

## Earlier entries

Record confirmed decisions separately from proposals. Dates below are the dates decisions were recorded in this workspace, not inferred dates of earlier conversations.

## 2026-10-08 — Separate real product and school prototype

**Status:** Confirmed. The real product lives in `quizzness-game`; the COMP1170 prototype remains separate and untouched. This prevents product expansion from changing assessment work. A local Git repository exists; the first commit was made on the local `jolicia` branch on 2026-10-08. No remote repository has been created.

## 2026-10-08 — Frontend and game stack

**Status:** Confirmed by the user's stack instruction. Use TypeScript, React, Tailwind CSS plus custom CSS, and Phaser. React handles the learning interface; CSS handles interface motion; Phaser handles sprite animation and game scenes. Alternatives in the supplied notes, including Next.js and CSS Modules, remain historical possibilities rather than selected tools. Build tooling was later resolved as Vite + React Router.

## 2026-10-08 — Core before platform expansion

**Status:** Confirmed product constraint. Complete one short learning session with feedback, explanations, progress/XP, concept evidence, and results before accounts, tutoring, payments, institutional systems, or complex AI. XP reflects participation/progression and is separate from academic mastery.

## 2026-10-08 — Documentation structure

**Status:** Confirmed by the user's requested nine-file structure. The expanded supplied notes are preserved by subject under the relevant documents. PROJECT_CONTEXT.md remains the original vision and constraints; selected decisions here clarify tentative examples without discarding them.

## Proposed Phase 1 defaults — not yet confirmed

- Programming Fundamentals, Variables and Conditionals, six questions, three concepts.
- Multiple choice and true/false; learner-paced Continue after explanations.
- 10 participation XP plus 5 correct-answer XP per question.
- Temporary session state; fixed authored order with a results recommendation.
- Recommend the lowest observed accuracy concept, break ties by authored order, and recommend reinforcement if all answers are correct.

These choices keep the first implementation small. They are not shipped behavior or validated learning measures. Difficulty-weighted XP examples and alternative mastery formulas in the supplied notes do not replace these proposals without an explicit decision.


## Supplied product notes

The following source sections preserve the expanded user-supplied vision. Possible features, schemas, numbers, and implementation examples remain proposals unless confirmed in DECISIONS.md. Source numbering is retained for traceability.

# 136. Git Branching Philosophy

Keep the main branch stable.

Feature work can use branches such as:

feature/lesson-engine

feature/progress-screen

feature/avatar-system

fix/answer-selection

Avoid giant long-running branches whenever possible.

---

# 137. Commit Style

Commit messages should explain the change.

Good:

Add multiple-choice feedback state

Fix lesson progress calculation

Create reusable course card

Bad:

stuff

updates

changes

final-final

---

# 138. Documentation

Important architecture decisions should be documented.

Possible files:

PROJECT_CONTEXT.md

GAME_DESIGN.md

ARCHITECTURE.md

DATA_MODEL.md

ROADMAP.md

CONTENT_GUIDE.md

Keep documentation updated when major decisions change.

---

# 139. Decisions Log

A useful future document:

DECISIONS.md

Example:

## 2026-10

Decision:
Use React for the frontend.

Reason:
The interface requires many reusable interactive components.

Alternatives considered:
Vanilla JavaScript.

This prevents forgetting why important choices were made.

---

# 143. Most Important Engineering Principle

Do not build Quizzness around screenshots.

Build reusable systems.

If a design shows:

three answer buttons

do not create:

answer1

answer2

answer3

Instead create a reusable answer component generated from question data.

If a design shows:

five lesson nodes

do not hard-code five unique lesson HTML blocks.

Create reusable lesson-node components.

Always ask:

"What reusable system does this screen represent?"

---

# 144. Most Important Product Principle

The game should always be helping answer one of these questions for the student:

What should I learn?

What should I practise?

Did I understand this?

Why was I wrong?

Am I improving?

What should I do next?

If a screen cannot answer one of those questions or support the game experience, reconsider whether it is necessary.

---

# 145. Codex Behavior Rules

When working on Quizzness, Codex should:

READ before editing.

Inspect the current repository first.

Avoid assumptions.

Preserve working code where reasonable.

Prefer incremental improvements.

Explain architecture choices.

Point out technical debt when relevant.

Do not silently redesign the entire project.

Do not install dependencies without explaining why.

Do not create unnecessary abstractions.

Do not build future features without being asked.

Do not mix the school repository with the real Quizzness repository.

Do not remove existing visual work unless there is a strong reason.

---

# 146. When Codex Finds a Problem

If Codex discovers:

duplicate logic

bad state handling

broken layout

unnecessary hard-coding

security problems

accessibility issues

it should explain:

what the problem is

why it matters

whether it must be fixed now

the smallest reasonable fix

Do not automatically perform a massive refactor unless requested.

---

# 147. When Requirements Are Unclear

If several reasonable implementations exist, Codex should prefer the one that:

keeps the architecture simple

supports future expansion

fits the current visual direction

does not add unnecessary dependencies

is understandable to a learning developer

Codex should state major assumptions.

---
