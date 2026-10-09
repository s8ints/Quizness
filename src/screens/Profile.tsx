import { useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { useStudent } from "../app/StudentProvider";
import { useAuth } from "../auth/AuthProvider";
import { Avatar, avatars } from "../components/Avatar";
import { learningGoals } from "../data/courses";
import { Mascot } from "../components/Mascot";
import { MajorFields } from "../components/MajorFields";
import { homeWorldFor } from "../data/majors";
import { campus } from "../data/worlds";
export function Profile() {
  const { profile, update, preview } = useStudent();
  const [draft, setDraft] = useState(profile);
  const [message, setMessage] = useState("");
  const [busy, setBusy] = useState(false);
  async function submit(event: FormEvent) {
    event.preventDefault();
    setBusy(true);
    setMessage("");
    try {
      await update(draft);
      setMessage(
        preview
          ? "Preview profile updated. These changes last for this visit."
          : "Your profile is saved.",
      );
    } catch (error) {
      setMessage(
        error instanceof Error
          ? error.message
          : "Your profile could not be saved.",
      );
    } finally {
      setBusy(false);
    }
  }
  return (
    <div className="page">
      <p className="eyebrow">Your character</p>
      <h1>Make yourself at home.</h1>
      <p className="lead">Your learning journey, with your personality.</p>
      <Mascot
        state="happy"
        message="Your character is you. Panthy is your guide. Make the guild feel like home."
        compact
      />
      <form className="profile-layout" onSubmit={submit}>
        <section className="form-panel">
          <h2>The person behind the player</h2>
          <div className="form-grid">
            <label>
              First name
              <input
                required
                maxLength={80}
                autoComplete="given-name"
                value={draft.first_name}
                onChange={(e) =>
                  setDraft({ ...draft, first_name: e.target.value })
                }
              />
            </label>
            <label>
              Last name
              <input
                maxLength={80}
                autoComplete="family-name"
                value={draft.last_name}
                onChange={(e) =>
                  setDraft({ ...draft, last_name: e.target.value })
                }
              />
            </label>
          </div>
          <MajorFields
            value={draft}
            onChange={(fields) => setDraft({ ...draft, ...fields })}
          />
          <p className="muted">
            Home world: {homeWorldFor(draft.major_id)?.name ?? campus.name}
          </p>
          <label>
            Institution (optional)
            <input
              maxLength={160}
              value={draft.institution}
              onChange={(e) =>
                setDraft({ ...draft, institution: e.target.value })
              }
              placeholder="Independent learners welcome"
            />
          </label>
          <fieldset>
            <legend>Your learning goals</legend>
            {learningGoals.map((goal) => (
              <label className="check-row" key={goal}>
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
          </fieldset>
          <button className="button" disabled={busy}>
            {busy ? "Saving…" : "Save profile →"}
          </button>
          <p role="status">{message}</p>
        </section>
        <aside className="form-panel character-picker">
          <Avatar id={draft.avatar_id} large />
          <h2>Choose your student character</h2>
          <p>
            The original six character concepts. Outfit and appearance
            customisation comes later.
          </p>
          <div className="avatar-options">
            {avatars.map((avatar) => (
              <button
                key={avatar.id}
                type="button"
                aria-pressed={draft.avatar_id === avatar.id}
                onClick={() => setDraft({ ...draft, avatar_id: avatar.id })}
              >
                <Avatar id={avatar.id} />
                {avatar.label}
              </button>
            ))}
          </div>
        </aside>
      </form>
    </div>
  );
}
export function Settings() {
  const { profile, update, preview } = useStudent();
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const [busy, setBusy] = useState(false);
  async function motion(enabled: boolean) {
    setBusy(true);
    setMessage("");
    try {
      await update({ ...profile, reduced_motion: enabled });
      setMessage(
        preview
          ? "Preview preference updated for this visit."
          : "Preference saved.",
      );
    } catch {
      setMessage("Your preference could not be saved. Please retry.");
    } finally {
      setBusy(false);
    }
  }
  async function leave() {
    setBusy(true);
    try {
      await logout();
      navigate("/login", { replace: true });
    } catch {
      setMessage("Could not log out. Please try again.");
    } finally {
      setBusy(false);
    }
  }
  return (
    <div className="page narrow">
      <p className="eyebrow">Settings</p>
      <h1>Your pace. Your preferences.</h1>
      <Mascot state="encouraging" compact />
      <section className="form-panel">
        <h2>Keep things comfortable.</h2>
        <label className="check-row">
          <input
            type="checkbox"
            checked={profile.reduced_motion}
            disabled={busy}
            onChange={(e) => void motion(e.target.checked)}
          />
          Reduce interface motion
        </label>
        <p>We also respect your device’s reduced-motion preference.</p>
        <p role="status">{message}</p>
      </section>
      <section className="form-panel">
        <h2>{preview ? "You’re exploring a preview." : "Your account"}</h2>
        <p>
          {preview
            ? "This preview doesn’t use any account. Changes reset when you refresh."
            : "Log out on shared devices to keep your student experience private."}
        </p>
        <button
          className="button secondary"
          disabled={busy}
          onClick={() => (preview ? navigate("/") : void leave())}
        >
          {preview ? "Leave preview" : "Log out"}
        </button>
      </section>
    </div>
  );
}
