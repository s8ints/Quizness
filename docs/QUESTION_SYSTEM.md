## Current phase assignment

## Activity system — current terminology and scope

This file retains its requested name for compatibility, but specifies the broader activity system. ActivityRenderer replaces QuestionRenderer as the architectural concept. A question is one kind of interactive activity. Shared metadata and session contracts must work across disciplines.

| Activity category | Example input | Evaluation considerations |
| --- | --- | --- |
| Multiple choice | Selected option ID | Authored choice key |
| Matching | Pairs of stable IDs | Complete mapping; partial-credit rule if used |
| Ordering | Ordered IDs | Authored sequence/valid alternatives |
| Calculation | Numeric/text input with units | Explicit tolerance, rounding, units |
| Code | Choice, completion, or trace | Authored answers initially; execution needs separate design |
| Scenario | Decision or structured reasoning | Authored rubric; do not pretend arbitrary text is automatically graded |
| Diagram | Labels/regions | Stable accessible region IDs and alternatives |
| Classification | Item-to-category mapping | Authored categories and accepted mappings |
| Drag/drop | Typed placement input | Pointer and keyboard equivalents; evaluation depends on task |
| Multi-step | Ordered stage inputs | Stage feedback, completion, retry, and evidence rules |

Renderer contract: typed activity + typed input state + interaction phase + callbacks. Evaluator contract: typed input/configuration → outcome, feedback, evidence, and completion. Session state owns submission/retry/reward rules, not the renderer. Unknown activity types get a readable unsupported-content state. Drag/drop is an interaction method, not a single universal grading model.

Implement only scoped types, using understandable TypeScript unions. Multiple choice and code choice remain proposed early demo types; they do not constrain the general model or require every subject to have code. Verify reuse with a non-code example when building the engine. True/false can share choice interaction without becoming a separate universal model.

The latest student-first brief supersedes earlier Phase 1 assignments in this document. Phase 1 builds real signup/login, onboarding, player hub, courses, profile/settings, and responsive navigation using labelled mock learning previews. Gameplay, missions, questions, bosses, and earning XP move to Phase 2; shared account-backed progression connects in Phase 3; deeper adaptation follows in Phase 4. Existing game mechanics and numeric rules remain proposals for those later phases. See STUDENT_EXPERIENCE.md, ROADMAP.md, and DECISIONS.md. The selected React/TypeScript/Tailwind/Phaser stack is retained; auth and database providers are unresolved.

# Question system — current Phase 1

The latest Game Design Document replaces the proposed true/false second type with code output/code choice alongside multiple choice. Use a central renderer and shared session engine; bosses reuse the same questions/evaluation contracts.

Proposed question types: multiple-choice and code-choice. Both use stable option IDs and one correctOptionId; code-choice also includes code, language, and task (predict-output or choose-code). This is a distinct learning presentation using authored choices, not arbitrary code execution. Never eval submitted or authored snippets.

Renderer contract: structured question + selected answer + locked state + selection callback. It renders controls; a pure evaluator returns correctness and explanation. The controller records one submission, calculates XP/damage, locks options, and waits for Continue. Accessible formatted code uses pre/code, preserves whitespace, and scrolls on narrow screens.

Future renderer contracts include text input, matching pairs, ordered IDs, multiple selected IDs, calculation/diagram input, and staged problems. Drag interactions require keyboard alternatives. Partial credit, hints, normalization, accepted answers, and retries need type-specific rules before introduction; do not implement every listed activity in Phase 1.

Validate unique IDs, parent references, supported types, difficulty, prompt, explanation, option IDs, correct-option membership, required code metadata, and nonempty mission/boss question sets. Boss validation also checks attainable damage. Option order must remain stable during the current question, and meaningful ordering should not be shuffled.

# Historical notes — superseded where conflicting

The current summary above and DECISIONS.md take precedence. Earlier proposals are retained for traceability.

# Question system

## Scope and responsibilities

The first playable version requires multiple choice plus another interaction type. True/false is a proposed second type, not a confirmed content decision. Each renderer shows a question and collects an answer; reusable TypeScript logic evaluates it and the session controller records it.

Questions reference course, topic, and concept IDs, with type, difficulty, prompt, options, correct answer, explanation, and XP metadata. See [DATA_MODEL.md](DATA_MODEL.md) for the proposed records and [CONTENT_GUIDE.md](CONTENT_GUIDE.md) for authoring rules.

## Proposed Phase 1 contract

1. Validate lesson content before beginning.
2. Show a question with no preselected answer.
3. Let the learner select and change an option using stable option IDs.
4. Enable Check only when the answer is valid.
5. On submission, evaluate once, lock choices, record the answer, and show explanation and feedback.
6. Continue advances to the next question; the final Continue opens results.

Reject invalid options, unsupported types, missing references, duplicate IDs, and a second submission for the same question. A rejected submission must not award XP or advance progress. Malformed content needs a readable recovery screen rather than a broken question.

Binary correctness is sufficient initially. Future matching, ordering, code, multi-select, hints, and partial-credit activities can introduce their own answer and evaluation shapes. Do not force those shapes into an option-ID comparison or implement them now.


## Supplied product notes

The following source sections preserve the expanded user-supplied vision. Possible features, schemas, numbers, and implementation examples remain proposals unless confirmed in DECISIONS.md. Source numbering is retained for traceability.

# 45. Partial Understanding

Not every learning activity needs to be completely binary.

Future activity types may allow:

- partially correct answers
- multiple correct selections
- hints
- second attempts
- staged problem solving

The data model should not unnecessarily assume every question can only produce:

correct = true

or

correct = false

However, the first MVP can use binary correctness where appropriate.

---

# 46. Hints

Hints may eventually be available.

Hints should guide reasoning rather than reveal the answer immediately.

Example:

Question:

What is the time complexity of this loop?

Hint:

How many times does the loop run as n increases?

Potential systems:

- free first hint
- limited hints
- hint cost in score
- progressive hints

Do not build complicated hint economies initially.

---

# 75. Question Bank Architecture

Questions should eventually be stored independently from UI code.

Potential future storage:

JSON during development

database later

Example conceptual structure:

courses/
  comp1170/
    html/
    css/
    javascript/

The UI should render question objects.

Do not hard-code every question directly into JSX if avoidable.

---

# 76. Sample Question Object

Conceptual example:

{
  "id": "js-loop-001",
  "course": "COMP1170",
  "topic": "JavaScript",
  "concept": "loops",
  "difficulty": "easy",
  "type": "multiple-choice",
  "prompt": "How many times will this loop run?",
  "options": [
    "3",
    "4",
    "5",
    "Infinite"
  ],
  "correctAnswer": "5",
  "explanation": "The loop begins at 0 and continues while i < 5."
}

This format is only an example.

The final schema may change.

---

# 77. Question Validation

Content errors can damage trust in the platform.

Eventually Quizzness should validate question data.

Potential checks:

question has ID

prompt exists

question type is supported

multiple-choice questions have options

correct answer exists

explanation exists

difficulty is valid

course/topic/concept references exist

Validation can initially happen during development.

---

# 80. Replayability

Repeating a lesson should not always produce exactly the same sequence.

Possible variation:

different questions

different ordering

different examples

difficulty adjustment

weak-concept reinforcement

This helps prevent memorizing answer positions instead of learning concepts.

---

# 81. Avoid Answer-Position Bias

Correct answers should not consistently appear in the same position.

For multiple-choice questions, answer options may be shuffled when appropriate.

However, do not shuffle options when order itself carries meaning.

---


