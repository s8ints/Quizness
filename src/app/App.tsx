import { useEffect } from "react";
import { Link, Route, Routes, useLocation } from "react-router-dom";
import { AuthProvider } from "../auth/AuthProvider";
import { StudentProvider } from "./StudentProvider";
import { AppShell } from "../components/AppShell";
import { Landing } from "../screens/Landing";
import { Hub } from "../screens/Hub";
import { Worlds, CourseOverview } from "../screens/Worlds";
import { Profile, Settings } from "../screens/Profile";
import { Onboarding } from "../screens/Onboarding";
import { AuthScreen, AuthCallback } from "../screens/Auth";
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
      document.title = `${previousText.trim()} · Quizzness`;
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
export function App() {
  return (
    <AuthProvider>
      <RouteFocus />
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
          <Route path="courses" element={<Worlds />} />
          <Route path="courses/:courseId" element={<CourseOverview />} />
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
          <Route path="/courses" element={<Worlds />} />
          <Route path="/courses/:courseId" element={<CourseOverview />} />
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
    </AuthProvider>
  );
}
