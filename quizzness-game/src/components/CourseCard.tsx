import { Link } from "react-router-dom";
import { getWorld } from "../data/worlds";
import type { Course } from "../types/content";
// Shared by the dashboard and the Your worlds page.
export function CourseCard({
  course,
  base,
  selected = false,
}: {
  course: Course;
  base: string;
  selected?: boolean;
}) {
  const world = getWorld(course.worldId);
  return (
    <Link className="course-card" to={`${base}/courses/${course.id}`}>
      <span className={`course-card-banner ${world?.accent ?? ""}`} aria-hidden="true">
        <span>{world?.symbol}</span>
      </span>
      <span className="course-card-body">
        <span className="course-card-label">Course · {course.code}</span>
        <h3 className="course-card-title">{course.title}</h3>
        <p className="course-card-text">{course.description}</p>
        <span className="course-card-pills">
          <span className="pill">Sample course</span>
          {world && <span className="pill">{world.name}</span>}
          {selected && <span className="pill pill-selected">✓ In your courses</span>}
        </span>
      </span>
    </Link>
  );
}
