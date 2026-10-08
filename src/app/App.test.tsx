import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, it, expect } from "vitest";
import { App } from "./App";
function open(path: string) {
  render(
    <MemoryRouter initialEntries={[path]}>
      <App />
    </MemoryRouter>,
  );
}
describe("student foundation routes", () => {
  it("focuses the page heading after navigation", async () => {
    open("/preview/courses");
    expect(
      await screen.findByRole("heading", { name: "Follow your curiosity." }),
    ).toHaveFocus();
    expect(document.title).toBe("Follow your curiosity. · Quizzness");
  });
  it("labels the preview and includes non-programming courses", async () => {
    open("/preview");
    expect(
      await screen.findByText(/sample data · edits reset/i),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "Mathematics" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "Biology" }),
    ).toBeInTheDocument();
  });
  it("recovers from an unknown course", async () => {
    open("/preview/courses/missing");
    expect(
      await screen.findByRole("heading", { name: "World not found" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: "Back to courses" }),
    ).toHaveAttribute("href", "/preview/courses");
  });
  it("does not pretend an unconfigured login is authentication", async () => {
    open("/login");
    expect(
      await screen.findByText(/accounts are not connected yet/i),
    ).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Log in" })).toBeDisabled();
  });
  it("protects the real dashboard", async () => {
    open("/dashboard");
    expect(
      await screen.findByRole("heading", { name: "Welcome back." }),
    ).toBeInTheDocument();
  });
});
