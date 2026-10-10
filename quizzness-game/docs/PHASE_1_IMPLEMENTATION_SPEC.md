# Phase 1 implementation specification

Latest identity correction (2026-10-08): the exact supplied palette, original Panthy and supplied campus/student artwork are mandatory, replacing the invented warm-leafy placeholder direction below. The user supplied the concrete palette/design and identified Panthy's source; implementation follows those requested references. design/README.md records missing logo/font/interface/expression assets. Phase 2 now contains worlds/maps/missions/ActivityRenderer, with bosses and connected progression in Phase 3.

Current status (2026-10-08): implementation was authorised by the user's “alright lets continue”. The Vite/React student frontend and Supabase integration code are implemented. Preview routes run locally; live authentication/profile ownership verification awaits development-project provisioning. The earlier proposed/review-pending language below is preserved design history and is superseded by this status.

Update: the user selected Supabase for authentication and structured application data, Supabase Storage for any Phase 1 profile-picture uploads, and app-shipped static artwork. Cloudflare R2 is a future storage option, not a Phase 1 integration. This resolves provider selection; application implementation and execution-plan review remain pending.

## Outcome

Build an original student-facing Quizzness foundation for tertiary learners across subjects. The complete phase supports real signup/login, onboarding, a player hub, course presentation, profile/settings, and logout. The immediate first checkpoint is a running frontend shell and labelled student-experience preview; it must not be reported as completed authentication or completed Phase 1.

## Proposed approach and alternatives

Use Vite + React + TypeScript, Tailwind with custom CSS, and React Router for URL-based navigation. This keeps the first browser application small and understandable, with protected views connected to an established provider in a subsequent checkpoint. Deploying a SPA requires fallback handling for routes. Keep Phaser reserved for actual character/game scenes in Phase 2; still avatars and CSS interface motion need no additional motion library.

A React framework with server-rendered routes is an alternative if server-managed auth/SEO requirements justify it, but would add server/client conventions now. A static HTML prototype cannot fulfil the intended reusable application and account journey. This spec proposes Vite; it does not silently turn that proposal into an installed framework decision.

## First checkpoint: shell and preview

Create package/build configuration, index.html, TypeScript configuration, Tailwind integration, and a small src structure: app, components, screens, data, types, styles, and assets only as used. Add build/typecheck and development scripts. Preserve every existing document and the separate school repository.

Implement public landing and routable previews of dashboard, course list, course overview, onboarding, profile, and settings. Put student previews under `/preview` and `/preview/...`; display a persistent “Student experience preview — sample data” notice. The real `/dashboard`, `/courses`, `/profile`, and `/settings` routes remain reserved for authenticated integration. This prevents a preview from pretending to be a private student account.

Login/signup routes may show their planned interface with a clear unconfigured-auth state, but must not accept/store passwords or claim successful account creation. A preview entry is distinct from Login. Provider-independent UI and services can be implemented now without inventing authentication.

Use an authored catalogue including programming, mathematics, business/management, and biology, with stable course IDs and subject-neutral cards. A course overview presents a learning objective and future activity preview; Continue opens a clear upcoming-learning state, never a broken link or fake playable mission. Preview interactions can select courses, move through onboarding steps, and edit preview profile/settings in memory. Refresh resets preview edits; communicate that limit. No fixture XP becomes earned progress.

## Proposed visual direction

Create a warm ivory and deep-ink interface with leafy green actions and restrained amber highlights. Use crisp outlined controls, small pixel accents, and spacious typography; the hub centres Continue Journey, courses/worlds, progression preview, and a character panel. Include an original simple placeholder avatar clearly marked as placeholder; do not copy school artwork or reference-product characters. Use a local/system font fallback until original brand typography is chosen. Mobile navigation and content order retain the same priorities.

Keep motion brief and CSS-based, respect reduced motion, and avoid full-canvas essential controls. Semantic buttons/links, labelled forms, focus visibility, readable contrast, route focus/announcements, and keyboard interaction are required. Empty/unknown-course states explain a useful next action. No nonfunctional notification bell or invented real achievement history.

## Subsequent account integration checkpoint

### Provider recommendation — pending selection

Superseded status: Supabase is now selected by the user. The comparison below records the recommendation's reasoning.

### Selected asset strategy

Supabase Auth/Postgres handles identity, profile/settings, course records and future earned progress/mastery/boss data. Phase 1 creates only needed foundation records. Store asset keys/references and metadata in tables, never image/PDF/media binaries. Supabase Storage is the selected provider for profile pictures if upload is implemented; a built-in avatar selector remains sufficient for the first shell checkpoint.

Ship fixed characters, icons, backgrounds, badges, and boss sprites with the application source/build. GitHub versions them; the deployment host (Vercel if selected) serves them. Vercel hosting has not yet been provisioned. Do not copy school assets.

Later use Cloudflare R2 for larger dynamic images, notes, PDFs, and media once uploads become a scoped feature. Keep provider, asset key, owner, MIME type, and size separate from the URL used to display a file; private files require authorised access rather than a permanently public URL. Do not build an R2 adapter, buckets, or migration tooling now.

Recommend Supabase Auth + Postgres for this project. Auth integrates with database authorization; row-level security can scope profile/preferences/course selections to the signed-in user. Relational course/topic/activity/progress relationships fit Postgres naturally. Trade-off: SQL schema, migrations, and row-level policies must be understood and verified; email delivery and redirect/session configuration still need deliberate setup.

Clerk is an alternative for dedicated identity/account tooling, with user metadata and a separately designed application data store. That separates auth concerns but adds a service boundary for the future learning data. Firebase Auth + Firestore is another option with document-oriented storage and security rules; it fits document data well, but the course/progress relationships need a different modelling approach. These are fit judgments rather than price comparisons.

Sources checked on 2026-10-08: [Supabase Auth](https://supabase.com/docs/guides/auth), [Supabase row-level security](https://supabase.com/docs/guides/database/postgres/row-level-security), [Clerk user metadata](https://clerk.com/docs/guides/users/extending), [Firestore data model](https://firebase.google.com/docs/firestore/data-model). No provider has been provisioned or selected by the recommendation alone.

Select and record an established auth provider and profile persistence service first. Provider-managed identity owns credentials and sessions; user-owned profile records hold names, study field, optional institution/independent-learning status, goals, avatar, and onboarding completion. Course selections remain separate from official institutional enrollment. User data must have server-enforced ownership, not just frontend guards.

Integrate session loading, signup, email verification if required, login, password recovery, logout, expired sessions, private-route guards, and onboarding redirection. Persist profile/preferences/selections with explicit saving/error states. Clear user caches on logout/account change. Unconfigured environments show a setup state rather than falling back silently to fake auth. Never log passwords or embed secret credentials.

## Game integration boundary

Expose small typed course/profile/progress view models so fixture readers can later be replaced with user-owned data. Phase 2 introduces subject-agnostic ActivityRenderer, mission/checkpoint/boss controllers, and meaningful activity evidence; Phase 3 replaces learning previews with actual game outcomes. Do not implement those engines, tables, rewards, or adaptive systems in this checkpoint.

## Verification and acceptance

First checkpoint: dependency install completes; production build/typecheck passes; preview routes support direct navigation and browser back; course cards render multiple disciplines; Continue, preview onboarding, profile/settings, and recovery links work; mock data is always clear; narrow-screen and keyboard flow are usable. Test meaningful route/selection/state behavior rather than snapshots of decorative markup.

Full Phase 1: additionally verify real signup/login/logout, verification/recovery behavior, private-route/session handling, persisted onboarding/profile/selections, unauthorized user-data access rejection, failed saves, refresh behavior, and account-switch cache isolation. A provider-unconfigured shell is explicitly incomplete Phase 1.

## Review boundary

Review this spec before scaffolding. After approval, write the incremental implementation plan and select execution in this chat. Provider choice can be resolved alongside shell work; dependent auth integration waits for that choice and required project configuration. No publication, external service provisioning, school-repo work, payments, tutoring, AI, or gameplay implementation is included.
