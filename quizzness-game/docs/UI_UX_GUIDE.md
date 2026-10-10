# UI/UX guide — current Phase 1 player hub

Latest dashboard direction: the user selected a cosy personal student room. Use a welcoming original pixel room as the home base with student character and Panthy guide, labelled furniture destinations and a compact shortcut toolbar. Prefer readable rounded controls over the previous rigid panel composition. All essential destinations remain semantic links; static room scenery must not imply implemented movement or multiplayer. design/README.md records the generated environment source.

## Required original identity — latest instruction, 2026-10-08

Panthy, the supplied campus and student characters, and the exact palette are core Phase 1 requirements. Primary #7A4E9D; secondary #C9B6E4; text/border #1B4332; accent/success #40916C; background/surface #EFE6DD. Never substitute a generic LMS/SaaS theme, framework defaults or arbitrary gradients. Use shared src/styles/identity.css tokens and design/README.md source notes. Panthy guides all meaningful stages; a student avatar is not a replacement mascot.

The original pose is preserved; eight contextual guide states exist, but expression drawings, original logo and typography/interface reference remain incomplete. Do not call provisional local fonts or squared cards approved original styles. Accessibility remains required. The latest phase sequence puts worlds/maps/missions in Phase 2, bosses/connected XP in Phase 3, adaptive review in Phase 4, more content in Phase 5 and tutoring/social in Phase 6.

## Inspiration principles and product identity

Treat Codédex as a reference for strong game identity and character personality; Boot.dev for connected learning journeys; Coddy for small active tasks; Duolingo for feedback, clear progression, goals, and motivation. These are the user's design references, not verified claims about current feature availability or templates to reproduce.

Quizzness is original tertiary education across subjects. Use a player home-base feel while retaining clear navigation labels such as Dashboard when useful. Course/world presentation should accommodate science, business, humanities, languages, and other disciplines without code-editor-first navigation, computing-only icons, or developer jargon. Do not copy another platform's artwork, characters, layouts, wording, branding, or proprietary mechanics.

Phase 1 is public welcome, signup/login, onboarding, dashboard, courses/overview, profile/settings, navigation, and responsive shell. No game engine or boss screen yet. The student dashboard feels like a player hub with modern readable controls and pixel character presence.

Prioritise Continue Journey → player progression → current courses/worlds → learning progress → goals/challenges → avatar. Avoid LMS-style grades/assignments navigation and cluttered corporate chart grids. Signup handles basic identity; onboarding handles educational interests and optional institution separately, including independent learners.

Label mock XP/progress/quests as sample or preview data; do not imply earned rewards or real mastery. New accounts get useful empty states. Continue Journey opens a clear course learning-preview state with a useful back action. Explain upcoming learning in student language, without internal phase numbers or a dead button.

Forms need semantic labels, helpful validation, password autocomplete, visible focus, keyboard operation, loading/saving/error states, and narrow-screen layouts. Use CSS motion and respect reduced motion. Supplied avatars can be still poses; movement requires authored frames and Phaser only when that capability is introduced. Notification icons and other previews must not imply implemented features.

STUDENT_EXPERIENCE.md defines the complete account journey. The gameplay interface notes below guide Phase 2 and later, not the current foundation.

# Earlier documentation — superseded where conflicting

The current scope above and DECISIONS.md take precedence. Old Phase 1 references describe the former gameplay-first plan.

# UI/UX guide — current game journey

Phase 1 shows a course selection screen, small course map, mission preview, gameplay/feedback, mission results, boss preview/encounter/results, and one visible player avatar. A dashboard, profile editor, campus exploration, and character customisation are outside this milestone.

Map nodes show available, locked, and completed states with labels/icons as well as colour. Mission preview gives a brief objective and clear Start action. Gameplay centres the academic challenge with selected-answer state, Check, explanation, learner-paced Continue, progress, and pending XP. Boss presentation adds labelled HP, phase, damage response, and a recovery route.

Use React semantic controls for essential interaction and Phaser for avatar/boss presentation. Initial avatar states are idle, celebration, thinking/encouragement, and victory; absent sprite frames may use labelled placeholder poses rather than claiming a walking animation. Honour reduced motion and keep animations brief and nonblocking.

Results distinguish pending/earned/saved XP, actual concept evidence, and course unlocks. Show storage failures honestly. Refresh retains completed progress and returns to the map; active-session resume is not promised. Mistake review shows the original prompt, learner answer, correct answer, explanation, and concept. No sound is necessary initially; any later sound must be optional and mutable.

# Historical notes — superseded where conflicting

The current summary above and DECISIONS.md take precedence. Earlier proposals are retained for traceability.

# UI design

## Confirmed direction

Create a modern, playful, clean learning game suited to university students. Establish an original identity; engagement references do not authorise copying other products. Pixel-art student characters are a long-term direction, with consistent proportions, readable silhouettes, and inclusive customisation.

No real-product UI exists yet. Do not import the school prototype's styling or invent a permanent palette from this document.

## Selected rendering and motion tools

Use React for learning screens and semantic controls, Tailwind plus custom CSS for styling, and CSS transitions/animations for interface motion. Use Phaser for character sprite animation, game environments, and future minigames. TypeScript connects these responsibilities.

Keep essential prompts, answers, feedback, and explanations available in the React interface. Character movement needs animation frames; inspect supplied sprite sheets before promising walking or celebration states. Respect reduced-motion preferences in both CSS and Phaser scenes. No additional animation library is needed for the initial scope.

## Phase 1 interface requirements

- Keep the prompt, answer choices, and primary action visually clear.
- Show session progress and earned XP without crowding the question.
- Preserve feedback and explanations until the learner continues.
- Show correct/incorrect states with words and symbols as well as colour.
- Use semantic controls, visible keyboard focus, readable contrast, and layouts that work on narrow screens.
- Announce feedback to assistive technology and manage focus when a new question or results screen appears.
- Respect reduced-motion preferences; animation must not delay answering or reading.
- Give results a clear replay action and a route back to topic selection.

Before the first UI implementation, choose a small visual system and explain its palette, typography, spacing, and control states. Characters and custom animation can follow once the session works.


## Supplied product notes

The following source sections preserve the expanded user-supplied vision. Possible features, schemas, numbers, and implementation examples remain proposals unless confirmed in DECISIONS.md. Source numbering is retained for traceability.

# 36. Tone of the Product

The tone should feel:

- intelligent
- friendly
- encouraging
- energetic
- modern
- slightly playful
- student-focused

It should NOT feel:

- childish
- corporate
- robotic
- overly formal
- overly academic
- patronising

Examples of appropriate interface language:

"Let's test that."

"Nice work."

"Almost there."

"Here's why."

"One more challenge."

"You're getting stronger at this concept."

Examples to avoid:

"Congratulations esteemed learner."

"You have failed this assessment."

"Incorrect response recorded."

---

# 37. Target Emotional Experience

Quizzness should try to make a learner feel:

- curious
- capable
- motivated
- aware of their progress
- comfortable making mistakes
- interested in continuing

A wrong answer should not feel like punishment.

A correct answer should feel satisfying but not overly exaggerated.

The game should create small moments of progress frequently.

---

# 41. Question Screen Priorities

The question should be the main focus of the screen.

The player should immediately understand:

1. What is being asked?
2. What are the possible actions?
3. How far through the session am I?

Avoid cluttering the question screen with unnecessary navigation, advertisements, large menus, or unrelated information.

---

# 42. Answer Interaction

When the player selects an answer:

The interface should clearly show that the answer is selected.

The user should normally still be able to change the answer before submitting.

A typical flow:

Choose answer

↓  

Selected answer becomes visually distinct

↓  

Submit / Check button becomes active

↓  

Player submits

↓  

Answers become locked

↓  

Feedback appears

↓  

Player continues

Do not automatically submit an answer the instant it is clicked unless the activity type specifically benefits from that behavior.

---

# 43. Correct Answer Feedback

Correct-answer feedback should include:

- clear confirmation
- subtle positive animation
- short explanation when useful
- XP/progress response
- continue action

Example:

Correct!

A loop that visits every item once grows linearly with the size of the input, so its time complexity is O(n).

+10 XP

Continue

Avoid overwhelming the player with giant animations after every correct answer.

---

# 44. Incorrect Answer Feedback

Incorrect answers should still teach the student.

Possible flow:

Not quite.

Your answer: O(1)

Correct answer: O(n)

Why?

The loop runs once for each element in the array, so the number of operations grows with n.

The system may optionally include:

"Remember this"

or

"Try another one"

depending on the game mode.

---

# 51. Course Home Screen

A course home screen could eventually show:

Course title

Overall progress

Current level

Recommended next activity

Topics

Weak areas

Recent activity

Possible layout:

COMP1170

Web Development Fundamentals

Progress: 42%

CONTINUE

HTML Foundations
████████ 80%

CSS Fundamentals
██████ 60%

JavaScript Basics
████ 35%

DOM Events
██ 15%

Recommended:

Practice JavaScript Loops

The interface should emphasize what the student should do next.

---

# 52. Topic Screen

A topic can contain several learning nodes.

Example:

## JavaScript Basics

Variables

Data Types

Conditionals

Loops

Functions

Arrays

Some activities may be locked until prerequisites are completed.

However, locking should be used carefully.

Do not unnecessarily prevent students from studying something they need.

---

# 53. Learning Paths

Quizzness may eventually offer guided learning paths.

Example:

Programming Fundamentals

1. Variables
2. Conditions
3. Loops
4. Functions
5. Arrays
6. Objects

Paths should help students navigate without forcing every student through exactly the same sequence.

---

# 54. Game Map Possibility

A future Quizzness interface might represent a course as a visual learning map.

Example:

START

● HTML Basics
│
● Elements
│
● Forms
│
★ HTML Challenge
│
● CSS Basics
│
● Selectors

This could make progression feel more game-like.

Do not build an elaborate world map before the core learning engine works.

---

# 61. Avatar Customization

Players may eventually customize:

skin tone

hair

hair colour

shirts

hoodies

pants

shoes

glasses

headphones

bags

accessories

Character customization can provide progression rewards.

Avoid making customization dependent primarily on real-money purchases in the early product.

---

# 62. Character Design Philosophy

Characters should look like young adults / tertiary-level students rather than small children.

The art style can remain cute or stylized while still feeling appropriate for university students.

Character diversity should feel natural rather than tokenized.

---

# 63. Animation Principles

Animation should communicate state.

Useful animations:

answer selection

correct response

incorrect response

XP increase

progress increase

achievement unlock

character celebration

screen transitions

loading states

Avoid:

constant bouncing elements

excessive motion

slow animations that prevent interaction

animations that make the interface harder to understand

Respect reduced-motion accessibility preferences.

---

# 64. Sound Design — Future

Future Quizzness versions may include optional sound effects.

Examples:

answer selected

correct answer

incorrect answer

XP gained

level complete

achievement unlocked

Sounds should be:

short

subtle

optional

There must be a mute option.

Do not assume students will always be studying with sound enabled.

---

# 65. Responsive Design

Quizzness should eventually work well on:

desktop

laptop

tablet

mobile browser

The first development target can focus primarily on desktop/laptop if necessary, but avoid architecture that makes responsive design difficult later.

The browser game should remain usable without requiring a native app.

---

# 96. Student Dashboard

The dashboard should prioritize action.

A student should quickly see:

Continue learning

Recommended topic

Current course progress

Weak concept to review

Recent achievement

Avoid filling the dashboard with dozens of charts.

---

# 100. Error Handling

The game should fail gracefully.

Examples:

If question data fails to load:

"Something went wrong loading this lesson."

Retry

If a session cannot save:

tell the user clearly.

Do not leave the screen blank or show raw developer errors.

---

# 101. Loading States

Whenever data takes time to load, provide visual feedback.

Possible loading states:

skeleton cards

small spinner

game-style loading animation

Avoid layout shifts where possible.

---

# 102. Empty States

If the user has no courses:

Explain how to add or choose one.

If there are no completed lessons:

Encourage starting the first lesson.

Empty screens should still guide the user.

---

# 103. Notifications

Future notifications could include:

study reminders

new course content

tutor replies

weekly progress

Notifications should be optional and should not become spammy.

---

# 104. Onboarding

Initial onboarding should be short.

Possible flow:

Welcome to Quizzness

Choose what you're studying

Choose a learning goal

Select avatar

Start first activity

Do not require ten pages of setup before users can experience the game.

---

# 105. Demo Experience

A public demo should allow someone to understand Quizzness quickly.

Ideal flow:

Open site

↓  

See clear explanation

↓  

Click "Try a Lesson"

↓  

Immediately play sample lesson

↓  

See results

↓  

Optionally create account

This is useful for:

students

lecturers

investors

university staff

assignment demonstrations

---

# 106. Home Page

Possible public homepage structure:

Hero section

"Studying shouldn't feel like rereading the same notes."

CTA:

Start Learning

Try Demo

Then:

How Quizzness Works

Game preview

Adaptive learning explanation

Progress tracking

Courses

Tutoring future feature

Call to action

Keep marketing separate from the actual game interface.

---

# 107. Navigation

Possible logged-in navigation:

Home

Courses

Play / Learn

Progress

Profile

Do not create too many top-level sections early.

---

# 108. Design Consistency

Every screen should feel like it belongs to the same application.

Maintain consistency in:

buttons

cards

typography

spacing

colors

borders

icons

animations

progress indicators

Do not allow individual pages to develop completely different styles.

---

# 109. Pixel Art Integration

Pixel-art characters should coexist with clean modern UI.

The entire interface does not necessarily need to be pixelated.

A possible combination:

Modern UI components

+

Pixel-art characters, icons, environments, and rewards

This can help Quizzness feel game-like without sacrificing usability.

---

# 126. Player Profile

Potential profile information:

avatar

level

XP

courses

achievements

study streak

mastered concepts

learning statistics

Keep academic progress more important than cosmetic stats.

---

# 127. Personalization

Possible future personalization:

preferred session length

difficulty preference

study goals

avatar

accessibility settings

sound settings

animation settings

Quizzness should adapt without requiring excessive setup.

---

# 128. Search

Future search could help students find:

courses

topics

concepts

lessons

tutors

Search becomes more important as content grows.

Do not build complex search infrastructure during the earliest prototype.

---


