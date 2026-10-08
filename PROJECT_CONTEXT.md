Quizzness — Master Project Context
LATEST IDENTITY AND PHASE REQUIREMENT — 2026-10-08
Panthy the Thinking Purple Panther, original student/campus artwork and exact palette #7A4E9D / #C9B6E4 / #1B4332 / #40916C / #EFE6DD are Phase 1 requirements. Preserve the original identity; inspect references before UI work. Phase 1 is brand/mascot + accounts/onboarding/player hub; Phase 2 is worlds/maps/missions/ActivityRenderer; Phase 3 is bosses + connected XP/progression; Phase 4 adaptive mastery/review; Phase 5 more subjects/content; Phase 6 tutoring/social. This supersedes conflicting phase numbers below. design/README.md records supplied sources and missing logo/font/expression artwork. The group venture proposal is context, not permission to implement tutoring, payments or institutional give-back claims now.

SELECTED BACKEND AND ASSET STORAGE
Use Supabase Auth/Postgres for authentication and structured application data. Use Supabase Storage for Phase 1 profile pictures if uploads are introduced. Ship built-in artwork with the application, versioned in GitHub and served by its deployment host. Cloudflare R2 is reserved for future larger/dynamic uploads, PDFs, notes, and media. Store keys/references and metadata in tables, never file binaries. Earlier undecided-provider statements are superseded; no service has been provisioned. Keep Phase 1 focused on student foundation entities.

CORE CATEGORY — Subject-agnostic tertiary learning game
Quizzness is a game-based adaptive learning platform for tertiary education across subjects. Computer Science is only a convenient early demonstration, not the product category.
Never architect Quizzness around programming-specific assumptions. Courses, topics, missions, activities, concept evidence/mastery, checkpoints, bosses, rewards, and progression must be subject-agnostic. Programming activities are one category supported by the engine.
Core hierarchy: Quizzness → Course → Topic/Area → Mission → Interactive Activity → Checkpoint → Boss. Checkpoints and bosses orchestrate activities and progression; they need not require a code editor or a combat theme.
Use ActivityRenderer as the general rendering concept. Multiple choice, matching, ordering, calculation, code, scenario, diagram, classification, drag-and-drop, and multi-step activities have their own interaction/evaluation contracts. Not every activity is a question with options and one correct answer. Build only the types needed by the current milestone.
Codédex, Boot.dev, Coddy, and Duolingo are design inspirations for game identity, structured journeys, short interactions, feedback, and motivation. They do not define Quizzness as a coding product or authorise copying their branding, art, characters, layouts, wording, code, or proprietary mechanics.

CURRENT SCOPE UPDATE — Student-first foundation
The latest user brief supersedes earlier gameplay-first Phase 1 priorities in this file and historical documentation. Phase 1 now builds landing, real signup/login/authentication, onboarding, player hub, course presentation, profile/settings, avatar presentation, and responsive navigation. Learning progress and XP may be clearly labelled mock previews. Gameplay moves to Phase 2, dashboard/game progression integration to Phase 3, adaptation to Phase 4, content/platform to Phase 5, and tutoring/community to Phase 6. Read docs/STUDENT_EXPERIENCE.md, the current docs/TECH_ARCHITECTURE.md, docs/ROADMAP.md, and docs/DECISIONS.md. Keep the chosen React/TypeScript/Tailwind/Phaser stack. Auth and database/persistence providers must be decided before integration; no provider has been selected. The enduring game vision below remains relevant, but old phase numbers do not override this update.

1. What Quizzness Is
Quizzness is a digital learning game/platform designed primarily for university, college, and other tertiary-level students.
Its purpose is to take difficult course concepts and study material and turn them into interactive educational games that make studying more engaging, understandable, and rewarding.
The long-term goal is for Quizzness to feel more like playing a game than using a traditional learning-management system.
Products such as Duolingo and Coddy.io are useful references for engagement, progression, immediate feedback, and short interactive learning sessions, but Quizzness should NOT copy their branding, layouts, characters, wording, or exact mechanics.
Quizzness must develop its own visual identity and gameplay systems.

2. IMPORTANT: THIS IS NOT THE SCHOOL PROTOTYPE
There are two separate Quizzness projects.
School version
The COMP1170 school project/prototype exists for assessment purposes.
That version should remain limited to what the assignment requires.
Do NOT automatically add features from this real application to the school repository.
Do NOT modify the school project unless specifically instructed.
Do NOT assume something belongs in the school submission just because it exists in the real Quizzness application.
Real Quizzness
This repository is for the actual Quizzness product.
It can eventually contain:
- full game systems
- multiple courses
- multiple question types
- accounts
- student profiles
- progression
- adaptive learning
- databases
- analytics
- achievements
- avatars
- course content
- tutoring systems
- university integrations
- premium features
The real application should be designed as a product that can continue growing beyond the university assignment.

3. The Problem
University students do not all learn at the same pace or struggle with the same concepts.
Traditional studying often involves:
- rereading notes
- watching long videos
- answering static worksheets
- reviewing entire chapters
- using quizzes that give little useful feedback
These methods can make studying repetitive and can make it difficult for students to identify exactly what they do not understand.
Quizzness should make studying more active.
The platform should identify what a learner understands, what they are struggling with, and what they should practise next.

4. Primary Users
The initial target users are tertiary-level students.
The early product should make sense especially for students in Barbados and the Caribbean, although the architecture should not restrict the platform to the Caribbean.
Long-term expansion could include universities and students internationally.
A student should be able to use Quizzness even if their university does not officially partner with the platform.

5. Core Product Vision
The basic experience should be:
STUDY MATERIAL
↓
INTERACTIVE LEARNING ACTIVITY
↓
STUDENT ANSWER
↓
IMMEDIATE FEEDBACK
↓
SHORT EXPLANATION
↓
PROGRESS UPDATE
↓
NEXT ACTIVITY CHOSEN BASED ON PERFORMANCE
The student should constantly be doing something rather than simply reading.

6. Core Learning Loop
The basic Quizzness gameplay loop should eventually work approximately like this:
Student selects a course.
Student selects a topic or recommended learning path.
The game gives the student a short series of interactive challenges.
The student answers a question.
The system immediately evaluates the answer.
The game gives supportive feedback.
If the answer is wrong, the game explains the concept rather than simply displaying "Incorrect."
The system records performance for that concept.
The next questions can respond to the student's performance.
At the end of the session, the student receives:
- progress
- XP or another progression reward
- performance information
- concepts mastered
- concepts needing more practice
- a recommended next activity
Sessions should generally feel short enough that a student can study for a few minutes without committing to a long lesson.

7. First Real Playable Version
Do NOT attempt to build the entire Quizzness vision immediately.
The first important milestone is a polished vertical slice.
A vertical slice should allow a player to:
1. Enter Quizzness.
2. Select one sample course.
3. Select one topic.
4. Start a lesson/game session.
5. Answer several questions.
6. Receive correct/incorrect feedback.
7. Read explanations.
8. Move automatically through the session.
9. Receive XP/progress.
10. See a session-complete screen.
11. See which concepts they performed well or poorly on.
It is better for this one complete experience to work extremely well than for twenty unfinished features to exist.

8. Initial Game Types
Quizzness should eventually support several kinds of learning interaction instead of making every activity a normal multiple-choice quiz.
Possible activity types include:
Multiple Choice
Choose one answer from several choices.
True or False
Evaluate a statement.
Fill in the Blank
Enter a missing answer or keyword.
Matching
Match concepts with definitions, examples, formulas, code, diagrams, etc.
Ordering
Place steps into the correct sequence.
Useful for:
- algorithms
- mathematical procedures
- scientific processes
- programming execution
- business processes
Code Questions
For computing courses, students may eventually:
- predict program output
- identify bugs
- arrange lines of code
- complete missing code
- select the correct implementation
Scenario Questions
Give students a real situation and ask them to apply the concept rather than simply remember a definition.
The first playable version does NOT need all of these.
Start with multiple choice and one additional interaction type.

9. Adaptive Learning
Adaptive learning is a major part of the long-term Quizzness vision.
However, do not pretend that the system is intelligent when it is simply random.
The first adaptive system can use understandable rules.
For example:
Each question should be associated with:
- course
- topic
- concept
- difficulty
- question type
The system can track performance by concept.
Example:
Data Structures and Algorithms
Topic:
Time Complexity
Concepts:
- Big O notation
- constant time
- linear time
- nested loops
- logarithmic time
If a student repeatedly gets nested-loop questions wrong, Quizzness should recognise that "nested loops" is the weak concept rather than assuming the student is bad at the entire course.
The system can then:
- provide another explanation
- give an easier related question
- repeat that concept later
- recommend another practice session
As the project becomes more sophisticated, the adaptive model can improve.
Start simple and transparent.

10. Question Difficulty
Questions should support difficulty levels such as:
Easy
Medium
Hard
Difficulty should not simply mean using confusing wording.
An easy question may test recognition.
A medium question may require applying the concept.
A hard question may require reasoning through a new situation.

11. Feedback Philosophy
Feedback is extremely important.
Quizzness should never feel like it is punishing someone for not understanding something.
Avoid feedback such as:
"You failed."
"Terrible."
"You should know this."
Instead use useful feedback such as:
"Not quite."
"Here's what happened."
"You're close — look at this part."
Then explain WHY the correct answer works.
Wrong answers should become part of learning.

12. Explanations
Every meaningful question should be able to include an explanation.
The explanation should answer:
- What is the correct answer?
- Why is it correct?
- Why might the student's answer have seemed reasonable?
- What concept should the student remember?
Explanations should usually be short enough to read during gameplay.
Long-form lessons can exist separately.

13. Gamification
Quizzness should use game mechanics to encourage learning rather than allowing game mechanics to replace learning.
Potential systems include:
- XP
- levels
- achievements
- challenges
- unlockable content
- avatar items
- progress bars
- course completion percentages
- daily or weekly goals
- mastery badges
- streak-style engagement mechanics if they can be implemented without making the experience overly punitive
Rewards should reflect useful learning behaviour.
For example, completing practice and improving a weak concept is more meaningful than simply clicking through many screens.

14. Progress Tracking
Students should eventually be able to see progress at several levels.
Example:
Course:
COMP1170
Overall mastery:
62%
Topics:
HTML — 80%
CSS — 60%
JavaScript — 45%
JavaScript concepts:
Variables — Strong
Conditionals — Strong
Loops — Developing
DOM Events — Needs Practice
The interface should make it easy for students to understand where they need help.

15. Characters and Avatars
Quizzness has a visual direction involving stylised/pixel-art student characters.
Characters should feel appropriate for a university learning game rather than a children's game.
Important character principles:
- consistent pixel-art style
- consistent proportions
- recognisable silhouettes
- readability at small sizes
- different hairstyles
- different hair textures
- different skin tones
- different clothing
- different accessories
- character customisation
- clear expressions
Useful character states include:
- idle
- thinking
- correct answer / celebration
- encouraging reaction after an incorrect answer
- completing a level
Characters should support the learning experience without distracting from it.

16. Visual Design
The interface should feel:
- modern
- playful
- clean
- game-like
- university appropriate
- approachable
- easy to understand
Avoid making Quizzness look like:
- a corporate LMS
- a plain Google Form
- a children's educational website
- a copy of Duolingo
UI hierarchy should be obvious.
The player should immediately understand:
- what they are being asked
- what they can click
- their current progress
- whether their answer was accepted
- what they need to do next
Animations should support feedback rather than exist purely for decoration.

17. Accessibility
Accessibility should be considered from the beginning.
Do not communicate correct/incorrect answers through colour alone.
Interactive controls should work with keyboards.
Buttons should have clear labels.
Text/background contrast should remain readable.
Animations should not prevent students from understanding or using the interface.
Semantic HTML should be used wherever possible.

18. Courses and Content
Quizzness must be able to support multiple courses eventually.
Do not hard-code the entire application around one course.
A conceptual content hierarchy could be:
University/Institution
→ Course
→ Module
→ Topic
→ Concept
→ Learning activity/question
However, institutions should remain optional because independent students should also be able to use Quizzness.

19. Example Data Structure
A question might conceptually contain information similar to:
question id
course id
topic id
concept id
question type
difficulty
question prompt
possible answers
correct answer
explanation
XP value
Do not tightly couple question content to the UI component displaying it.
Question content should be data-driven.
This is important because eventually questions may come from a database, teacher-created material, generated learning content, or imported study material.

20. Game Engine Principle
Do not create a different page with different logic for every question.
Create reusable game components.
For example:
QuestionEngine
MultipleChoiceQuestion
TrueFalseQuestion
MatchingQuestion
FeedbackPanel
ProgressBar
XPDisplay
SessionComplete
The session/game engine should decide which question to show.
The question component should primarily handle how that type of question is displayed and answered.

21. State the Game Needs to Track
During a session the game may need to know:
- current question
- selected answer
- whether the answer has been submitted
- whether the answer is correct
- number correct
- number incorrect
- XP earned
- question progress
- concept performance
- session status
Keep these responsibilities organised.
Avoid scattering game state across unrelated UI elements.

22. Suggested First Content
Because Quizzness began from a university context, Computer Science is a useful initial demonstration subject.
Possible demo topics include:
HTML basics
Programming fundamentals
Algorithms
Data Structures
Logic
The architecture must not assume Quizzness is only for Computer Science.
Eventually the same engine should support subjects such as:
business
management
mathematics
science
humanities
and other university courses.

23. Tutoring Vision
A later Quizzness system may connect students who need additional help with qualified peer tutors.
Potential long-term functionality includes:
- tutor profiles
- subjects tutors can teach
- tutor availability
- tutor verification
- tutor ratings
- requests for help
- tutoring sessions
- verified volunteer/give-back hours
- optional paid tutoring
THIS IS NOT PART OF THE FIRST GAMEPLAY MVP.
Do not build a marketplace before the learning game itself works.

24. Long-Term Business Context
Possible Quizzness revenue streams include:
- university/institutional licensing
- optional premium student subscriptions
- commissions from optional paid tutoring
These business ideas provide context for architecture decisions but should not interfere with building the learning experience.
Do not add payments to the early MVP.

25. Long-Term Institution Features
Future versions may allow universities or lecturers to:
- create courses
- upload content
- view class learning analytics
- identify commonly misunderstood concepts
- create question sets
- assign practice
- monitor aggregate progress
Student privacy should be taken seriously if these features are introduced.
These systems are later-stage features.

26. Development Philosophy
Quizzness should be developed incrementally.
Prefer:
small working features
over
large unfinished systems.
When introducing a system:
1. Build the simplest useful version.
2. Make it work.
3. Make the code understandable.
4. Test the interaction.
5. Refactor when necessary.
6. Then expand it.
Avoid premature complexity.

27. Important Instructions for Codex
Before making significant changes:
Read this file.
Inspect the existing repository.
Understand how the current code is structured.
Do not assume files, libraries, frameworks, routes, or database tables exist.
Do not replace working code unnecessarily.
Prefer modifying existing components when appropriate rather than duplicating them.
Keep functions/components reasonably small.
Use descriptive variable names.
Avoid enormous files containing unrelated responsibilities.
Do not introduce a large dependency just to solve a tiny problem.
Do not build features that were not requested merely because they may be useful eventually.

28. Beginner-Friendly Development
The owner of the project is still learning software development.
Code should therefore remain understandable.
When implementing important functionality:
- explain what files are being changed
- explain why the change is needed
- identify important functions/components
- avoid unnecessary advanced abstractions
- explain unfamiliar architecture decisions
- use clear naming
Do not sacrifice good architecture, but do not make the architecture unnecessarily complicated.

29. Codex Must Separate Facts From Proposals
Some information in this document describes the confirmed Quizzness vision.
Other decisions may still need experimentation.
When proposing a major new system, explain:
WHAT is being proposed.
WHY it benefits Quizzness.
WHAT complexity it adds.
WHETHER it is needed now or could wait.
Do not silently turn suggestions into permanent product requirements.

30. Version-Control Rules
Changes should be small and logically grouped.
Do not combine unrelated work into the same change.
Examples:
Good:
"Add reusable answer button"
"Implement multiple-choice question state"
"Add session progress bar"
Bad:
"Rebuild entire app, add login, database, animations, marketplace and tutor system"
Never commit secrets, API keys, passwords, .env values, or private credentials.

31. First Development Priority
The first major goal for the real Quizzness application is:
BUILD ONE COMPLETE, ENJOYABLE LEARNING SESSION.
Everything else is secondary until this works.
The first session should demonstrate:
course selection
topic selection
game/lesson start
multiple questions
interactive answers
answer submission
correct/incorrect feedback
explanations
progress
XP or another reward
concept tracking
session completion
results
replay/continue option
This is the core product.

32. What NOT to Prioritise Yet
Unless explicitly requested, do not prioritise:
payment processing
paid subscriptions
tutor payments
university administration portals
complex AI systems
large-scale analytics dashboards
social networks
messaging systems
production-scale microservices
native mobile apps
complex cloud infrastructure
The learning game must come first.

33. Product North Star
Whenever deciding whether a feature belongs in Quizzness, ask:
"Does this help a student understand what they are learning, practise it actively, see their progress, or stay motivated to continue?"
If the answer is no, the feature is probably not currently important.
The core goal of Quizzness is not to create quizzes.
The core goal is to make learning feel interactive, responsive, rewarding, and game-like.

34. Selected Technology Stack
Use TypeScript, React, Tailwind CSS with custom CSS, and Phaser for the real Quizzness product.
- React handles course screens, quizzes, explanations, dashboards, and avatar selection as those features are introduced.
- Tailwind and custom CSS handle the visual system, layout, pixel effects, and interface styling.
- CSS transitions and animations handle buttons, hover effects, progress bars, and interface entrances.
- Phaser handles animated characters, game environments, interactive objects, and minigames as those features are introduced.
- TypeScript defines content, session logic, and the connection between React and Phaser.

Keep learning state and scoring in reusable TypeScript logic. React renders accessible learning controls; Phaser responds to game events without maintaining a competing copy of session scores.

Character walking and other sprite animation require authored animation frames, typically in sprite sheets. A still pose is not a completed walking animation. Do not assume assets exist or access the school repository to obtain them.

Start with CSS for interface motion and Phaser for character motion. Do not add another animation library for these initial needs. This stack selection does not expand Phase 1 into campus exploration, a dashboard, or an avatar customisation system.

Expanded Product Documentation
The subsequently supplied product notes, originally numbered 34–150, are organised by subject in docs/. Their source numbering is retained within those documents and is independent of the numbered sections in this file. Read docs/DECISIONS.md to distinguish selected decisions from conceptual examples. Read docs/ROADMAP.md for milestone scope. Future feature descriptions are not instructions to implement them immediately.

Latest Game Design Direction
Read docs/GAME_DESIGN.md as the second major context document. The latest supplied design expands Phase 1 to Course → Map → Missions → Interactive Questions → XP → Boss → Results → Saved Progress. Include code-output/code-choice as the second question presentation, one visible avatar, one boss, concept evidence, and localStorage for completed progress. This replaces the earlier session-only milestone; build incrementally, starting with a complete mission. Keep the selected React/TypeScript/Tailwind/Phaser stack. Boss damage, XP amounts, level thresholds, names, and detailed save rules in the focused specifications are proposals until tested or confirmed. Accounts, databases, tutoring, payments, and other platform systems remain outside Phase 1.
