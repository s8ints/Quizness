## Current phase assignment

Phase 1: brand/mascot + student foundation (accounts, onboarding, hub, courses, profile/settings), built and awaiting live Supabase verification. Phase 2: worlds/maps/missions/ActivityRenderer. Phase 3: bosses + connected XP/progression. Phase 4: adaptive mastery/review. Phase 5: expanded subjects/content. Phase 6: tutoring/social. Wherever this document says "Phase 1" for maps, missions, bosses, XP or localStorage, read it as Phase 2/3.

## Product identity clarification

Quizzness is a general tertiary-level learning game engine. Its hierarchy is Course → Topic/Area → Mission → Interactive Activity → Checkpoint → Boss. Activity types and boss encounters adapt to the learning task: a debugging battle, a multi-stage workplace crisis, or connected mathematical problems are equally valid. A boss is a meaningful academic checkpoint, not necessarily a monster with HP. Computer Science examples in the source are demonstrations only.

Use ActivityRenderer as the general engine term. Game identity, structured course paths, short interactive tasks, feedback, and motivation are inspiration principles from Codédex, Boot.dev, Coddy, and Duolingo; create original Quizzness systems and visuals. Phase 1 remains the student foundation.

The latest student-first brief supersedes earlier Phase 1 assignments in this document. Phase 1 builds real signup/login, onboarding, player hub, courses, profile/settings, and responsive navigation using labelled mock learning previews. Gameplay, missions, questions, bosses, and earning XP move to Phase 2; shared account-backed progression connects in Phase 3; deeper adaptation follows in Phase 4. Existing game mechanics and numeric rules remain proposals for those later phases. See STUDENT_EXPERIENCE.md, ROADMAP.md, and DECISIONS.md. The selected React/TypeScript/Tailwind/Phaser stack is retained. Current status: Vite + React Router are in use, and Supabase Auth/Postgres is selected and integrated in code but not yet verified against a live project.

# Quizzness game design — current direction

> Historical: the next three paragraphs predate the student-first update; their "Phase 1" gameplay slice is now Phase 2/3 (see "Current phase assignment" above).

The latest supplied Game Design Document below defines the expanded Phase 1: Course → Map → Missions → Interactive Questions → XP → Boss → Results → Saved Progress. It supersedes the earlier session-only milestone. Implement incrementally; this documentation update does not start application development.

Keep the previously selected TypeScript + React + Tailwind/custom CSS + Phaser stack. Vite is a proposed build tool; CSS Modules and Motion in the source are alternatives, not replacements. Phaser handles character/game scenes and CSS handles interface motion.

The source selects multiple choice and code output/code choice for Phase 1, plus one visible avatar, one boss, a small mission path, concept tracking, and localStorage. Exact names, content, reward amounts, damage, mastery thresholds, and folder choices remain proposals. BOSS_SYSTEM.md and PROGRESSION_SYSTEM.md specify proposed executable rules; DECISIONS.md records what changed.

# QUIZZNESS — GAME DESIGN DOCUMENT

## 1. High-Level Game Concept

Quizzness is an educational browser game for tertiary-level students.

The player progresses through academic subjects by completing interactive lessons, challenges, missions, and boss battles.

The purpose is to transform studying from:

read → memorize → quiz

into:

explore → play → solve → learn → improve → progress

Quizzness should feel like an actual game that happens to teach university material rather than a traditional educational platform with points added afterward.

The experience combines ideas such as:

- short interactive learning from Duolingo
- hands-on problem solving similar to Coddy.io
- level progression from video games
- boss encounters
- character progression
- unlockable areas
- mastery-based learning
- adaptive question selection
- visible course progression

These are inspiration points only.

Quizzness must have its own mechanics, visual identity, terminology, world, characters, interface, and progression systems.

---

# 2. Core Game Fantasy

The player's fantasy is:

"I am progressing through my course like I would progress through a game."

Instead of seeing:

Chapter 1  
Chapter 2  
Chapter 3

the student may see:

Learning Zone

↓

Missions

↓

Challenges

↓

Checkpoint

↓

Boss

↓

New Area Unlocked

Academic content becomes a progression system.

---

# 3. Main Gameplay Loop

The main Quizzness gameplay loop is:

CHOOSE COURSE

↓

ENTER TOPIC AREA

↓

SELECT MISSION

↓

COMPLETE INTERACTIVE CHALLENGES

↓

RECEIVE IMMEDIATE FEEDBACK

↓

EARN XP

↓

BUILD CONCEPT MASTERY

↓

COMPLETE AREA CHALLENGES

↓

DEFEAT TOPIC BOSS

↓

UNLOCK NEXT AREA

↓

REVIEW WEAK CONCEPTS

↓

CONTINUE

This loop should remain simple enough that players always understand what they need to do next.

---

# 4. Meta Progression Loop

Outside individual lessons, there is a larger progression loop.

PLAY

↓

GAIN XP

↓

LEVEL UP

↓

UNLOCK COSMETICS / ACHIEVEMENTS

↓

MASTER TOPICS

↓

DEFEAT BOSSES

↓

COMPLETE COURSE AREAS

↓

BUILD PLAYER PROFILE

↓

TAKE ON HARDER CHALLENGES

Learning progress and game progress should reinforce each other.

---

# 5. Three Types of Progression

Quizzness should distinguish between three progression systems.

## Player Progression

Represents how much the student has played.

Examples:

- XP
- player level
- achievements
- cosmetic unlocks

---

## Course Progression

Represents movement through academic content.

Examples:

- completed topics
- unlocked missions
- boss completion
- course completion percentage

---

## Mastery Progression

Represents actual understanding.

Examples:

- developing
- proficient
- strong
- mastered

A player can be:

Level 20

but still have:

Loops — Developing

This separation is important.

---

# 6. Course as a Game World

Each course can function like its own game world.

Example:

COMP1170 — Web Development

could become:

## WORLD: WEB FRONTIER

Area 1:
HTML Foundations

Area 2:
Page Structure

Area 3:
Forms & Inputs

Area 4:
CSS Basics

Area 5:
Responsive Design

Area 6:
JavaScript

Each area contains missions and eventually a boss.

A Mathematics course could have a completely different theme while still using the same underlying game engine.

---

# 7. Course Map

Courses should eventually have a visual map.

Example:

START

│

● HTML Basics

│

● Elements & Attributes

│

◆ Mini Challenge

│

● Semantic HTML

│

● Forms

│

⚔ HTML BOSS

│

▼

CSS REGION UNLOCKED

The map should visually communicate progression.

Players should be able to see:

- what they completed
- what is available
- what is locked
- where bosses are
- what they should do next

---

# 8. Learning Nodes

Possible map node types:

### Lesson Node

Standard learning activity.

### Practice Node

Focused repetition.

### Challenge Node

Harder questions.

### Review Node

Revisit weak concepts.

### Treasure Node

Optional activity with rewards.

### Mini-Boss Node

Tests several concepts.

### Boss Node

Major topic assessment.

### Mastery Node

Optional advanced challenge.

Different node types should have visually different icons.

---

# 9. Missions

Missions are the basic playable lessons.

A typical mission contains approximately:

5–8 activities.

Example:

## Mission: Loop Patrol

Objective:

Learn how `for` loops repeat instructions.

Activities:

1. identify a loop
2. predict number of iterations
3. predict output
4. fill missing loop condition
5. fix a broken loop
6. challenge question

Completion reward:

60 XP

Progress toward:

Loops mastery

---

# 10. Mission Length

A normal mission should usually take approximately:

3–8 minutes.

This supports short study sessions.

Players should be able to think:

"I'll just play one level."

and potentially continue afterwards.

---

# 11. Mission Structure

A typical mission should have a deliberate difficulty curve.

### Stage 1 — Warm-Up

Simple recognition.

### Stage 2 — Understand

Basic application.

### Stage 3 — Apply

More realistic question.

### Stage 4 — Twist

Test misconception.

### Stage 5 — Challenge

Harder application.

### Stage 6 — Finish

Short final challenge.

Adaptive lessons may change this structure based on performance.

---

# 12. Boss Battles

Boss battles are one of the defining Quizzness features.

A boss should represent a major academic checkpoint.

The boss is not simply:

"Answer ten multiple-choice questions."

Boss battles should feel different from normal lessons.

They should combine multiple concepts and introduce pressure, strategy, or multi-stage challenges.

---

# 13. Purpose of Bosses

Bosses should:

- make topic completion memorable
- test combined understanding
- create anticipation
- provide meaningful rewards
- act as progression checkpoints
- make academic mastery feel like an achievement

They should not punish students for learning.

---

# 14. Example Boss Battle

Course:

Programming Fundamentals

Topic:

Loops

Boss:

## THE LOOPKEEPER

Phase 1:

Identify which loops terminate.

Phase 2:

Predict program outputs.

Phase 3:

Repair broken loops.

Phase 4:

Choose the most efficient solution.

Final Attack:

Write or assemble the correct loop.

The player wins by demonstrating enough mastery.

---

# 15. Boss Health

Bosses can have a visual health bar.

Correct answers damage the boss.

Example:

Boss HP:

██████████ 100%

Correct answer:

████████░░ 80%

Another correct answer:

██████░░░░ 60%

This gives academic questions visible game consequences.

---

# 16. Player Health

Be careful with traditional lives.

Normal learning should not punish mistakes heavily.

Instead of:

Wrong answer = lose life and fail

consider systems such as:

### Focus Meter

Mistakes reduce focus.

Explanations or recovery questions restore some focus.

### Shield

The player begins with several shields.

Wrong answers may remove one.

But reaching zero should trigger:

review mode

rather than locking the player out.

---

# 17. Boss Recovery

If the player struggles against a boss, Quizzness should identify why.

Example:

Boss Result:

Boss escaped!

Your strongest areas:

- basic loops
- output prediction

Needs more training:

- nested loops

Suggested:

Play "Nested Loop Training"

Then the player can retry.

This makes failure educational.

---

# 18. Boss Phases

Bosses can contain phases.

Example:

PHASE 1  
Recall

PHASE 2  
Application

PHASE 3  
Problem solving

PHASE 4  
Final challenge

Boss visuals or animations can change between phases.

---

# 19. Boss Difficulty

Bosses should not simply contain unfair questions.

Difficulty should come from:

- combining concepts
- fewer hints
- deeper application
- multi-step questions
- tougher distractors
- problem-solving scenarios

Not from confusing wording.

---

# 20. Mini-Bosses

Mini-bosses can appear midway through a topic.

Example:

HTML Area

Lesson

Lesson

Mini-Boss: Tag Troll

Lesson

Lesson

Boss: DOM Guardian

Mini-bosses should be shorter than full bosses.

---

# 21. Boss Rewards

Potential boss rewards:

- large XP reward
- achievement
- new area unlocked
- cosmetic item
- special avatar accessory
- profile badge
- course trophy
- boss collectible

Example:

DEFEATED: THE LOOPKEEPER

+250 XP

Unlocked:

Functions Valley

Reward:

Loopkeeper Headphones

---

# 22. Boss Replay

Bosses should be replayable.

Possible goals:

- improve score
- earn three-star rating
- beat personal best
- complete without hints
- defeat on harder difficulty

Replay should be optional.

---

# 23. Boss Rating

Possible rating:

★ Complete

★★ Strong Performance

★★★ Mastery

Ratings must not replace actual mastery calculations.

They are game feedback.

---

# 24. Challenge Modes

Future challenge modes could include:

### Speed Run

Solve as many questions as possible in a short period.

### Survival

Continue until too many mistakes occur.

### Perfect Run

Complete a set without mistakes.

### Boss Rush

Fight several previously defeated bosses.

### Concept Duel

Focused challenge around one topic.

### Daily Challenge

One rotating challenge.

These modes should come after the main learning system works.

---

# 25. Question Types

Quizzness should eventually support:

- multiple choice
- true/false
- fill in the blank
- matching
- ordering
- drag-and-drop
- code completion
- output prediction
- debugging
- multi-select
- scenario questions
- calculation problems
- diagram questions
- step-by-step problems

The question engine should support different interaction types without rewriting the entire lesson system.

---

# 26. Programming Game Types

For Computer Science courses especially, Quizzness can become more interactive.

Examples:

## Predict the Output

Show code.

Ask:

What will this print?

---

## Bug Hunt

Find the incorrect line.

---

## Code Builder

Drag lines into the correct order.

---

## Missing Code

Fill the missing statement.

---

## Algorithm Race

Choose which algorithm solves the problem efficiently.

---

## Trace the Program

Follow variable values through execution.

These make Quizzness feel closer to an actual game than standard quizzes.

---

# 27. Mathematics Game Types

Examples:

## Build the Equation

Place components into the correct formula.

## Next Step

Choose the correct next algebraic step.

## Error Hunt

Identify where a solution went wrong.

## Match It

Match graphs with equations.

## Boss Calculation

Solve a multi-stage problem to attack the boss.

---

# 28. Business / Management Game Types

Examples:

## Scenario Decision

Read a workplace situation and choose the best management approach.

## Theory Match

Match management theory with a situation.

## Case Battle

Apply multiple concepts to solve a business problem.

This allows the same game engine to work beyond computing.

---

# 29. Adaptive Learning Engine

Adaptive learning should influence gameplay.

Track performance by:

course

topic

concept

difficulty

question type

Recent answers should matter.

Example:

Student performs:

Variables: 90%

Loops: 55%

Functions: 72%

Quizzness should prioritize:

Loops

rather than randomly giving equal practice.

---

# 30. Early Adaptive Rules

The first adaptive system does NOT need machine learning.

Use transparent rules.

Example:

If concept accuracy < 50%:

give easier reinforcement question.

If accuracy is between 50–75%:

give another question at same level.

If accuracy > 75%:

introduce harder variation.

If player misses same concept twice:

show explanation + focused recovery activity.

If player succeeds several times:

reduce repetition.

---

# 31. Difficulty Adaptation

Possible difficulty values:

1 — Introductory

2 — Basic

3 — Applied

4 — Advanced

5 — Mastery

The system can select difficulty based on performance.

Do not expose numerical difficulty unless useful.

Players may simply see:

Easy

Medium

Hard

Challenge

---

# 32. Concept Mastery

Each concept should have mastery.

Possible internal scale:

0–100

Example display:

0–24:
New

25–49:
Learning

50–69:
Developing

70–84:
Strong

85–100:
Mastered

Exact thresholds can change later.

---

# 33. Mastery Updates

Mastery should consider:

correctness

difficulty

recent performance

attempts

hints

repeat exposure

Example:

Correct hard question:

larger increase

Correct easy question:

smaller increase

Incorrect question:

small decrease or slower progression

Do not create a system where one mistake destroys mastery.

---

# 34. XP System

XP represents game progression.

Example provisional values:

Easy activity:
5 XP

Medium:
10 XP

Hard:
15 XP

Challenge:
20 XP

Mission complete:
25 XP

Mini-boss:
75 XP

Boss:
150–300 XP

Perfect lesson:
bonus XP

These numbers are placeholders.

---

# 35. Level System

Total XP determines player level.

Example:

Level 1:
0 XP

Level 2:
100 XP

Level 3:
250 XP

Level 4:
450 XP

Level requirements should gradually increase.

Levels can unlock:

cosmetics

profile frames

titles

animations

optional challenge modes

---

# 36. Player Titles

Example titles:

Rookie Learner

Code Explorer

Logic Apprentice

Algorithm Hunter

Problem Solver

Course Champion

Titles can provide fun identity without affecting learning.

---

# 37. Coins / Secondary Currency

Quizzness may eventually have a soft game currency.

Possible use:

buy cosmetic avatar items.

Do not connect it to academic content.

Do not make students pay to access explanations or essential learning features.

The earliest MVP does not require currency.

---

# 38. Player Character

Players should have a visible character/avatar.

The avatar should appear:

on dashboard

on course map

during lessons

during boss encounters

on results screens

in profile

This makes progression feel personal.

---

# 39. Character Reactions

The avatar may react to gameplay.

Correct:

celebration

Incorrect:

thinking / encouraging expression

Boss appears:

surprised / ready stance

Boss defeated:

victory animation

Level up:

celebration

These reactions make the game feel alive.

---

# 40. Character Customization

Future options:

hair

skin tone

shirt

hoodie

pants

shoes

glasses

headphones

bags

accessories

Rewards from gameplay can unlock customization.

---

# 41. NPCs

Courses may eventually include recurring NPC characters.

Examples:

Guide

Professor-like mentor

Student rival

Bosses

Topic characters

NPCs should provide personality without requiring huge amounts of dialogue.

---

# 42. Guide Character

A guide could introduce mechanics.

Example:

"Looks like we're entering JavaScript territory."

"Watch out — loops can get tricky."

"That boss tests everything you've learned so far."

The guide should not interrupt every question.

---

# 43. Boss Personality

Bosses can visually represent academic concepts.

Examples:

Loopkeeper

Logic Phantom

Syntax Beast

Derivative Dragon

Market Master

System Overlord

Names should fit the tone of the course.

They should feel fun without making university material childish.

---

# 44. World Themes

Each course could eventually have a theme.

Examples:

Computer Science:

digital world / cyber world

Mathematics:

abstract geometric realm

Business:

city / company empire

Science:

laboratory / exploration world

These themes are optional visual layers.

The underlying systems should remain reusable.

---

# 45. Game Screen Structure

A gameplay screen may include:

TOP

progress bar

mission title

XP display

---

CENTER

question/activity

---

BOTTOM

answer controls

submit/check button

---

SIDE / CORNER

player avatar

optional boss

The learning content must remain visually dominant.

---

# 46. Boss Screen Structure

Boss encounter:

Boss name

Boss health

Player progress/focus

Avatar

Question/challenge

Answer area

Feedback

Boss reaction

Next attack

The boss should react after answers.

---

# 47. Feedback During Boss Battle

Correct:

"Critical hit!"

Then explanation.

Incorrect:

"Blocked!"

Then explanation.

Avoid hiding educational feedback behind game language.

Always explain the concept.

---

# 48. Results Screen

Normal mission:

MISSION COMPLETE

Accuracy:
80%

XP:
+75

Strongest concept:
Loop conditions

Needs practice:
Nested loops

New mastery:

Loops
Developing → Strong

Buttons:

Continue

Replay

Review Mistakes

---

# 49. Boss Results

Example:

BOSS DEFEATED

THE LOOPKEEPER

Accuracy:
86%

Boss rating:
★★☆

XP:
+250

New Area:
Functions Valley

Reward:
Loopkeeper Headphones

Buttons:

Continue Journey

Review Battle

Replay

---

# 50. Mistake Review

Players should be able to review mistakes.

Display:

question

their answer

correct answer

explanation

concept

option to practise concept

Mistakes should become learning opportunities.

---

# 51. Course Completion

Completing the final boss can mark completion of the course path.

Possible screen:

COURSE COMPLETE

COMP1170

12 Topics Mastered

8 Bosses Defeated

83% Overall Mastery

2,850 XP Earned

Strongest Topic:
HTML

Needs Review:
JavaScript Events

This should feel meaningful.

---

# 52. Main Screens

Initial Quizzness screens:

1. Landing / Start
2. Home Dashboard
3. Course Selection
4. Course Map
5. Topic/Mission Preview
6. Gameplay
7. Feedback State
8. Results
9. Boss Battle
10. Profile/Progress

Not all need to be built in Phase 1.

---

# 53. Home Dashboard

Should prioritize:

Continue Playing

Recommended Mission

Current Course

Player level

Recent progress

Weak concept

Example:

Welcome back

Level 7

COMP1170

Next Mission:

Nested Loops

Recommended:

Practice Loop Conditions

---

# 54. Course Selection

Course cards might show:

course code

course title

progress

theme artwork

current area

continue button

Example:

COMP1170

Web Development

42%

Continue Journey

---

# 55. Mission Preview

Before playing:

MISSION 4

Nested Loops

Difficulty:
Medium

Challenges:
6

Reward:
80 XP

Concepts:

nested loops

iteration

complexity

START MISSION

---

# 56. Pause

During a session:

Pause

Options:

Resume

Restart

Exit Mission

Settings

If exiting:

preserve progress only if appropriate.

---

# 57. Game Save

Eventually save:

course progress

completed missions

bosses defeated

XP

level

mastery

achievements

avatar

settings

Initially this can use local storage.

Later move to database persistence.

---

# 58. Local Storage First

Before building authentication/backend, Phase 1 can use:

localStorage

for:

XP

level

mission completion

sample mastery

avatar preference

This allows the game to feel persistent without a backend.

---

# 59. Suggested Frontend Technology

Recommended initial stack:

React

TypeScript

Vite

CSS or CSS Modules

Possible animation library:

Framer Motion / Motion

But only if animations justify the dependency.

Why React:

Quizzness contains many reusable stateful UI systems.

Examples:

questions

missions

bosses

maps

XP

modals

feedback

characters

React fits this style of interactive browser application.

---

# 60. Why Not Pure HTML/CSS

HTML and CSS remain essential.

But the real Quizzness application requires:

dynamic question state

game progression

animations

adaptive logic

course data

component reuse

persistent state

React + JavaScript/TypeScript makes these easier to manage.

The school prototype can remain simple HTML/CSS/JavaScript.

The real product should not be constrained by the school prototype.

---

# 61. Game Engine

Do not use Unity or Unreal for the first Quizzness version.

Quizzness is primarily:

UI interaction

2D animation

questions

progress

characters

maps

rather than:

physics

3D environments

complex collision systems

A modern web application is enough.

Canvas/WebGL can be explored later if special game scenes require them.

---

# 62. Suggested Folder Architecture

Conceptual structure:

src/

  app/

  components/

    ui/

    game/

    questions/

    characters/

    progress/

  features/

    courses/

    lessons/

    bosses/

    xp/

    mastery/

    achievements/

  data/

    courses/

    questions/

    bosses/

  pages/

  hooks/

  services/

  types/

  utils/

  assets/

    characters/

    bosses/

    backgrounds/

    icons/

    rewards/

Do not create folders that have no purpose yet.

---

# 63. Important Components

Potential reusable components:

GameShell

CourseCard

CourseMap

MissionNode

BossNode

MissionIntro

QuestionRenderer

MultipleChoiceQuestion

TrueFalseQuestion

CodeQuestion

FeedbackPanel

ProgressBar

XPDisplay

BossHealthBar

PlayerAvatar

BossCharacter

ResultsScreen

RewardModal

---

# 64. Question Renderer

A central QuestionRenderer should receive structured question data.

Example concept:

type = multipleChoice

↓

render MultipleChoiceQuestion

type = trueFalse

↓

render TrueFalseQuestion

type = ordering

↓

render OrderingQuestion

This allows the lesson engine to remain independent from question UI.

---

# 65. Mission Engine

MissionEngine should manage:

question list

current activity

answer submission

score

XP

concept performance

mission completion

It should not contain every visual element itself.

---

# 66. Boss Engine

BossEngine should manage:

boss health

battle stage

question selection

damage

player focus

boss reactions

battle completion

Bosses should reuse the same question system where possible.

Do not build an entirely separate educational system for bosses.

---

# 67. Damage Calculation

Early boss damage can be simple.

Example:

Easy correct:
10 damage

Medium:
15 damage

Hard:
25 damage

Challenge:
35 damage

Do not overcomplicate damage formulas initially.

---

# 68. Boss Data

Boss data could conceptually include:

id

name

course

topic

image

maxHealth

phases

rewardXP

unlock

questionPool

specialRules

Do not hard-code all boss information directly into components.

---

# 69. Course Data

Course object:

id

code

name

description

theme

topics

progress

Example:

comp1170

COMP1170

Introduction to Web Development

---

# 70. Topic Data

Topic:

id

courseId

name

description

order

missions

boss

prerequisites

---

# 71. Mission Data

Mission:

id

topicId

title

description

difficulty

questionIds

rewardXP

concepts

unlockRequirements

---

# 72. Question Data

Question:

id

type

course

topic

concept

difficulty

prompt

options/content

correctAnswer

explanation

hint

xpValue

---

# 73. Separation of Content and Code

Critical rule:

Academic content should live primarily in structured data.

Game code handles:

display

interaction

progress

evaluation

The code should not contain hundreds of manually written questions.

---

# 74. Database Model — Future

Potential entities:

users

courses

topics

concepts

missions

questions

bosses

user_course_progress

user_concept_mastery

sessions

answer_attempts

achievements

user_achievements

avatar_items

user_avatar_items

---

# 75. Initial Database Strategy

Do NOT begin Phase 1 with a database.

Start with:

local data

JSON / TypeScript objects

local storage

Once the gameplay works, introduce backend persistence.

---

# Gameplay vertical slice (now Phase 2/3)

> Historical numbering: sections 76–92 were written when Phase 1 meant the gameplay slice. Their content now guides Phase 2 (map, missions, activities) and Phase 3 (boss, XP/progression). "No user accounts" in §89 is superseded: accounts were built in Phase 1. Original headings are kept for traceability.

# 76. Phase 1 Goal

Phase 1 must create a playable Quizzness vertical slice.

Not a dashboard mockup.

Not screenshots.

Not static HTML.

A real playable mini-game.

---

# 77. Phase 1 Course

Use one sample course.

Recommended:

Computer Science / Programming Fundamentals

or:

COMP1170-inspired web/programming content.

The architecture must remain generic.

---

# 78. Phase 1 Topic

Use one strong demonstration topic.

Possible:

JavaScript Loops

because it allows:

multiple-choice

output prediction

bug fixing

ordering

boss mechanics

---

# 79. Phase 1 Map

Create one small playable map:

MISSION 1  
Loop Basics

↓

MISSION 2  
Loop Conditions

↓

MISSION 3  
Predict the Output

↓

MINI CHALLENGE

↓

MISSION 4  
Nested Loops

↓

BOSS  
The Loopkeeper

Enough content to demonstrate the game idea.

---

# 80. Phase 1 Gameplay

Mission:

5–6 questions

must support:

select answer

submit

correct state

incorrect state

explanation

continue

progress bar

XP

results

---

# 81. Phase 1 Question Types

Start with two.

1. Multiple Choice

2. Code Output / Code Choice

This already gives Quizzness more identity than a normal quiz.

---

# 82. Phase 1 Boss

Build one boss.

Example:

THE LOOPKEEPER

Health:
100

Questions:

5–7

Correct answers damage boss.

Different difficulties deal different damage.

Boss reacts visually.

When boss reaches zero:

victory screen.

If player struggles:

show review recommendations.

---

# 83. Phase 1 Player

Include one visible player avatar.

Does not need customization yet.

States:

idle

correct

incorrect/thinking

victory

This proves the character system.

---

# 84. Phase 1 XP

Implement:

question XP

mission XP

boss XP

XP total

simple level calculation

Save XP locally.

---

# 85. Phase 1 Mastery

Implement simple concept tracking.

Example:

loop-basics

loop-condition

nested-loops

Each answer updates:

attempts

correct

accuracy

Display basic result:

Strong

Developing

Needs Practice

No complicated algorithm yet.

---

# 86. Phase 1 Persistence

Use localStorage.

Save:

XP

level

completed missions

boss defeated

concept stats

This means refreshing the page does not reset everything.

---

# 87. Phase 1 Animation

Include only useful animations:

answer selection

correct feedback

incorrect feedback

XP gain

boss damage

boss defeat

screen transition

Avoid spending weeks creating animation systems.

---

# 88. Phase 1 Definition of Done

Phase 1 is complete when someone can:

open Quizzness

choose the sample course

see a small map

select a mission

play the mission

answer interactive questions

receive explanations

gain XP

finish the mission

return to map

unlock next mission

reach boss

fight boss

defeat boss

see results

refresh page

retain progress

At this point Quizzness is an actual game.

---

# 89. Phase 1 — Explicitly Not Included

Do NOT include yet:

user accounts

payments

tutoring

real-money currency

lecturer dashboard

AI question generation

university integration

social features

leaderboards

large database

mobile app

complex adaptive AI

multiplayer

These come later.

---

# 90. Phase 1 Build Order for Codex

Codex should build in this order.

## Step 1 — Project foundation

Create application structure.

Set up routing if required.

Set up shared styles.

Define basic types.

---

## Step 2 — Data model

Create sample:

course

topic

missions

questions

boss

Use structured local data.

---

## Step 3 — Game UI foundation

Create:

GameShell

buttons

cards

progress bars

layout

---

## Step 4 — Course screen

Display sample course.

Allow entering course.

---

## Step 5 — Course map

Display mission nodes.

Show locked/unlocked/completed states.

---

## Step 6 — Mission system

Start mission.

Load questions.

Track current question.

Track results.

---

## Step 7 — Multiple choice

Selection

submission

feedback

explanation

continue

---

## Step 8 — Code question

Display formatted code.

Allow answer selection.

Evaluate response.

---

## Step 9 — XP

Award XP.

Show gain animation.

Store total.

---

## Step 10 — Mission results

Show:

accuracy

XP

concept performance

---

## Step 11 — Unlock progression

Completing mission unlocks next node.

---

## Step 12 — Boss system

Create boss screen.

Boss health.

Questions.

Damage.

Boss reactions.

Victory.

---

## Step 13 — Mastery

Track concept performance.

Display basic strengths/weaknesses.

---

## Step 14 — Persistence

Save progress in localStorage.

---

## Step 15 — Polish

Animations

character reactions

responsive design

accessibility

error states

---

# 91. Codex Implementation Rule

Codex should NOT attempt all steps in one enormous code change.

Each step should produce a working application.

Example:

After Step 5:

course map should work.

After Step 8:

missions should already be playable.

After Step 12:

boss battle should work.

This makes debugging much easier.

---

# 92. Initial Codex Prompt

When beginning implementation, use:

"Read PROJECT_CONTEXT.md and GAME_DESIGN.md completely.

We are building the real Quizzness application, not the school assignment.

Our goal is Phase 1 of the Game Design Document.

Before writing code, inspect the repository and describe its current state.

Then create a concrete Phase 1 implementation plan based on the existing code.

Do not implement future features.

The most important goal is producing a playable vertical slice:

Course → Map → Missions → Interactive Questions → XP → Boss → Results → Saved Progress.

Use reusable, data-driven systems.

Do not hard-code individual pages for individual questions.

Keep the architecture beginner-understandable.

Do not build a database or authentication yet.

Do not perform the entire Phase 1 in one enormous change.

Work incrementally and verify each system before continuing."

---

# 93. Design Principle

Quizzness should feel like:

GAME

first impression

+

LEARNING SYSTEM

underneath

not:

QUIZ WEBSITE

+

GAME SKIN

The distinction should influence every design decision.

---

# 94. Final Product Goal

Eventually a student should be able to say:

"I'm going to play Quizzness for twenty minutes."

rather than:

"I have to go do another online quiz."

That is the experience the game should be built around.

# Historical design notes — superseded where conflicting

The following preserves earlier notes. The current direction above and DECISIONS.md take precedence.

# Game design

Latest identity/phase correction (2026-10-08): Panthy the Thinking Purple Panther, original student/campus artwork and exact #7A4E9D/#C9B6E4/#1B4332/#40916C/#EFE6DD palette are mandatory from Phase 1. Mission/world/activity gameplay is Phase 2; bosses/connected XP/progression are Phase 3. This supersedes conflicting historical phase references below. See design/README.md.

## Confirmed direction

Quizzness is game-first: Course/World → Topic/Mission → Challenge → Feedback → Progress → Reward → Next Challenge. This describes the learner's experience, not a requirement for an explorable world in Phase 1. Make progress and feedback satisfying while keeping the academic task central. Typical sessions may contain 5–10 activities over roughly 3–10 minutes; these are design targets to test, not measured timings.

Build one complete, enjoyable session before expanding the platform. Support course and topic selection, several questions, immediate feedback, short explanations, progress, XP, concept results, and replay. Begin with multiple choice and one additional interaction type.

## Proposed Phase 1 experience

Use Programming Fundamentals as the sample course and Variables and Conditionals as its sample topic. Add true/false as the second interaction type because it needs little additional interface complexity. These content choices can change without changing the engine.

The screen sequence is:

1. Course selection: show the available sample course honestly.
2. Topic selection: explain what the learner will practise.
3. Session: present six questions, one at a time, with progress and earned XP.
4. Feedback: after submission, show the result, correct answer, and explanation.
5. Results: show answers correct, earned XP, concept evidence, and recommended practice.

Use an explicit Continue button after feedback so explanations remain available at the learner's pace. The engine selects the next question without requiring navigation to separate question pages.

Proposed reward rule: 10 XP for each submitted question, plus 5 XP for a correct answer. Count each question only once; label XP as session XP until persistence exists. Incorrect answers do not remove rewards or block completion. Replay starts a new session and resets its totals.

XP measures participation and progression; concept evidence measures learning performance. Do not present XP as an academic grade or proof of mastery. Other reward values in the supplied notes remain alternatives to test.

Keep question rendering, answer evaluation, session transitions, feedback, and results in separate small responsibilities. Do not add timers, lives, leaderboards, unlocks, or avatar customisation to this milestone.


## Supplied product notes

The following source sections preserve the expanded user-supplied vision. Possible features, schemas, numbers, and implementation examples remain proposals unless confirmed in DECISIONS.md. Source numbering is retained for traceability.

# 34. Core Product Identity

Quizzness should feel like a game-first learning platform rather than a traditional education website with game elements added on top.

The distinction is important.

A traditional learning website may look like:

Dashboard  
→ Course  
→ Notes  
→ Quiz  
→ Score

Quizzness should feel closer to:

World / Course  
→ Mission / Topic  
→ Interactive challenge  
→ Feedback  
→ Progress  
→ Reward  
→ Next challenge

The learning content is still academically meaningful, but the presentation should feel more interactive and engaging.

The user should feel like they are progressing through something rather than simply opening worksheets.

---

# 35. What Quizzness Should NOT Become

Quizzness should NOT become:

- a basic quiz generator
- a Google Forms clone
- a Moodle clone
- a Canvas clone
- a plain flashcard website
- a generic LMS
- a static notes website
- a simple multiple-choice app with XP added
- a direct copy of Duolingo
- a direct copy of Coddy.io
- a children's educational game

The goal is to create an original learning-game experience for tertiary-level students.

---

# 38. Game Session Philosophy

Learning sessions should usually be short.

A typical session might contain:

5–10 activities

and take approximately:

3–10 minutes

depending on the course and activity type.

The system should make it easy for students to say:

"I'll do one quick lesson."

Long study sessions can happen naturally when the student chooses to continue.

Do not force every lesson to be long.

---

# 39. Session Structure

A standard session may eventually use a structure such as:

START

↓  

Short lesson objective

↓  

Question 1

↓  

Feedback

↓  

Question 2

↓  

Feedback

↓  

Slightly harder question

↓  

Weak-concept reinforcement

↓  

Final challenge

↓  

Session results

↓  

Reward / progress update

↓  

Recommendation

END

Different game modes may eventually use different structures.

---

# 40. Lesson Objective

Before a session begins, the player should understand what they are about to practise.

Example:

## Big O Basics

Learn how to identify common time complexities in simple programs.

Estimated time: 5 minutes

5 challenges

Possible reward: 80 XP

The objective should be brief.

Do not force the player to read a long introduction before every session.

---

# 55. XP Philosophy

XP should represent useful participation and learning.

Potential XP sources:

Correct answer

Completing activity

Improving a weak concept

Completing a challenge

Mastering a topic

Returning for review

Potential example:

Easy correct answer: 5 XP

Medium correct answer: 10 XP

Hard correct answer: 15 XP

Lesson completion: 20 XP

These values are examples only and can change after testing.

---

# 56. XP Should Not Equal Academic Grade

XP and academic mastery should be separate systems.

A student could have high XP because they practise frequently while still having areas that need improvement.

Example:

Player Level: 12

Overall course mastery: 68%

These represent different things.

XP measures participation/progression.

Mastery measures learning performance.

---

# 57. Levels

Player levels may be based on total XP.

Example:

Level 1

Level 2

Level 3

etc.

Leveling can unlock:

avatar cosmetics

titles

small visual customizations

achievement displays

It should not unlock essential educational content in a way that harms learning.

---

# 58. Achievements

Potential achievements:

First Lesson

Perfect Session

Five-Day Learner

Concept Master

Comeback

Hard Mode Complete

Bug Hunter

Algorithm Apprentice

Achievements should celebrate meaningful behavior.

Avoid creating hundreds of meaningless badges just for clicking things.

---

# 59. Streaks

Streaks may encourage consistent learning, but they should be designed carefully.

Do not make students feel like all progress is lost because they miss one day.

Possible alternatives:

weekly learning goals

flexible streak freezes

number of active study days per week

consistency badges

Avoid overly stressful engagement mechanics.

---

# 60. Daily / Weekly Goals

Possible goals:

Earn 50 XP today

Complete 2 lessons

Review one weak concept

Study on 4 days this week

Goals should encourage useful study rather than meaningless activity.

---

# 82. Timers

Timers should not be used by default.

Learning should prioritize understanding.

Timed challenge modes may exist later.

Example:

Speed Round

60 seconds

Answer as many as possible

But ordinary learning sessions should not pressure students unnecessarily.

---

# 83. Lives / Hearts

Avoid punishing students with systems that prevent them from learning because they made mistakes.

Do not implement:

"Five mistakes means you cannot study anymore."

If hearts/lives are ever used, they should exist only in optional challenge modes.

---

# 84. Scores

Scores may be useful for:

challenge modes

leaderboards

personal bests

However, normal learning sessions should prioritize:

mastery

progress

understanding

over competing for scores.

---

# 85. Leaderboards

Leaderboards are optional future functionality.

If introduced, consider:

weekly XP

friends

course cohorts

private class groups

Avoid global leaderboards that make ordinary students feel permanently behind highly active users.

---

# 86. Social Features

Possible future features:

friends

study groups

course communities

friendly challenges

shared achievements

peer tutoring

These are not priorities for the first real version.

Build a strong single-player learning experience first.

---

# 87. Tutor System Relationship

Tutoring should complement the game.

Potential flow:

Student repeatedly struggles with a concept.

Quizzness suggests:

"You've been practising recursion but it's still giving you trouble."

Options:

Try another lesson

Read explanation

Request peer tutor help

This makes tutoring a logical extension of the learning system rather than a disconnected marketplace.

---

# 97. Lecturer Dashboard — Future

Possible lecturer features:

class performance

concept difficulty

assignment completion

question performance

student progress

However, lecturer analytics raise privacy considerations.

These features are later-stage.

---

# 124. Boss / Challenge Activities

Future topics may end in a special challenge.

Example:

"Algorithm Boss"

The student must solve several connected problems.

These should test multiple concepts from the topic.

Boss activities can provide:

higher XP

special badges

unique animations

They are optional future gamification.

---

# 150. Final Vision

Long-term, Quizzness could become a learning ecosystem where a university student can:

choose or import a course

identify what they need to learn

play short interactive lessons

receive adaptive practice

track mastery

earn game progression

customize a character

compete in optional challenges

receive explanations

upload learning material

generate new study activities

find weak areas

get help from peer tutors

and continue learning through one connected experience.

But all of that must grow from a strong core.

The foundation is:

INTERACTIVE LEARNING

+

GOOD FEEDBACK

+

VISIBLE PROGRESS

+

GAME-LIKE MOTIVATION

Everything else should support those four things.


