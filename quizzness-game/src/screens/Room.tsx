import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useStudent } from "../app/StudentProvider";
import { Mascot } from "../components/Mascot";
import { room, type Point, type Destination } from "../game/room";
import type { RoomSnapshot } from "../game/createRoomGame";
import "../styles/exploration.css";

export function Room() {
  const { profile, preview } = useStudent();
  const base = preview ? "/preview" : "";
  const navigate = useNavigate();
  const host = useRef<HTMLDivElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const keys = useRef(new Set<string>());
  const joystick = useRef<Point>({ x: 0, y: 0 });
  const pausedRef = useRef(false);
  const [paused, setPaused] = useState(false);
  const [ready, setReady] = useState(false);
  const [error, setError] = useState(false);
  const [retry, setRetry] = useState(0);
  const [snapshot, setSnapshot] = useState<RoomSnapshot>({ ...room.spawn });
  const [talking, setTalking] = useState(false);
  const [stick, setStick] = useState<Point>({ x: 0, y: 0 });
  const pointer = useRef<number | null>(null);
  function stop() {
    keys.current.clear();
    joystick.current = { x: 0, y: 0 };
    setStick({ x: 0, y: 0 });
    pointer.current = null;
  }
  function interact(destination: Destination) {
    stop();
    if (destination.id === "panthy") {
      pausedRef.current = true;
      setTalking(true);
    } else navigate(`${base}${destination.path}`);
  }
  useEffect(() => {
    let cancelled = false;
    let game: { destroy: (removeCanvas: boolean) => void } | undefined;
    setReady(false);
    setError(false);
    Promise.all([
      import("../game/createRoomGame"),
      fetch("/sprites/students/students.json").then((response) => {
        if (!response.ok)
          throw new Error("Student animation manifest could not load");
        return response.json();
      }),
    ])
      .then(([{ createRoomGame }, manifest]) => {
        if (cancelled || !host.current) return;
        game = createRoomGame(
          host.current,
          profile.avatar_id,
          () => {
            if (pausedRef.current || document.hidden) return { x: 0, y: 0 };
            const focused = stage.current?.contains(document.activeElement);
            const has = (...codes: string[]) =>
              !!focused && codes.some((code) => keys.current.has(code));
            return {
              x:
                joystick.current.x +
                Number(has("ArrowRight", "KeyD")) -
                Number(has("ArrowLeft", "KeyA")),
              y:
                joystick.current.y +
                Number(has("ArrowDown", "KeyS")) -
                Number(has("ArrowUp", "KeyW")),
            };
          },
          () => {
            if (!cancelled) setReady(true);
          },
          (state) => {
            if (!cancelled) setSnapshot(state);
          },
          () => {
            if (!cancelled) setError(true);
          },
          manifest,
          profile.reduced_motion,
        );
      })
      .catch(() => {
        if (!cancelled) setError(true);
      });
    const clear = () => {
      keys.current.clear();
      joystick.current = { x: 0, y: 0 };
      pointer.current = null;
      setStick({ x: 0, y: 0 });
    };
    window.addEventListener("blur", clear);
    document.addEventListener("visibilitychange", clear);
    return () => {
      cancelled = true;
      keys.current.clear();
      joystick.current = { x: 0, y: 0 };
      game?.destroy(true);
      window.removeEventListener("blur", clear);
      document.removeEventListener("visibilitychange", clear);
    };
  }, [profile.avatar_id, profile.reduced_motion, retry]);
  return (
    <div className="exploration-page">
      <div className="exploration-heading">
        <div>
          <p className="eyebrow">Home base · movement proof</p>
          <h1>Your little corner of Quizzness.</h1>
          <p>Take a look around, {profile.first_name || "Explorer"}.</p>
        </div>
        <Link
          className="button secondary"
          to={preview ? "/preview" : "/dashboard"}
        >
          Back to home base
        </Link>
      </div>
      <p id="room-controls">
        Focus the room to walk with WASD or arrow keys. Press E near an object
        to interact. Tab leaves the room controls.
      </p>
      <div className="exploration-frame">
        <div
          ref={stage}
          className="walkable-stage"
          tabIndex={0}
          role="group"
          aria-label="Walkable student room"
          aria-describedby="room-controls"
          data-ready={ready && !error}
          data-player-x={snapshot.x.toFixed(1)}
          data-player-y={snapshot.y.toFixed(1)}
          data-animation={snapshot.animation}
          data-frame={snapshot.frame}
          onBlur={stop}
          onKeyDown={(event) => {
            if (event.altKey || event.ctrlKey || event.metaKey) return;
            if (
              [
                "ArrowUp",
                "ArrowDown",
                "ArrowLeft",
                "ArrowRight",
                "KeyW",
                "KeyA",
                "KeyS",
                "KeyD",
              ].includes(event.code)
            ) {
              event.preventDefault();
              keys.current.add(event.code);
            }
            if (
              event.code === "KeyE" &&
              !event.repeat &&
              snapshot.nearby &&
              !paused &&
              !talking
            ) {
              event.preventDefault();
              interact(snapshot.nearby);
            }
          }}
          onKeyUp={(event) => keys.current.delete(event.code)}
        >
          <div ref={host} className="phaser-room" aria-hidden="true" />
        </div>
        {(!ready || error) && (
          <div className="room-load" role="status">
            {error ? (
              <>
                <p>
                  The room couldn’t load. You can still use the destinations
                  below.
                </p>
                <button
                  className="button"
                  onClick={() => setRetry((value) => value + 1)}
                >
                  Retry room
                </button>
              </>
            ) : (
              "Preparing your room…"
            )}
          </div>
        )}
        {talking && (
          <div
            className="room-dialogue"
            role="dialog"
            aria-modal="false"
            aria-label="Panthy’s welcome"
          >
            <Mascot
              compact
              state="welcome"
              message="Welcome home! Your desk leads to your courses, the wardrobe opens your character, and the door takes you to campus."
            />
            <button
              className="button"
              autoFocus
              onClick={() => {
                setTalking(false);
                pausedRef.current = paused;
                stage.current?.focus();
              }}
            >
              Back to exploring
            </button>
          </div>
        )}
      </div>
      <div className="exploration-controls">
        <div
          className="touch-joystick"
          role="group"
          aria-label="Touch movement joystick"
          onPointerDown={(e) => {
            if (
              paused ||
              talking ||
              error ||
              !ready ||
              pointer.current !== null
            )
              return;
            e.preventDefault();
            keys.current.clear();
            pointer.current = e.pointerId;
            e.currentTarget.setPointerCapture(e.pointerId);
            const b = e.currentTarget.getBoundingClientRect();
            const x = (e.clientX - b.left - b.width / 2) / 32,
              y = (e.clientY - b.top - b.height / 2) / 32;
            const n = Math.max(1, Math.hypot(x, y));
            joystick.current = { x: x / n, y: y / n };
            setStick(joystick.current);
          }}
          onPointerMove={(e) => {
            if (pointer.current !== e.pointerId) return;
            const b = e.currentTarget.getBoundingClientRect();
            const x = (e.clientX - b.left - b.width / 2) / 32,
              y = (e.clientY - b.top - b.height / 2) / 32,
              n = Math.max(1, Math.hypot(x, y));
            joystick.current = { x: x / n, y: y / n };
            setStick(joystick.current);
          }}
          onPointerUp={stop}
          onPointerCancel={stop}
          onLostPointerCapture={stop}
        >
          <span
            aria-hidden="true"
            style={{
              transform: `translate(${stick.x * 24}px,${stick.y * 24}px)`,
            }}
          >
            ✥
          </span>
        </div>
        <div>
          <p role="status" className="nearby-object">
            {snapshot.nearby
              ? `Nearby: ${snapshot.nearby.label}`
              : "Walk near your desk, bookshelf, wardrobe, Panthy or the door."}
          </p>
          <button
            className="button"
            disabled={!snapshot.nearby || paused || talking || !ready || error}
            onClick={() => snapshot.nearby && interact(snapshot.nearby)}
          >
            Interact <span aria-hidden="true">[E]</span>
          </button>{" "}
          <button
            className="button secondary"
            disabled={talking}
            onClick={() => {
              stop();
              pausedRef.current = !paused;
              setPaused(!paused);
            }}
          >
            {paused ? "Resume walking" : "Pause walking"}
          </button>
        </div>
      </div>
      <details className="room-destinations" open>
        <summary>Destinations — explore without movement controls</summary>
        <nav aria-label="Room destinations">
          {room.destinations.map((d) =>
            d.path ? (
              <Link
                key={d.id}
                className="button secondary"
                to={`${base}${d.path}`}
              >
                {d.label} →
              </Link>
            ) : (
              <button
                key={d.id}
                className="button secondary"
                onClick={() => interact(d)}
              >
                {d.label}
              </button>
            ),
          )}
        </nav>
      </details>
      <p className="prototype-note">
        Movement prototype · supplied student idle and walk animations. Side and
        upward views use the supplied temporary frames; final room art is still
        pending. Campus opens the existing campus page for now.
      </p>
    </div>
  );
}
