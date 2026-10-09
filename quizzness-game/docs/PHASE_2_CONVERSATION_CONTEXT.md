# Phase 2 conversation context — handoff for Claude

Recorded: 2026-10-09. This is a contextual summary and decision trail, not a verbatim transcript. The user asked that this planning conversation be saved in docs so Claude can use it when asking follow-up questions. Latest user statement: **“the plan is updated and finalized for now.”**

## Read these in order

1. [PHASE_2_ADJUSTMENTS.md](PHASE_2_ADJUSTMENTS.md): approved changes; this wins wherever it conflicts with the original design.
2. [PHASE_2_DESIGN.md](PHASE_2_DESIGN.md): the original 80 planning answers, staged delivery outline and explicitly labelled implementation proposals.
3. This handoff: conversation context, corrections, user preferences and how to continue.
4. [IMPLEMENTATION_LEDGER.md](IMPLEMENTATION_LEDGER.md): evidence of completed Phase 1 work. Read the newest entries, not just the early pending setup notes.

The plan is finalized for now. Do not restart discovery or ask the same 80 questions again. Only clarify genuinely unresolved implementation details when needed. Do not promote a proposed number into a user-approved value.

## Important session corrections

- Phase 1 is complete. The assistant incorrectly said live authentication and profile work were still pending by relying on stale context. The ledger records the user's successful live signup, confirmation, login, onboarding, persistence, profile save, logout, recovery and second-account isolation checks. Do not reopen those tasks without new evidence of a problem.
- The website belongs solely inside the existing `quizzness-game` folder, currently `C:/Users/jolic/Quizzness/Quizness/quizzness-game`. Do not recreate the deleted parent-level project or scatter website assets, dependencies, build files or docs into its parent.
- The user deliberately deleted things and strongly objected to restoring them. Respect deletions. Do not recreate Git metadata or removed files as routine setup.
- The user rejected a generic dashboard and said removing the navbar did not solve its visual mismatch. The intended home is the student's own cosy room within the original Quizzness pixel world. Preserve the mascot, characters and five-colour palette. Existing visual changes are not permission for another unsolicited redesign.
- Quizzness is a tertiary learning game across subjects. COMP-101 is a demo course, not the definition of the engine.

## How the planning questions were conducted

The user explicitly requested a minimum of 16 questions for each step separately, and asked for the question tool rather than ordinary chat questions. We completed five sets of 16, in order: maps, missions, activity engine, feedback/retries, results/checkpoints.

Ask one question at a time when further questions are needed. The user often wants multiple selections and combined approaches. The available question tool only offers single-choice selection, so multi-select questions were presented as text questions with lettered choices; the user supplied letters, combinations or “all of the above.” Do not make compatible features artificially exclusive.

The user reported question cards disappearing. Keeping a card pending instead of ending the turn immediately helped them answer. Do not repeatedly reissue a question that already has an answer, or declare it answered when it has not been answered.

## Confirmed exploration direction

- Combine walking, clickable destinations, optional path overviews and quick travel from the room.
- Room → shared campus → subject region → individual course world/lobby → topic location → mission routes.
- Subject regions connect individual course worlds. A course entrance has a small lobby where students choose a topic.
- Every level of this journey supports walking. Use angled top-down areas with the entire current area on screen; transition at exits.
- Controls: WASD, arrows, mobile joystick and an accessible destination list. Approach entrances and use an interaction key/mobile button.
- Topic areas are walkable, with a separate mission-path overview. Explore all topics; mission availability follows prerequisites.
- Locked missions show objectives, prerequisite/location, time/difficulty, a skippable story teaser and preview learning material.
- Panthy and subject NPCs guide the player. Multiplayer/background student crowds were not selected.
- Start with one small connected slice rather than many empty maps.

## Confirmed mission and activity direction

- First mission: COMP-101 variables, values and data types. Original introductory demo material until checked against the actual course.
- Three equivalent story routes: campus event organisation, terminal repair and adventure inventory. Students can switch freely; routes retain separate progress.
- Each route mixes all seven presentations: multiple choice, matching, classification, assignment-piece building, value prediction, error correction and short typed answers.
- Routes take approximately 10–15 minutes excluding optional learning/retries. Combine optional lesson, guided practice and independent challenges inside a story.
- Explore and interact with objects/NPCs to open activities in a large panel over the paused world.
- Activities use a teaching sequence, permit review, and are editable until Check answer.
- Multi-part answers count as correct only when all parts are correct; preserve placements and explain/highlight mistakes.
- Input methods include drag/touch, select-then-place, keyboard and a simplified form/list alternative.
- Evaluation rules are type-specific: harmless formatting can be accepted; meaningful syntax and data-type distinctions must be checked.
- Start corrections with provided pieces, then introduce text editing. Start value prediction with step tracing.
- Replays use reviewed variants. A small Mathematics demo must prove that the same engine supports numeric answers, matching and error finding without programming assumptions.
- Introduce language-neutral concepts/pseudocode. The user's real COMP-101 language has not been supplied; don't silently pick Python.

## Current economy/help/timer rules — adjustments win

The original Q&A discussed buying hints/refills with gems, required timers and letter grades. **Those are historical answers, superseded by the approved adjustments.**

- Learning is always free. Currency cannot buy attempts, hints, explanations, answers, better grades or progress.
- Gems motivate learning and are for everyday cosmetics. Paw Tokens are primarily premium currency for special cosmetics, rarely earned through milestones/course completion.
- Phase 2 implements earning/showing balances, not purchases or the cosmetic shop. Real-money payments and secure server-side purchase ledgers are later work.
- Activities are untimed by default. Optional Speed challenges can award bonus gems; accessibility controls still apply.
- Five attempts per activity. At exhaustion, all five return after completing a short related practice set OR one hour, whichever happens first. No gem refill.
- Free practice, lessons, examples and NPC help remain available. Panthy has a limited number of free conversations; **three per mission route, resetting on replay, is a proposal for playtesting**, not a fixed approved number.
- Panthy starts with authored reviewed dialogue; free-text AI comes later.
- Results use percentage, stars and a friendly label, not letter grades.
- Every eventual currency spend needs clear cost/balance/resulting balance and confirmation. Paid benefits remain cosmetic; no loot boxes or artificial purchase urgency.

Do not reuse the original design's proposed Panthy/refill prices or A–F grade bands. Any scoring formula, star thresholds, earning rates, Speed bonuses and Panthy limits must follow the adjustments and remain configurable proposals until reviewed/tested.

## Completion, saves and results

- Finish a route by attempting required activities and reviewing unresolved mistakes. Perfect accuracy is not required. Students may review an exhausted activity and continue; retrying follows the current free practice/refill rules.
- One completed route completes the mission; other routes are optional replay adventures.
- Shared checkpoint is optional, unlocks after one route and uses new problems covering the common objectives.
- Route completion unlocks the next prerequisite mission; low performance recommends practice without blocking progress.
- Results show objectives, mistakes, first-attempt versus eventual correctness, time, help and currency details, practice suggestions and next steps. Grade calculation must be explained, without claiming long-term mastery.
- Best result is primary; latest result and history remain visible. First-completion rewards happen once; reviewed replay practice receives smaller capped rewards.
- Progress appears on mission markers/path overview, course lobby, global journal and course cards. Room-dashboard gameplay progress was not selected.
- Celebration is short and skippable, then results appear.
- Gameplay saves remain local in Phase 2; Supabase account-backed gameplay progress is Phase 3. Existing account/profile persistence stays in Supabase.
- Explicit Save and leave preserves completed activities, resuming at the next unfinished one. Discard requires warning. Unexpected closure returns to the mission entrance with an interrupted/not-saved notice.
- Exact interactions between existing explicit saves, route switching, timer pauses and interrupted attempts were proposed in the design, not directly answered. Resolve these narrowly rather than reopening the whole phase.

## What to ask next, only if needed

Implementation update, 2026-10-09: the user supplied student animation sheets in public/sprites/students and these are now connected to the walkable room for all six avatar IDs. Do not ask the user to provide sheets already present. Their manifest explicitly marks side/up views as stopgaps; use that metadata when discussing final directional artwork. See the latest animation integration entry in IMPLEMENTATION_LEDGER.md. The original source sheet is still poses, but the separate animation assets now exist.

The approved adjustment document identifies the remaining tuning decisions: Panthy's free-use limit, currency earning rates/prices, related practice sets qualifying for refills, and Speed challenge durations/bonuses. Additional implementation needs include matching walk sprites/map assets, the first animated avatar and eventual real COMP-101 language.

The original character sheet is still poses, not walking animation frames; illustrations are not automatically playable collision maps. Preserve originals and obtain/create matching assets through a separately specified asset workflow. Do not treat planning as proof those assets exist.

The user requested a finalized plan, not automatic implementation or deployment in this exchange. All 80 questions are complete. The next useful action is a focused implementation plan based on the finalized design and adjustments when requested, not another full questionnaire.

## Acceptance expectations

All selected checks are required: complete connected journey and three routes; Mathematics engine reuse; keyboard/mobile/simplified controls and timer accessibility; save/discard/closure/refill/help/currency behaviour; correct answers/scoring/reward caps/unlocks; and the user's visual/play review. Bosses, connected account-backed XP, deep adaptive mastery, multiplayer, AI chat and live payments remain later scope.
