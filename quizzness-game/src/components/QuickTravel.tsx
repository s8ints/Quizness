import { Link } from "react-router-dom";
import { useStudent } from "../app/StudentProvider";
import { quickTravel } from "../game/worldAreas";

// Jump straight to a place without walking there.
export function QuickTravel({ current }: { current: string }) {
  const { preview } = useStudent();
  const base = preview ? "/preview" : "";
  return (
    <nav className="quick-travel" aria-label="Quick travel">
      <span className="eyebrow">Quick travel</span>
      {quickTravel.map((place) =>
        place.path === current ? (
          <span key={place.path} className="pill" aria-current="page">
            {place.label}
          </span>
        ) : (
          <Link key={place.path} className="text-link" to={`${base}${place.path}`}>
            {place.label}
          </Link>
        ),
      )}
    </nav>
  );
}
