# Student foundation implementation ledger

Plan: docs/superpowers/plans/2026-10-08-student-foundation.md

Execution authorised inline by user. Supabase and asset strategy selected.
Workspace: existing dedicated quizzness-game repository has no commits; preserve all documentation. Work in this dedicated checkout rather than attempting a worktree from a nonexistent commit. No commits/publication automatically.
First checkpoint: configure dependencies, observe failing route tests, implement shell and real-provider integration boundaries. Do not report live auth verified without a configured project.

Tasks 1–6: frontend and provider-integration code implemented. Routes, preview onboarding, hub, course selection, avatars, profiles, reduced-motion settings, auth screens, session subscriptions, callbacks and owner-only profile SQL exist. Preview remains in memory; real paths require Supabase.

Ruling: use src/screens and a shared StudentProvider instead of the plan's src/features subdivisions — the current small screen set shares one account contract — cost if wrong: reorganise imports as the product grows.

Ruling: keep the dedicated checkout without a worktree or automatic commits — no initial commit exists and the repository contains pre-existing untracked user documentation — cost if wrong: less isolation and no commit checkpoints; preserved files and the ledger remain reviewable.

Ruling: use installed Microsoft Edge for Playwright instead of downloading Chromium — Edge is available locally — cost if wrong: another machine must install Edge or configure another browser channel.

Verification: initial missing-App route test observed RED, implementation GREEN. Profile validation and preview route tests passed. Callback duplicate-code exchange reproduced RED→GREEN; installed SDK URL auto-detection disabled to prevent competing exchanges. Dependency audit after Vitest upgrade: zero vulnerabilities.

Final review: fresh-context foundation_review agent performed read-only inspection. Four important findings reproduced and fixed: stale account saves, concurrent profile updates, inaccessible/asynchronously mounted route headings, and disappearing password-recovery retry form. Regression tests observed RED→GREEN. Additional session tests cover stale initial sessions, logout failures and expiry/signout; provider tests cover failed-save retry and incomplete onboarding.

Final: minor (deferred): custom Other subject input disappears if its value exactly matches a predefined subject.

Final: minor (deferred): preview settings wording says no account is signed in even if the browser has a real authenticated session; preview remains isolated from that session.

Visual QA: desktop landing/hub and mobile hub screenshots inspected; browser tests cover the preview journey, independent Law learner onboarding, narrow layouts, reduced motion, refresh reset, private routing and unknown courses. Screenshots are in docs/previews.

Pending: development project organization selection and required cost confirmation; create/configure project, apply migration, verify real signup/confirmation/recovery, persisted profiles and live cross-user/anonymous database denial. Phase 1 is not complete until those checks pass. No deployment or gameplay implementation.

Final verification: npm run test passes 17/17 tests across five files; npm run build succeeds; npm run test:e2e passes 3/3 browser tests. Provider tests use mocks; no live-auth claim is made.

## Original identity correction — 2026-10-08

The user's supplied concrete design supersedes the invented palette/placeholder artwork. Imported the exact palette/campus/student images, and the two mascot SVGs from the school mascot folder explicitly identified by the user. Originals and school files remain unchanged. Added exact shared tokens, Panthy guidance/states, six original character views, original campus landing/hub imagery and revised current-phase instructions/docs. The group proposal is recorded as venture context; original school requirements are preserved as an archival source rather than current implementation scope.

Missing: original logo, established font/interface reference and distinct mascot expression drawings. Current typography/controls are expressly provisional; eight contextual states reuse the supplied pose without claiming new expression art. Legacy mascot SVG metadata says Rory/tiger; current visible naming follows the user's Panthy instruction. No image generation/redesign occurred.

Local migration 002 permits all six characters and retains existing IDs; it has not been applied to a live project. Preserve existing numbered migration convention in this unprovisioned project rather than installing the CLI solely to rename files; live migration application remains pending.

Verification: 19 unit tests passed, production build passed. Initial mobile browser check caught profile overflow after adding six choices; corrected grid sizing and character proportions. All four browser tests then passed. Desktop landing/hub and mobile hub/profile/login screenshots inspected; visual inspection additionally corrected low-contrast input borders. Final verification follows that correction. Live authentication remains pending, and original-expression/logo/font acceptance remains open.

Final identity verification after input-border correction: npm run test 19/19; npm run build successful; npm run test:e2e 4/4. Final mobile login screenshot confirms visible input boundaries. No live migration, Supabase project creation or deployment performed.

## Cosy student room — 2026-10-08

User selected a personal cosy room after rejecting the previous hub composition. Generated a new original room backdrop with ImageGen and copied it into public/brand/student-room.png (since archived at design/archive/student-room.png). Existing character/Panthy art is unchanged and rendered separately. Hub now centres the room, with desk/Continue Journey, bookshelf/course catalogue, wardrobe/profile and a compact course/character/settings toolbar. Course selections and preview labels persist. No room movement, multiplayer or room-editing capability is claimed.

Visual QA found and fixed a descendant span style that hid the character; existing journey browser test caught a changed accessible link label, which was restored. Desktop/mobile screenshots inspected. Unit suite: 19/19. Added a keyboard room-navigation browser test. Live Supabase setup remains pending.

Final room verification: production build successful; all 5/5 browser tests pass, including keyboard room shortcuts and the original full preview journey.

Room-shell correction: user screenshot highlighted the visually mismatched header. Removed room-route boxed logo/secondary nav row, compacted wordmark/profile and preview notice, and moved greeting/progress into the room scene. Existing room shortcuts carry navigation; other screens preserve their full nav. Mobile screenshot confirms the room is visible near the top. Unit tests: 19/19; production build successful; browser tests rerun for all five student flows.

Final room-shell verification: updated browser journey to use relocated Room settings shortcut; all 5/5 browser tests pass.

## Whole-interface pixel correction

User correctly noted that removing navigation had not fixed the visual mismatch. Added bundled Pixelify Sans, a shared pixel-ui style layer across landing/account/onboarding/course/profile/settings and room screens, hard-edged controls/dialogue frames, and restored labelled game-header navigation. Removed duplicate lower shortcuts. Generated and saved student-room-pixel-v2.png with simplified pixel clusters, preserving original Panthy/character/palette assets and archiving the old room image. Desktop landing/room and mobile room screenshots inspected. Mobile hotspot positions adjusted so controls do not cover the student's face. Font and background source assertions added to browser verification.

Pixel verification: unit suite 19/19 and production build pass. Browser tests exposed widened mobile navigation on non-room screens; corrected tab spacing/type sizing and verified all nine mobile routes have no horizontal overflow. Final browser suite 5/5 passes, including local pixel font/background assertions. Original artwork remains unchanged; final subjective visual approval belongs to the user.

## Review follow-up — 2026-10-08

First commit made on local branch `jolicia` (no remote). Stale "provider unresolved"/"Phase 1 = gameplay" doc statements corrected or marked Historical in place. Migration 003 drops the hard-coded course/avatar CHECK lists (app-side validation remains); not applied live. Further commits on this branch cover accessibility, image weight and small bugs.
