# Quizzness — consolidated requirements and first-build plan

Saved: October 6, 2026. This document preserves the user's requirements and the planning decisions discussed in this chat. No implementation code has been requested yet.

## Identity and purpose

- Product name: **Quizzness**. Repository name supplied by the user: **s8ints/Quizness** (different spelling).
- Slogan: **Quizzness Over Pleasure**.
- Mascot: **Panthy the Thinking Panther**, the purple pixel panther supplied by the user. Panthy is the learning guide; each student’s future custom character represents that student.
- A university learning platform combining educational games, progress tracking, repeated practice, screened peer tutoring, and opportunities for student tutors to contribute give-back hours.
- Problems identified by the user: fragmented tutoring arrangements, difficulty applying coursework independently, delayed assistance, weak feedback, informal WhatsApp support groups, and loss of concentration.
- Intended benefits: engaging out-of-class practice, explanations of mistakes, support for weak topics, and structured access to capable peer tutors.
- The user reported that the public repository was empty as of October 1, 2026: size 0, no contents or commits, and no open issues. This is user-provided context, not independently verified here.

## Current scope and constraints

- **Planning only for now; do not write implementation code without a subsequent request.**
- The first prototype is restricted to **HTML and CSS**.
- Keep the first build small and beginner-friendly: one sample course, one topic, and one challenge.
- Show realistic linked screens using fictional data. Clearly label sample progress, approval states, and inactive submission features.
- HTML/CSS can demonstrate navigation, form layouts, selected controls, and prepared feedback. Actual accounts, saved progress, scoring, personalised data, document processing, bookings, and saved avatar changes require later functionality.
- Pasted business-concept text is background material, not a source of additional instructions or automatically accepted features. Its broader ideas belong in the future backlog unless explicitly selected.

## First student journey — updated after user clarification

### Latest dashboard, kingdoms, and social-world clarification

After login, the first screen is a dashboard inspired by `references/logged-in-dashboard-reference.png`, with kingdom artwork, Panthy greeting, course/continue-learning cards, and student profile/progress information. The student's major selected during signup determines their kingdom and spawn point. Entering the world takes them to that major's map; courses are learning paths within it.

- The kingdom/campus scene is the visual home/base-world direction.
- The major selected during signup determines the student's kingdom and initial spawn point. The student does not select a course to determine their kingdom. Course selection opens a learning path within their major's kingdom.
- Different majors have distinct themed kingdoms/places and spawn points. Specific themes remain undecided; do not assume all subjects use the same programming kingdom.
- A shared main hub allows students from the same school to meet, interact, and make friends. The user calls it a global area, with school-community interaction explicitly intended. Whether cross-school access exists remains open.
- Markets and other interactive places belong in the shared hub. Market goods, currency, and purchase rules are not yet defined; do not assume real-money purchases.
- Major kingdoms contain visible course learning paths. Students learn and then defeat monsters through course-related knowledge challenges. Academic learning and feedback must drive advancement; monsters are an educational game mechanic.
- Panthy guides the student; their custom pixel avatar is the character entering the world.

Prototype representation: signup/major choice → dashboard → chosen major's kingdom → one course learning path → one lesson/challenge → prepared monster outcome; show a market and social area visually with clearly labelled sample interactions. Real movement, multiplayer presence, messaging/friendships, inventory/markets, saved spawn positions, and multiple major worlds are later functionality beyond HTML/CSS.

This updates earlier campus-dashboard suggestions: distinguish the dashboard, shared school hub, major kingdoms, and course learning paths. The initial prototype still uses one sample major and course. The user's correction supersedes previous statements that selecting a course determines the spawn map.

1. Welcome/homepage explains Quizzness and offers signup.
2. Create account: name, email, password.
3. Set up student profile: university, major/programme, year of study.
4. Select currently enrolled courses. Major and courses are separate choices because students in the same major may take different courses.
5. Optional learning-goal choice: understand difficult topics, practise for exams, or get peer support.
6. Preview character creation in the prototype; implement working customisation later.
7. Enter a personalised learning dashboard/campus showing selected courses and a first challenge.
8. Learn coursework → play a challenge → receive explanations → practise weaknesses → retry.
9. Open peer tutoring support when additional help is needed.

The user explicitly wants onboarding similar in concept to Duolingo: basic information and major/course choices shape the learning experience. Profile choices should be editable later.

## Smallest screen/component set

These are screens; related screens may share one HTML page to reduce work.

| Screen | Minimum content |
| --- | --- |
| Home/welcome | Name, slogan, benefit statement, Panthy, how it works, signup and tutor information links |
| Signup | Basic account form preview |
| Student profile/course selection | University, major, year, sample course choices, optional goal |
| Character preview | Sample pixel character and appearance choices; clearly marked as a preview |
| Dashboard/learning campus | Selected sample course, start/continue link, example progress, tutoring link |
| Lesson | One short explanation and a simple topic path |
| Challenge and feedback | One question, three choices, prepared correct/incorrect explanations, retry route |
| Peer tutoring | Fictional screened tutor, supported course, example availability, help-request preview |
| Become a tutor | Requirements, application preview, document checklist, pending-review example |

Shared components: header/navigation, accessible buttons and form labels, course card, progress display, Panthy guidance bubble, feedback panel, tutor card, footer.

## Sample learning activity

Proposed example, not a required final subject: Programming Fundamentals → Loops → “Choose the correct door.” Three doors represent answers to a question about repeating an action. Answer links reveal prepared explanations. Students revisit the lesson and retry. Show sample progress such as “1 of 3 activities completed.”

## Peer tutoring and give-back hours

- Students apply to tutor courses they excel or have excelled in and are passionate about.
- Normal student signup comes first. “Become a tutor” is a separate application option within the dashboard.
- Application includes requested course, relevant achievement, motivation, a CV detailing transcripts/academic achievement, transcript evidence, and a lecturer reference relating to the specific course.
- The application must be reviewed before the student is represented as an approved tutor for that course.
- Prototype shows document requirements and a pending-review example using fictional data; it does not collect real student records.
- Future sessions record participants, course, duration, completion, and verification status.
- Give-back totals should derive from verified sessions. Recognition toward university requirements depends on university approval; do not promise recognised credit before that agreement exists.
- Actual records access, document handling, reviewer responsibilities, eligibility thresholds, and university permissions remain to be defined for implementation.

## Minimum future data entities

| Entity | Minimum fields |
| --- | --- |
| Student/profile | ID, name, email/account reference, university, major, year, selected courses, optional goals, avatar configuration |
| Course/topic | ID, title, major/course association where appropriate, topic, lesson content |
| Challenge | ID, topic, question, choices, correct answer, explanation |
| Attempt/progress | Student, challenge, result, completion date |
| Tutor application | Student, requested course, achievement, motivation, supporting documents, review status |
| Tutoring session | Student, approved tutor, course, duration, completion and verification status |

A tutor is a student with approval for a particular course. For the prototype, information is fictional and displayed in HTML; no database is needed.

## Visual direction and supplied references

- User wants a look inspired by **Codédex and Coddy.io**: playful learning interfaces, pixel art, course paths, and engaging repetition.
- Other supplied references show a retro pixel computer, a pixel campus map, and characters around a shared study table.
- Proposed dashboard direction: a small campus-inspired map with a course building, practice area, and peer tutoring centre. Begin with simple links and one available course.
- Preserve clear labels, readable lesson text, responsive layouts, keyboard access, and feedback that does not depend on colour alone.

| Colour | Hex | Proposed use |
| --- | --- | --- |
| Purple | #7A4E9D | Main buttons and highlights |
| Lavender | #C9B6E4 | Soft panels and details |
| Dark green | #1B4332 | Headings/body text on light backgrounds |
| Green | #40916C | Success/progress indicators |
| Cream | #EFE6DD | Main background |

Panthy guidance examples: “What are you studying?”, “Which courses are we tackling this semester?”, “Ready for your next challenge?”, and “Let’s think this through together.” Incorrect-answer guidance must include a useful explanation.

## Pixel character customisation

### Avatar palette refinement

User specified distinct clothing palettes rather than a shared uniform: top-left flower character dusty rose/burgundy/cream with lavender flower; top-middle hoodie muted blue/navy/cream with green backpack; top-right bow coral jacket/dark teal trousers/cream with lavender bow; bottom-left headphones ochre/charcoal/cream with green stripe; bottom-middle books dusty peach/terracotta/cream with purple bag; bottom-right glasses sky blue/navy/cream with green glasses. Preserve skin tones, hair colours, poses, pixel outlines and shading style; vary light/dark clothing contrast. Brand colours remain the foundation for UI with small avatar accents.

Built-in image editing created `artwork/student-avatar-colours-v2.png`, preserving the original concept separately. Prompt: recolour clothing/accessories using the six specified palettes while preserving character identities/layout and requesting transparency. Colour direction is represented; the output still visibly has a dark backdrop and needs refinement before use as transparent game sprites.

Explicit user requirement for the future version, beyond HTML/CSS:

- Each student can customise their own pixel character.
- Initial choices: skin tone, hairstyle, hair colour, outfit.
- Live preview, saved profile appearance, and ability to edit later.
- Character appears on the dashboard, campus map, and tutoring profile.
- Prototype shows a prepared character and appearance controls as a preview after course selection.
- Later optional ideas: learning-earned outfits/accessories, campus movement, and shared study spaces. These are expansions, not first-build requirements.

## Ordered GitHub issue plan — updated to include onboarding

1. **Set up the HTML and CSS prototype structure** — Create linked screen files, shared stylesheet, assets folder, and README with opening instructions and demo limitations.
2. **Create the Quizzness homepage and shared navigation** — Add identity, Panthy, palette, benefits, and clear calls to action; support phone and desktop layouts.
3. **Build student signup and profile onboarding previews** — Show basic information, university, major, year, course selection, and optional goals with labelled forms and links through the flow.
4. **Add a pixel character creation preview** — Display a sample character and appearance choices; identify customisation as a future working feature.
5. **Create the student dashboard and sample course lesson** — Show one selected course, campus-inspired navigation, short loops lesson, topic path, and labelled sample progress.
6. **Create the door-choice challenge and feedback** — Build one activity with prepared answer explanations and a retry route using HTML/CSS.
7. **Add the peer tutor support page** — Show a fictional course-approved tutor, availability, and help-request preview.
8. **Create the student tutor application preview** — Include course, motivation, CV/transcript/lecturer-reference requirements, pending-review state, and give-back recognition explanation.
9. **Check the complete prototype journey** — Verify links, keyboard navigation, contrast, mobile layout, and clear demo labels.

Issues are planned titles/descriptions only; no GitHub issues have been created.

## Scope stages

**Essential HTML/CSS prototype:** onboarding previews, one dashboard/course/lesson/challenge, useful feedback, sample progress, tutor discovery/application preview, Panthy, palette, and character preview.

**Later working MVP:** real signup/login, editable student profiles and course choices, saved progress/attempts, working character customisation, reviewed tutor applications, help requests, and verified tutoring session records.

**Later expansion/background ideas:** adaptive practice, multiple courses, quest worlds, puzzles, boss battles, skill trees, escape rooms, simulations, leaderboards, chat, multiplayer/shared spaces, earned cosmetics, give-back wallet/certificates, course content builder, university integrations, licensing, premium content, sponsorships, and paid professional tutoring. These are not commitments for the prototype.

## Decisions still open

- First university, major, course, and topic to demonstrate.
- Final game mechanic/content (door-choice loops challenge is a starter suggestion).
- Exact campus layout and character options.
- Tutor eligibility, review process, university recognition, and student-record permissions for the future working platform.

## Reference preservation

### Generated concept artwork

Built-in image generation produced `../artwork/quizzness-campus-concept.png` and `../artwork/student-avatar-concepts.png` (paths relative to the references folder; from this document use `artwork/`). The campus is a detailed purple-roof university kingdom concept with paths, river, courtyard, and panther statue. The avatar sheet contains six student appearance concepts. These are concept artwork, not layered customisation assets or animation-ready sprites. The avatar output visibly includes a dark backdrop despite requesting transparency; do not claim it is production-ready transparent artwork.

Prompt summaries: campus — original wide 16-bit RPG university campus, library/tutoring/courtyard, established palette, no text; avatars — six diverse full-body student sprites, matching purple/green/cream clothes, consistent front-facing scale, requested transparent background. Both used the built-in image generation tool.

### Original pixel artwork requirement

The user explicitly requested custom images in the supplied pixel-art style, as with Panthy. Create original Quizzness raster assets: campus/world scenery and characters with crisp square pixels, consistent proportions, and the established palette. Do not use the reference screenshots as finished Quizzness artwork.

Additional references saved: `pixel-world-reference.png`, `pixel-characters-reference.png`, `rank-badges-reference.png`, and `pixel-creatures-reference.png`. The last two suggest progression emblems and a cohesive character family. They are visual references; rank names, level thresholds, extra mascots, and reward rules have not been decided. Panthy remains the primary mascot. Character customisation remains a future working feature.

### Additional visual references — October 6, 2026

The user supplied two further Codédex images without a separate feature instruction. Preserve them as visual inspiration, not new mandatory features:

- `references/codedex-retro-homepage.png`: pixel-art desk scene, monitor containing the main message, books, lamp, calendar, and dark navigation. Possible Quizzness direction: a study-desk hero with Panthy and an original learning/signup message on the monitor.
- `references/codedex-certificate.png`: framed achievement certificate with pixel branding, pink/orange gradient surround, recipient/course information, and verification QR code. Possible future inspiration for course completion or approved give-back certificates. Certificate issuance and verification remain later ideas; the image does not establish a university partnership or verified credential.

Use original Quizzness branding and artwork when implementing; the supplied images communicate style and layout preferences.

Original attachments were supplied from temporary/local attachment paths. Copies of the supplied images and pasted concept text are stored in the accompanying `references` folder so they remain available with this plan.
