export const economy = {
  attempts: 5,
  refillMs: 3600000,
  firstReward: 20,
  replayReward: 5,
  replayCap: 3,
  panthyLimit: 3,
  speedSeconds: 90,
  speedBonus: 2,
};
export type Evidence = { tries: number; correct: boolean; reviewed: boolean };
export type Checkpoint = {
  evidence: Record<string, Evidence>;
  hints: number;
  elapsed: number;
  variant: number;
};
export type Result = {
  missionId: string;
  routeId: string;
  percent: number;
  first: number;
  eventual: number;
  stars: number;
  label: string;
  elapsed: number;
  hints: number;
  gems: number;
  at: number;
  unresolved: string[];
};
export type Save = {
  version: 1;
  gems: number;
  pawTokens: number;
  attempts: Record<string, { spent: number; refillAt: number }>;
  completed: string[];
  history: Result[];
  checkpoints: Record<string, Checkpoint>;
  active?: string;
};
export const emptySave = (): Save => ({
  version: 1,
  gems: 0,
  pawTokens: 0,
  attempts: {},
  completed: [],
  history: [],
  checkpoints: {},
});
export function attemptsLeft(save: Save, id: string, now = Date.now()) {
  const a = save.attempts[id];
  return !a || now >= a.refillAt ? 5 : Math.max(0, 5 - a.spent);
}
export function spendAttempt(save: Save, id: string, now = Date.now()): Save {
  const previous = save.attempts[id];
  const spent = 5 - attemptsLeft(save, id, now);
  return {
    ...save,
    attempts: {
      ...save.attempts,
      [id]: {
        spent: Math.min(5, spent + 1),
        refillAt:
          spent === 4
            ? now + economy.refillMs
            : spent === 0
              ? Number.MAX_SAFE_INTEGER
              : previous.refillAt,
      },
    },
  };
}
export const refillFromPractice = (save: Save, id: string): Save => ({
  ...save,
  attempts: { ...save.attempts, [id]: { spent: 0, refillAt: 0 } },
});
export function gradeRoute(evidence: Record<string, Evidence>) {
  const values = Object.values(evidence),
    n = values.length || 1;
  const first =
    (100 * values.filter((e) => e.correct && e.tries === 1).length) / n;
  const eventual = (100 * values.filter((e) => e.correct).length) / n;
  const percent = Math.round(first * 0.7 + eventual * 0.3);
  return {
    first: Math.round(first),
    eventual: Math.round(eventual),
    percent,
    stars: percent >= 85 ? 3 : percent >= 60 ? 2 : 1,
    label:
      percent >= 85
        ? "Great run!"
        : percent >= 60
          ? "Solid progress"
          : "Keep practising",
  };
}
export function finishRoute(
  save: Save,
  missionId: string,
  routeId: string,
  evidence: Record<string, Evidence>,
  elapsed: number,
  hints: number,
  now = Date.now(),
  speed = false,
): Save {
  const completed = save.completed.includes(missionId);
  const replays = save.history.filter((r) => r.missionId === missionId).length;
  const gems = completed
    ? replays <= economy.replayCap
      ? economy.replayReward
      : 0
    : economy.firstReward;
  const bonus = speed && gems > 0 ? economy.speedBonus : 0;
  const result: Result = {
    ...gradeRoute(evidence),
    missionId,
    routeId,
    elapsed,
    hints,
    gems: gems + bonus,
    at: now,
    unresolved: Object.keys(evidence).filter((id) => !evidence[id].correct),
  };
  const checkpoints = { ...save.checkpoints };
  delete checkpoints[routeId];
  return {
    ...save,
    gems: save.gems + result.gems,
    completed: [...new Set([...save.completed, missionId])],
    history: [...save.history, result],
    checkpoints,
    active: undefined,
  };
}
