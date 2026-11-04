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

The user's supplied concrete design supersedes the invented palette/placeholder artwork. Imported the exact palette/campus/student images, and the two mascot SVGs from the school mascot folder explicitly identified by the user. Originals and school files remain unchanged. Added exact shared tokens, Panthy guidance/states, six original character views, original campus landing/hub imagery and revised current-phase instructions/docs. The group proposal is recorded as venture context; original requirements are preserved in ORIGINAL_REQUIREMENTS_REFERENCE.md (corrected later: they are real-product direction scheduled by phase; only HTML/CSS-only is school-specific).

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

## Majors, worlds, courses and campus — 2026-10-08

Content split into src/data/worlds.ts, majors.ts and courses.ts (types in src/types/content.ts). Majors map to seven worlds (three new, provisional names) or to Quizzness Campus. Onboarding/profile share MajorFields with optional year of study; onboarding lists home-world courses first. New /campus page. Migration 004 (not applied live). A mid-width header overflow caused by the fifth nav link was found in manual browser checks and fixed; an 820px e2e check now guards it. Verification: 36 unit tests, 5 browser tests, production build.

## Dashboard refresh — 2026-10-08

Font roles via src/styles/refresh.css (Silkscreen, Pixelify Sans, Nunito; @fontsource/silkscreen and @fontsource/nunito added). Light header on all routes, bottom-edge buttons, Your status row, shared CourseCard (src/components/CourseCard.tsx). Browser checks at 1280/900/390/375 found and fixed: logo override specificity, "&" rendering like "$" in Silkscreen labels, nav link wrapping at desktop, room overlaps on mobile, and a 390px landing-headline overflow caught by Playwright. Keyboard order and focus outlines checked. Verification: 40 unit tests, 5 browser tests, build. Recoloured character sheet confirmed byte-identical to the file already in public/brand.

## Live Supabase + onboarding polish — 2026-10-08

User provisioned the Supabase dev project and applied migrations 001–004. User-confirmed live: signup, confirmation email, login, onboarding, refresh persistence, profile save. Pending: logout, password recovery, cross-account RLS check. Added: "Check your inbox" panel with resend (replaces the weak signup notice), error panels, study-mode choice cards, grouped university dropdown with Other (src/data/institutions.ts, src/components/InstitutionField.tsx, also on Profile), readable form styles, pixel "q" favicon, palette theme-color. Fixed header overflow at 1024–1200px (nav wrap now ≤1080px, level tag hidden ≤1200px; e2e checks 820/1024/1100). Vitest excludes the loose e2e/ copy and blanks Supabase env. Verification: 43 unit tests, 5 browser tests, build. The folder is no longer a git repository (removed at the user's request), so these changes are uncommitted files.

Phase 1 complete (2026-10-08): user confirmed logout, password recovery and second-account data isolation on the live dev project. Confirmation is the user's manual test; no automated live RLS query was run.

## Phase 2 Part 1 — room movement proof, 2026-10-09

User authorised starting Part 1. Implemented /room and /preview/room, linked by Walk around your room from the existing hub. Phaser is lazy-loaded only for the movement view. Pure TypeScript room definitions and foot collision handle normalised movement, furniture sliding, bounds and capped frame time. React owns focus-scoped WASD/arrows, E interaction, touch joystick, pause, free Panthy welcome and semantic destination navigation. Existing dashboard/account/profile flows and original assets are retained.

Task 1: movement tests observed RED (missing room module) → GREEN, six tests. Sandbox filesystem denial was resolved by running the same test with normal local permissions, not by altering the project tests. Phaser install likewise needed normal network access; install completed, audit reported zero vulnerabilities.

Ruling: Part 1 uses a code-drawn pixel tile-layout prototype and unmodified original still-pose avatar/Panthy artwork, explicitly labelled. It does not claim directional walking frames or final approved map art. Matching directional frames and final environment art remain the next asset milestone. Cost if wrong: replace prototype scene art after visual review; original assets remain intact.

Ruling: add a separate movement view rather than overwrite the existing approved hub. This keeps the working foundation usable while the new map presentation is reviewed. Campus doorway currently opens the existing campus page; connected walkable campus/region/course/topic areas belong to the next slice. No missions, rewards, payment, AI, or cloud gameplay schema added.

Ruling: user removed Git; no repository/worktree/commit was created. Plan and evidence remain in docs/superpowers/plans/2026-10-09-phase2-room-proof.md and this ledger rather than Git-based skill scripts.

Final review: fresh room_review agent inspected movement, inputs, cleanup, failure fallback and accessibility. Important finding reproduced: a keyboard-focused room blurred on joystick press and cancelled the first drag. Browser regression observed RED → prevent default focus transfer and clear keyboard input → GREEN. Repeat-mount coverage now uses SPA navigation out and browser back, not a full page reload. No other important findings reported.

Final verification: npm run test passes 49/49 across 11 files; npm run build succeeds; npm run test:e2e passes 7/7. Browser coverage includes movement, pause, walls, Panthy help, destinations, SPA remount/single canvas, mobile joystick release after keyboard focus, small-screen overflow and failed-asset navigation fallback, plus all existing foundation flows. Desktop/mobile room screenshots generated and inspected in docs/previews/room-movement*.png.

Build limitation: Phaser's lazy scene chunk is about 1.21 MB (334 KB gzip); Vite reports a chunk-size warning, not a build failure. Initial pages do not load that scene chunk. Final map art and directional walk animation have not been approved or implemented; this is the first playable movement proof, not completion of all Phase 2 maps.

## Supplied student animation integration — 2026-10-09

User stated the character animations were present. Located public/sprites/students/students.json and all six students' idle/walk/shadow sheets; inspected the supplied walk sheet and source metadata. Connected selected-avatar sheets to Phaser without changing any supplied PNGs or original art. Frame dimensions 64×136, idle 2 frames/1.5 fps, walk 8 frames/10 fps; frame scaling is 1× in scene coordinates. Shadow frames sync with character frames. Direction follows actual post-collision movement, so blocked movement returns to idle. Profile/system reduced-motion keeps animation frames still while retaining travel.

Manifest is fetched from its public URL (no duplicate metadata file or runtime import from public). Load failures retain semantic destinations/retry. Room copy now acknowledges supplied animation and temporary side/up views. Side/back stopgaps remain as labelled by the asset author; final environment art remains pending.

Animation selector tests observed RED→GREEN. Final checks: 51/51 unit tests, production build passed, 8/8 browser tests. Browser coverage explicitly verifies right-walk frames advance, release returns to idle, reduced-motion frame zero with continued movement, failed sprite navigation fallback and existing room/student flows.

## Room rebuild and interactive campus — 2026-11-02

Replaced the procedural rectangle room with the supplied room art; removed the dark frame; hid the joystick on mouse-and-keyboard desktops; room focuses on load so keys work immediately (route focus on the h1 had been blocking this). Near-diagonal walking keeps its direction and continues from the same frame instead of restarting. Added `src/game/area.ts` (shared rules), `src/game/campus.ts` (path polygons traced from the art, destinations), `src/game/createAreaGame.ts` (replaces createRoomGame.ts) and `src/components/WalkableArea.tsx`. A reachability test caught the market cottage being unreachable at a narrow path junction; fixed. Known limits: the student draws over the statue when walking behind it, and on a few tree edges; no side/back views. Verification: 62 unit tests, 9 browser tests, production build, screenshots at desktop and 390px.

## Living world and game-first Home base — 2026-11-02

Added `src/game/ambient.ts`, configured per area in `room.ts` and `campus.ts`, and masks from `scripts/make-area-masks.cjs`. Hub now embeds WalkableArea with an overlay greeting; pins added to the room. The first sunbeam attempt read as grey bars in screenshots and was replaced by a soft floor patch. Clouds, ripples and falls need WebGL and are skipped on the canvas fallback. Motion was compared between screenshots taken about a second apart; performance on low-end phones has not been measured.

## Campus sprites, sway, loading and optimisation — 2026-11-02

Added `src/game/npcs.ts`, sway shader and footsteps in `src/game/ambient.ts`, `scripts/optimize-art.cjs`, sway maps in `scripts/make-area-masks.cjs`, and the status document `docs/PHASE_2_STATUS.md`. WalkableArea gained a placeholder, progress bar, paused state, off-screen sleeping and lite detection. Pages are lazy-loaded.

Found and fixed while verifying:
- The sway shader turned all background art black. Phaser defaults shader textures to REPEAT, which WebGL cannot do for non-power-of-two images. Fixed by passing `clamp_to_edge` explicitly (`clamp` is rejected).
- A route-checking test caught sample students cutting through gardens at three corners; routes corrected.
- Browser tests failed intermittently. A dependency-reload theory was tested against the Vite log and rejected. Evidence pointed to timeouts: 8 game browsers plus the dev server competing for the machine while school-site files were being edited in the same repo, which also triggers Tailwind rebuilds. (An earlier version of this note blamed software rendering. That was wrong: the test browser uses the Intel UHD GPU.) Config now uses 3 workers, a 60 s test limit and a 15 s assertion limit. One idle-after-keypress failure was not reproduced under diagnostics, so that cause is probable, not proven.

- On-demand pages exceeded Testing Library's 1 s wait on a busy machine, failing three unit tests; `src/test/setup.ts` now allows 5 s.

Verification: 63 unit tests (three consecutive runs), production build, 13/13 browser tests on the last three full runs. Production load times and motion measurements are in `docs/PHASE_2_STATUS.md`. Not verified: real phones, automatic quality drop on a real slow device, and student play-testing.

## Stage 2 connected exploration — 2026-11-02

Built Logic District, the QZ-COMP 101 lobby and the Variables area as walkable places at `/explore/<id>`, using temporary pictures that are labelled as temporary. The campus bridge leads onward and each place has a way back; returning arrives at the door you left through. Added guide characters, honest "not open yet" messages, locked-mission previews, the mission path, quick travel from the room and a link from the course page. Mission text is demo content and Start mission stays disabled until Stage 3.

Bugs found and fixed: arriving on an exit triggered it, so spawns moved away from exits; an endless arrow animation made pins unclickable, so it now plays twice; keys did nothing on load because the page heading held focus; slow-device detection used capped time, so it now uses real elapsed time.

Ruling: machines with software-only graphics get the lighter version automatically — cost if wrong: those machines see fewer effects. Add `?quality=full` to override.

Correction: earlier notes said browser tests were slow because they render in software. That was wrong. They use the Intel UHD GPU.

Frame rate on this Intel UHD laptop, one browser at a time, dev server:

| Place | Ready | Frame rate | Worst frame |
|---|---|---|---|
| Campus, full | 2.6 s | 144 fps | 14 ms |
| Campus, lite | 1.8 s | 144 fps | not recorded |
| Room, full | 2.7 s | 143 fps | not recorded |
| Room, lite | 1.8 s | 144 fps | not recorded |
| Variables area | 1.7 s | 144 fps | not recorded |

Frame rate with the GPU turned off (`--disable-gpu`, SwiftShader):

| Place | Ready | Frame rate | Worst frame | Quality |
|---|---|---|---|---|
| Campus, automatic | 2.2 s | 3 fps | 400 ms | lite, chosen automatically |
| Campus, forced full | 3.8 s | 2 fps | 467 ms | full |
| Room, automatic | 2.3 s | 6 fps | 200 ms | lite, chosen automatically |

Finding: detection works, but the lighter version is not enough without a GPU. The game is not playable on such a machine. Not addressed yet. Not measured on real phones.

Soak: 12 area changes kept one canvas with no crash. Heap grew from 46 to 68 MB; not investigated further.

Flaky campus test: with 3 workers, 3 of 6 repeats failed, on teardown or the 60 s limit, with no failed assertion. The traces show the whole test run stalling, including a 1.5 s wait that took 7 s. The cause of that stall was not identified. It coincided with other work on the machine, but that link is not proven. One at a time, 4 of 4 passed. Game-load waits are now 30 s.

Verification: 85 unit tests pass, build passes, 14 of 14 browser tests pass in the latest full run. The flake above could return under load.


## Remaining Phase 2 implementation — 2026-11-03

User authorised completing the rest of Phase 2. Work stayed inside the existing real product folder; no new repository, automatic commits, school-site changes, purchases or cloud gameplay schema. Completion outline: docs/PHASE_2_COMPLETION_PLAN.md.

Final art: three supplied/generated PNG sources optimised into WebP, entrances/spawn/floor/pins refitted and ambient masks/glows added. Focused area tests passed 23/23.

Learning: src/learning contains typed ActivityRenderer, pure evaluators and error/replacement boundary. Seven presentations support native keyboard/touch lists, select/place and dragging; multipart feedback retains answers. src/content/phase2/routes.ts contains three original CS stories, each seven types/two variants, optional checkpoint, changing-values followup and three-type Mathematics demonstration. Every authored answer is checked against the actual evaluator.

Missions: walkable markers open focused panels over paused world; checklist and authored help, explicit checkpoint/save/discard, per-visit suspended route state, optional timers, five attempts with free practice/hour refill. src/missions owns rules, provider, screens, journal and styles. Local saves isolate account IDs and preview, preserve corrupted bytes, and report failed writes without granting unsaved progress. Results show first/eventual accuracy, transparent 70/30 grade, stars, elapsed time, hints, gems, unresolved objectives, history and best/latest. Next mission unlocks after any primary story. Rewards capped; no money buys learning.

Rulings: use existing courtyard for each story rather than invent unapproved scenery; cost: story settings currently differ through authored objects/tasks, not different backgrounds. Use provisional config (20 first gems, three 5-gem replays, 2 speed bonus, 90/180-second optional timers, 3 Panthy uses); cost: tune after playtesting. Suspended route evidence stays in memory only; explicit saves persist evidence and attempt metadata but no draft answers; cost: browser closure loses unsaved work as specified. No milestone Paw Tokens awarded because no Phase2 premium-currency milestone was defined; balance is shown as zero.

Fresh reviewer found shallow nested save validation, inaccessible stacked leave dialog, route-switch data loss, refill countdown starting too early, unevaluated reflection refills, and lost first-attempt metadata. Fixed all six: deep validation; focus/inert/trap; suspended sessions; hour begins at exhaustion; two evaluated related problems; saved evidence retains tries. Regressions cover these plus owner changes and write failures. Mobile timing selector overflow and added-header-link overflow found in browser runs; selector constrained and journal link placed in footer. Existing browser assertions updated from disabled missions/temporary door positions to playable mission links/final art.

Remaining acceptance: user play/visual review, real phones and slow-device performance. Existing front-only sprites, overdraw/occlusion, no day/night selection and poor software-only GPU performance remain known asset/engine limitations. Introductory demo content is not a university-validated syllabus.

Final automated acceptance: 108/108 unit tests across 21 files; 22/22 Edge browser tests (one worker, 3.1 minutes); production build passed with the existing lazy Phaser chunk-size warning. Browser checks include all three CS routes, Mathematics, mobile, incorrect/incomplete answers, explicit saves, interruption, suspended stories, keyboard leave, five attempts/free practice, optional timer expiry/removal, corrupt save and storage failure. Desktop activity and mobile entrance screenshots inspected in docs/previews. Existing room/campus/foundation flows remain green. User visual/play acceptance and real-device testing are not claimed.
