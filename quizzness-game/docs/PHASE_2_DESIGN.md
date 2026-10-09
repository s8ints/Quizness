# Phase 2 design — exploration and playable missions

Date: 2026-10-09. Status: finalized planning baseline for now, as confirmed by the user. Read [PHASE_2_ADJUSTMENTS.md](PHASE_2_ADJUSTMENTS.md) first: its approved rules override conflicting answers and proposals preserved below. Finalized planning does not mean gameplay implementation is complete. Values explicitly marked proposed remain playtest proposals.

Conversation handoff for Claude and other collaborators: [PHASE_2_CONVERSATION_CONTEXT.md](PHASE_2_CONVERSATION_CONTEXT.md). The 80 answers below preserve the original planning discussion; do not treat superseded currency, timer, grade or help rules as current requirements.

This records 80 planning answers: 16 for each of five steps. The confirmed choices below supersede conflicting older Phase 2 proposals. Phase 1 is complete according to the implementation ledger and the user's live checks. Do not repeat its completed work.

All website files, dependencies, art, plans and build outputs must stay within this existing `quizzness-game` directory. Its current absolute location is `C:/Users/jolic/Quizzness/Quizness/quizzness-game`. Do not recreate the former parent-level project, restore deliberately deleted files or create a Git repository. The surrounding school project is outside this scope.

## Product and experience

Quizzness remains a subject-agnostic tertiary learning game. COMP-101 is the first demo, not the architecture's subject restriction. Preserve Panthy, the original student designs and the approved palette: #7A4E9D, #C9B6E4, #1B4332, #40916C, #EFE6DD.

The connected journey is:

Student room → shared campus → subject region → individual course world / entrance lobby → topic location → mission route → interactive activities → results.

Subject regions connect course worlds. Topics occupy locations inside a course world. Each topic is walkable and has a separate mission-path overview. A mission has alternative equivalent story routes; completing one route completes that mission. The shared checkpoint is optional practice after route completion.

## Step 1 — Course maps: 16 confirmed answers

1. Support walking, clickable destinations, path overviews and quick travel from the student room. Mission paths belong to the selected course/topic, not a global unrelated path.
2. Enter a small course lobby, choose a topic, then open its mission path.
3. Each course has its own world; topics are locations within it.
4. Existing subject worlds become regions connecting their individual course worlds.
5. All six spaces support movement: room, campus, subject regions, course worlds, entrance lobbies and topic locations.
6. Movement controls: WASD, arrow keys, mobile joystick and an accessible location list. Pointer walking was not selected; clicking destinations/shortcuts remains a navigation feature, not click-to-walk.
7. Use an angled top-down perspective, inspired by classic Pokémon towns, with original Quizzness art.
8. Show one whole area at a time; change areas at exits rather than following the character through a scrolling map.
9. Approach an entrance, then use an interaction key or mobile interaction button.
10. All topic locations can be explored; missions unlock through prerequisites.
11. Locked missions show title/objective, exact prerequisite and its location, time/difficulty, skippable story teaser and learning-material preview.
12. Each topic has a walkable area and an optional separate path overview.
13. Mission paths offer several equally valid routes.
14. Routes differ in stories/settings, activity styles and concept order, while converging on shared learning goals/checkpoints.
15. Panthy offers optional directions/hints; subject-specific NPCs introduce topics/missions. Background crowds and multiplayer were not selected.
16. First playable map build is one small connected slice: room → campus → one subject region → one course world → one topic area.

## Step 2 — Missions: 16 confirmed answers

1. First playable mission belongs to COMP-101.
2. Teach variables, values and data types.
3. Combine a story problem, an optional short lesson, guided practice and independent challenges. Students can jump into practice; explanations remain available.
4. Use all three suggested scenarios as equivalent routes: organise a campus event; repair a terminal with mixed-up values; set up an adventure inventory.
5. A route typically takes 10–15 minutes, excluding optional explanations and retries.
6. Explore a small mission area, interact with NPCs/objects and open focused activities; return to exploration between sections.
7. Before starting show objectives, estimated time, skippable story introduction and completion requirements.
8. Progress is conveyed by an objective checklist, NPC acknowledgement and an optional journal. No progress bar was requested.
9. Deliberate mission exit offers Save and leave or Discard attempt; warn before discarding.
10. Unexpected browser closure returns to the mission entrance, with a notice that the interrupted attempt was not saved.
11. Save and leave stores completed activities and resumes at the next unfinished activity, not unfinished answers.
12. Switch freely between routes; each route has separate progress.
13. Completing one route completes the mission; shared checkpoint is optional practice.
14. Other routes become optional replay adventures for practising the same concepts differently.
15. Panthy help costs gems; worked examples and glossary are available. The earlier idea of occasional NPC charges was superseded by Step 4 answer 9: NPC help is free.
16. Teach language-neutral concepts/pseudocode and later connect them to the language taught in the user's COMP-101 course. The actual language has not been specified; do not silently choose Python.

## Step 3 — Activity engine: 16 confirmed answers

1. Include all seven requested task presentations: multiple choice, value/type matching, classification, assignment building from pieces, value-change prediction, error finding/correction and short typed answers.
2. Every story route mixes all seven presentations. Step 1's route variation is implemented through examples, sequencing and emphasis, without omitting the seven types.
3. Allow edits until the student presses Check answer.
4. Matching/sorting/piece tasks support mouse drag, touch drag, select-then-place, keyboard placement and a switchable simplified form/list version.
5. Multi-part answers are correct only when every part is correct; explain individual mistakes.
6. Per-activity evaluation may trim harmless surrounding spaces, ignore case where semantically irrelevant, accept equivalent numeric forms where allowed and accept reviewed alternatives. Exact syntax/type distinctions are enforced where they are the objective.
7. Correction tasks start with provided pieces; later challenges introduce short text editing.
8. Value changes use step-by-step tracing first, then final-value prediction.
9. Replays use reviewed variants of values/examples/option order with the same objectives.
10. Some required activities are timed; accessibility settings extend or remove the timer.
11. Timer expiry ends that activity attempt, shows feedback and allows another attempt under the attempt rules.
12. Activities follow a teaching sequence; earlier ones remain available for review.
13. Mathematics supplies a second small demo: numeric answers, matching and finding an incorrect step, using the same engine.
14. Broken/unloadable activities offer retry and a clearly marked reviewed replacement covering the same objective. If no valid replacement exists, show an honest recoverable error rather than inventing completion.
15. Content starts as original introductory demo material, labelled until checked against the real course.
16. Activities appear in a large panel over a paused world, with surrounding scenery visible.

## Step 4 — Feedback and retries: 16 confirmed answers

1. Incorrect answers receive a mistake explanation without the full solution, then a retry.
2. Ordinary activities have a limited attempt budget; gems unlock more attempts.
3. Five initial attempts per activity.
4. Long-term gem sources include starting allowance, mission/objective completion, optional practice, free daily allowance, streak/milestones and paid purchases. Answer 15 below defers paid purchases.
5. At zero attempts and zero gems: free practice, lessons and worked examples remain available; remedial practice earns gems; attempts also refill after a wait.
6. A gem-funded refill restores five attempts for that activity.
7. One gem payment unlocks a Panthy conversation for the current activity.
8. Panthy starts with authored dialogue and reviewed hints; free-text AI conversation is later work.
9. NPC help is free, including repeating basic instructions. This supersedes earlier occasional NPC charges.
10. Correct answers receive a short explanation, small celebration, story connection and optional deeper explanation/worked example.
11. Preserve incorrect multi-part entries/placements and highlight parts needing correction.
12. Incorrect valid submission, timer expiry and leaving an unfinished activity each consume an attempt. Incomplete submissions and viewing help do not.
13. Exhausted attempts refill to five after one hour.
14. Agent should propose a small configurable allowance/reward/price set for review and testing; exact values are not yet approved.
15. Phase 2 includes earned/free gems only; real-money purchases come later after testing the free economy.
16. Every spend shows cost, current balance and resulting balance and requires confirmation.

## Step 5 — Results and checkpoints: 16 confirmed answers

1. Completing a route means attempting every required activity and reviewing unresolved mistakes; perfect accuracy is not required.
2. After exhausting attempts, students can review and continue immediately. Retrying the activity still uses gem/refill rules.
3. Results show objectives, correct/unresolved answers, first-attempt accuracy separate from eventual correctness, time, hints and gems, suggested practice and next available mission/route.
4. Show Mission completed, a separate performance grade and concepts marked Needs practice.
5. Grade combines first-attempt accuracy and improvement; explain its calculation.
6. Show percentage, letter grade and a short descriptive label.
7. Route completion unlocks the next mission; low grade recommends practice without blocking progression.
8. Optional checkpoint is a short mix of new problems covering all routes' common goals.
9. Checkpoint opens after any one route is completed.
10. Checkpoint activities use the same five-attempt, hint, gem and refill rules.
11. Gameplay progress/results/gems persist locally in Phase 2; account-backed gameplay persistence remains Phase 3. Existing Supabase authentication/profile persistence is retained.
12. Main result is the best grade; latest result and attempt history are also available.
13. First-completion reward is awarded once; reviewed practice variants give smaller, capped rewards.
14. Progress appears in mission markers/path overview, course lobby, global journal and course cards. Room-dashboard gameplay progress was not selected.
15. Completion has a short skippable in-world celebration, then the results panel.
16. Completion checks include all routes/connected journey, the Mathematics demo, accessible/mobile controls, save/discard/closure/retry/gem/refill rules, grading/reward/unlock correctness and the user's visual/experience review.

## Proposed implementation approach — not yet approved

### Options and recommendation

1. **Recommended: one connected, polished slice first.** Develop the six small areas and one route with a few activities, then fill the seven task presentations and remaining routes. Every stage is playable and reviewable; expansion follows the proven shared contracts.
2. Build the whole world network before missions. This offers early exploration but delays the learning loop and risks producing many empty areas.
3. Build a detached mission prototype before exploration. It proves evaluation quickly but risks another mismatch between gameplay and the requested world experience.

Retain TypeScript, React, Vite, React Router and existing styling. Add Phaser only for walkable scenes. React owns semantic navigation, dialogue, journal, activity panels, gem confirmations and results. Pure TypeScript owns evaluation, mission rules, attempts, grades and rewards. Phaser must not maintain separate copies of those values.

Keep `src/data/worlds.ts` region IDs, `src/data/courses.ts` course IDs and selected-course references stable. The existing first course is `qz-comp-101`, topic `qz-comp-101-topic-1`; display the requested COMP-101 demo clearly without implying verified university alignment. Add area/mission content without renaming saved IDs.

Proposed focused modules:

- `src/game/`: scene host, area scene, input/collision/interaction presentation.
- `src/content/phase2/`: area definitions, COMP-101 mission/routes, reviewed variants, Mathematics demo.
- `src/learning/`: typed activity definitions/inputs, validation, pure evaluators, renderer and task controls.
- `src/missions/`: route/session state, activity-attempt rules, journal, results and mission screen.
- `src/progression/`: local gem ledger, rewards, grades and prerequisite selectors.
- `src/storage/`: versioned, per-account local gameplay saves and interrupted-attempt markers.
- Extend existing `src/app/App.tsx`, Hub, Campus, Worlds/CourseOverview and CourseCard in place; preserve working Phase 1 flows.

Seven task presentations do not imply seven unrelated engines. Use typed choice, matching, classification, piece-building, short-input and staged-trace contracts; error correction and prediction compose these. Never execute code with `eval`. Compare authored semantic answers; code execution requires a later explicit design.

### Local persistence and safety rules proposed for review

- Local gameplay saves are scoped to account ID; preview uses a separate namespace. Clear in-memory gameplay on account changes. No cross-device claim or competitive authority in Phase 2.
- Persist completed mission results, reward transactions, attempt spending/refill timestamps and explicit Save and leave checkpoints. Do not automatically save active answer drafts or route completion work during normal play.
- Persist an active-attempt marker so an unexpected closure can show the agreed notice. It must not erase a previous explicit saved checkpoint or prior completed results. Resume from the entrance and offer the previous explicit save if present; confirm this interpretation before implementation.
- Discard removes current unsaved route work, not completed mission history or committed gem spends. Do not refund/reissue rewards by refreshing or restarting.
- Switching routes suspends the in-memory route rather than consuming an attempt solely because of the switch. Explicitly abandoning an unfinished activity consumes one attempt; accidental navigation, accessibility mode changes, help opening and software errors should not. Confirm the distinction before implementation because the answer said leaving an activity consumes an attempt.
- Timer starts when the activity is ready and pauses while hidden or in accessibility/help dialogs; timer extension/removal is accessible before starting. This pause policy is proposed, not confirmed.
- Validate saves; preserve recoverable old data on corruption, report storage failure and avoid claiming a save succeeded. Gem debit and refill/conversation unlock are one idempotent local transaction.
- Local records and time cannot enforce a real-money economy. Paid gems are deferred; a server-authoritative ledger would be needed before purchases.

### Proposed economy values for playtesting

All values live in a single configuration, not hard-coded into activity renderers. These are proposals the user requested, not accepted prices.

| Action | Proposed gems |
| --- | ---: |
| Starting allowance, once per local account | 25 |
| Daily allowance, once per UTC day | 5 |
| First mission completion, once | 10 |
| First completion of another equivalent route, once per route | 3 |
| Optional reviewed practice variant | 2, capped at 10 practice gems/day |
| Reviewed milestone, once | 5 |
| Unlock authored Panthy conversation for one activity instance | 3 |
| Restore five attempts for one exhausted activity | 5 |

Free remedial practice has unlimited attempts and can earn practice gems up to the cap. Once capped, free learning remains available and the one-hour refill still operates. Do not grant gems for unresolved objectives merely because they were attempted; the mission completion reward follows the agreed completion-and-review rule. Rewards have stable transaction IDs, preventing duplicate claims. Streak rewards can be deferred within this phase until daily rules are tested; no paid purchase UI.

### Proposed grading for review

For N required activities, let F be the fraction correct on the first checked attempt, and R the fraction eventually solved correctly within that route attempt. Overall percentage is `100 * (F + 0.30 * (R - F))`, equivalent to 70% first-attempt accuracy plus 30% eventual correctness. Improvement is separately displayed; used hints are disclosed without a separate grade penalty. Each activity counts once, including multi-part activities; hints/review cannot silently convert unresolved tasks into correct tasks.

Proposed bands: A ≥90, B ≥80, C ≥70, D ≥60, F <60. Labels describe performance on this practice set, never demonstrated long-term mastery or an institutional grade. Best results are only compared within the same mission/content/scoring version. This formula and bands require review.

## Staged delivery outline

1. **Art and movement proof:** inspect existing artwork, specify matching directional walk frames, build one small room area with collision, WASD/arrows, joystick and accessible destination controls. Review appearance and movement before producing all areas.
2. **Connected exploration:** room → campus → Logic District → COMP-101 world/lobby → variables topic area. Add transitions, semantic destination navigation, NPC interaction, locked-mission previews and quick travel. Whole-area cameras; no multiplayer.
3. **First mission route:** campus-event route with story/lesson choices, guided-to-independent sequence, panel-over-world interaction, three initial activity contracts and honest demo labels. Add deterministic evaluation tests and one keyboard/browser journey.
4. **Full activities and routes:** all seven presentations on every route; terminal and inventory routes; authored variants; timers/accessibility; worked examples/glossary; Mathematics demo proving reuse. Keep each route within the 10–15 minute target through playtesting.
5. **Attempts, gems and help:** five attempts, reviewed correction feedback, one-hour refill, free practice, authored paid Panthy conversation, free NPC help, local idempotent rewards/spends and confirmations.
6. **Results and persistence:** explicit save/discard, interrupted-attempt notice, independent route histories, mission completion/review, grades, prerequisites, optional checkpoint, capped replay rewards and progress in the selected surfaces.
7. **Acceptance pass:** verify the complete connected flow/all routes, non-code demo, keyboard/mobile/simplified controls, timer options, save errors, account switching, attempts/closure/refills, no duplicate gem debits/rewards, grade accuracy, and the user's visual/play review.

Each stage ends with runnable software and an appropriate focused test, then review. This outline is not a substitute for detailed implementation tasks; write those after the user reviews the design.

## Art and remaining decisions

The existing student sheet contains still poses, not authored directional walk cycles. Current room/campus images are illustrative references, not collision maps or ready-made matching top-down tiles. New matching animation frames and walkable-area assets are required. Preserve the supplied originals; do not replace Panthy or silently recolour/redesign the characters. Asset creation method and the first animated avatar must be settled before scene production.

Additional decisions to resolve during design review: actual COMP-101 language; final names/designs of new areas/NPCs; concrete topic mission sequence; grade/economy proposals; interruption/switching semantics; timer durations/pause behaviour; daily reset timezone and milestone definitions. No claims that these choices were answered in the 80 questions.

## Phase boundaries and completion

Phase 2 includes local mission/route progress and free/earned gems as specified here. It excludes live payments, multiplayer, AI chat, institution-verified content, bosses, connected account-backed XP/progression and adaptive mastery. Simple practice suggestions based on this attempt are allowed; long-term adaptive learning remains later work.

Phase 2 is complete only after the selected acceptance checks pass and the user plays/reviews the visuals and experience. A demo can prove one connected slice without pretending every catalogue course is playable; unimplemented worlds/topics stay clearly labelled.
