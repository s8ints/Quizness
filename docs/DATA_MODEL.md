## Current phase assignment

The latest student-first brief supersedes earlier Phase 1 assignments in this document. Phase 1 builds real signup/login, onboarding, player hub, courses, profile/settings, and responsive navigation using labelled mock learning previews. Gameplay, missions, questions, bosses, and earning XP move to Phase 2; shared account-backed progression connects in Phase 3; deeper adaptation follows in Phase 4. Existing game mechanics and numeric rules remain proposals for those later phases. See STUDENT_EXPERIENCE.md, ROADMAP.md, and DECISIONS.md. The selected React/TypeScript/Tailwind/Phaser stack is retained. Current status: Vite + React Router are in use, and Supabase Auth/Postgres is selected and integrated in code but not yet verified against a live project.

## Proposed foundation records

The product model is subject-agnostic: Course → Topic/Area → Mission → Interactive Activity → Checkpoint → Boss. Subject metadata belongs to course/content records, not branching logic that assumes a programming course.

ActivityRenderer selects the appropriate interaction from the activity type; the data model does not require every activity to have code or answer options.

Proposed future Activity replaces the universal Question record: shared IDs, conceptIds, type, difficulty, objective/prompt, type-specific payload/evaluation configuration, and reward metadata. Mission and encounter phases reference activityIds. Submitted activity attempts carry typed input, evaluation outcome, explanation/feedback, concept evidence, and completion state; selectedOptionId/isCorrect apply only to relevant choice types. Checkpoints and bosses reference authored phases/activities and completion rules. Health/damage is an optional encounter presentation, not a requirement for management, law, mathematics, or every other subject.

Keep current single-concept/binary choice records as limited demo proposals. Do not implement all future payload shapes or create their database tables during Phase 1. Multi-concept attribution, partial credit, scenario rubrics, and staged completion require precise rules before implementation.

| Record | Fields and owner |
| --- | --- |
| Auth identity | Provider-managed user ID, email, verification/session state; no password stored by app |
| Student profile | userId, firstName, lastName, studyField, institution? or independent-learning choice, goalIds, avatarId, onboardingCompletedAt? |
| Preferences | userId, reduced-motion override if offered, other implemented settings only |
| Course catalogue | id, code?, title, description, theme metadata; initial authored sample catalogue |
| Course selection | userId, courseId; separate a personal selection from official institutional enrollment |
| Learning preview | Explicit fixture source marker, sample XP/level/progress/goals; excluded from real earned-progress records |

These are provider-neutral proposals, not database tables created today. Keep user profile/preferences/selections access-controlled by user ID. Never persist a shared mock student's identity as the signed-in user or silently promote fixture progress into real records. Future earned progress has a separate contract resolved for Phase 3.

# Data model — current Phase 1 proposal

Use structured local TypeScript content and a separate versioned progress record; no database. Institutions remain optional. This expands the earlier session-only model.

| Record | Proposed fields |
| --- | --- |
| Course | id, code?, title, description, theme?, topicIds |
| Topic | id, courseId, title, description, conceptIds, nodeIds |
| Concept | id, topicId, title |
| Map node | id, topicId, kind (mission/challenge/boss), activityId, prerequisiteNodeIds |
| Mission | id, topicId, title, objective, questionIds, firstCompletionXp |
| Question | id, courseId, topicId, conceptId, type, difficulty, prompt, options, correctOptionId, explanation; code-choice adds code/language/task |
| Boss | id, topicId, title, maxHealth, phases, damageByDifficulty, firstVictoryXp |
| Boss phase | id, title, questionIds |
| Answer | questionId, selectedOptionId, isCorrect, xpEarned, damageDealt? |
| Active session | id, activityId, questionIds, currentIndex, selectedOptionId?, status, answers; boss adds HP/phase |
| Saved progress | schemaVersion, contentVersion, totalXp, completedNodeIds, defeatedBossIds, conceptStats, appliedSessionIds |

Separate static content from learner progress: course completion and level are derived, not properties of authored course data. Answer records derive session totals; final results produce one durable progress update. Phase 1 answers are binary; future typed answer/result variants may support partial credit without changing every screen.

PROGRESSION_SYSTEM.md defines save validation, idempotency, failures, and refresh behavior. BOSS_SYSTEM.md defines HP and terminal states. The tables and older source schemas below are proposals rather than deployed database tables.

# Historical notes — superseded where conflicting

The current summary above and DECISIONS.md take precedence. Earlier proposals are retained for traceability.

# Data model

This is a proposed in-memory content model, not a database schema or framework decision. Use stable IDs so additional courses and question types can be added without rewriting session logic. Institutions remain optional.

| Record | Fields |
| --- | --- |
| Course | id, title, description |
| Topic | id, courseId, title, description, conceptIds |
| Concept | id, topicId, title |
| Question | id, courseId, topicId, conceptId, type, difficulty, prompt, options, correctOptionId, explanation, xpValue |
| Option | id, label |
| Answer record | questionId, selectedOptionId, isCorrect, xpEarned |
| Session | courseId, topicId, questionIds, currentIndex, status, answers |

For the proposed multiple-choice and true/false types, use option IDs rather than comparing display text or array positions. True/false has two labelled options. Other types may introduce their own answer shapes later.

Question difficulty is easy, medium, or hard. Session status is answering, feedback, or complete. Selection belongs to the current question; submission creates one answer record. Reject another submission for the same question.

Derive totals and concept counts from answer records to avoid keeping conflicting copies of the same state. Keep content outside UI components and validate referenced IDs, option IDs, explanations, and supported types before starting a session.

Phase 1 state lasts only for the current page visit. Refreshing resets progress. Persistent XP, accounts, and storage require a later explicit design decision.


## Supplied product notes

The following source sections preserve the expanded user-supplied vision. Possible features, schemas, numbers, and implementation examples remain proposals unless confirmed in DECISIONS.md. Source numbering is retained for traceability.

# 73. Suggested Session Data

A session may conceptually include:

sessionId

courseId

topicId

startedAt

completedAt

questions

currentQuestionIndex

answers

score

xpEarned

conceptPerformance

sessionStatus

Example sessionStatus values:

not_started

active

completed

abandoned

---

# 74. Suggested Answer Record

Each answer attempt may eventually include:

questionId

selectedAnswer

correct

attemptNumber

timeSpent

hintUsed

timestamp

This can support future analytics.

Do not collect unnecessary user data.

---

# 93. Database Philosophy

Do not design an enormous database before knowing what the product needs.

Start with the core entities.

Potential entities:

User

Course

Topic

Concept

Question

Lesson

Session

AnswerAttempt

Progress

Achievement

AvatarItem

More entities can be added as requirements become clear.

---

# 94. Possible Entity Relationships

Conceptually:

Course
has many Topics

Topic
has many Concepts

Concept
has many Questions

Lesson
contains Questions / Concepts

User
has many Sessions

Session
has many AnswerAttempts

User
has Progress records

This is conceptual, not a finalized schema.

---

# 95. Analytics

Future analytics could help students see:

time studied

lessons completed

accuracy

mastery improvements

weak concepts

strong concepts

study consistency

Analytics should answer meaningful learning questions rather than simply display numbers.

---

# 98. Privacy

Collect only data required for the experience.

Avoid collecting unnecessary personal information.

Student performance data should be treated as sensitive educational information.

Future institutional deployments may require additional privacy and data-governance requirements.

---


