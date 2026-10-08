## Current phase assignment

The latest student-first brief supersedes earlier Phase 1 assignments in this document. Phase 1 builds real signup/login, onboarding, player hub, courses, profile/settings, and responsive navigation using labelled mock learning previews. Gameplay, missions, questions, bosses, and earning XP move to Phase 2; shared account-backed progression connects in Phase 3; deeper adaptation follows in Phase 4. Existing game mechanics and numeric rules remain proposals for those later phases. See STUDENT_EXPERIENCE.md, ROADMAP.md, and DECISIONS.md. The selected React/TypeScript/Tailwind/Phaser stack is retained; auth and database providers are unresolved.

# Progression system

## Subject independence

Rewards, course unlocks, and concept evidence consume general activity outcomes, not code submissions or programming-specific metrics. XP measures participation; subject-specific evidence/rubrics inform learning performance. HP or a debugging result must not become the universal mastery model. The choice-based XP and Loopkeeper examples below are scoped proposals, not requirements for every subject.

## Three separate systems

Player progression measures participation through XP and levels. Course progression measures completed missions and boss checkpoints. Concept evidence measures demonstrated answers; XP, completion, and boss HP do not establish academic mastery.

Phase 1 includes total XP, a simple derived level, completed nodes, one boss completion flag, concept statistics, and local persistence. Cosmetics, currency, achievement catalogues, streaks, social competition, and formal mastery estimates remain future work.

## Proposed rewards and balancing defaults

For each first submission in a session: 5 participation XP plus a correct-answer bonus of 5/easy, 10/medium, or 15/hard. Thus an easy correct answer earns 10 XP and an incorrect answer earns 5 XP. Show participation XP honestly even after a mistake. This replaces the earlier proposed 10+5 formula.

Mission completion adds 25 XP on its first completion only. Mini-challenge completion adds 25 XP on its first completion only. Boss victory adds 150 XP on its first victory only. Replays earn question XP in new sessions but never another first-clear bonus. No XP deductions, perfect-run multipliers, damage-to-XP conversion, or daily caps initially. Repetition may accumulate XP without proving mastery; monitor whether rewards encourage useful practice before adding more rules.

For level L (starting at 1), the proposed cumulative threshold is `25 * (L - 1) * (L + 2)`: levels 1–4 begin at 0, 100, 250, and 450 XP. Derive the highest qualifying level from total XP; do not persist a conflicting level field. Levels do not lock essential content.

## Unlocks

The proposed demo path is Loop Basics → Loop Conditions → Predict the Output → Mini Challenge → Nested Loops → Loopkeeper. Completing each non-boss node unlocks the next. Completion means submitting all required questions and reaching results, regardless of accuracy. Explain prerequisites on locked nodes; earlier nodes remain replayable. Provide practice/review from results without requiring extra XP. A later free-practice bypass should be considered before applying strict paths to a broader course library.

## Concept evidence

Record attempts and correct counts by concept from unique submitted answers. Show “3 of 5 correct” and an explicitly provisional practice label, not a mastery percentage. Proposed labels: no attempts = Not practised; fewer than three attempts = Building evidence; with at least three attempts, below 50% = Needs practice, 50–79% = Developing, at least 80% = Strong recent practice. These thresholds are design proposals, not validated learning measures. Phase 1 uses accumulated local counts; recency weighting, hints, and difficulty-sensitive mastery need a later exact design.

## Local save contract

Use one versioned localStorage record, `quizzness.progress.v1`, containing schemaVersion, contentVersion, totalXp, completedNodeIds, defeatedBossIds, conceptStats, and appliedSessionIds. Level is derived. Commit one completed session's answer XP, first-clear bonus, concept deltas, and unlocks together; session ID prevents the same result from being applied twice.

During play, XP is pending session XP. Durable progress is saved on mission completion, boss victory, or boss review-needed results. A refresh mid-session returns to the map and loses that unfinished session; completed progress survives refresh. This avoids claiming mid-session resume. Save game outcomes independently of animations.

Validate data types, finite nonnegative XP/counts, correct <= attempts, unique IDs, schema version, and known content references when loading. Corrupt or unsupported saves show a recovery message and an explicit reset option; do not silently overwrite them. If storage is unavailable/full, continue in memory with “Progress could not be saved on this device.” Do not claim saved success. No accounts, cloud sync, or secure competitive rewards are implied by device-local storage.

Initial demo supports one active tab. Cross-tab merging, save migrations, and reset/export UI design need separate work before broader release. A new content version must be handled explicitly rather than quietly losing progress. Retain only necessary learning data and never credentials.

## Verification

Check XP at every difficulty and level threshold, all-wrong completion, repeated result application, replay bonuses, unlock order, incomplete-session refresh, completed-progress refresh, malformed/unsupported saves, and unavailable storage.

