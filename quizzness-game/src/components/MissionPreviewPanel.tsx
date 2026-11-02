import { getMissionPreview } from "../data/missions";

// Everything a student should know about a mission before it can be played.
export function MissionPreviewPanel({ missionId }: { missionId: string }) {
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
      {mission.prerequisite ? (
        <p>
          <strong>🔒 Locked.</strong> Finish “{mission.prerequisite.mission}”
          first, at {mission.prerequisite.location}.
        </p>
      ) : (
        <button className="button" disabled>
          Start mission · coming in a later update
        </button>
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
