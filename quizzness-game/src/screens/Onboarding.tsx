import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useStudent } from "../app/StudentProvider";
import { Avatar, avatars } from "../components/Avatar";
import { coursesInWorld, learningGoals } from "../data/courses";
import { homeWorldFor } from "../data/majors";
import { campus, worlds } from "../data/worlds";
import { Mascot } from "../components/Mascot";
import { MajorFields } from "../components/MajorFields";
import { InstitutionField } from "../components/InstitutionField";
import type { World } from "../types/content";
export function Onboarding() {
  const { profile, preview, update } = useStudent();
  const [draft, setDraft] = useState(profile);
  const [step, setStep] = useState(0);
  const [independent, setIndependent] = useState(!profile.institution);
  const [error, setError] = useState("");
  const home = homeWorldFor(draft.major_id);
  // The home world's courses come first; students may still pick from any world.
  const orderedWorlds = home
    ? [home, ...worlds.filter((world) => world.id !== home.id)]
    : worlds;
  const [busy, setBusy] = useState(false);
  const navigate = useNavigate();
  function courseGroup(world: World) {
    return (
      <fieldset key={world.id}>
        <legend>
          {world.name} · {world.subject}
          {world.id === home?.id ? " · your home world" : ""}
        </legend>
        {coursesInWorld(world.id).map((course) => (
          <label className="check-row" key={course.id}>
            <input
              type="checkbox"
              checked={draft.selected_courses.includes(course.id)}
              onChange={(e) =>
                setDraft({
                  ...draft,
                  selected_courses: e.target.checked
                    ? [...draft.selected_courses, course.id]
                    : draft.selected_courses.filter((id) => id !== course.id),
                })
              }
            />
            {course.code} · {course.title}
          </label>
        ))}
      </fieldset>
    );
  }
  async function next() {
    setError("");
    if (
      step === 0 &&
      (!draft.first_name.trim() ||
        !draft.major_id ||
        !draft.study_field.trim())
    ) {
      setError("Add your first name and choose what you’re studying.");
      return;
    }
    if (step === 1 && !independent && !draft.institution.trim()) {
      setError(
        "Choose your university or college, or pick “I’m learning independently”.",
      );
      return;
    }
    if (step < 3) {
      setStep(step + 1);
      return;
    }
    setBusy(true);
    try {
      await update({
        ...draft,
        institution: independent ? "" : draft.institution,
        onboarding_completed_at: new Date().toISOString(),
      });
      navigate(preview ? "/preview" : "/dashboard", { replace: true });
    } catch {
      setError("Your setup could not be saved. Please try again.");
    } finally {
      setBusy(false);
    }
  }
  return (
    <div className="page onboarding">
      <p className="eyebrow">A little about your journey · {step + 1} of 4</p>
      <div className="progress-track">
        <span style={{ width: `${(step + 1) * 25}%` }} />
      </div>
      <section className="form-panel">
        <Mascot
          state={error ? "help" : step === 3 ? "happy" : "thinking"}
          message={
            error ||
            [
              "What are you studying? Every subject belongs here.",
              "Learning independently or with a college? You belong in the guild.",
              home
                ? `Your home world is ${home.name}. Which courses are we tackling this semester?`
                : `You’ll start at ${campus.name} while your own world is prepared. Which courses are we tackling this semester?`,
              "Your character represents you. I’ll be here as your guide.",
            ][step]
          }
          compact
        />
        {step === 0 && (
          <>
            <h1>What sparks your curiosity?</h1>
            <p>No single path. No single subject.</p>
            <label>
              First name
              <input
                required
                autoComplete="given-name"
                maxLength={80}
                value={draft.first_name}
                onChange={(e) =>
                  setDraft({ ...draft, first_name: e.target.value })
                }
              />
            </label>
            <MajorFields
              value={draft}
              onChange={(fields) => setDraft({ ...draft, ...fields })}
            />
          </>
        )}
        {step === 1 && (
          <>
            <h1>Learning happens everywhere.</h1>
            <p>You don’t need a university partnership to belong here.</p>
            <fieldset className="choice-cards">
              <legend>How are you studying?</legend>
              <label className="choice-card">
                <input
                  type="radio"
                  name="study-mode"
                  checked={!independent}
                  onChange={() => setIndependent(false)}
                />
                <span>
                  <strong>At a university or college</strong>
                  <small>Pick your school so your campus feels like home.</small>
                </span>
              </label>
              <label className="choice-card">
                <input
                  type="radio"
                  name="study-mode"
                  checked={independent}
                  onChange={() => setIndependent(true)}
                />
                <span>
                  <strong>I’m learning independently</strong>
                  <small>No school needed. You still get the full guild.</small>
                </span>
              </label>
            </fieldset>
            {!independent && (
              <InstitutionField
                value={draft.institution}
                onChange={(institution) => setDraft({ ...draft, institution })}
              />
            )}
          </>
        )}
        {step === 2 && (
          <>
            <h1>What would you like help with?</h1>
            <p>Pick any goals that feel right. You can change them later.</p>
            {learningGoals.map((goal) => (
              <label className="check-row choice" key={goal}>
                <input
                  type="checkbox"
                  checked={draft.goals.includes(goal)}
                  onChange={(e) =>
                    setDraft({
                      ...draft,
                      goals: e.target.checked
                        ? [...draft.goals, goal]
                        : draft.goals.filter((item) => item !== goal),
                    })
                  }
                />
                {goal}
              </label>
            ))}
            <h2>Your courses this semester (optional)</h2>
            {orderedWorlds.slice(0, home ? 1 : 0).map(courseGroup)}
            <details open={!home}>
              <summary>Courses in other worlds</summary>
              {orderedWorlds.slice(home ? 1 : 0).map(courseGroup)}
            </details>
          </>
        )}
        {step === 3 && (
          <>
            <h1>A companion for the road.</h1>
            <p>
              Choose one of your Quizzness student characters for your home
              base.
            </p>
            <div className="avatar-options">
              {avatars.map((avatar) => (
                <button
                  type="button"
                  key={avatar.id}
                  aria-pressed={draft.avatar_id === avatar.id}
                  onClick={() => setDraft({ ...draft, avatar_id: avatar.id })}
                >
                  <Avatar id={avatar.id} large />
                  {avatar.label}
                </button>
              ))}
            </div>
          </>
        )}
        <p role="alert">{error}</p>
        <div className="actions">
          {step > 0 && (
            <button
              className="button secondary"
              onClick={() => setStep(step - 1)}
              disabled={busy}
            >
              ← Back
            </button>
          )}
          <button
            className="button"
            disabled={busy}
            onClick={() => void next()}
          >
            {busy
              ? "Saving…"
              : step === 3
                ? "Enter my home base →"
                : "Continue →"}
          </button>
        </div>
      </section>
    </div>
  );
}
