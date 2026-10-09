# Student experience

Quizzness serves tertiary learners across subjects. Onboarding study interests, course/world cards, and hub language must not assume every student studies computing. Computer Science demo content is one example; Codédex and other coding references inform design rather than the product's academic category.

## Current scope

Phase 1 builds the student-facing foundation: public welcome, real signup/login, onboarding, a player hub, course presentation, profile/settings, avatar presentation, and responsive navigation. Gameplay begins in Phase 2. The frontend remains TypeScript + React + Tailwind/custom CSS; Phaser is reserved for character/game scenes when needed. Supabase Auth/Postgres is selected and integrated in code; live project verification is pending.

## Journey and routes

| Route | Purpose | Access |
| --- | --- | --- |
| `/` | Explain Quizzness and offer signup/login | Public |
| `/signup` | First name, last name, email, password | Public |
| `/login` | Sign in and access recovery | Public |
| `/onboarding` | Major (sets home world), optional year of study, optional institution, goals, courses this semester, avatar | Signed in |
| `/dashboard` | Continue Journey, progression preview, worlds, goals, avatar | Signed in and onboarded |
| `/courses` | Worlds: home world first, then every other world's sample courses | Signed in and onboarded |
| `/campus` | Shared school hub (presentation only; social features later) | Signed in and onboarded |
| `/courses/:courseId` | Course overview and future learning entry | Signed in and onboarded |
| `/profile` | Basic student identity and avatar | Signed in and onboarded |
| `/settings` | Profile/preferences and logout | Signed in and onboarded |

Visitor → Signup → verification if required by the chosen provider → Login → Onboarding → Dashboard → Course overview. Existing onboarded students go from login to dashboard; unfinished onboarding resumes there. Later: Dashboard → Course Map → Mission → Boss → Results → updated Dashboard.

## Account and onboarding boundaries

Use an established authentication provider; never store passwords in application profile records or localStorage. Provider-managed sessions establish identity. Signup collects basic identity; onboarding collects educational information separately. Institution is optional and independent learners can continue without a university partnership.

Proposed onboarding steps: select study field (including a free-text alternative), choose institution or independent learning, select learning goals, choose a supplied avatar. Allow back/edit and preserve completed steps. Persist profile/onboarding state under the authenticated user. Exact required fields and whether avatar selection is skippable remain design choices; do not invent an institution directory or imply verified affiliation.

## Player hub

Prioritise Continue Journey, player progression, current courses/worlds, learning progress, goals/challenges, and character/avatar. Use modern readable controls with pixel artwork. Preserve the university-appropriate game identity. Keep account setup short and explain the next useful action.

Phase 1 learning fixtures may show realistic XP, progress, and course information, but must visibly say sample/demo progress. Prefer zero/empty states for a new real account, with an explicitly labelled preview if useful. These values do not represent earned XP, verified mastery, real enrollments, or completed missions.

Continue Journey leads to a clearly labelled learning preview/coming-soon state within the course overview, with a useful way back. No fake rewards or hidden broken links. Do not show internal phase numbers as normal student-facing copy. Weekly quests, notifications, and progress statistics are previews only unless explicitly implemented.

## Profile, settings, and state handling

Students can view/edit basic profile details, choose an available avatar, view courses, and sign out. Show saving/saved/error states honestly. Authentication credentials and recovery use the chosen provider. Guard private routes, handle session loading/expiry, and clear per-user client caches on logout/account changes. Unknown course IDs and unavailable content need useful recovery states.

Use keyboard-accessible semantic forms, labelled fields, readable validation, appropriate autocomplete, visible focus, reduced motion, and responsive layouts. Keep password values out of logs. Access control must apply to server-side user data, not just route redirects.

## Phase 1 completion checks

A student can visit, create a real account, sign in, complete onboarding, reach the hub, view/open courses, understand sample progress, manage profile/settings, and log out. Verify reload/session expiry, incomplete onboarding, unauthorized access, user-data isolation, save failures, empty courses, unknown routes, keyboard flow, and narrow screens. Mock login alone does not satisfy basic authentication.

Bosses, mission engines, XP earning, adaptive learning, tutors, payments, admin dashboards, and AI features are excluded from Phase 1. The existing gameplay specifications guide Phase 2 and later integration rather than today's foundation work.


# Supplied revised brief

The original brief is retained below. Its examples are illustrative; the current summaries and DECISIONS.md distinguish confirmed scope from undecided providers and implementation proposals.

Yes, that makes sense — and I agree with the change.

You’re saying **Phase 1 should build the shell of the real product first**, so when we eventually add the game loop, bosses, missions, mastery, XP, etc., they already live inside a proper student experience instead of feeling like a standalone demo.

That changes the roadmap quite a bit. I’d redefine it like this:

### Revised Phase 1 — Student Platform Foundation

Phase 1 should build the **student-facing application around the future game**:

- Landing / welcome page
- Sign up
- Login
- Basic authentication flow
- Student onboarding
- Student dashboard
- Course cards / enrolled courses
- “Continue Learning” area
- Progress preview
- XP / level preview
- Profile/avatar area
- Navigation
- Settings/basic profile
- Empty states for features not built yet
- Responsive app shell

The important thing is that some areas can use **mock data at first**. We do not need the full learning engine just because the dashboard shows things like XP, progress, or “Continue Learning.”

For example, the dashboard could already look like:

```text
┌─────────────────────────────────────────────────────┐
│ QUIZZNESS                         🔔     👤 Jolicia │
├─────────────────────────────────────────────────────┤
│                                                     │
│ Welcome back 👋                                     │
│                                                     │
│ Level 4                           320 / 500 XP       │
│ ███████████████░░░░░                                │
│                                                     │
│ CONTINUE YOUR JOURNEY                               │
│                                                     │
│ ┌───────────────────────────────────────────────┐   │
│ │ COMP1170                                      │   │
│ │ Web Development                               │   │
│ │                                               │   │
│ │ Current Area: JavaScript Basics               │   │
│ │ ███████████░░░░  64%                          │   │
│ │                                               │   │
│ │                         [ Continue ]           │   │
│ └───────────────────────────────────────────────┘   │
│                                                     │
│ YOUR COURSES                                        │
│                                                     │
│ [ COMP1170 ] [ MATH ] [ Management ]                │
│                                                     │
│ RECENT PROGRESS                  WEEKLY GOAL         │
│ Loops      Strong               3 / 4 days          │
│ Functions  Developing           ████████░░           │
│                                                     │
└─────────────────────────────────────────────────────┘
```

Then when we build the **actual game system in Phase 2**, that `Continue` button starts taking you into:

```text
Dashboard
   ↓
Course
   ↓
Course Map
   ↓
Mission
   ↓
Questions / Challenges
   ↓
Boss
   ↓
Results
   ↓
Dashboard updated
```

That architecture is much cleaner.

## I would rewrite the phases like this

### Phase 1 — Account + Student Experience

Goal: make Quizzness feel like a real product before implementing the full game.

Build the app shell, authentication, onboarding, dashboard, profiles and course presentation.

The student should be able to:

```text
Visit Quizzness
      ↓
Create Account
      ↓
Log In
      ↓
Complete Basic Onboarding
      ↓
Choose / See Courses
      ↓
Enter Student Dashboard
      ↓
See Progress / XP / Course Information
```

At this point, the actual course game can still be mocked.

### Phase 2 — Core Game

Now we build:

```text
Course Map
Missions
Question Engine
Feedback
XP earning
Mission completion
Boss battle
Results
Unlock progression
```

This is where Quizzness becomes properly playable.

### Phase 3 — Connect Game to Dashboard

Then the two systems stop using placeholder data.

Example:

```text
BEFORE:

Dashboard
XP: 350
← mock data
```

becomes:

```text
AFTER:

Boss defeated
+200 XP
      ↓
Game progress saved
      ↓
Dashboard
XP: 550
Level increased
Boss marked defeated
Next area unlocked
```

Now the entire experience becomes connected.

### Phase 4 — Adaptive Learning

Then:

- concept mastery
- weak areas
- recommendations
- adaptive difficulty
- question selection
- targeted practice
- mistake review
- spaced review

### Phase 5 — Larger Platform

Then:

- additional courses
- study material uploads
- course creation
- AI-assisted learning
- richer analytics
- more question types
- bigger game worlds

### Phase 6 — Tutors / Social

Then:

- tutor profiles
- tutor matching
- tutoring requests
- volunteer hours
- optional paid sessions
- study groups
- social challenges

---

## What Phase 1 should specifically contain

I would tell Codex that Phase 1 has these **screens**:

```text
PUBLIC

/
Landing Page

/login
Login

/signup
Create Account


ONBOARDING

/onboarding
Basic onboarding flow


STUDENT APP

/dashboard
Student Dashboard

/courses
My Courses

/courses/:courseId
Course Overview

/profile
Student Profile

/settings
Settings
```

But importantly:

**No actual game engine yet.**

The Course Overview screen might contain:

```text
COMP1170
Web Development

Overall Progress
████████░░░░ 42%

YOUR JOURNEY

HTML
✓ Completed

CSS
● Current

JavaScript
🔒 Locked

[ Continue Learning ]
```

Clicking `Continue Learning` during Phase 1 could lead to a temporary:

```text
Coming in Phase 2

Your first Quizzness adventure is being prepared.
```

Or better, one tiny placeholder lesson so Codex can verify routing.

---

# Signup needs to be thought through too

Since this is the real product, I wouldn't make signup something random like:

```text
Name
Email
Password
```

and that's it.

The architecture should account for Quizzness-specific user information.

For example:

### Account

```text
First name
Last name
Email
Password
```

Then onboarding handles educational information separately.

### Onboarding Step 1

```text
What are you studying?

[ Computer Science ]
[ Business ]
[ Mathematics ]
[ Other ]
```

### Step 2

```text
Where do you study?

University / College

[ Search institution ]

or

[ I'm learning independently ]
```

Important because Quizzness should eventually support students outside partner universities.

### Step 3

```text
What do you want help with?

☐ Understand difficult concepts
☐ Prepare for tests
☐ Practice regularly
☐ Track my progress
☐ Make studying less boring
```

### Step 4

Maybe:

```text
Choose your character
```

This is where your pixel characters can start appearing immediately.

Now onboarding itself already feels like part of the game.

---

# And the dashboard should NOT look like Canvas or Moodle

This is important.

I don't want Codex producing:

```text
SIDEBAR

Dashboard
Courses
Grades
Assignments
Calendar
Settings
```

with seven white rectangles and a corporate UI.

😭

Instead it should feel like entering your **player hub**.

Something closer conceptually to:

```text
                    QUIZZNESS

     Welcome back, Jolicia!        LEVEL 7
                                   ███████░

    ┌─────────────────────────────────────┐
    │          CONTINUE JOURNEY           │
    │                                     │
    │             COMP1170                │
    │                                     │
    │       JavaScript Territory          │
    │                                     │
    │              64%                    │
    │                                     │
    │        ▶ CONTINUE JOURNEY            │
    └─────────────────────────────────────┘


     YOUR WORLDS

     ┌──────────┐  ┌──────────┐
     │ COMP1170 │  │  MATH    │
     │   64%    │  │   21%    │
     └──────────┘  └──────────┘


     ⚡ WEEKLY QUEST

     Complete 3 learning missions

     ████████████░░░░
     2 / 3


         [ PIXEL CHARACTER ]
```

Now it feels more like Quizzness.

---

# Revised documentation

I'd change:

```text
GAME_DESIGN.md
```

so the roadmap says:

```text
PHASE 1
PRODUCT FOUNDATION

PHASE 2
GAMEPLAY VERTICAL SLICE

PHASE 3
CONNECTED PROGRESSION

PHASE 4
ADAPTIVE LEARNING

PHASE 5
CONTENT + PLATFORM

PHASE 6
TUTORING + COMMUNITY
```

And I would create another document:

```text
docs/
    STUDENT_EXPERIENCE.md
```

That one becomes **very important**.

It would describe:

```text
Visitor
↓
Signup
↓
Onboarding
↓
Dashboard
↓
Course
↓
Course Map
↓
Mission
↓
Boss
↓
Results
↓
Dashboard
```

So Codex understands the **whole journey**, instead of thinking in disconnected pages.

---

# New Codex Phase 1 instruction

I'd replace the old Phase 1 prompt with this:

```text
Read:

PROJECT_CONTEXT.md
docs/GAME_DESIGN.md
docs/STUDENT_EXPERIENCE.md
docs/UI_UX_GUIDE.md

before beginning.

We are building the REAL Quizzness application.

PHASE 1 IS NOT THE GAME ENGINE.

Phase 1 establishes the product foundation that the game will live inside.

The goal is to create a polished student-facing application containing:

- public landing experience
- signup
- login
- authentication
- initial onboarding
- student dashboard
- course cards
- course overview
- player profile
- XP/level presentation
- navigation
- avatar presentation
- responsive app shell

Some learning progress information can use realistic mock data until the gameplay system exists.

Do NOT build:
- bosses
- complete mission engine
- adaptive learning
- tutor system
- payments
- university admin dashboard
- AI features

during Phase 1.

However, architect the dashboard so those systems can connect later.

The student dashboard must feel like a PLAYER HUB, not a traditional LMS.

The visual hierarchy should prioritize:

1. Continue Journey
2. Player progression
3. Current courses/worlds
4. Learning progress
5. Goals/challenges
6. Character/avatar

Avoid designing a generic corporate dashboard.

When Phase 1 is complete, a user should be able to:

Visit Quizzness
→ Create Account
→ Log In
→ Complete Onboarding
→ Reach Student Dashboard
→ View their courses
→ Open a course
→ See where gameplay will begin
→ Manage profile/settings
→ Log Out

Work incrementally.

Do not implement the entire phase in one change.

Inspect the repository before deciding architecture.
```

## One other thing: authentication

Since we're now deliberately putting signup/login into **Phase 1**, I would change one previous recommendation: **we need to make an actual backend/auth decision earlier than planned.**

I still wouldn't build custom authentication.

We should choose something established and let Codex integrate it properly.

The three things I'd want us to decide before Codex starts Phase 1 are:

- the frontend/application stack,
- the authentication solution,
- the database/persistence solution.

And because login + student accounts changes the architecture materially, **`TECH_ARCHITECTURE.md` should now be the next document we make**, before telling Codex to start coding. That document can lock down React/Next/Vite, auth, database, routes, where player state lives, and how Phase 2's game engine will plug into the student dashboard without us having to rebuild Phase 1 later.
