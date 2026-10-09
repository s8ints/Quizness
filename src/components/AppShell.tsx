import { NavLink, Outlet, Link, useLocation } from "react-router-dom";
import { useStudent } from "../app/StudentProvider";
import { Avatar } from "./Avatar";
export function AppShell() {
  const { profile, preview } = useStudent();
  const base = preview ? "/preview" : "";
  const { pathname } = useLocation();
  const inRoom = pathname === "/preview" || pathname === "/dashboard";
  return (
    <div
      className={`app${profile.reduced_motion ? " reduce-motion" : ""}${inRoom ? " room-shell" : ""}`}
    >
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      {preview && (
        <div className="preview-banner">
          Student experience preview · sample data · edits reset on refresh{" "}
          <Link to="/signup">Create a real account ↗</Link>
        </div>
      )}
      <header className="app-header">
        <Link to="/" className="brand">
          <span className="brand-mark">q</span>quizzness
          <span className="brand-dot">✦</span>
        </Link>
        {
          <nav aria-label="Main navigation">
            <NavLink end to={preview ? "/preview" : "/dashboard"}>
              Home base
            </NavLink>
            <NavLink to={`${base}/courses`}>Your worlds</NavLink>
            <NavLink to={`${base}/campus`}>Campus</NavLink>
            <NavLink to={`${base}/profile`}>Your character</NavLink>
            <NavLink to={`${base}/settings`}>
              {inRoom ? "Room settings" : "Settings"}
            </NavLink>
          </nav>
        }
        <Link to={`${base}/profile`} className="profile-link">
          <Avatar id={profile.avatar_id} />
          <span>{profile.first_name || "Explorer"}</span>
        </Link>
      </header>
      <main id="main" tabIndex={-1}>
        <Outlet />
      </main>
      <footer className="app-footer">
        <span>Small steps. Bigger possibilities.</span>
        <span>Quizzness · made for curious minds</span>
      </footer>
    </div>
  );
}
