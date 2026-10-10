import { act, render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { vi, test, expect, beforeEach } from "vitest";
import { StudentProvider, useStudent } from "./StudentProvider";
import { emptyProfile, type StudentProfile } from "../types/student";

const mocks = vi.hoisted(() => ({
  user: { id: "A", user_metadata: {} },
  load: vi.fn(),
  save: vi.fn(),
}));
vi.mock("../auth/AuthProvider", () => ({
  useAuth: () => ({ user: mocks.user, loading: false }),
}));
vi.mock("../services/profile", () => ({
  loadProfile: mocks.load,
  saveProfile: mocks.save,
  validateProfile: vi.fn(),
}));
let student: ReturnType<typeof useStudent>;
function Probe() {
  student = useStudent();
  return <p>{student.profile.first_name}</p>;
}
function Host() {
  return (
    <MemoryRouter>
      <StudentProvider preview={false}>
        <Probe />
      </StudentProvider>
    </MemoryRouter>
  );
}
function deferred<T>() {
  let resolve!: (value: T) => void;
  const promise = new Promise<T>((r) => {
    resolve = r;
  });
  return { promise, resolve };
}
beforeEach(() => {
  mocks.user = { id: "A", user_metadata: {} };
  mocks.load.mockImplementation(async (id: string) => ({
    ...emptyProfile(id),
    first_name: id,
    onboarding_completed_at: "done",
  }));
  mocks.save.mockReset();
});
test("an old account save cannot replace the new account profile", async () => {
  const pending = deferred<StudentProfile>();
  mocks.save.mockReturnValue(pending.promise);
  const view = render(<Host />);
  await screen.findByText("A");
  let request!: Promise<void>;
  act(() => {
    request = student.update({ ...student.profile, first_name: "Edited A" });
  });
  await waitFor(() => expect(mocks.save).toHaveBeenCalled());
  mocks.user = { id: "B", user_metadata: {} };
  view.rerender(<Host />);
  await screen.findByText("B");
  await act(async () => {
    pending.resolve({
      ...emptyProfile("A"),
      first_name: "Edited A",
      onboarding_completed_at: "done",
    });
    await request;
  });
  expect(screen.getByText("B")).toBeInTheDocument();
});
test("overlapping profile and course saves preserve both accepted changes", async () => {
  const pending = deferred<StudentProfile>();
  mocks.save
    .mockImplementationOnce(() => pending.promise)
    .mockImplementation(async (next: StudentProfile) => next);
  render(<Host />);
  await screen.findByText("A");
  const initial = student.profile;
  let first!: Promise<void>;
  let second!: Promise<void>;
  act(() => {
    first = student.update({ ...initial, first_name: "New name" });
    second = student.update({ ...initial, selected_courses: ["qz-bio-101"] });
  });
  await waitFor(() => expect(mocks.save).toHaveBeenCalled());
  await act(async () => {
    pending.resolve({ ...initial, first_name: "New name" });
    await Promise.all([first, second]);
  });
  expect(student.profile.first_name).toBe("New name");
  expect(student.profile.selected_courses).toEqual(["qz-bio-101"]);
});

test("failed saves retain the prior profile and a subsequent retry can succeed", async () => {
  mocks.save
    .mockRejectedValueOnce(new Error("offline"))
    .mockImplementation(async (next: StudentProfile) => next);
  render(<Host />);
  await screen.findByText("A");
  await act(async () => {
    await expect(
      student.update({ ...student.profile, first_name: "Retry" }),
    ).rejects.toThrow("offline");
  });
  expect(screen.getByText("A")).toBeInTheDocument();
  await act(async () => {
    await student.update({ ...student.profile, first_name: "Retry" });
  });
  expect(screen.getByText("Retry")).toBeInTheDocument();
});

test("an incomplete real profile redirects to onboarding", async () => {
  mocks.load.mockResolvedValue({ ...emptyProfile("A"), first_name: "A" });
  render(
    <MemoryRouter initialEntries={["/dashboard"]}>
      <Routes>
        <Route
          path="/dashboard"
          element={
            <StudentProvider preview={false}>
              <Probe />
            </StudentProvider>
          }
        />
        <Route path="/onboarding" element={<h1>Onboarding required</h1>} />
      </Routes>
    </MemoryRouter>,
  );
  expect(
    await screen.findByRole("heading", { name: "Onboarding required" }),
  ).toBeInTheDocument();
});
