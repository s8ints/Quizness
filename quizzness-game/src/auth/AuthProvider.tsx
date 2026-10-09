import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import type { User } from "@supabase/supabase-js";
import { supabase } from "./client";
type Auth = {
  user: User | null;
  loading: boolean;
  error: string;
  logout: () => Promise<void>;
};
const Context = createContext<Auth>({
  user: null,
  loading: false,
  error: "",
  logout: async () => {},
});
export const useAuth = () => useContext(Context);
export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(!!supabase);
  const [error, setError] = useState("");
  useEffect(() => {
    if (!supabase) return;
    let active = true;
    let changed = false;
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      changed = true;
      if (active) {
        setUser(session?.user ?? null);
        setLoading(false);
      }
    });
    supabase.auth
      .getSession()
      .then(({ data, error: failure }) => {
        if (active && !changed) {
          setUser(data.session?.user ?? null);
          setError(failure?.message ?? "");
          setLoading(false);
        }
      })
      .catch(() => {
        if (active) {
          setError("We could not check your session. Please try again.");
          setLoading(false);
        }
      });
    return () => {
      active = false;
      subscription.unsubscribe();
    };
  }, []);
  async function logout() {
    if (supabase) {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
    }
    setUser(null);
  }
  return (
    <Context.Provider value={{ user, loading, error, logout }}>
      {children}
    </Context.Provider>
  );
}
