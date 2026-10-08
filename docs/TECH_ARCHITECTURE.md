# Technical architecture — student platform foundation

## Subject-agnostic engine boundary

The core is Course → Topic/Area → Mission → Interactive Activity → Checkpoint → Boss. Use ActivityRenderer rather than QuestionRenderer as the general concept. Renderers collect typed inputs; activity evaluators return outcome, feedback/explanation, concept evidence, and completion state. Mission/checkpoint/boss controllers orchestrate these results without assuming code, answer options, binary correctness, or a combat presentation.

Common activity metadata: id, courseId, topicId, conceptIds, type, difficulty, objective/prompt, payload, evaluation configuration, and reward metadata. Payloads and inputs are discriminated by type; code/language are required only for code activities. Keep binary choice evaluation as one simple implementation, not the universal schema. Partial credit, tolerance, staged results, and authored scenario rubrics need explicit rules when introduced.

Begin with a small typed renderer/evaluator registry for implemented types. Do not create ten empty implementations or a universal plugin framework. Phase 1 course fixtures/onboarding must support multiple disciplines and optional institutions; actual engines wait until Phase 2. Verify the later engine with at least one non-programming authored activity using the same mission/progress contracts.

## Selected versus unresolved

Latest provider decision: Supabase Auth + Postgres. Use Supabase Storage for profile pictures if that capability is included, and ship fixed artwork in the app build. Cloudflare R2 remains a future heavy-upload option. The unresolved-provider statements retained below are superseded; routing/build tooling, hosting configuration, and actual Supabase project credentials still require implementation/configuration. Store file references/metadata in Postgres, not binaries.

Selected: TypeScript + React + Tailwind/custom CSS; CSS for interface motion and Phaser for later character/game scenes. There is no application, installed dependency set, auth provider, or database yet.

Unresolved before integration: Vite SPA versus a React application framework, router, established authentication provider, profile/database persistence, deployment target, session strategy, verification/recovery flow, and data access rules. The new brief requires these decisions earlier; it does not name a provider. Record a concrete choice and rationale in DECISIONS.md before implementing it. A framework/provider comparison is a separate decision task; no services are provisioned by this documentation change.

## Phase 1 boundaries

Public routes: /, /login, /signup. Authenticated onboarding: /onboarding. Onboarded app: /dashboard, /courses, /courses/:courseId, /profile, /settings. Support URL navigation, reload, browser back, unknown routes, and deployment fallback; the earlier in-memory screen-union-only proposal is insufficient for this route brief.

Auth owns account identity and sessions; user-profile storage owns names, study interests, optional institution, goals, avatar selection, and onboarding completion. Passwords belong to the established auth provider, never profile records. A session-loading boundary prevents private-data flashes. Guarded routes provide UX; server-side access rules enforce ownership of user data.

Proposed modules: app (shell/routes/providers), auth (provider adapter/session), features/onboarding, features/dashboard, features/courses, features/profile, components, data (labelled fixtures), services (profile/course/progress interfaces), types, styles, assets. Create only needed modules. Keep credentials server-side; public client identifiers require provider-specific review, not an assumption that all environment values are secrets.

## Connecting the later game

Separate dashboard view models from storage: profile service, course service, progress reader, and later game-result writer. Prefer small typed interfaces over an enterprise repository framework. Phase 1 uses real account/profile persistence and explicitly labelled mock learning data. Phase 2's session/boss logic remains reusable TypeScript with Phaser presentation; Phase 3 connects durable outcomes to dashboard queries.

Do not treat localStorage as the account database or authoritative cloud progress. The old versioned local save is a possible game-demo adapter, not the new platform persistence decision. Define account ownership, guest-data handling, save versioning, retry/idempotency, and cache refresh before integration. Clear per-user caches on logout/account changes.

Keep profile, enrollment/selected courses, game progression, and mastery evidence separate. Do not create boss/mission tables during foundation work simply because their future models exist. Test signup/login/logout, verification/recovery where applicable, onboarding, route protection, user isolation, profile saves, failures, and labelled learning previews.

# Earlier documentation — superseded where conflicting

The current scope above and DECISIONS.md take precedence. Old Phase 1 references describe the former gameplay-first plan.

# Technical architecture — current Phase 1

Confirmed: TypeScript, React, Tailwind/custom CSS, Phaser, local structured content, and localStorage. Proposed build tooling: Vite; no routing library, global state library, backend, or extra motion library initially. Earlier claims that Phase 1 is memory-only are superseded.

Proposed screen state: course-selection → course-map → mission-preview → mission → mission-results, or boss-preview → boss → boss-results. Use IDs in a small typed screen union. Browser history/deep links are not promised by this in-app navigation proposal; choose a router separately if required.

Proposed folders: src/app (shell and progress owner), src/content (course/topic/mission/question/boss data), src/learning (types, validation, evaluation, session reducer), src/progression (rewards, levels, unlocks), src/storage (validated versioned save), src/components (accessible UI and question renderers), src/screens, src/game (Phaser host/scenes), src/styles, and src/assets. Create only folders needed by the implemented step.

The app owns durable progress. Mission/boss reducers own active answer selection, answer records, current question, feedback, and encounter state. Evaluation is a pure function; progression derives from a completed result; a save adapter reads/writes the single validated progress record. Avoid competing copies of XP/level/concept counts. Use ordinary TypeScript discriminated unions and small functions.

Phaser mounts in a React host, receives presentation events such as answer-checked and boss-damaged, and is destroyed with listeners removed on cleanup. Domain state remains outside scenes. Use semantic React controls for essential interaction, lazy-load Phaser where used, support resize/reduced motion, and allow missing art to fall back without blocking play. Do not execute learner code with eval; authored code-output questions use reviewed answers.

Save at result boundaries according to PROGRESSION_SYSTEM.md, with pending XP labelled during play. Completed progress survives refresh; active-session resume is outside this proposal. Validate content and saves, display recoverable errors, and verify domain rules plus complete keyboard/browser flows before expanding.

# Historical notes — superseded where conflicting

The current summary above and DECISIONS.md take precedence. Earlier proposals are retained for traceability.

# Technical architecture

Implementation status (2026-10-08): the approved Phase 1 plan uses Vite + React Router, with Supabase Auth/Postgres integration code and an owner-only profile migration. The local preview is operational. Live project setup and Auth/RLS verification are pending. Earlier proposed tooling statements below are preserved history; see README.md for the runnable setup.

## Confirmed stack

TypeScript + React + Tailwind CSS with custom CSS, and Phaser for character animation and game scenes. This explicit stack decision takes precedence over tentative technology alternatives in the supplied product notes below. No dependencies or application code exist yet; build tooling and backend providers are undecided.

React owns accessible learning controls. A reusable TypeScript session controller owns answer evaluation, progress, XP, and transitions. Phaser receives presentation events and must not maintain a competing score. CSS handles interface motion; no extra animation library is required initially.

## Proposed implementation boundaries

- `src/content/`: authored courses, topics, concepts, lessons, and questions.
- `src/learning/`: understandable types, validation, evaluation, and session rules.
- `src/components/`: reusable controls, questions, feedback, progress, and results.
- `src/screens/`: course/topic selection and the learning-session flow.
- `src/game/`: Phaser scenes and a small React integration component when needed.
- `src/styles/`: shared design tokens and custom CSS.

Start with local React state or a reducer. Mount and destroy Phaser with its host component; remove listeners on cleanup. Pass small typed events at the boundary rather than adding a global event framework. Lazy-load game scenes and assets when needed. Keep domain logic usable without Phaser.

Initial content and progress are in memory. Accounts, persistence, APIs, offline support, and services below are future possibilities. Add meaningful checks for evaluation, duplicate submissions, XP, completion, and recommendation rules when implemented.


## Supplied product notes

The following source sections preserve the expanded user-supplied vision. Possible features, schemas, numbers, and implementation examples remain proposals unless confirmed in DECISIONS.md. Source numbering is retained for traceability.

# 66. Technology Direction

The real Quizzness application should use modern web technologies appropriate for an interactive browser game.

A likely architecture could involve:

HTML

CSS

JavaScript / TypeScript

React

possibly Next.js depending on product needs

Animation libraries may be added where they provide real value.

A full game engine such as Unity is probably unnecessary for the initial Quizzness experience because most interactions are interface-driven rather than physics-heavy.

Do not introduce a game engine merely because Quizzness is called a game.

---

# 67. JavaScript vs TypeScript

For a larger real application, TypeScript is preferred if the codebase becomes complex enough to benefit from stronger typing.

However:

Code clarity is more important than using TypeScript for its own sake.

If TypeScript is used, keep types understandable and avoid extremely advanced generic patterns unnecessarily.

---

# 68. React Philosophy

If React is used:

Create reusable components.

Avoid giant components.

Keep game logic separated from purely visual components.

Good examples:

QuestionCard

AnswerOption

FeedbackPanel

ProgressBar

XPIndicator

Avatar

CourseCard

LessonResults

Avoid putting the entire application into one enormous component.

---

# 69. Styling Philosophy

Potential styling approaches include:

CSS Modules

well-organized standard CSS

Tailwind CSS if deliberately chosen

Do not introduce a styling framework simply because it is popular.

The chosen approach should:

support reusable components

make responsive design manageable

allow pixel-art/game styling

remain understandable to the project owner

---

# 70. Component Design

Components should be reusable where appropriate.

Example:

Button

Card

Modal

ProgressBar

Badge

Avatar

QuestionLayout

These foundational components should help maintain a consistent design language.

Do not over-componentize tiny pieces that have no reuse or independent responsibility.

---

# 71. Design Tokens

Long-term styling should use consistent design values.

Possible tokens:

colors

spacing

border radius

font sizes

shadows

animation durations

Example concept:

--color-background

--color-surface

--color-primary

--color-success

--color-warning

--color-text

--spacing-sm

--spacing-md

--spacing-lg

Using shared tokens helps keep the visual identity consistent.

---

# 72. State Management

Do not immediately introduce complex global state management.

Start with React state/context or equivalent simple approaches when sufficient.

Only consider systems such as Zustand or Redux if application complexity genuinely requires them.

Game-session state should have a clear owner.

---

# 90. User Accounts

User accounts will eventually be needed for:

saving progress

XP

mastery

avatars

courses

achievements

study history

tutoring

However, the earliest playable version can use mock/local data before authentication is implemented.

Do not block game development waiting for a full authentication system.

---

# 91. Authentication — Future

Potential options could include:

email/password

Google sign-in

institution sign-in

Do not implement authentication without considering:

security

password handling

session management

privacy

account recovery

Use established authentication solutions rather than writing custom authentication from scratch.

---

# 92. Guest Mode

A guest/demo mode may be useful.

Users could try a sample lesson without creating an account.

This lowers the barrier to experiencing Quizzness.

Progress may only be temporary until signup.

---

# 99. Security

Never expose:

database credentials

API secrets

authentication secrets

private keys

admin tokens

Secrets should be stored in environment variables and excluded from version control.

---

# 110. Art Asset Organization

If custom assets are introduced, organize them logically.

Possible structure:

assets/
  characters/
  avatars/
  icons/
  backgrounds/
  achievements/
  courses/
  effects/

Use consistent file naming.

Example:

avatar_student_01_idle.png

avatar_student_01_correct.png

avatar_student_01_thinking.png

---

# 113. Testing Philosophy

Important gameplay logic should eventually have tests.

Examples:

answer evaluation

XP calculation

lesson completion

question selection

mastery updates

Tests are particularly useful for logic that may change frequently.

---

# 114. Manual Testing Checklist

After changing a lesson flow, manually verify:

lesson starts

question displays

answer can be selected

submission works

correct answer is recognized

incorrect answer is recognized

feedback appears

explanation appears

continue works

progress advances

last question completes lesson

results screen appears

XP total is correct

replay works

---

# 115. Browser Testing

At minimum, the application should eventually be tested in modern:

Chrome

Edge

Firefox

Safari

Do not rely on behavior unique to one browser.

---

# 116. Performance

The game should feel responsive.

Avoid:

massive asset downloads

unoptimized images

unnecessary re-renders

huge dependencies

blocking animations

slow initial load

The student should be able to move quickly through questions.

---

# 117. Offline / Weak Internet Consideration

Because Quizzness may serve Caribbean students, consider that internet quality may vary.

Long-term possibilities:

cache lesson content

reduce asset sizes

avoid unnecessary network calls

progressive loading

possibly offline practice

Do not make the product unusable on slower connections.

---

# 131. API Architecture

If the product later gets a backend, the frontend should communicate through clear application interfaces.

Avoid tightly coupling UI components directly to database implementation details.

Example conceptual layers:

UI

↓

Game services

↓

API

↓

Database

This makes future changes easier.

---

# 132. Service Separation

Possible services/modules:

lesson service

question service

progress service

XP service

user service

course service

Do not turn these into separate servers/microservices unless scale actually requires it.

They can simply be well-organized modules.

---

# 133. Logging

Developer logging may help diagnose issues.

Use meaningful logs during development.

Avoid leaving large amounts of noisy console output in production.

Never log sensitive credentials.

---

# 134. Feature Flags — Future

If testing experimental systems later, feature flags may help enable or disable features.

Example:

new adaptive algorithm

new question type

new results screen

This is not needed for the earliest build.

---

# 135. Development Environments

Eventually maintain separation between:

development

testing/staging

production

Do not experiment directly on a production system.

---

# 148. Avoid Premature Architecture

Do NOT start the project with:

microservices

Kubernetes

complex event systems

multiple databases

distributed queues

enterprise architecture patterns

unless there is an actual reason.

Quizzness is currently an early-stage learning product.

A clean monolithic web application is completely acceptable.

---

# 149. Future Scalability

Although the early architecture should remain simple, avoid obvious dead ends.

For example:

Good:

question content stored as structured data.

Bad:

questions permanently embedded into dozens of unrelated UI files.

Good:

course IDs.

Bad:

logic that assumes the only course is COMP1170.

Good:

reusable question engine.

Bad:

one manually coded page for every question.

---


