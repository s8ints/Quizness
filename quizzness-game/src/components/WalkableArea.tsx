import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useStudent } from "../app/StudentProvider";
import { Mascot } from "./Mascot";
import type { Area, AreaDialog, Destination, Point } from "../game/area";
import type { AreaSnapshot } from "../game/createAreaGame";
import "../styles/exploration.css";

// One walkable place: the game canvas, keyboard and touch controls, and links
// that work without walking. The room and the campus both use this.
export function WalkableArea({
  area,
  label,
  hint,
}: {
  area: Area;
  label: string;
  hint: string;
}) {
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
  const [snapshot, setSnapshot] = useState<AreaSnapshot>({ ...area.spawn });
  const [dialog, setDialog] = useState<AreaDialog | null>(null);
  const [stick, setStick] = useState<Point>({ x: 0, y: 0 });
  const pointer = useRef<number | null>(null);
  // Walking works straight away, unless the student is already using something else.
  useEffect(() => {
    // Page changes put focus on the heading, so that counts as "not in use" too.
    const active = document.activeElement;
    if (
      ready &&
      !error &&
      (active === document.body || active?.tagName === "H1")
    )
      stage.current?.focus({ preventScroll: true });
  }, [ready, error]);
  function stop() {
    keys.current.clear();
    joystick.current = { x: 0, y: 0 };
    setStick({ x: 0, y: 0 });
    pointer.current = null;
  }
  function interact(destination: Destination) {
    stop();
    if (destination.dialog) {
      pausedRef.current = true;
      setDialog(destination.dialog);
    } else if (destination.path) navigate(`${base}${destination.path}`);
  }
  useEffect(() => {
    let cancelled = false;
    let game: { destroy: (removeCanvas: boolean) => void } | undefined;
    setReady(false);
    setError(false);
    Promise.all([
      import("../game/createAreaGame"),
      fetch("/sprites/students/students.json").then((response) => {
        if (!response.ok)
          throw new Error("Student animation manifest could not load");
        return response.json();
      }),
    ])
      .then(([{ createAreaGame }, manifest]) => {
        if (cancelled || !host.current) return;
        game = createAreaGame(
          area,
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
  }, [area, profile.avatar_id, profile.reduced_motion, retry]);
  const destinationControl = (d: Destination, className: string, text: string) =>
    d.path && !d.dialog ? (
      <Link key={d.id} className={className} to={`${base}${d.path}`}>
        {text}
      </Link>
    ) : (
      <button
        key={d.id}
        type="button"
        className={className}
        onClick={() => interact(d)}
      >
        {text}
      </button>
    );
  return (
    <>
      <p id="area-controls">
        Walk with <kbd>WASD</kbd> or the arrow keys, and press <kbd>E</kbd> near
        something to use it. If the keys stop responding, click the picture. Tab
        leaves the walking controls.
      </p>
      <div className="exploration-frame">
        <div
          ref={stage}
          className="walkable-stage"
          style={{ aspectRatio: `${area.width} / ${area.height}` }}
          tabIndex={0}
          role="group"
          aria-label={label}
          aria-describedby="area-controls"
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
              !dialog
            ) {
              event.preventDefault();
              interact(snapshot.nearby);
            }
          }}
          onKeyUp={(event) => keys.current.delete(event.code)}
        >
          <div ref={host} className="phaser-room" aria-hidden="true" />
          {area.showPins && ready && !error && (
            <nav className="map-pins" aria-label="Map landmarks">
              {area.destinations.map((d) => (
                <span
                  key={d.id}
                  className="map-pin"
                  data-near={snapshot.nearby?.id === d.id}
                  style={{
                    left: `${((d.pin?.x ?? d.x) / area.width) * 100}%`,
                    top: `${((d.pin?.y ?? d.y) / area.height) * 100}%`,
                  }}
                >
                  {destinationControl(d, "map-pin-control", d.label)}
                </span>
              ))}
            </nav>
          )}
          {ready && !error && snapshot.nearby && !dialog && (
            <p className="room-prompt" aria-hidden="true">
              <kbd>E</kbd> {snapshot.nearby.label}
            </p>
          )}
        </div>
        {(!ready || error) && (
          <div className="room-load" role="status">
            {error ? (
              <>
                <p>
                  This place couldn’t load. You can still use the destinations
                  below.
                </p>
                <button
                  className="button"
                  onClick={() => setRetry((value) => value + 1)}
                >
                  Try again
                </button>
              </>
            ) : (
              "Getting things ready…"
            )}
          </div>
        )}
        {dialog && (
          <div
            className="room-dialogue"
            role="dialog"
            aria-modal="false"
            aria-label={dialog.title}
          >
            <Mascot compact state="welcome" message={dialog.message} />
            <button
              className="button"
              autoFocus
              onClick={() => {
                setDialog(null);
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
              dialog ||
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
            {snapshot.nearby ? `Nearby: ${snapshot.nearby.label}` : hint}
          </p>
          <button
            className="button"
            disabled={!snapshot.nearby || paused || !!dialog || !ready || error}
            onClick={() => snapshot.nearby && interact(snapshot.nearby)}
          >
            Interact <span aria-hidden="true">[E]</span>
          </button>{" "}
          <button
            className="button secondary"
            disabled={!!dialog}
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
      {(!area.showPins || error) && (
        <details className="room-destinations" open>
          <summary>Destinations: explore without walking</summary>
          <nav aria-label="Destinations">
            {area.destinations.map((d) =>
              destinationControl(
                d,
                "button secondary",
                d.path ? `${d.label} →` : d.label,
              ),
            )}
          </nav>
        </details>
      )}
    </>
  );
}
