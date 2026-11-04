import { lazy, Suspense, useEffect } from "react";
import { Link, Route, Routes, useLocation } from "react-router-dom";
import { AuthProvider } from "../auth/AuthProvider";
import { StudentProvider } from "./StudentProvider";
import { AppShell } from "../components/AppShell";
import { Landing } from "../screens/Landing";
// Each page downloads only when it's first opened, so the first visit stays quick.
const Hub = lazy(() =>
  import("../screens/Hub").then((m) => ({ default: m.Hub })),
);
const Worlds = lazy(() =>
  import("../screens/Worlds").then((m) => ({ default: m.Worlds })),
);
const CourseOverview = lazy(() =>
  import("../screens/Worlds").then((m) => ({ default: m.CourseOverview })),
);
const Profile = lazy(() =>
  import("../screens/Profile").then((m) => ({ default: m.Profile })),
);
const Settings = lazy(() =>
  import("../screens/Profile").then((m) => ({ default: m.Settings })),
);
const Onboarding = lazy(() =>
  import("../screens/Onboarding").then((m) => ({ default: m.Onboarding })),
);
const Campus = lazy(() =>
  import("../screens/Campus").then((m) => ({ default: m.Campus })),
);
const Explore = lazy(() =>
  import("../screens/Explore").then((m) => ({ default: m.Explore })),
);
const Room = lazy(() =>
  import("../screens/Room").then((m) => ({ default: m.Room })),
);
const AuthScreen = lazy(() =>
  import("../screens/Auth").then((m) => ({ default: m.AuthScreen })),
);
const AuthCallback = lazy(() =>
  import("../screens/Auth").then((m) => ({ default: m.AuthCallback })),
);
function RouteFocus() {
  const location = useLocation();
  useEffect(() => {
    document.title = "Quizzness · Your learning adventure";
    let previous: HTMLElement | null = null;
    let previousText = "";
    const focusHeading = () => {
      const heading = document.querySelector<HTMLElement>("h1");
      if (
        !heading ||
        (heading === previous && heading.textContent === previousText)
      )
        return;
      previous = heading;
      previousText = heading.textContent ?? "";
      // Each screen gets a distinct tab title from its visible heading.
      // innerText keeps <br> line breaks as spaces; jsdom only has textContent.
      const visibleText = heading.innerText || previousText;
      document.title = `${visibleText.replace(/\s+/g, " ").trim()} · Quizzness`;
      // Never pull focus away from a field the student is typing in.
      if (document.activeElement?.matches("input, textarea, select")) return;
      heading.tabIndex = -1;
      heading.focus();
    };
    focusHeading();
    const observer = new MutationObserver(focusHeading);
    observer.observe(document.body, {
      childList: true,
      subtree: true,
      characterData: true,
    });
    return () => observer.disconnect();
  }, [location.pathname]);
  return null;
}
const Mission = lazy(() =>
  import("../missions/Mission").then((m) => ({ default: m.Mission })),
);
const Journal = lazy(() =>
  import("../missions/Journal").then((m) => ({ default: m.Journal })),
);
export function App() {
  return (
    <AuthProvider>
      <RouteFocus />
      <Suspense
        fallback={
          <p className="state-page" role="status">
            Loading…
          </p>
        }
      >
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<AuthScreen />} />
          <Route path="/signup" element={<AuthScreen signup />} />
          <Route path="/recovery" element={<AuthScreen recovery />} />
          <Route path="/auth/callback" element={<AuthCallback />} />
          <Route path="/auth/reset" element={<AuthCallback reset />} />
          <Route
            path="/preview"
            element={
              <StudentProvider preview>
                <AppShell />
              </StudentProvider>
            }
          >
            <Route index element={<Hub />} />
            <Route path="room" element={<Room />} />
            <Route path="courses" element={<Worlds />} />
            <Route path="courses/:courseId" element={<CourseOverview />} />
            <Route path="campus" element={<Campus />} />
            <Route path="explore/:areaId" element={<Explore />} />
            <Route path="missions/:routeId" element={<Mission />} />
            <Route path="journal" element={<Journal />} />
            <Route path="profile" element={<Profile />} />
            <Route path="settings" element={<Settings />} />
            <Route path="onboarding" element={<Onboarding />} />
          </Route>
          <Route
            element={
              <StudentProvider key="real-student" preview={false}>
                <AppShell />
              </StudentProvider>
            }
          >
            <Route path="/dashboard" element={<Hub />} />
            <Route path="/room" element={<Room />} />
            <Route path="/courses" element={<Worlds />} />
            <Route path="/courses/:courseId" element={<CourseOverview />} />
            <Route path="/campus" element={<Campus />} />
            <Route path="/explore/:areaId" element={<Explore />} />
            <Route path="/missions/:routeId" element={<Mission />} />
            <Route path="/journal" element={<Journal />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/onboarding" element={<Onboarding />} />
          </Route>
          <Route
            path="*"
            element={
              <div className="page empty-panel">
                <h1>That path isn’t here.</h1>
                <p>Let’s find your way back.</p>
                <Link className="button" to="/">
                  Back to Quizzness →
                </Link>
              </div>
            }
          />
        </Routes>
      </Suspense>
    </AuthProvider>
  );
}
