import { getMissionPreview } from "../data/missions";
import { Link } from "react-router-dom";
import { useStudent } from "../app/StudentProvider";
import { useGameplay } from "../missions/GameplayProvider";

// Everything a student should know about a mission before it can be played.
export function MissionPreviewPanel({ missionId }: { missionId: string }) {
  const { preview } = useStudent();
  const { save } = useGameplay();
  const base = preview ? "/preview" : "";
  const locked =
    missionId === "changing-values" &&
    !save.completed.includes("variables-values-types");
  const mission = getMissionPreview(missionId);
  if (!mission) return <p>This mission’s details couldn’t be found.</p>;
  return (
    <div className="mission-preview">
      <h2>{mission.title}</h2>
      <div className="course-card-pills">
        <span className="pill">{mission.minutes}</span>
        <span className="pill">{mission.difficulty}</span>
        <span className="pill">Demo content</span>
      </div>
      <p>
        <strong>Objective:</strong> {mission.objective}
      </p>
      {locked && mission.prerequisite ? (
        <p>
          <strong>🔒 Locked.</strong> Finish “{mission.prerequisite.mission}”
          first, at {mission.prerequisite.location}.
        </p>
      ) : (
        <Link
          className="button"
          to={`${base}/missions/${missionId === "changing-values" ? "changing-values" : "campus-event"}`}
        >
          Start mission
        </Link>
      )}
      <details>
        <summary>Story teaser (optional)</summary>
        <p>{mission.teaser}</p>
      </details>
      <details>
        <summary>What you’ll learn</summary>
        <p>{mission.learn}</p>
      </details>
    </div>
  );
}
