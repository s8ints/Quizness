# Phase 2 Part 1: room movement proof

User authorised starting Part 1 on 2026-10-09. Execute inline using executing-plans; no Git creation/commits/worktrees because the user deliberately removed Git. All work stays in this quizzness-game folder.

Spec: docs/PHASE_2_DESIGN.md, overridden by docs/PHASE_2_ADJUSTMENTS.md. This slice is the first art/movement proof, not all five map-planning sections or the entire connected journey.

Architecture: lazy-loaded Phaser scene; React accessible navigation and controls; pure tested TypeScript movement/collision. Existing original character sheet supplies still-pose frames, explicitly labelled; full directional walk animation and approved final environment art remain pending. Procedural pixel room is a reviewable map-layout prototype, not a replacement for approved original assets.

- [x] Write and observe failing movement/collision tests: normalised diagonal speed, walls, furniture, sliding, long-frame clamp and nearby interactions.
- [x] Implement room definition and movement rules.
- [x] Add Phaser host with unmount cleanup, focus-scoped input, blur/pause clearing, responsive scaling and original avatars/Panthy.
- [x] Add room route, entry link, mobile joystick, interaction button, accessible destination links and retry/fallback.
- [x] Verify movement, collision, pause/focus, pointer release, destination navigation, SPA repeat mount and mobile overflow in a browser; run unit suite/build/existing browser suite. Pointer cancellation also clears input by the shared stop handler; no synthetic cancellation-specific browser claim is made.
- [x] Record evidence and asset limitation in implementation ledger.

Verification: 49 unit tests, seven browser tests, production build successful. Matching directional animation and final approved room art remain pending after this movement proof.

Review focus: input must not hijack forms or navigation; no movement on blur/hidden/paused; no duplicate game/canvas after StrictMode or navigation; canvas failure must retain semantic navigation; small screens must show a complete area with readable HTML controls.
