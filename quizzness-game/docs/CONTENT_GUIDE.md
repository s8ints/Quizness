## Current phase assignment

## Subject coverage and activity examples

These are content possibilities, not instructions to build all activity types now. Computer Science is an early demonstration; the engine supports tertiary education across subjects from its architecture onward.

| Subject | Suitable activity examples |
| --- | --- |
| Computer Science | Code completion, debugging, output prediction, algorithm ordering |
| Mathematics | Next-step problems, equation building, error finding, graph matching, multi-step calculations |
| Management | Workplace scenarios, theory matching, decisions, case analysis |
| Business | Pricing scenarios, market decisions, financial interpretation, entrepreneurship cases |
| Biology | Diagram labelling, process ordering, structure matching, scenarios |
| Chemistry | Balancing, reaction prediction, formula matching, calculations |
| Psychology | Scenario interpretation, theory application, concept matching |
| History | Timelines, source interpretation, cause-and-effect ordering |
| Languages | Vocabulary, sentence construction; listening/reading activities later |
| Law | Case scenarios, principle application, issue spotting |
| Accounting | Transaction classification, statement building, calculations, error detection |

Course examples and UI fixtures should represent more than one discipline without implying that all courses already have playable content. Every implemented activity needs explicit accepted inputs, evaluation rules, meaningful feedback, and an accessible interaction. Keep open-ended academic judgments authored/reviewed until a suitable evaluation design exists.

The latest student-first brief supersedes earlier Phase 1 assignments in this document. Phase 1 builds real signup/login, onboarding, player hub, courses, profile/settings, and responsive navigation using labelled mock learning previews. Gameplay, missions, questions, bosses, and earning XP move to Phase 2; shared account-backed progression connects in Phase 3; deeper adaptation follows in Phase 4. Existing game mechanics and numeric rules remain proposals for those later phases. See STUDENT_EXPERIENCE.md, ROADMAP.md, and DECISIONS.md. The selected React/TypeScript/Tailwind/Phaser stack is retained. Current status: Vite + React Router are in use, and Supabase Auth/Postgres is selected and integrated in code but not yet verified against a live project.

# Content guide — current demo proposal

The latest game direction replaces Variables and Conditionals with a proposed Programming Fundamentals / JavaScript Loops path: Loop Basics, Loop Conditions, Predict the Output, Mini Challenge, Nested Loops, then The Loopkeeper. Content names remain editable; the engine remains course-independent.

Author 5–6 activities per mission, a short mini challenge, and six boss questions. Cover loop basics, conditions/termination, output tracing, and nested loops. Every code-output prompt must include the complete relevant snippet and a reviewed expected result. Show a short objective, challenge count, estimated time (clearly an estimate), and reward rules before play.

Ensure boss phase questions combine already-practised concepts and total possible damage reaches the configured HP. Provide explanations for every submitted answer and plausible misconceptions as distractors. Avoid code execution; answers are authored data. Mini challenge and boss question pools must not silently repeat the same question as multiple scored attempts in one session.

Missing art may use clearly labelled original/licensed placeholders. Preserve source/license details; do not obtain assets or course material from the separate school repository. The historical sample content and source examples below remain references, not the current demo selection.

# Historical notes — superseded where conflicting

The current summary above and DECISIONS.md take precedence. Earlier proposals are retained for traceability.

# Content guide

## Authoring principles

Content should teach academically meaningful concepts through active practice. Use clear prompts, plausible misconceptions as distractors, and concise explanations of why the answer works. Difficulty comes from reasoning demands, not confusing wording.

## Proposed first lesson

Programming Fundamentals → Variables and Conditionals, with six questions covering three concepts and two questions per concept. Suggested concepts: assignment, comparisons, and conditional branches. These are proposals pending content review. Start approachable, then introduce application questions; give a brief learning objective before play.

## Review checklist

- Course, topic, concept, and question IDs are stable and references resolve.
- The tested concept and learning objective are clear.
- Exactly one answer is correct for single-choice activities; true/false has two options.
- Distractors represent plausible mistakes; correct answers are not always in the same position.
- Any code or scenario includes enough information to determine the answer.
- The explanation gives the correct answer, reasoning, and relevant misconception.
- Difficulty and reward metadata match the documented lesson rules.
- Examples are understandable internationally; regional context is used when it helps.
- Sources and rights are recorded for externally supplied content and assets.
- The full lesson is previewed before treating it as ready.

Keep content outside JSX. Use original or appropriately licensed assets, label placeholders, and retain license information. AI-generated material and study imports require review and are later-stage features. No course completion display should imply formal accreditation without supporting arrangements.


## Supplied product notes

The following source sections preserve the expanded user-supplied vision. Possible features, schemas, numbers, and implementation examples remain proposals unless confirmed in DECISIONS.md. Source numbering is retained for traceability.

# 88. AI Features — Long Term

Possible future AI uses:

generate practice questions from student notes

simplify explanations

identify concepts from uploaded study material

create personalized examples

recommend learning sequences

support tutors

AI output should not automatically be trusted as academically correct.

Content verification will be important.

Do not make the initial game dependent on external AI APIs.

---

# 89. Uploading Study Material — Future

Students may eventually upload:

lecture notes

PDFs

slides

course outlines

study guides

The system might convert material into:

practice questions

flashcards

interactive challenges

concept maps

This is a major future feature.

It should not distract from building the base learning engine.

---

# 111. Asset Licensing

Do not copy copyrighted game assets.

Use:

original artwork

properly licensed assets

open-source assets with compatible licenses

Keep license information for third-party assets.

---

# 112. Placeholder Assets

During development, placeholder assets are acceptable.

Do not let missing final artwork prevent gameplay systems from being built.

However, clearly label placeholders so they are not accidentally treated as final assets.

---

# 118. Caribbean Context

The initial Quizzness concept comes from a Caribbean university context.

The product should feel natural to Caribbean students without making the platform exclusively Caribbean.

Examples and course content can sometimes use familiar regional context.

However, avoid forcing Caribbean references into every lesson.

The product should remain globally scalable.

---

# 119. Course Examples

Examples can be more memorable when they feel realistic.

For business:

A small Caribbean business deciding pricing.

For computing:

A university registration system.

For math:

Student enrollment calculations.

For management:

A public-sector department.

Use context when it improves understanding.

Do not sacrifice academic clarity just to make an example local.

---

# 120. Content Quality

Questions should test understanding, not trick students.

Avoid:

ambiguous wording

multiple technically correct answers unless expected

unnecessarily difficult vocabulary

irrelevant details

trick answers designed purely to confuse

Good questions should reveal whether the learner understands the concept.

---

# 121. Distractors

Wrong multiple-choice options should represent plausible misconceptions.

Example:

Question:

What is the complexity of one loop over n items?

Good distractors:

O(1)

O(log n)

O(n²)

Correct:

O(n)

Avoid absurd options that make the answer obvious.

---

# 122. Explanation Quality

Explanations should directly address the misconception.

Example:

Wrong answer:

O(n²)

Explanation:

O(n²) usually appears when work grows roughly like n × n, such as two nested loops. This example has only one loop over n items, so it is O(n).

This is more useful than:

"The correct answer is O(n)."

---

# 123. Game Difficulty Curve

Within a lesson:

Start approachable.

Then gradually increase difficulty.

Example:

Question 1:
Definition

Question 2:
Recognition

Question 3:
Simple application

Question 4:
Application with distraction

Question 5:
Challenge

This creates a sense of progression.

---

# 125. Course Completion

Completing a course could provide:

completion badge

course certificate-like summary

final mastery overview

personal learning statistics

Do not imply formal academic accreditation unless a university partnership actually supports it.

---

# 129. Content Authoring

Long-term, lecturers or content creators may need tools to create lessons.

Possible editor:

Select course

Select topic

Create question

Choose question type

Enter answer

Enter explanation

Set difficulty

Tag concept

Preview

Publish

This is later-stage functionality.

---


