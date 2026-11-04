import { useEffect, useMemo, useRef, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useStudent } from "../app/StudentProvider";
import { ActivityBoundary } from "../learning/ActivityBoundary";
import { ActivityRenderer } from "../learning/ActivityRenderer";
import { routes, getRoute } from "../content/phase2/routes";
import { useGameplay } from "./GameplayProvider";
import {
  attemptsLeft,
  economy,
  finishRoute,
  refillFromPractice,
  spendAttempt,
  type Evidence,
} from "./rules";
import { WalkableArea } from "../components/WalkableArea";
import { variablesTopicArea } from "../game/worldAreas";
import { Mascot } from "../components/Mascot";
import "./missions.css";

export function Mission() {
  const { routeId = "" } = useParams();
  return <MissionRun key={routeId} routeId={routeId} />;
}
function MissionRun({ routeId }: { routeId: string }) {
  const { save, change, error, interrupted, sessions } = useGameplay();
  const { preview, profile } = useStudent();
  const base = preview ? "/preview" : "";
  const navigate = useNavigate();
  const prior = sessions[routeId] ?? save.checkpoints[routeId];
  const [variant] = useState(
    prior?.variant ??
      save.history.filter((h) => h.routeId === routeId).length % 2,
  );
  const route = getRoute(routeId, variant);
  const [started, setStarted] = useState(false),
    [panel, setPanel] = useState<string | null>(null),
    [evidence, setEvidence] = useState<Record<string, Evidence>>({});
  const [hints, setHints] = useState(0),
    [help, setHelp] = useState(false),
    [panthy, setPanthy] = useState(false),
    [exit, setExit] = useState(false),
    [done, setDone] = useState(false),
    [celebrate, setCelebrate] = useState(false);
  const [elapsed, setElapsed] = useState(0),
    [mode, setMode] = useState("untimed"),
    [seconds, setSeconds] = useState(0),
    [expired, setExpired] = useState(false),
    [practice, setPractice] = useState(0),
    [message, setMessage] = useState("");
  const completedRef = useRef(false);
  const dialog = useRef<HTMLDivElement>(null);
  const exitDialog = useRef<HTMLDivElement>(null);
  const sessionRef = useRef({ evidence, hints, elapsed, variant });
  sessionRef.current = { evidence, hints, elapsed, variant };
  useEffect(
    () => () => {
      if (!completedRef.current) sessions[routeId] = sessionRef.current;
    },
    [routeId, sessions],
  );
  useEffect(() => {
    if (exit) exitDialog.current?.focus();
    else if (panel) dialog.current?.focus();
  }, [exit]);
  const activity = route?.activities.find((a) => a.id === panel);
  const activityKey = activity ? `${routeId}:${activity.id}` : "";
  const left = attemptsLeft(save, activityKey);
  const locked =
    routeId === "changing-values" || routeId === "checkpoint"
      ? !save.completed.includes("variables-values-types")
      : false;
  useEffect(() => {
    if (!started || done) return;
    const id = setInterval(() => {
      if (document.hidden || help || exit) return;
      setElapsed((v) => v + 1);
      if (panel && mode !== "untimed" && !expired && !evidence[panel]?.correct)
        setSeconds((v) => v + 1);
    }, 1000);
    return () => clearInterval(id);
  }, [started, done, help, exit, panel, mode, expired, evidence]);
  const limit = economy.speedSeconds * (mode === "extended" ? 2 : 1);
  useEffect(() => {
    if (
      !activity ||
      mode === "untimed" ||
      seconds < limit ||
      expired ||
      evidence[activity.id]?.correct ||
      left === 0
    )
      return;
    if (change((s) => spendAttempt(s, activityKey))) {
      setEvidence((e) => ({
        ...e,
        [activity.id]: {
          tries: (e[activity.id]?.tries ?? 0) + 1,
          correct: false,
          reviewed: false,
        },
      }));
      setExpired(true);
      setMessage(
        "Time is up for this attempt. Review the example or try again; ordinary practice is always untimed.",
      );
    }
  }, [seconds]);
  useEffect(() => {
    if (!panel) return;
    dialog.current?.focus();
  }, [panel]);
  const area = useMemo(
    () => ({
      ...variablesTopicArea,
      id: `mission-${routeId}`,
      title: route?.title ?? "Mission",
      missionPath: undefined,
      guides: [],
      destinations:
        route?.activities.map((a, i) => ({
          id: a.id,
          label: a.title,
          x: 220 + (i % 4) * 350,
          y: 650 + Math.floor(i / 4) * 180,
          pin: { x: 220 + (i % 4) * 350, y: 650 + Math.floor(i / 4) * 180 },
          dialog: { title: a.title, activityId: a.id },
        })) ?? [],
    }),
    [routeId, route?.title],
  );
  if (!route)
    return (
      <div className="page">
        <h1>Adventure not found</h1>
        <Link to={`${base}/journal`}>Open journal</Link>
      </div>
    );
  if (locked)
    return (
      <div className="page">
        <h1>Finish your first mission first</h1>
        <p>
          Complete Variables, values and data types at the Variables mission
          board to open this adventure.
        </p>
        <Link to={`${base}/explore/variables-topic`}>
          Go to the mission board
        </Link>
      </div>
    );
  function start(resume = false) {
    if (!change((s) => ({ ...s, active: routeId }))) return;
    if (resume && prior) {
      setEvidence(prior.evidence);
      setHints(prior.hints);
      setElapsed(prior.elapsed);
      setPanel(route!.activities.find(a=>!prior.evidence[a.id]?.reviewed)?.id??null);
    }
    setStarted(true);
  }
  function open(id: string) {
    const index = route!.activities.findIndex((a) => a.id === id);
    if (index > 0 && !evidence[route!.activities[index - 1].id]?.reviewed) {
      setMessage("Complete or review the earlier objective first.");
      return;
    }
    setPanel(id);
    setSeconds(0);
    setExpired(false);
    setHelp(false);
    setPanthy(false);
    setMessage("");
  }
  function leave(saveCheckpoint: boolean) {
    const nextEvidence = { ...evidence };
    let abandon = !!activity && !evidence[activity.id]?.reviewed && !expired;
    if (
      !change((s) => {
        const n = abandon ? spendAttempt(s, activityKey) : s;
        const checkpoints = { ...n.checkpoints };
        if (saveCheckpoint)
          checkpoints[routeId] = {
            evidence: nextEvidence,
            hints,
            elapsed,
            variant,
          };
        else delete checkpoints[routeId];
        return { ...n, active: undefined, checkpoints };
      })
    )
      return;
    delete sessions[routeId];
    completedRef.current = true;
    navigate(`${base}/journal`);
  }
  function complete() {
    if (completedRef.current) return;
    if (!route!.activities.every((a) => evidence[a.id]?.reviewed)) return;
    const rewardId =
      routeId === "checkpoint" ? "variables-checkpoint" : route!.missionId;
    if (
      change((s) =>
        finishRoute(
          s,
          rewardId,
          routeId,
          evidence,
          elapsed,
          hints,
          Date.now(),
          mode !== "untimed" && Object.values(evidence).every((e) => e.correct),
        ),
      )
    ) {
      completedRef.current = true;
      delete sessions[routeId];
      setDone(true);
      setCelebrate(!profile.reduced_motion);
      setPanel(null);
    }
  }
  const latest = done ? save.history.at(-1) : undefined;
  return (
    <div className="mission-page">
      <div className="page">
        <h1>{route.title}</h1>
        <p className="prototype-note">
          Original introductory demo · not validated against your university
          course. Saved on this device only.
        </p>
        {error && <p role="alert">{error}</p>}
        {interrupted && !started && (
          <p role="status">
            The interrupted attempt was not saved. You are back at the mission
            entrance; your previous explicit save and earned results are
            preserved.
          </p>
        )}
        {!started ? (
          <section className="mission-intro">
            <Mascot state="thinking" compact />
            <p>{route.story}</p>
            <h2>Learning objectives</h2>
            <ul>
              {route.objectives.map((o) => (
                <li key={o}>{o}</li>
              ))}
            </ul>
            <p>
              About 10–15 minutes. Complete every activity, or exhaust attempts
              and review unresolved mistakes. Perfect accuracy is not required.
            </p>
            <details>
              <summary>Optional lesson and worked example</summary>
              <p>{route.lesson}</p>
            </details>
            <label>
              Challenge timing{" "}
              <select value={mode} onChange={(e) => setMode(e.target.value)}>
                <option value="untimed">Untimed (recommended)</option>
                <option value="speed">
                  Optional Speed challenge · 90 seconds per activity
                </option>
                <option value="extended">
                  Extended Speed challenge · 180 seconds
                </option>
              </select>
            </label>
            <p>Speed bonuses are provisional; learning and help are free.</p>
            <button className="button" onClick={() => start()}>
              Start adventure
            </button>
            {prior && (
              <button className="button secondary" onClick={() => start(true)}>
                Resume saved adventure
              </button>
            )}
            <Link to={`${base}/explore/variables-topic`}>
              Back to mission board
            </Link>
          </section>
        ) : done && latest ? (
          <section className="mission-results">
            {celebrate && (
              <div className="mission-celebration">
                <p>✦ Mission completed! ✦</p>
                <button onClick={() => setCelebrate(false)}>
                  Skip celebration
                </button>
              </div>
            )}
            <h2>Mission completed</h2>
            <p>
              {latest.percent}% · {"★".repeat(latest.stars)} · {latest.label}
            </p>
            <p>
              Grade = 70% first-attempt accuracy + 30% eventual correctness.
              First try: {latest.first}%; eventual: {latest.eventual}%.
            </p>
            <p>
              {Math.round(elapsed / 60)} minutes · {hints} Panthy uses ·{" "}
              {latest.gems} gems earned · Balance {save.gems}
            </p>
            <h3>Your objectives</h3>
            <ul>
              {route.activities.map((a) => (
                <li key={a.id}>
                  {a.objective}:{" "}
                  {evidence[a.id]?.correct
                    ? "Correct"
                    : "Needs practice — review recommended"}
                </li>
              ))}
            </ul>
            <p>
              {latest.unresolved.length
                ? "Try the worked examples and revisit the objectives marked Needs practice."
                : "You have practised every objective. Try another story or the optional checkpoint."}
            </p>
            <Link className="button" to={`${base}/journal`}>
              Results and history
            </Link>
            <Link
              className="button secondary"
              to={`${base}/missions/changing-values`}
            >
              Next mission
            </Link>
            <Link to={`${base}/missions/checkpoint`}>Optional checkpoint</Link>
          </section>
        ) : (
          <>
            <p>
              {save.gems} gems · {hints}/{economy.panthyLimit} Panthy uses ·{" "}
              {Math.floor(elapsed / 60)} minutes
            </p>
            <button onClick={() => setExit(true)}>
              Save or leave adventure
            </button>
          </>
        )}
      </div>
      {started && !done && (
        <>
          <div inert={!!panel || exit}>
            <WalkableArea
              area={area}
              label="Mission exploration"
              hint="Visit the activity markers or use the objective list below."
              externallyPaused={!!panel || exit}
              onActivity={open}
            />
          </div>
          <section className="page">
            <h2>Objective checklist</h2>
            <ol>
              {route.activities.map((a, i) => (
                <li key={a.id}>
                  <button
                    onClick={() => open(a.id)}
                    disabled={
                      i > 0 && !evidence[route.activities[i - 1].id]?.reviewed
                    }
                  >
                    {a.title}
                  </button>{" "}
                  ·{" "}
                  {evidence[a.id]?.correct
                    ? "✓ Correct"
                    : evidence[a.id]?.reviewed
                      ? "Reviewed · needs practice"
                      : "Not completed"}
                </li>
              ))}
            </ol>
            <p role="status">{message}</p>
            {route.activities.every((a) => evidence[a.id]?.reviewed) && (
              <button className="button" onClick={complete}>
                Complete adventure
              </button>
            )}
            <h2>Switch story route</h2>
            <p>
              Each story has separate progress. Switching suspends completed
              objectives for this visit; use Save and leave to keep them after
              closing the browser.
            </p>
            {routes
              .filter(
                (r) => r.missionId === route.missionId && r.id !== routeId,
              )
              .map((r) => (
                <Link
                  className="button secondary"
                  key={r.id}
                  to={`${base}/missions/${r.id}`}
                >
                  {r.title}
                </Link>
              ))}
          </section>
        </>
      )}
      {panel && activity && (
        <div className="mission-overlay" inert={exit}>
          <div
            className="mission-panel"
            role="dialog"
            aria-modal="true"
            aria-label={activity.title}
            tabIndex={-1}
            ref={dialog}
            onKeyDown={(e) => {
              if (e.key === "Escape") {
                setExit(true);
                return;
              }
              if (e.key === "Tab") {
                const els = e.currentTarget.querySelectorAll<HTMLElement>(
                  "button:not(:disabled),a,input,select,summary",
                );
                const first = els[0],
                  last = els[els.length - 1];
                if (e.shiftKey && document.activeElement === first) {
                  e.preventDefault();
                  last?.focus();
                } else if (!e.shiftKey && document.activeElement === last) {
                  e.preventDefault();
                  first?.focus();
                }
              }
            }}
          >
            <p>
              Attempts available: {left}/5{" "}
              {mode !== "untimed" &&
                `· ${Math.max(0, limit - seconds)} seconds left`}
            </p>
            <button
              onClick={() => {
                setMode("untimed");
                setExpired(false);
              }}
            >
              Remove timer
            </button>
            <ActivityBoundary
              key={activity.id}
              replacement={
                <ActivityRenderer
                  key={`replacement-${activity.id}`}
                  activity={
                    route.variantActivities[
                      route.activities.findIndex((a) => a.id === activity.id)
                    ]
                  }
                  disabled={
                    left === 0 || !!evidence[activity.id]?.correct || expired
                  }
                  onCheck={(r) => {
                    if (
                      !r.complete ||
                      evidence[activity.id]?.correct ||
                      left === 0 ||
                      expired
                    )
                      return;
                    if (change((s) => spendAttempt(s, activityKey)))
                      setEvidence((e) => ({
                        ...e,
                        [activity.id]: {
                          tries: (e[activity.id]?.tries ?? 0) + 1,
                          correct: r.correct,
                          reviewed: r.correct,
                        },
                      }));
                  }}
                />
              }
            >
              <ActivityRenderer
                key={`${activity.id}:${variant}`}
                activity={activity}
                disabled={
                  left === 0 || !!evidence[activity.id]?.correct || expired
                }
                onCheck={(r) => {
                  if (
                    !r.complete ||
                    evidence[activity.id]?.correct ||
                    left === 0 ||
                    expired
                  )
                    return;
                  if (change((s) => spendAttempt(s, activityKey)))
                    setEvidence((e) => ({
                      ...e,
                      [activity.id]: {
                        tries: (e[activity.id]?.tries ?? 0) + 1,
                        correct: r.correct,
                        reviewed: r.correct,
                      },
                    }));
                }}
              />
            </ActivityBoundary>
            <p role="status">{message}</p>
            {expired && left > 0 && (
              <button
                onClick={() => {
                  setExpired(false);
                  setSeconds(0);
                  setMessage("");
                }}
              >
                Retry activity
              </button>
            )}
            <button
              onClick={() => {
                setHelp((v) => !v);
                setPanthy(false);
              }}
            >
              Free lesson, NPC help and worked example
            </button>
            <button
              disabled={hints >= economy.panthyLimit && !panthy}
              onClick={() => {
                if (!panthy) {
                  setHints((v) => v + 1);
                  setPanthy(true);
                }
                setHelp(true);
              }}
            >
              Ask Panthy ({Math.max(0, economy.panthyLimit - hints)} free uses
              left)
            </button>
            {help && (
              <aside>
                <h3>{panthy ? "Panthy’s hint" : "Free study help"}</h3>
                <p>{panthy ? activity.hint : route.lesson}</p>
                {!panthy && <p>{activity.explanation}</p>}
                <button onClick={() => setHelp(false)}>Close help</button>
              </aside>
            )}
            {left === 0 && !evidence[activity.id]?.correct && (
              <section>
                <h3>Keep learning for free</h3>
                <p>
                  Five attempts return after one hour, or finish this related
                  practice now. No gems required.
                </p>
                <p>{activity.hint}</p>
                <p>
                  Related practice {practice + 1} of 2. Check the free example,
                  then solve these without spending attempts.
                </p>
                <ActivityRenderer
                  key={`practice-${activity.id}-${practice}`}
                  activity={
                    practice === 0
                      ? (route.variantActivities[
                          route.activities.findIndex(
                            (a) => a.id === activity.id,
                          )
                        ] ?? activity)
                      : activity
                  }
                  onCheck={(r) => {
                    if (!r.complete || !r.correct) return;
                    if (practice === 0) setPractice(1);
                    else if (
                      change((s) => refillFromPractice(s, activityKey))
                    ) {
                      setPractice(0);
                      setExpired(false);
                      setSeconds(0);
                      setMessage(
                        "Related practice completed. Five attempts restored.",
                      );
                    }
                  }}
                />
                <details>
                  <summary>Review unresolved mistake</summary>
                  <p>{activity.explanation}</p>
                  <button
                    onClick={() =>
                      setEvidence((e) => ({
                        ...e,
                        [activity.id]: { ...e[activity.id], reviewed: true },
                      }))
                    }
                  >
                    I reviewed this explanation
                  </button>
                </details>
              </section>
            )}
            {evidence[activity.id]?.reviewed && (
              <button className="button" onClick={() => setPanel(null)}>
                Return to exploration
              </button>
            )}
            <button onClick={() => setExit(true)}>
              Leave unfinished activity
            </button>
          </div>
        </div>
      )}
      {exit && (
        <div className="mission-overlay">
          <div
            role="dialog"
            aria-modal="true"
            aria-label="Leave adventure"
            className="mission-panel"
            tabIndex={-1}
            ref={exitDialog}
            onKeyDown={(e) => {
              if (e.key === "Escape") setExit(false);
              if (e.key === "Tab") {
                const buttons =
                  e.currentTarget.querySelectorAll<HTMLButtonElement>("button");
                const first = buttons[0],
                  last = buttons[buttons.length - 1];
                if (
                  e.shiftKey &&
                  (document.activeElement === first ||
                    document.activeElement === e.currentTarget)
                ) {
                  e.preventDefault();
                  last.focus();
                } else if (!e.shiftKey && document.activeElement === last) {
                  e.preventDefault();
                  first.focus();
                }
              }
            }}
          >
            <h2>Leave adventure?</h2>
            <p>
              Save completed activities and resume at the next unfinished
              objective. Draft answers are not saved. Leaving an unfinished
              activity uses one attempt.
            </p>
            <button onClick={() => leave(true)}>Save and leave</button>
            <button
              onClick={() => {
                if (
                  window.confirm(
                    "Discard this route attempt? Completed history and earned rewards stay saved.",
                  )
                )
                  leave(false);
              }}
            >
              Discard attempt
            </button>
            <button onClick={() => setExit(false)}>Keep playing</button>
          </div>
        </div>
      )}
    </div>
  );
}
