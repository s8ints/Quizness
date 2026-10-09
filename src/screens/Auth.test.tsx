import { StrictMode } from "react";
import { render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { vi, test, expect } from "vitest";
import { AuthCallback, AuthScreen } from "./Auth";
import userEvent from "@testing-library/user-event";

const exchange = vi.hoisted(() => vi.fn(async () => ({ error: null })));
const recovery = vi.hoisted(() => ({
  user: null as null | { id: string },
  update: vi.fn(),
}));
vi.mock("../auth/client", () => ({
  supabase: {
    auth: { exchangeCodeForSession: exchange, updateUser: recovery.update },
  },
}));
vi.mock("../auth/AuthProvider", () => ({
  useAuth: () => ({ user: recovery.user, loading: false }),
}));

test("confirmation exchanges a single-use code once under StrictMode", async () => {
  window.history.replaceState({}, "", "/auth/callback?code=single-use");
  render(
    <StrictMode>
      <MemoryRouter>
        <AuthCallback />
      </MemoryRouter>
    </StrictMode>,
  );
  await screen.findByRole("heading", { name: "Confirm your account." });
  await waitFor(() => expect(exchange).toHaveBeenCalledTimes(1));
  expect(exchange).toHaveBeenCalledWith("single-use");
  expect(window.location.search).toBe("");
});

test("password update failure keeps the form available for retry", async () => {
  window.history.replaceState({}, "", "/auth/reset");
  recovery.user = { id: "student" };
  recovery.update.mockResolvedValue({ error: new Error("network failed") });
  render(
    <MemoryRouter>
      <AuthCallback reset />
    </MemoryRouter>,
  );
  const field = await screen.findByLabelText("New password");
  expect(field).toHaveAccessibleDescription("At least 8 characters.");
  await userEvent.type(field, "new-password");
  await userEvent.click(
    screen.getByRole("button", { name: "Update password" }),
  );
  expect(await screen.findByRole("alert")).toHaveTextContent(
    "Password could not be updated",
  );
  expect(screen.getByLabelText("New password")).toBeInTheDocument();
  expect(screen.getByRole("button", { name: "Update password" })).toBeEnabled();
  recovery.user = null;
});

test("signup explains the password rule to assistive technology", async () => {
  render(
    <MemoryRouter>
      <AuthScreen signup />
    </MemoryRouter>,
  );
  expect(await screen.findByLabelText("Password")).toHaveAccessibleDescription(
    "At least 8 characters.",
  );
});

test("signup treats last name as optional, like the profile", async () => {
  render(
    <MemoryRouter>
      <AuthScreen signup />
    </MemoryRouter>,
  );
  expect(await screen.findByLabelText("Last name")).not.toBeRequired();
  expect(screen.getByLabelText("First name")).toBeRequired();
});
