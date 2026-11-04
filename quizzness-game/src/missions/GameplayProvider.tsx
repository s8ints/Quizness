import {
  createContext,
  useContext,
  useState,
  useRef,
  type ReactNode,
} from "react";
import { useStudent } from "../app/StudentProvider";
import { emptySave, type Save } from "./rules";
type Store = {
  save: Save;
  change: (update: (s: Save) => Save) => boolean;
  error: string;
  interrupted: boolean;
  sessions: Record<string, import("./rules").Checkpoint>;
};
const Context = createContext<Store | null>(null);
export function useGameplay() {
  const value = useContext(Context);
  if (!value) throw new Error("Gameplay provider missing");
  return value;
}
export const useOptionalGameplay = () => useContext(Context);
const record = (x: unknown): x is Record<string, any> =>
  !!x && typeof x === "object" && !Array.isArray(x);
const count = (x: unknown) =>
  typeof x === "number" && Number.isFinite(x) && x >= 0;
function validEvidence(e: unknown) {
  return (
    record(e) &&
    Object.values(e).every(
      (v) =>
        record(v) &&
        count(v.tries) &&
        typeof v.correct === "boolean" &&
        typeof v.reviewed === "boolean",
    )
  );
}
export function validSave(s: unknown): s is Save {
  return (
    record(s) &&
    s.version === 1 &&
    count(s.gems) &&
    count(s.pawTokens) &&
    Array.isArray(s.completed) &&
    s.completed.every((v: unknown) => typeof v === "string") &&
    record(s.attempts) &&
    Object.values(s.attempts).every(
      (a) => record(a) && count(a.spent) && a.spent <= 5 && count(a.refillAt),
    ) &&
    record(s.checkpoints) &&
    Object.values(s.checkpoints).every(
      (c) =>
        record(c) &&
        validEvidence(c.evidence) &&
        count(c.hints) &&
        count(c.elapsed) &&
        (c.variant === 0 || c.variant === 1),
    ) &&
    Array.isArray(s.history) &&
    s.history.every(
      (h: unknown) =>
        record(h) &&
        typeof h.routeId === "string" &&
        typeof h.missionId === "string" &&
        [
          "percent",
          "first",
          "eventual",
          "stars",
          "elapsed",
          "hints",
          "gems",
          "at",
        ].every((k) => count(h[k])) &&
        typeof h.label === "string" &&
        Array.isArray(h.unresolved) &&
        h.unresolved.every((v: unknown) => typeof v === "string"),
    ) &&
    (s.active === undefined || typeof s.active === "string")
  );
}
export function loadGameplay(key: string): {
  save: Save;
  error: string;
  interrupted: boolean;
} {
  try {
    const raw = window.localStorage.getItem(key);
    if (!raw) return { save: emptySave(), error: "", interrupted: false };
    const s = JSON.parse(raw);
    if (!validSave(s)) throw new Error("Invalid save");
    return { save: s, error: "", interrupted: !!s.active };
  } catch {
    return {
      save: emptySave(),
      error:
        "Your local save could not be read. Original data is preserved; progress cannot be saved until you recover or clear this browser save.",
      interrupted: false,
    };
  }
}
function Store({ owner, children }: { owner: string; children: ReactNode }) {
  const key = `quizzness-gameplay-v1:${owner}`;
  const [initial] = useState(() => loadGameplay(key));
  const [save, setSave] = useState(initial.save),
    [error, setError] = useState(initial.error);
  const current = useRef(save);
  const sessions = useRef<Record<string, import("./rules").Checkpoint>>({});
  function change(update: (s: Save) => Save) {
    if (initial.error) return false;
    const next = update(current.current);
    try {
      window.localStorage.setItem(key, JSON.stringify(next));
      current.current = next;
      setSave(next);
      setError("");
      return true;
    } catch {
      setError(
        "Progress could not be saved on this device. Free lessons remain available. Please make storage space and retry.",
      );
      return false;
    }
  }
  return (
    <Context.Provider
      value={{
        save,
        change,
        error,
        interrupted: initial.interrupted,
        sessions: sessions.current,
      }}
    >
      {children}
    </Context.Provider>
  );
}
export function GameplayProvider({ children }: { children: ReactNode }) {
  const { profile, preview } = useStudent();
  const owner = preview ? "preview" : profile.user_id;
  return (
    <Store key={owner} owner={owner}>
      {children}
    </Store>
  );
}
