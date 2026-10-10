import { act, render, screen } from "@testing-library/react";
import { beforeEach, expect, test, vi } from "vitest";
import { AuthProvider, useAuth } from "./AuthProvider";

const mocks = vi.hoisted(() => ({
  getSession: vi.fn(),
  signOut: vi.fn(),
  unsubscribe: vi.fn(),
  listener: null as null | ((event: string, session: unknown) => void),
}));
vi.mock("./client", () => ({
  supabase: {
    auth: {
      getSession: mocks.getSession,
      signOut: mocks.signOut,
      onAuthStateChange: (listener: typeof mocks.listener) => {
        mocks.listener = listener;
        return { data: { subscription: { unsubscribe: mocks.unsubscribe } } };
      },
    },
  },
}));
let auth: ReturnType<typeof useAuth>;
function Probe() {
  auth = useAuth();
  return <p>{auth.loading ? "checking" : (auth.user?.id ?? "signed out")}</p>;
}
beforeEach(() => {
  mocks.getSession.mockReset();
  mocks.signOut.mockResolvedValue({ error: null });
});
test("a stale initial session cannot overwrite a newer sign-in event", async () => {
  let finish!: (result: unknown) => void;
  mocks.getSession.mockReturnValue(
    new Promise((resolve) => {
      finish = resolve;
    }),
  );
  render(
    <AuthProvider>
      <Probe />
    </AuthProvider>,
  );
  act(() => mocks.listener!("SIGNED_IN", { user: { id: "new-user" } }));
  await act(async () => finish({ data: { session: null }, error: null }));
  expect(screen.getByText("new-user")).toBeInTheDocument();
});
test("logout calls the provider and clears the student session", async () => {
  mocks.getSession.mockResolvedValue({
    data: { session: { user: { id: "student" } } },
    error: null,
  });
  render(
    <AuthProvider>
      <Probe />
    </AuthProvider>,
  );
  await screen.findByText("student");
  await act(async () => {
    await auth.logout();
  });
  expect(mocks.signOut).toHaveBeenCalled();
  expect(screen.getByText("signed out")).toBeInTheDocument();
});
test("failed logout preserves the account until a provider signs it out", async () => {
  mocks.getSession.mockResolvedValue({
    data: { session: { user: { id: "student" } } },
    error: null,
  });
  mocks.signOut.mockResolvedValue({ error: new Error("offline") });
  render(
    <AuthProvider>
      <Probe />
    </AuthProvider>,
  );
  await screen.findByText("student");
  await act(async () => {
    await expect(auth.logout()).rejects.toThrow("offline");
  });
  expect(screen.getByText("student")).toBeInTheDocument();
  act(() => mocks.listener!("SIGNED_OUT", null));
  expect(screen.getByText("signed out")).toBeInTheDocument();
});
