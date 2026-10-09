import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useStudent } from "../app/StudentProvider";
import { coursesInWorld, getCourse } from "../data/courses";
import { homeWorldFor } from "../data/majors";
import { campus, getWorld, worlds } from "../data/worlds";
import type { World } from "../types/content";
import { CourseCard } from "../components/CourseCard";
import { Mascot } from "../components/Mascot";
function WorldSection({
  world,
  label,
}: {
  world: World;
  label?: string;
}) {
  const { profile, preview } = useStudent();
  const base = preview ? "/preview" : "";
  return (
    <section aria-labelledby={`world-${world.id}`}>
      <p className="eyebrow">{label ?? world.subject}</p>
      <h2 id={`world-${world.id}`}>
        {world.symbol} {world.name}
      </h2>
      <p className="muted">{world.description}</p>
      <div className="course-card-grid">
        {coursesInWorld(world.id).map((course) => (
          <CourseCard
            key={course.id}
            course={course}
            base={base}
            selected={profile.selected_courses.includes(course.id)}
          />
        ))}
      </div>
    </section>
  );
}
export function Worlds() {
  const { profile, preview } = useStudent();
  const base = preview ? "/preview" : "";
  const home = homeWorldFor(profile.major_id);
  return (
    <div className="page">
      <p className="eyebrow">Your worlds</p>
      <h1>Follow your curiosity.</h1>
      <Mascot
        state="surprised"
        message={
          home
            ? `${home.name} is your home world. Every other world is open to explore too.`
            : `Your own world is being prepared. Start from ${campus.name}, and explore any world you like.`
        }
        compact
      />
      <p className="muted">
        Sample course catalogue · playable activities are coming later.
      </p>
      {home && (
        <WorldSection
          world={home}
          label={`Your home world · ${home.subject}`}
        />
      )}
      {worlds
        .filter((world) => world.id !== home?.id)
        .map((world) => (
          <WorldSection key={world.id} world={world} />
        ))}
      <section className="course-start" aria-labelledby="campus-link-title">
        <p className="eyebrow">Shared school hub</p>
        <h2 id="campus-link-title">{campus.name}</h2>
        <p>Where every major meets. Visit your school campus.</p>
        <Link className="button secondary" to={`${base}/campus`}>
          Visit campus →
        </Link>
      </section>
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
        <h1>Course not found</h1>
        <Mascot state="help" compact />
        <p>That course isn’t in the current catalogue.</p>
        <Link className="button" to={`${base}/courses`}>
          Back to courses
        </Link>
      </div>
    );
  const world = getWorld(course.worldId);
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
      <div className={`course-hero ${world?.accent ?? ""}`}>
        <span className="world-symbol big">{world?.symbol}</span>
        <div>
          <p className="eyebrow">
            {course.code} · Sample course · {world?.name}
          </p>
          <h1>{course.title}</h1>
          <p className="lead">{course.description}</p>
        </div>
      </div>
      <Mascot
        state="thinking"
        message={`We’ll explore ${course.title} one idea at a time. This is a preview of the journey ahead.`}
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
              <li key={topic.id}>
                <span>{String(i + 1).padStart(2, "0")}</span>
                <div>
                  <h3>{topic.title}</h3>
                  <p>Learning path preview</p>
                </div>
                <span aria-label="Upcoming">◌</span>
              </li>
            ))}
          </ol>
        </section>
        <aside className="course-start">
          <p className="eyebrow">A place to begin</p>
          <h2>{world?.name}</h2>
          <p>Add this course to keep it close in your home base.</p>
          <button className="button" disabled={busy} onClick={toggle}>
            {busy
              ? "Saving…"
              : selected
                ? "Remove from my courses"
                : "Add to my courses"}
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
