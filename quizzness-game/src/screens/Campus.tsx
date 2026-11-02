import { Link } from "react-router-dom";
import { useStudent } from "../app/StudentProvider";
import { homeWorldFor } from "../data/majors";
import { campus } from "../data/worlds";
import { Mascot } from "../components/Mascot";
import { WalkableArea } from "../components/WalkableArea";
import { campusArea } from "../game/campus";
// The shared school hub. Walkable map; social features come later.
export function Campus() {
  const { profile, preview } = useStudent();
  const base = preview ? "/preview" : "";
  const home = homeWorldFor(profile.major_id);
  const school = profile.institution.trim() || "Independent learners’ campus";
  return (
    <div className="exploration-page">
      <div className="exploration-heading">
        <div>
          <p className="eyebrow">Shared school hub · {school}</p>
          <h1>{campus.name}</h1>
        </div>
        <Link className="button secondary" to={`${base}/courses`}>
          {home ? `Travel to ${home.name} →` : "Explore the worlds →"}
        </Link>
      </div>
      <Mascot
        state="welcome"
        message="Walk the paths or pick a landmark on the map. Every major meets here."
        compact
      />
      <WalkableArea
        area={campusArea}
        label="Walkable campus map"
        hint="Follow the paths to the Main Hall, the fountain, the cottage or the plaza."
      />
      <p className="prototype-note">
        Campus artwork · meeting classmates and the market are coming later.
      </p>
      <Link className="text-link" to={preview ? "/preview" : "/dashboard"}>
        Back to home base
      </Link>
    </div>
  );
}
