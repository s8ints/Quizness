import { Link } from "react-router-dom";
import { useStudent } from "../app/StudentProvider";
import { WalkableArea } from "../components/WalkableArea";
import { roomArea } from "../game/room";

export function Room() {
  const { preview } = useStudent();
  return (
    <div className="exploration-page">
      <div className="exploration-heading">
        <div>
          <p className="eyebrow">Your room</p>
          <h1>Your little corner of Quizzness.</h1>
        </div>
        <Link
          className="button secondary"
          to={preview ? "/preview" : "/dashboard"}
        >
          Back to home base
        </Link>
      </div>
      <WalkableArea
        area={roomArea}
        label="Walkable student room"
        hint="Walk near your desk, bookshelf, wardrobe, Panthy or the door."
      />
      <p className="prototype-note">
        Early version: students only have a front-facing view for now, so
        walking sideways or away still faces you. The doormat opens the campus.
      </p>
    </div>
  );
}
