import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useStudent } from "../app/StudentProvider";
import { Avatar, avatars } from "../components/Avatar";
import { courses, learningGoals } from "../data/courses";
import { Mascot } from "../components/Mascot";
const fields = [
  "Computer Science",
  "Mathematics",
  "Business & Management",
  "Biology",
  "Chemistry",
  "Psychology",
  "History",
  "Languages",
  "Law",
  "Accounting",
  "Other",
];
export function Onboarding() {
  const { profile, preview, update } = useStudent();
  const [draft, setDraft] = useState(profile);
  const [step, setStep] = useState(0);
  const [independent, setIndependent] = useState(!profile.institution);
  // Tracks the "Other" choice separately so typed text never hides its own input.
  const [otherSelected, setOtherSelected] = useState(
    profile.study_field === "Other" ||
      (!!profile.study_field && !fields.includes(profile.study_field)),
  );
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const navigate = useNavigate();
  async function next() {
    setError("");
    if (step === 0 && (!draft.first_name.trim() || !draft.study_field.trim())) {
      setError("Add your first name and choose what you’re studying.");
      return;
    }
    if (step === 1 && !independent && !draft.institution.trim()) {
      setError("Add your institution, or choose independent learning.");
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
              "Which courses are we tackling? Choose what matters to you.",
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
            <label>
              What are you studying?
              <select
                value={otherSelected ? "Other" : draft.study_field}
                onChange={(e) => {
                  const other = e.target.value === "Other";
                  setOtherSelected(other);
                  setDraft({
                    ...draft,
                    study_field: other ? "" : e.target.value,
                  });
                }}
              >
                <option value="">Choose a subject</option>
                {fields.map((field) => (
                  <option key={field}>{field}</option>
                ))}
              </select>
            </label>
            {otherSelected && (
              <label>
                Your subject
                <input
                  maxLength={120}
                  value={draft.study_field}
                  onChange={(e) =>
                    setDraft({ ...draft, study_field: e.target.value })
                  }
                />
              </label>
            )}
          </>
        )}
        {step === 1 && (
          <>
            <h1>Learning happens everywhere.</h1>
            <p>You don’t need a university partnership to belong here.</p>
            <label className="check-row">
              <input
                type="checkbox"
                checked={independent}
                onChange={(e) => setIndependent(e.target.checked)}
              />
              I’m learning independently
            </label>
            {!independent && (
              <label>
                University or college
                <input
                  maxLength={160}
                  value={draft.institution}
                  onChange={(e) =>
                    setDraft({ ...draft, institution: e.target.value })
                  }
                  placeholder="Enter your institution"
                />
              </label>
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
            <fieldset>
              <legend>Choose a first world (optional)</legend>
              {courses.map((course) => (
                <label className="check-row" key={course.id}>
                  <input
                    type="checkbox"
                    checked={draft.selected_courses.includes(course.id)}
                    onChange={(e) =>
                      setDraft({
                        ...draft,
                        selected_courses: e.target.checked
                          ? [...draft.selected_courses, course.id]
                          : draft.selected_courses.filter(
                              (id) => id !== course.id,
                            ),
                      })
                    }
                  />
                  {course.subject}
                </label>
              ))}
            </fieldset>
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
