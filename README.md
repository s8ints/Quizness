# Quizzness — real learning game

Quizzness turns tertiary-level course concepts into short, interactive learning sessions with supportive feedback and visible progress.

It is a game-based adaptive learning platform across subjects. Computer Science is only an early demo. The general model is Course → Topic/Area → Mission → Interactive Activity → Checkpoint → Boss, with ActivityRenderer handling subject-appropriate interactions. Phase 1 remains the student foundation.

This project is separate from the COMP1170 assessment prototype in `../Quizness`. Nothing from here should automatically be copied into that project.

## Current status

The original five-colour palette, Panthy guide, campus illustration and six student characters are integrated throughout the student frontend. See design/README.md for exact tokens and asset provenance. Panthy contextual states preserve the supplied pose; distinct expression art, original logo and established typography/interface reference remain open. Later phase numbering now places missions in Phase 2 and bosses/connected progression in Phase 3.

The Phase 1 student frontend runs locally: landing, onboarding, home base, four subject worlds, profile/avatar selection, and settings. A clearly labelled `/preview` experience works without an account and resets on refresh. Real account routes integrate Supabase Auth and Postgres; live account verification is pending development-project provisioning. Gameplay belongs to Phase 2.

## Run locally

From this repository, run `npm install`, then `npm run dev`. Open `http://127.0.0.1:5173/preview` to explore. Run `npm run test`, `npm run build`, and `npm run test:e2e` for verification. Browser tests currently use installed Microsoft Edge via Playwright.

## Connect accounts

1. Create/select the Quizzness Supabase development project.
2. Apply the migrations in `supabase/migrations/` in numeric order in that project. The profile table enables row-level security, and limits authenticated users to their own row. Course and character IDs are validated by the app (`src/services/profile.ts`), not by database lists, so adding content needs no migration.
3. Copy `.env.example` to `.env.local`; set the project URL and **publishable** key. Never use a service-role or secret key in `VITE_` variables.
4. Configure Supabase Auth Site URL as `http://127.0.0.1:5173` and allow `http://127.0.0.1:5173/auth/callback` and `http://127.0.0.1:5173/auth/reset` as redirect URLs. Add the production origin only once hosting is selected.
5. Restart Vite. Verify signup/email confirmation, login, profile persistence across refresh, password recovery, logout, and cross-account row-access rejection before calling Phase 1 complete.

Confirmation and recovery links use PKCE. Open them in the same browser that initiated the request so the verifier is available. The application handles code exchange explicitly, once per callback; automatic SDK URL exchange is disabled. See [Supabase PKCE documentation](https://supabase.com/docs/guides/auth/sessions/pkce-flow).

Fixed placeholder avatars ship with the app; uploads and storage buckets are not implemented yet. Profile records contain structured fields only. No sample XP or progress is written to Supabase. Vercel SPA fallback configuration is included; no deployment has been created.

## Start here

1. Read [PROJECT_CONTEXT.md](PROJECT_CONTEXT.md), the full product vision and constraints.
2. Read [docs/GAME_DESIGN.md](docs/GAME_DESIGN.md), the second major context document, and [docs/ROADMAP.md](docs/ROADMAP.md) for the expanded playable milestone.
3. Use the other design documents for proposed implementation details. Proposals are starting points, not permanent requirements.

## Documents

- [Student experience](docs/STUDENT_EXPERIENCE.md): account journey, onboarding, player hub, and current Phase 1 scope.
- [Game design](docs/GAME_DESIGN.md): screens and session behavior.
- [Boss system](docs/BOSS_SYSTEM.md): phases, damage, recovery, retries, and rewards.
- [Progression system](docs/PROGRESSION_SYSTEM.md): XP, levels, unlocks, concept evidence, and local saves.
- [Technical architecture](docs/TECH_ARCHITECTURE.md): selected stack and implementation boundaries.
- [UI/UX guide](docs/UI_UX_GUIDE.md): visual direction, interaction, and accessibility.
- [Question system](docs/QUESTION_SYSTEM.md): rendering, validation, and evaluation.
- [Adaptive learning](docs/ADAPTIVE_LEARNING.md): concept evidence and future adaptation.
- [Data model](docs/DATA_MODEL.md): content and session records.
- [Roadmap](docs/ROADMAP.md): Phase 1 build order and acceptance checks.
- [Content guide](docs/CONTENT_GUIDE.md): authoring and review.
- [Decisions](docs/DECISIONS.md): confirmed choices and unresolved proposals.

The expanded product notes are preserved by subject in these documents. Their possible systems and numerical examples remain proposals unless explicitly confirmed in DECISIONS.md. The chosen stack takes precedence over tentative technology alternatives.

## Suggested development prompt

> Read PROJECT_CONTEXT.md, docs/GAME_DESIGN.md, docs/STUDENT_EXPERIENCE.md, docs/UI_UX_GUIDE.md, and the current architecture/decisions. Phase 1 builds REAL Quizzness's student foundation: signup/login, onboarding, player hub, courses, profile/settings, and a responsive shell. Use labelled mock learning previews; do not build bosses or the game engine yet. Inspect the repository, resolve auth/persistence decisions, and work incrementally. Keep the school repository untouched.
