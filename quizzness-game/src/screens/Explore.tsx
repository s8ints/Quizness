import { Link, useParams } from "react-router-dom";
import { useStudent } from "../app/StudentProvider";
import { WalkableArea } from "../components/WalkableArea";
import { QuickTravel } from "../components/QuickTravel";
import { Mascot } from "../components/Mascot";
import { getMissionPreview } from "../data/missions";
import { getExploreArea } from "../game/worldAreas";

// Any walkable place past the campus, opened at /explore/<area id>.
export function Explore() {
  const { areaId = "" } = useParams();
  const { preview } = useStudent();
  const base = preview ? "/preview" : "";
  const area = getExploreArea(areaId);
  if (!area)
    return (
      <div className="page empty-panel">
        <h1>Place not found</h1>
        <Mascot state="help" compact />
        <p>That place isn’t on the map yet.</p>
        <Link className="button" to={`${base}/campus`}>
          Back to campus
        </Link>
      </div>
    );
  return (
    <div className="exploration-page">
      <WalkableArea
        key={area.id}
        area={area}
        label={`Walkable ${area.title}`}
        hint={area.hint ?? ""}
        hud={
          <>
            <p className="eyebrow">{area.eyebrow}</p>
            <h1>{area.title}</h1>
          </>
        }
      />
      {area.missionPath && (
        <section className="mission-path" aria-labelledby="mission-path-title">
          <h2 id="mission-path-title" className="hub-section-title">
            Mission path
          </h2>
          <ol>
            {area.missionPath.map((id, index) => {
              const mission = getMissionPreview(id);
              if (!mission) return null;
              return (
                <li key={id} data-locked={!!mission.prerequisite}>
                  <span className="pill">
                    {mission.prerequisite ? "🔒 Locked" : "Opens next"}
                  </span>
                  <h3>
                    {index + 1}. {mission.title}
                  </h3>
                  <p>{mission.objective}</p>
                  {mission.prerequisite && (
                    <p className="muted">
                      Finish “{mission.prerequisite.mission}” first, at{" "}
                      {mission.prerequisite.location}.
                    </p>
                  )}
                </li>
              );
            })}
          </ol>
          <p className="prototype-note">
            Demo content. Playing missions arrives in a later update.
          </p>
        </section>
      )}
      <QuickTravel current={`/explore/${area.id}`} />
      {area.temporaryArt && (
        <p className="prototype-note">
          Temporary picture: this place’s layout works, and its final art is on
          the way.
        </p>
      )}
    </div>
  );
}
