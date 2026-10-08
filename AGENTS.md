# Working on real Quizzness

The existing Quizzness visual identity and original mascot are core product requirements, not optional polish. Do not redesign, replace, remove or genericize them. Before implementing UI, inspect the supplied design assets/references and preserve their established style. Exact approved palette: #7A4E9D, #C9B6E4, #1B4332, #40916C, #EFE6DD. Panthy is the learning guide; the supplied student characters represent students. Read design/README.md for source provenance and unresolved logo/font/expression assets. The user explicitly authorised importing mascot files from ../Quizness/mascot; this does not authorise any other school-repository interaction or changes.

Latest phase sequence: Phase 1 brand/mascot + student foundation, Phase 2 worlds/maps/missions/ActivityRenderer, Phase 3 bosses + connected XP/progression, Phase 4 adaptive mastery/review, Phase 5 expanded subjects/content, Phase 6 tutoring/social. This supersedes older boss-in-Phase-2 statements below and in historical notes.

Read PROJECT_CONTEXT.md and docs/GAME_DESIGN.md completely before significant product or architectural changes. Read README.md, docs/DECISIONS.md, and relevant focused specifications, then inspect the existing implementation. Current summaries take precedence over explicitly marked historical notes.

This folder is the real product. The sibling ../Quizness folder and parent PRODUCT.md describe the separate COMP1170 prototype. Do not modify or interact with the school repository unless explicitly asked.

Before editing code, explain the relevant existing files and intended change in beginner-friendly language. Keep changes small, preserve the visual identity, and keep question content separate from reusable game logic.

Quizzness is subject-agnostic tertiary education. Never make course, mission, mastery, boss, reward, or progression logic depend on programming. Use ActivityRenderer and typed activity-specific inputs/results; code activities are one optional category. Computer Science demo content and coding-platform inspirations do not define the product. Preserve current Phase 1 student-foundation scope.

Current Phase 1 is the student platform foundation: landing, signup/login/authentication, onboarding, player hub, courses/overview, profile/settings, avatar presentation, and responsive navigation. Read docs/STUDENT_EXPERIENCE.md and current docs/TECH_ARCHITECTURE.md. Game engines/bosses move to Phase 2, connected progression to Phase 3, and deeper adaptation to Phase 4. Label mock learning data honestly. Keep TypeScript/React/Tailwind/Phaser; select auth/persistence providers before integration. Future systems are not authorization to implement them.

Separate confirmed requirements from proposed implementation choices. Do not introduce frameworks, services, accounts, databases, payments, tutoring, or complex AI without a relevant request. Never commit credentials.

After changes, explain what changed, which files matter, and how to test it. Verify the complete affected interaction, including keyboard access and incorrect-answer behavior.
