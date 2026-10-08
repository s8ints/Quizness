import { useEffect, useRef, useState, type FormEvent } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { supabase } from "../auth/client";
import { useAuth } from "../auth/AuthProvider";
import { Mascot } from "../components/Mascot";
export function AuthScreen({
  signup = false,
  recovery = false,
}: {
  signup?: boolean;
  recovery?: boolean;
}) {
  const { user, loading } = useAuth();
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const [busy, setBusy] = useState(false);
  const navigate = useNavigate();
  if (loading)
    return (
      <p className="state-page" role="status">
        Checking your session…
      </p>
    );
  if (user && !recovery) return <Navigate to="/dashboard" replace />;
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!supabase) return;
    const form = new FormData(event.currentTarget);
    const email = String(form.get("email")).trim();
    const password = String(form.get("password") ?? "");
    setBusy(true);
    setError("");
    setNotice("");
    try {
      if (recovery) {
        const { error } = await supabase.auth.resetPasswordForEmail(email, {
          redirectTo: `${window.location.origin}/auth/reset`,
        });
        if (error) throw error;
        setNotice(
          "If an account exists, check your email for a recovery link.",
        );
      } else if (signup) {
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: `${window.location.origin}/auth/callback`,
            data: {
              first_name: String(form.get("first_name")).trim(),
              last_name: String(form.get("last_name")).trim(),
            },
          },
        });
        if (error) throw error;
        if (data.session) navigate("/onboarding", { replace: true });
        else
          setNotice("Check your email to confirm your account, then log in.");
      } else {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (error) throw error;
        navigate("/dashboard", { replace: true });
      }
    } catch {
      setError(
        recovery
          ? "We could not send the recovery email. Please try again."
          : signup
            ? "We could not create your account. Check your details and try again."
            : "We could not log you in. Check your email and password and try again.",
      );
    } finally {
      setBusy(false);
    }
  }
  return (
    <div className="auth-page">
      <Link to="/" className="brand">
        <span className="brand-mark">q</span>quizzness
      </Link>
      <div className="auth-layout">
        <section className="auth-story">
          <img
            className="auth-campus"
            src="/brand/quizzness-campus.png"
            alt="Quizzness pixel campus"
            width="1672"
            height="941"
          />
          <Mascot
            state={error ? "help" : recovery ? "encouraging" : "welcome"}
            message={
              error ||
              (recovery
                ? "Let’s find your way back to the guild."
                : "Your next adventure starts here. I’m Panthy, your learning guide.")
            }
            compact
          />
          <p className="eyebrow">Your adventure starts with you.</p>
          <h2>
            Small steps.
            <br />
            Bigger
            <br />
            <em>possibilities.</em>
          </h2>
          <p>
            Whatever you’re studying,
            <br />
            there’s a world of ideas waiting.
          </p>
          <span className="story-star">✦</span>
        </section>
        <section className="auth-form">
          <p className="eyebrow">
            {recovery
              ? "Find your way back"
              : signup
                ? "A new beginning"
                : "Your home base awaits"}
          </p>
          <h1>
            {recovery
              ? "Reset your password."
              : signup
                ? "Join the adventure."
                : "Welcome back."}
          </h1>
          <p>
            {recovery
              ? "We’ll send a link to your account email."
              : signup
                ? "A place for every curious mind."
                : "Pick up where curiosity left you."}
          </p>
          {!supabase && (
            <div className="setup-notice">
              Accounts are not connected yet. You can explore the student
              preview while Supabase is configured.
            </div>
          )}
          <form onSubmit={submit}>
            {signup && (
              <div className="form-grid">
                <label>
                  First name
                  <input
                    name="first_name"
                    autoComplete="given-name"
                    maxLength={80}
                    required
                  />
                </label>
                <label>
                  Last name
                  <input
                    name="last_name"
                    autoComplete="family-name"
                    maxLength={80}
                    required
                  />
                </label>
              </div>
            )}
            <label>
              Email
              <input type="email" name="email" autoComplete="email" required />
            </label>
            {!recovery && (
              <label>
                Password
                <input
                  type="password"
                  name="password"
                  minLength={8}
                  autoComplete={signup ? "new-password" : "current-password"}
                  aria-describedby={signup ? "password-hint" : undefined}
                  required
                />
              </label>
            )}
            {signup && (
              <p id="password-hint" className="muted">
                At least 8 characters.
              </p>
            )}
            <p role="alert">{error}</p>
            <p role="status">{notice}</p>
            <button className="button" disabled={!supabase || busy}>
              {busy
                ? "Working…"
                : recovery
                  ? "Send recovery link"
                  : signup
                    ? "Create account"
                    : "Log in"}
            </button>
          </form>
          <div className="auth-links">
            {!signup && !recovery && (
              <Link to="/recovery">Forgot your password?</Link>
            )}
            <Link to={signup ? "/login" : "/signup"}>
              {signup
                ? "Already here? Log in →"
                : "New here? Create an account →"}
            </Link>
            <Link to="/preview">Explore the student preview →</Link>
          </div>
        </section>
      </div>
    </div>
  );
}
export function AuthCallback({ reset = false }: { reset?: boolean }) {
  const { user, loading } = useAuth();
  const [working, setWorking] = useState(true);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [savingPassword, setSavingPassword] = useState(false);
  const navigate = useNavigate();
  const exchangeRequest = useRef<Promise<void> | null>(null);
  useEffect(() => {
    let active = true;
    // React StrictMode replays effects. Reuse the request: auth codes are single-use.
    exchangeRequest.current ??= (async () => {
      const params = new URLSearchParams(window.location.search);
      if (params.get("error")) throw new Error("Invalid link");
      const code = params.get("code");
      if (code && supabase) {
        const { error } = await supabase.auth.exchangeCodeForSession(code);
        if (error) throw error;
        window.history.replaceState(
          {},
          "",
          reset ? "/auth/reset" : "/auth/callback",
        );
      }
    })();
    void exchangeRequest.current
      .catch(() => {
        if (active)
          setError(
            "This link could not be verified. Request a new link or log in.",
          );
      })
      .finally(() => {
        if (active) setWorking(false);
      });
    return () => {
      active = false;
    };
  }, [reset]);
  async function updatePassword(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!supabase || !user || savingPassword) return;
    setPasswordError("");
    setSavingPassword(true);
    const password = String(new FormData(event.currentTarget).get("password"));
    try {
      const { error } = await supabase.auth.updateUser({ password });
      if (error) throw error;
      setNotice("Password updated.");
      navigate("/dashboard", { replace: true });
    } catch {
      setPasswordError(
        "Password could not be updated. Try another password or request a new link.",
      );
    } finally {
      setSavingPassword(false);
    }
  }
  if (loading || working)
    return (
      <p className="state-page" role="status">
        Verifying your link…
      </p>
    );
  if (user && !reset && !error) return <Navigate to="/dashboard" replace />;
  return (
    <div className="page narrow form-panel">
      <h1>{reset ? "Choose a new password." : "Confirm your account."}</h1>
      <Mascot state={error || passwordError ? "help" : "encouraging"} compact />
      {error && <p role="alert">{error}</p>}
      {reset && user && !error ? (
        <form onSubmit={updatePassword}>
          <label>
            New password
            <input
              type="password"
              name="password"
              minLength={8}
              autoComplete="new-password"
              aria-describedby="new-password-hint"
              required
            />
          </label>
          <p id="new-password-hint" className="muted">
            At least 8 characters.
          </p>
          <button className="button" disabled={savingPassword}>
            {savingPassword ? "Updating…" : "Update password"}
          </button>
          {passwordError && <p role="alert">{passwordError}</p>}
          <p role="status">{notice}</p>
        </form>
      ) : (
        <p>
          Log in after confirming your email, or request a new recovery link.
        </p>
      )}
      <Link to="/login">Go to login →</Link>
      <br />
      <Link to="/recovery">Request recovery link →</Link>
    </div>
  );
}
