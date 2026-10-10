import { Link } from "react-router-dom";
import { useStudent } from "../app/StudentProvider";
import { homeWorldFor } from "../data/majors";
import { campus } from "../data/worlds";
import { Mascot } from "../components/Mascot";
// The shared school hub. Presentation only: social features come later.
export function Campus() {
  const { profile, preview } = useStudent();
  const base = preview ? "/preview" : "";
  const home = homeWorldFor(profile.major_id);
  const school = profile.institution.trim() || "Independent learners’ campus";
  return (
    <div className="page">
      <p className="eyebrow">Shared school hub · {school}</p>
      <h1>{campus.name}</h1>
      <Mascot
        state="welcome"
        message="Every major meets here. This is where your school community will gather."
        compact
      />
      <figure className="campus-hero">
        <img
          src="/brand/quizzness-campus.png"
          alt="The Quizzness pixel campus, with purple-roofed buildings, a panther fountain and paths through the gardens"
          width="1672"
          height="941"
        />
        <figcaption>
          Campus artwork · meeting classmates, the market and exploring are
          coming later.
        </figcaption>
      </figure>
      <div className="actions">
        <Link className="button" to={`${base}/courses`}>
          {home ? `Travel to ${home.name} →` : "Explore the worlds →"}
        </Link>
        <Link className="text-link" to={preview ? "/preview" : "/dashboard"}>
          Back to home base
        </Link>
      </div>
    </div>
  );
}
