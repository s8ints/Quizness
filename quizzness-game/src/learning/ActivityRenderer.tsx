import { useEffect, useRef, useState } from "react";
import { evaluateActivity } from "./evaluate";
import type { Activity, ActivityDraft, ActivityResult } from "./types";
export type { Activity, ActivityResult } from "./types";

/** Key this component by activity/variant ID to reset its draft between tasks. */
export function ActivityRenderer({
  activity,
  onCheck,
  disabled = false,
}: {
  activity: Activity;
  onCheck: (result: ActivityResult) => void;
  disabled?: boolean;
}) {
  const [draft, setDraft] = useState<ActivityDraft>({});
  const [result, setResult] = useState<ActivityResult | null>(null);
  const [simplified, setSimplified] = useState(false);
  const [selected, setSelected] = useState("");
  const [traceStep, setTraceStep] = useState(0);
  const root = useRef<HTMLElement>(null);
  const draggedPiece = useRef<string | null>(null);
  function update(field: string, value: string) {
    setDraft((old) => ({ ...old, [field]: value }));
    setResult(null);
  }
  useEffect(() => {
    // Pointer events supply touch/pen dragging, where native HTML drag is unavailable.
    function release(event: PointerEvent) {
      const piece = draggedPiece.current;
      draggedPiece.current = null;
      if (!piece || disabled || !("slots" in activity)) return;
      const target = document
        .elementFromPoint?.(event.clientX, event.clientY)
        ?.closest<HTMLElement>("[data-activity-slot]");
      if (target && root.current?.contains(target)) {
        const field = target.dataset.activitySlot;
        if (field && activity.slots.some((slot) => slot.id === field))
          update(field, piece);
      }
    }
    function cancel() {
      draggedPiece.current = null;
    }
    document.addEventListener("pointerup", release);
    document.addEventListener("pointercancel", cancel);
    return () => {
      document.removeEventListener("pointerup", release);
      document.removeEventListener("pointercancel", cancel);
    };
  }, [activity, disabled]);
  return (
    <section
      ref={root}
      className="learning-activity"
      aria-label={activity.title}
    >
      <h2>{activity.title}</h2>
      <p>{activity.prompt}</p>
      <p>
        <small>Learning goal: {activity.objective}</small>
      </p>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          const checked = evaluateActivity(activity, draft);
          setResult(checked);
          onCheck(checked);
        }}
      >
        <fieldset
          disabled={disabled}
          style={{ border: 0, padding: 0, minWidth: 0 }}
        >
          <legend className="sr-only">Your answer</legend>
          {"slots" in activity ? (
            <>
              <label>
                <input
                  type="checkbox"
                  checked={simplified}
                  onChange={(event) => setSimplified(event.target.checked)}
                />{" "}
                Use simple list controls
              </label>
              {!simplified && (
                <div
                  aria-label="Answer pieces"
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: ".5rem",
                    margin: "1rem 0",
                  }}
                >
                  {activity.options.map((option) => (
                    <button
                      type="button"
                      key={option.id}
                      className="button secondary"
                      aria-pressed={selected === option.id}
                      draggable
                      style={{ touchAction: "none" }}
                      onPointerDown={(event) => {
                        if (event.pointerType !== "mouse" && !disabled) {
                          draggedPiece.current = option.id;
                          setSelected(option.id);
                        }
                      }}
                      onDragStart={(event) => {
                        event.dataTransfer.setData("text/plain", option.id);
                        setSelected(option.id);
                      }}
                      onClick={() => setSelected(option.id)}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              )}
              {!simplified && (
                <p>
                  <small>
                    Drag a piece to a row, or select a piece and press Place.
                    Every row also has a keyboard and touch accessible list.
                  </small>
                </p>
              )}
              {activity.slots.map((slot) => (
                <div
                  key={slot.id}
                  data-activity-slot={slot.id}
                  style={{
                    margin: ".8rem 0",
                    padding: ".5rem",
                    border: result?.incorrectFields.includes(slot.id)
                      ? "2px solid #9b3c33"
                      : "1px solid #7A4E9D",
                  }}
                  onDragOver={(event) => event.preventDefault()}
                  onDrop={(event) => {
                    event.preventDefault();
                    if (disabled) return;
                    const value = event.dataTransfer.getData("text/plain");
                    if (activity.options.some((option) => option.id === value))
                      update(slot.id, value);
                  }}
                >
                  <label htmlFor={`${activity.id}-${slot.id}`}>
                    {slot.label}{" "}
                  </label>
                  <select
                    id={`${activity.id}-${slot.id}`}
                    value={draft[slot.id] ?? ""}
                    onChange={(event) => update(slot.id, event.target.value)}
                    aria-invalid={
                      result?.incorrectFields.includes(slot.id) || undefined
                    }
                  >
                    <option value="">Choose a piece</option>
                    {activity.options.map((option) => (
                      <option key={option.id} value={option.id}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                  {!simplified && (
                    <button
                      type="button"
                      className="button secondary"
                      disabled={!selected}
                      onClick={() => update(slot.id, selected)}
                    >
                      Place selected piece in {slot.label}
                    </button>
                  )}
                  {result?.incorrectFields.includes(slot.id) && (
                    <p>Needs another look.</p>
                  )}
                </div>
              ))}
            </>
          ) : "options" in activity ? (
            <div>
              {activity.options.map((option) => (
                <label
                  key={option.id}
                  style={{ display: "block", padding: ".65rem" }}
                >
                  <input
                    type="radio"
                    name={activity.id}
                    value={option.id}
                    checked={draft.answer === option.id}
                    onChange={() => update("answer", option.id)}
                  />{" "}
                  {option.label}
                </label>
              ))}
            </div>
          ) : (
            <>
              {activity.kind === "trace" && (
                <div>
                  <ol>
                    {activity.steps
                      .slice(0, traceStep + 1)
                      .map((step, index) => (
                        <li key={index}>{step}</li>
                      ))}
                  </ol>
                  {traceStep < activity.steps.length - 1 && (
                    <button
                      className="button secondary"
                      type="button"
                      onClick={() => setTraceStep((step) => step + 1)}
                    >
                      Trace next step
                    </button>
                  )}
                </div>
              )}
              <label htmlFor={`${activity.id}-answer`}>Your answer</label>
              <input
                id={`${activity.id}-answer`}
                value={draft.answer ?? ""}
                onChange={(event) => update("answer", event.target.value)}
                autoComplete="off"
                aria-invalid={
                  (result?.correct === false && result.complete) || undefined
                }
              />
            </>
          )}
          <button type="submit" className="button">
            Check answer
          </button>
        </fieldset>
      </form>
      {result && <p role="status">{result.feedback}</p>}
    </section>
  );
}
