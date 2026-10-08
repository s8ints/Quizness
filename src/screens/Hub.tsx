import { Link } from "react-router-dom";
import { useStudent } from "../app/StudentProvider";
import { courses } from "../data/courses";
import { Avatar } from "../components/Avatar";
import { Mascot } from "../components/Mascot";

export function Hub() {
  const { profile, preview } = useStudent();
  const base = preview ? "/preview" : "";
  const selected = courses.filter((course) =>
    profile.selected_courses.includes(course.id),
  );
  const next = selected[0];
  return (
    <div className="student-room-hub">
      <section className="room-scene" aria-label="Your cosy student room">
        <header className="room-heading">
          <div>
            <p className="eyebrow">My student room</p>
            <h1>
              Hey, {profile.first_name || "Explorer"}.<span>Welcome home.</span>
            </h1>
          </div>
          <div className="room-progress">
            <span aria-hidden="true">✦</span>
            <div>
              <strong>
                {preview ? "Level 4 · sample" : "Your journey starts here"}
              </strong>
              <small>
                {preview
                  ? "320 XP · sample progression"
                  : "No learning progress yet"}
              </small>
            </div>
          </div>
        </header>
        <Link
          className="room-hotspot room-desk"
          to={next ? `${base}/courses/${next.id}` : `${base}/courses`}
        >
          <span className="room-hotspot-icon" aria-hidden="true">
            ✎
          </span>
          <span>{next ? "Continue journey" : "Choose a course"}</span>
          <span>→</span>
        </Link>
        <Link className="room-hotspot room-books" to={`${base}/courses`}>
          <span aria-hidden="true">▤</span> My bookshelf{" "}
          <span aria-hidden="true">→</span>
        </Link>
        <Link className="room-hotspot room-wardrobe" to={`${base}/profile`}>
          <span aria-hidden="true">✧</span> My character{" "}
          <span aria-hidden="true">→</span>
        </Link>
        <div className="room-student">
          <Avatar id={profile.avatar_id} large />
          <span>{profile.first_name || "Explorer"}</span>
        </div>
        <div className="room-panthy">
          <Mascot
            state="welcome"
            message={`Make yourself at home, ${profile.first_name || "Explorer"}. Your books are here whenever you’re ready.`}
            compact
          />
        </div>
        <span className="room-art-label">
          Room illustration · movement coming later
        </span>
      </section>
      <section className="room-learning" aria-labelledby="room-learning-title">
        <div className="room-learning-intro">
          <p className="eyebrow">A little learning, at your pace</p>
          <h2 id="room-learning-title">
            {next ? "Ready when you are." : "Your bookshelf is waiting."}
          </h2>
          <p>
            {next
              ? `Next up: ${next.area}. Take one idea at a time.`
              : "Choose a subject to give your learning journey a place to begin."}
          </p>
        </div>
        {selected.length ? (
          <div className="room-course-list">
            {selected.map((course) => (
              <Link key={course.id} to={`${base}/courses/${course.id}`}>
                <span className="room-book-symbol" aria-hidden="true">
                  {course.symbol}
                </span>
                <div>
                  <h3>{course.subject}</h3>
                  <p>{course.area}</p>
                </div>
                <span aria-hidden="true">→</span>
              </Link>
            ))}
          </div>
        ) : (
          <Link className="button" to={`${base}/courses`}>
            Explore courses →
          </Link>
        )}
      </section>
    </div>
  );
}
