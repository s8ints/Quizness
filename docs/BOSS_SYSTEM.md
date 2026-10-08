## Current phase assignment

The latest student-first brief supersedes earlier Phase 1 assignments in this document. Phase 1 builds real signup/login, onboarding, player hub, courses, profile/settings, and responsive navigation using labelled mock learning previews. Gameplay, missions, questions, bosses, and earning XP move to Phase 2; shared account-backed progression connects in Phase 3; deeper adaptation follows in Phase 4. Existing game mechanics and numeric rules remain proposals for those later phases. See STUDENT_EXPERIENCE.md, ROADMAP.md, and DECISIONS.md. The selected React/TypeScript/Tailwind/Phaser stack is retained; auth and database providers are unresolved.

# Boss system

## Subject-agnostic encounters

Bosses are major academic checkpoints orchestrating activities across concepts. A Computer Science boss may involve debugging; management may use a multi-stage workplace crisis; mathematics may use connected problems. Shared phases, feedback, evidence, completion, retries, rewards, and progression must work without programming-specific assumptions. HP/damage below is one proposed Loopkeeper presentation, not a required schema or mechanic for every boss.

## Confirmed direction

Bosses are a defining academic checkpoint: combine concepts, give answers visible game consequences, retain explanations, and offer focused recovery after mistakes. Phase 1 includes one boss, a health bar, visual reactions, results, and retry. Reuse the question/evaluation system. There are no timed attacks, learning lockouts, currency costs, or player lives in the initial design.

## Proposed Loopkeeper encounter — rules for implementation review

Use Programming Fundamentals → JavaScript Loops. The boss becomes available after four missions and a mini challenge are completed. Completion unlocks practice; it does not claim mastery. A mini challenge initially reuses the mission engine, without a separate mini-boss engine.

The Loopkeeper has 100 HP and six authored questions in three phases:

| Phase | Questions | Focus | Correct-answer damage |
| --- | --- | --- | --- |
| Read the loop | 1 easy, 1 medium | Termination and conditions | 10, 15 |
| Trace the loop | 2 medium | Iteration and output | 15, 15 |
| Combine concepts | 1 hard, 1 hard | Nested loops and applied reasoning | 25, 25 |

Total available damage is 105, so a perfect run can defeat the boss. Wrong answers cause zero damage, do not restore HP, and receive an explanation. Damage is `min(currentHP, configuredDamage)`; HP never goes below zero. Phase boundaries follow authored question order, rather than uncertain HP thresholds. No randomness or critical-hit multiplier initially.

## State and transitions

The controller owns boss ID, session ID, question order, answer records, phase index, HP, and status. Status is answering, feedback, victory, or review_needed. Selection can change before Check. A submitted question locks; its damage, concept attempt, and XP are recorded once.

Show feedback before proceeding. On Continue: zero HP opens victory; otherwise the next question begins; exhausted questions with HP remaining open review-needed results. Completing all questions without defeating the boss is an educational recovery result, not a completion unlock. Victory may stop the encounter early if a future damage configuration permits it; skipped questions receive no XP or performance evidence.

Results show actual answers, remaining HP, concepts to practise, earned XP, and actions to review, retry, or return to map. Retry creates a new session with full HP, reset answers, and the same initial authored sequence. Retain earlier durable progress. No cooldown or retry fee. A future question pool can add variation.

## Rewards and presentation

Proposed first-victory bonus: 150 XP, once per boss per saved profile. Question rewards follow PROGRESSION_SYSTEM.md. Save the defeated flag and bonus in the same progress update. Replays do not duplicate first-clear rewards. Badges, cosmetics, star ratings, and extra areas are future extensions; the demo can finish with a course-path completion summary.

Phaser presents the boss and avatar reactions; React retains prompts, choices, HP text, feedback, and actions. Use reduced-motion fallback poses and labelled original/licensed placeholders if frames are absent. A failed animation must not block answering or Continue.

## Verification

Verify perfect-run victory, all-wrong recovery, mixed-result recovery, damage clamping, duplicate submission, final feedback before results, phase transitions, retry resets, first-victory reward exactly once, and refresh after victory. Validate that authored total damage can reach max HP and that every question/concept reference resolves. HP is game feedback, not a validated mastery measure.

