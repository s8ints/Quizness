import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useStudent } from "../app/StudentProvider";
import { courses, getCourse } from "../data/courses";
import type { Course } from "../types/student";
import { Mascot } from "../components/Mascot";
export function CourseCard({ course, base }: { course: Course; base: string }) {
  return (
    <Link
      className={`world-card ${course.accent}`}
      to={`${base}/courses/${course.id}`}
    >
      <div className="world-card-top">
        <span className="world-symbol">{course.symbol}</span>
        <span className="card-arrow">↗</span>
      </div>
      <span className="eyebrow">{course.area}</span>
      <h3>{course.subject}</h3>
      <p>{course.description}</p>
      <span className="card-foot">
        Explore world <span>→</span>
      </span>
    </Link>
  );
}
export function Worlds() {
  const { profile, preview } = useStudent();
  const base = preview ? "/preview" : "";
  return (
    <div className="page">
      <p className="eyebrow">Your worlds</p>
      <h1>Follow your curiosity.</h1>
      <Mascot
        state="surprised"
        message="Many subjects, one guild. Where would you like to begin?"
        compact
      />
      <p className="lead">
        One engine. Many subjects. Find a world that speaks to you.
      </p>
      <p className="muted">
        Sample course catalogue · playable activities are coming later.
      </p>
      <div className="world-grid catalogue">
        {courses.map((course) => (
          <div key={course.id}>
            <CourseCard course={course} base={base} />
            {profile.selected_courses.includes(course.id) && (
              <span className="selection-note">✓ In your worlds</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
export function CourseOverview() {
  const { courseId = "" } = useParams();
  const course = getCourse(courseId);
  const { profile, preview, update } = useStudent();
  const base = preview ? "/preview" : "";
  const [message, setMessage] = useState("");
  const [busy, setBusy] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  if (!course)
    return (
      <div className="page empty-panel">
        <h1>World not found</h1>
        <Mascot state="help" compact />
        <p>That course isn’t in the current catalogue.</p>
        <Link className="button" to={`${base}/courses`}>
          Back to courses
        </Link>
      </div>
    );
  const selected = profile.selected_courses.includes(course.id);
  async function toggle() {
    setBusy(true);
    setMessage("");
    try {
      await update({
        ...profile,
        selected_courses: selected
          ? profile.selected_courses.filter((id) => id !== course!.id)
          : [...profile.selected_courses, course!.id],
      });
      setMessage(
        preview
          ? "Preview selection updated for this visit."
          : "Your course selection is saved.",
      );
    } catch {
      setMessage("Your selection could not be saved. Please try again.");
    } finally {
      setBusy(false);
    }
  }
  return (
    <div className="page">
      <Link className="text-link" to={`${base}/courses`}>
        ← Your worlds
      </Link>
      <div className={`course-hero ${course.accent}`}>
        <span className="world-symbol big">{course.symbol}</span>
        <div>
          <p className="eyebrow">{course.subject}</p>
          <h1>{course.area}</h1>
          <p className="lead">{course.description}</p>
        </div>
      </div>
      <Mascot
        state="thinking"
        message={`We’ll explore ${course.subject} one idea at a time. This is a preview of the journey ahead.`}
        compact
      />
      <div className="course-layout">
        <section>
          <h2>Your journey</h2>
          <p className="muted">
            A preview of the topics ahead. No activities have been completed.
          </p>
          <ol className="topic-list">
            {course.topics.map((topic, i) => (
              <li key={topic}>
                <span>{String(i + 1).padStart(2, "0")}</span>
                <div>
                  <h3>{topic}</h3>
                  <p>Learning area preview</p>
                </div>
                <span aria-label="Upcoming">◌</span>
              </li>
            ))}
          </ol>
        </section>
        <aside className="course-start">
          <p className="eyebrow">A place to begin</p>
          <h2>{course.title}</h2>
          <p>Choose this world to keep it close in your home base.</p>
          <button className="button" disabled={busy} onClick={toggle}>
            {busy
              ? "Saving…"
              : selected
                ? "Remove from my worlds"
                : "Add to my worlds"}
          </button>
          <button
            className="button secondary"
            onClick={() => setShowPreview(true)}
          >
            Continue learning →
          </button>
          <p role="status">{message}</p>
          {showPreview && (
            <div className="coming-soon" role="status">
              <strong>Your adventure is being prepared.</strong>
              <p>
                Interactive activities will live here. For now, explore your
                course and choose your learning goals.
              </p>
              <Link to={preview ? "/preview" : "/dashboard"}>
                Return to home base →
              </Link>
            </div>
          )}
        </aside>
      </div>
    </div>
  );
}
