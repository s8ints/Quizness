import { Link } from "react-router-dom";
import { useStudent } from "../app/StudentProvider";
import { courses } from "../data/courses";
import { homeWorldFor } from "../data/majors";
import { campus, getWorld } from "../data/worlds";
import { Mascot } from "../components/Mascot";
import { CourseCard } from "../components/CourseCard";
import { WalkableArea } from "../components/WalkableArea";
import { QuickTravel } from "../components/QuickTravel";
import { roomArea } from "../game/room";

export function Hub() {
  const { profile, preview } = useStudent();
  const base = preview ? "/preview" : "";
  const selected = courses.filter((course) =>
    profile.selected_courses.includes(course.id),
  );
  const next = selected[0];
  const home = homeWorldFor(profile.major_id);
  return (
    <div className="exploration-page">
      <WalkableArea
        area={roomArea}
        label="Walkable student room"
        hint="Walk near your desk, bookshelf, wardrobe, Panthy or the door."
        hud={
          <>
            <p className="eyebrow">My student room</p>
            <h1>
              Hey, {profile.first_name || "Explorer"}.{" "}
              <span>Welcome home.</span>
            </h1>
          </>
        }
      />
      <QuickTravel current="/room" />
      <Mascot
        state="welcome"
        message={`Make yourself at home, ${profile.first_name || "Explorer"}. Your desk is ready whenever you are.`}
        compact
      />
      <section className="hub-status" aria-labelledby="hub-status-title">
        <h2 id="hub-status-title" className="hub-section-title">
          Your status
        </h2>
        <div className="hub-status-grid">
          <article className="status-card">
            <p className="status-label">Level and XP</p>
            {preview ? (
              <>
                <p className="status-value">Level 4 · 320 XP</p>
                <div
                  className="status-bar"
                  role="img"
                  aria-label="Sample progress: 60% of the way to level 5"
                >
                  <span style={{ width: "60%" }} />
                </div>
                <p className="status-note">Sample progress</p>
              </>
            ) : (
              <>
                <p className="status-value">No XP yet</p>
                <p className="status-note">
                  Earning XP arrives with your first missions in a later update.
                </p>
              </>
            )}
          </article>
          <article className="status-card">
            <p className="status-label">Next up</p>
            {next ? (
              <>
                <p className="status-value">{next.title}</p>
                <p className="status-note">
                  {next.code} · {getWorld(next.worldId)?.name}
                </p>
                <Link
                  className="button small"
                  to={`${base}/courses/${next.id}`}
                >
                  Continue journey →
                </Link>
              </>
            ) : (
              <>
                <p className="status-value">Pick your first course</p>
                <Link className="button small" to={`${base}/courses`}>
                  Choose a course →
                </Link>
              </>
            )}
          </article>
          <article className="status-card">
            <p className="status-label">Goals and home</p>
            {profile.goals.length ? (
              <ul className="status-pills">
                {profile.goals.map((goal) => (
                  <li key={goal} className="pill">
                    {goal}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="status-note">
                <Link to={`${base}/profile`}>Add goals in your profile →</Link>
              </p>
            )}
            <p className="status-note">
              Home world: <strong>{home?.name ?? campus.name}</strong> ·{" "}
              <Link to={`${base}/campus`}>Visit campus →</Link>
            </p>
          </article>
        </div>
      </section>
      <section className="hub-courses" aria-labelledby="hub-courses-title">
        <div className="hub-courses-heading">
          <h2 id="hub-courses-title" className="hub-section-title">
            Your courses
          </h2>
          <Link className="text-link" to={`${base}/courses`}>
            Browse all worlds →
          </Link>
        </div>
        {selected.length ? (
          <div className="course-card-grid">
            {selected.map((course) => (
              <CourseCard
                key={course.id}
                course={course}
                base={base}
                selected
              />
            ))}
          </div>
        ) : (
          <p className="status-note">
            Your bookshelf is waiting. Choose a course to give your journey a
            place to begin.
          </p>
        )}
      </section>
    </div>
  );
}
