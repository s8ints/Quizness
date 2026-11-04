import { Link, useParams } from "react-router-dom";
import { useStudent } from "../app/StudentProvider";
import { WalkableArea } from "../components/WalkableArea";
import { QuickTravel } from "../components/QuickTravel";
import { Mascot } from "../components/Mascot";
import { getMissionPreview } from "../data/missions";
import { getExploreArea } from "../game/worldAreas";
import { useGameplay } from "../missions/GameplayProvider";

// Any walkable place past the campus, opened at /explore/<area id>.
export function Explore() {
  const { areaId = "" } = useParams();
  const { preview } = useStudent();
  const { save } = useGameplay();
  const base = preview ? "/preview" : "";
  const source = getExploreArea(areaId);
  const area =
    source && save.completed.includes("variables-values-types")
      ? {
          ...source,
          destinations: source.destinations.map((d) =>
            d.dialog?.missionId === "changing-values"
              ? {
                  ...d,
                  label: "Mission: Changing values",
                  dialog: { ...d.dialog, title: "Mission preview" },
                }
              : d,
          ),
        }
      : source;
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
              const locked =
                !!mission.prerequisite &&
                !save.completed.includes("variables-values-types");
              return (
                <li key={id} data-locked={locked}>
                  <span className="pill">
                    {locked
                      ? "🔒 Locked"
                      : save.completed.includes(id)
                        ? "✓ Completed"
                        : "Ready to play"}
                  </span>
                  <h3>
                    {index + 1}. {mission.title}
                  </h3>
                  <p>{mission.objective}</p>
                  {locked && mission.prerequisite && (
                    <p className="muted">
                      Finish “{mission.prerequisite.mission}” first, at{" "}
                      {mission.prerequisite.location}.
                    </p>
                  )}
                  {!locked && (
                    <Link
                      className="button"
                      to={`${base}/missions/${id === "changing-values" ? "changing-values" : "campus-event"}`}
                    >
                      Start mission
                    </Link>
                  )}
                </li>
              );
            })}
          </ol>
          <p className="prototype-note">
            Original demo content.{" "}
            <Link to={`${base}/journal`}>
              Choose a story route or view your journal
            </Link>
            .
          </p>
        </section>
      )}
      {area.id === "comp-101-lobby" && (
        <p className="page">
          Variables mission:{" "}
          {save.completed.includes("variables-values-types")
            ? "completed"
            : "ready to play"}{" "}
          · <Link to={`${base}/journal`}>Learning journal and results</Link>
        </p>
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
