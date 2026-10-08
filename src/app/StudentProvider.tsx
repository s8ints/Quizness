import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../auth/AuthProvider";
import { loadProfile, saveProfile, validateProfile } from "../services/profile";
import { emptyProfile, type StudentProfile } from "../types/student";
type Student = {
  profile: StudentProfile;
  preview: boolean;
  update: (profile: StudentProfile) => Promise<void>;
};
const Context = createContext<Student | null>(null);
export function useStudent() {
  const value = useContext(Context);
  if (!value) throw new Error("Student context missing");
  return value;
}
export function StudentProvider({
  preview,
  children,
}: {
  preview: boolean;
  children: ReactNode;
}) {
  const { user, loading: authLoading } = useAuth();
  const location = useLocation();
  const [profile, setProfile] = useState<StudentProfile>(() =>
    preview
      ? {
          ...emptyProfile("preview"),
          first_name: "Explorer",
          selected_courses: ["mathematics", "biology", "business", "computing"],
          onboarding_completed_at: "preview",
        }
      : emptyProfile(user?.id ?? ""),
  );
  const [loading, setLoading] = useState(!preview);
  const [error, setError] = useState("");
  const [retry, setRetry] = useState(0);
  const latestProfile = useRef(profile);
  const identity = useRef({
    id: preview ? "preview" : user?.id,
    generation: 0,
  });
  const queue = useRef<Promise<void>>(Promise.resolve());
  const mounted = useRef(true);
  const currentId = preview ? "preview" : user?.id;
  if (identity.current.id !== currentId) {
    identity.current = {
      id: currentId,
      generation: identity.current.generation + 1,
    };
    queue.current = Promise.resolve();
  }
  useEffect(() => {
    mounted.current = true;
    return () => {
      mounted.current = false;
    };
  }, []);
  useEffect(() => {
    if (preview || !user) return;
    let active = true;
    setLoading(true);
    setError("");
    loadProfile(user.id)
      .then((data) => {
        if (active) {
          const loaded = data ?? {
            ...emptyProfile(user.id),
            first_name: String(user.user_metadata.first_name ?? ""),
            last_name: String(user.user_metadata.last_name ?? ""),
          };
          latestProfile.current = loaded;
          setProfile(loaded);
          setLoading(false);
        }
      })
      .catch(() => {
        if (active) {
          setError("Your profile could not be loaded. Please retry.");
          setLoading(false);
        }
      });
    return () => {
      active = false;
    };
  }, [preview, user?.id, retry]);
  if (!preview && authLoading)
    return (
      <p className="state-page" role="status">
        Checking your session…
      </p>
    );
  if (!preview && !user) return <Navigate to="/login" replace />;
  if (!preview && (loading || profile.user_id !== user?.id))
    return error ? (
      <div className="state-page">
        <p role="alert">{error}</p>
        <button onClick={() => setRetry((value) => value + 1)}>Retry</button>
      </div>
    ) : (
      <p className="state-page" role="status">
        Loading your home base…
      </p>
    );
  if (error)
    return (
      <div className="state-page">
        <p role="alert">{error}</p>
        <button onClick={() => setRetry((value) => value + 1)}>Retry</button>
      </div>
    );
  if (
    !preview &&
    !profile.onboarding_completed_at &&
    location.pathname !== "/onboarding"
  )
    return <Navigate to="/onboarding" replace />;
  function update(next: StudentProfile) {
    // Screens submit a snapshot. Only merge their changed fields into the latest saved row.
    const patch = Object.fromEntries(
      Object.entries(next).filter(
        ([key, value]) =>
          key !== "user_id" &&
          JSON.stringify(value) !==
            JSON.stringify(profile[key as keyof StudentProfile]),
      ),
    );
    const owner = identity.current;
    const request = queue.current
      .catch(() => {})
      .then(async () => {
        if (!mounted.current || identity.current !== owner) return;
        const merged = {
          ...latestProfile.current,
          ...patch,
          user_id: owner.id!,
        };
        validateProfile(merged);
        const saved = preview ? merged : await saveProfile(merged);
        if (!mounted.current || identity.current !== owner) return;
        latestProfile.current = saved;
        setProfile(saved);
      });
    queue.current = request;
    return request;
  }
  return (
    <Context.Provider value={{ profile, preview, update }}>
      {children}
    </Context.Provider>
  );
}
