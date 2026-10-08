## Current phase assignment

## Subject-independent concept evidence

Track concepts across academic disciplines using typed activity outcomes and explicit evidence-attribution rules. Do not assume every activity yields one binary correct/incorrect code answer. The initial counts and accuracy recommendation are limited choice-activity proposals; partial credit, multiple concepts, scenarios, and staged activities require defined rules before mixing their evidence into mastery.

The latest student-first brief supersedes earlier Phase 1 assignments in this document. Phase 1 builds real signup/login, onboarding, player hub, courses, profile/settings, and responsive navigation using labelled mock learning previews. Gameplay, missions, questions, bosses, and earning XP move to Phase 2; shared account-backed progression connects in Phase 3; deeper adaptation follows in Phase 4. Existing game mechanics and numeric rules remain proposals for those later phases. See STUDENT_EXPERIENCE.md, ROADMAP.md, and DECISIONS.md. The selected React/TypeScript/Tailwind/Phaser stack is retained; auth and database providers are unresolved.

# Adaptive learning — current Phase 1 boundary

Track concept attempts and correct answers from missions and bosses in local saved progress. Display actual evidence and transparent practice recommendations; XP and boss defeat are separate from mastery. Phase 1 does not implement a validated 0–100 mastery score or the source's illustrative percentage thresholds as an adaptive algorithm.

Proposed first rule: recommend the attempted concept with lowest observed accuracy; break ties by authored concept order. With all answers correct, suggest reinforcing the topic. Unattempted concepts have no evidence. Boss recovery results link to relevant unlocked practice and mistake explanations. Label limited samples explicitly using PROGRESSION_SYSTEM.md's provisional practice labels.

Fixed authored sequences support the first missions and boss. Live easier/harder selection, recency weighting, spaced review, hints, question pools, and repeated-mistake intervention are later rules to design and test. Do not describe random selection as adaptation. The formulas in supplied notes are examples, not ready algorithms.

# Historical notes — superseded where conflicting

The current summary above and DECISIONS.md take precedence. Earlier proposals are retained for traceability.

# Learning system

## Confirmed direction

Track performance by concept. Questions carry course, topic, concept, type, and difficulty metadata. Feedback explains why an answer works and supports learners after mistakes. Adaptation should use understandable rules, never claims of intelligence unsupported by implementation.

## Proposed first implementation

Use a fixed, authored six-question session, with two questions per concept across three concepts. Store attempted and correct counts per concept. Show evidence such as “1 of 2 correct” with labels like “Practise next” and “Good start.” A short session does not establish mastery; do not report mastery percentages from it.

Recommend a concept with the lowest correct/attempted ratio among attempted concepts. Break ties by authored concept order. If every answer is correct, recommend another practice session to reinforce the topic. Unattempted concepts have no evidence and must not count as weaknesses.

Every question includes the correct answer and a short explanation of the reasoning. Where useful, address a common misconception. Feedback uses text and a symbol alongside colour, with supportive wording such as “Not quite — here's why.”

This version recommends practice at the end; it does not adapt the active question sequence. A later, separate milestone may select easier related questions and revisit weak concepts using authored content and explicit rules.


## Supplied product notes

The following source sections preserve the expanded user-supplied vision. Possible features, schemas, numbers, and implementation examples remain proposals unless confirmed in DECISIONS.md. Source numbering is retained for traceability.

# 47. Mistake Recovery

Quizzness should intentionally revisit concepts that the player struggled with.

Example:

Player misses a question about nested loops.

Later in the session:

Give a simpler nested-loop question.

Then potentially:

Give another application of the concept.

The system should not simply show the explanation once and forget the mistake.

---

# 48. Mastery Concept

Long-term progress should be based more on demonstrated understanding than simply completing content.

Potential mastery states:

Not Started

Learning

Developing

Strong

Mastered

These labels are more understandable to students than exposing raw probability values.

Internally, Quizzness may eventually calculate mastery using numerical scores.

---

# 49. Possible Mastery Calculation — Early Version

An early simple system could track something like:

Correct answers

Difficulty

Recent performance

Number of attempts

For example:

Easy correct answer = small mastery increase

Medium correct answer = moderate mastery increase

Hard correct answer = larger mastery increase

Incorrect answer = decrease or slower progression

Recent answers may matter more than very old answers.

This is only a conceptual model.

Do not implement it without first designing the exact scoring rules.

---

# 50. Spaced Review

Eventually, Quizzness should be able to bring concepts back after time has passed.

Example:

Student masters:

HTML semantic elements

Three days later, Quizzness might include a short review question.

This can help prevent the student from forgetting material.

Spaced review is a long-term feature and does not need to be included in the first MVP.

---

# 78. Randomization

Questions may eventually be randomized.

However, randomization must not destroy intentional learning progression.

Example:

Bad:

randomly select ten unrelated questions.

Better:

choose questions based on topic, difficulty, recent performance, and concept coverage.

---

# 79. Question Pools

A lesson might use a pool.

Example:

Lesson: Big O Basics

Question pool:

5 constant-time questions

6 linear-time questions

5 nested-loop questions

4 conceptual questions

The session engine can choose an appropriate subset.

This helps make repeat sessions different.

---


