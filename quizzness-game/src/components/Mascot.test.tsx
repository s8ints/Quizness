import { render, screen, cleanup } from "@testing-library/react";
import { expect, test } from "vitest";
import { Mascot, mascotStates } from "./Mascot";
import { avatars, Avatar } from "./Avatar";
test("all mascot states preserve the supplied artwork and provide guidance", () => {
  for (const state of Object.keys(
    mascotStates,
  ) as (keyof typeof mascotStates)[]) {
    render(<Mascot state={state} />);
    expect(screen.getByRole("img")).toHaveAttribute(
      "src",
      "/brand/panthy-pixel.svg",
    );
    expect(screen.getByText(mascotStates[state])).toBeInTheDocument();
    cleanup();
  }
});
test("all six original characters have accessible, distinct sheet views", () => {
  expect(avatars).toHaveLength(6);
  expect(new Set(avatars.map((avatar) => avatar.position)).size).toBe(6);
  render(<Avatar id="glasses" large />);
  expect(
    screen.getByRole("img", { name: "Glasses, Quizzness student character" }),
  ).toHaveStyle({ backgroundPosition: "100% 100%" });
});
