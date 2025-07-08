// @ts-nocheck
/// <reference lib="dom" />

import { GMSButton } from "./GMSButton";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, mock } from "bun:test";

describe("GMSButton", () => {
  it("renders a button with the correct default type", () => {
    render(<GMSButton />);
    const button = screen.getByRole("button");
    expect(button).toHaveAttribute("type", "button");
  });

  it("renders label correctly", () => {
    render(<GMSButton label="Click Me" />);
    expect(screen.getByRole("button", { name: /click me/i })).toBeDefined();
  });

  it("handles onClick events", async () => {
    const user = userEvent.setup();
    const handleClick = mock(() => {});
    render(<GMSButton onClick={handleClick} label="Click Me" />);

    const button = screen.getByRole("button", { name: /click me/i });
    await user.click(button);

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("applies custom className", () => {
    render(<GMSButton className="custom-class" label="Click Me" />);
    const button = screen.getByRole("button", { name: /click me/i });
    expect(button.classList.contains("custom-class")).toBe(true);
  });

  it("is disabled when the disabled prop is true", async () => {
    const user = userEvent.setup();
    const handleClick = mock(() => {});
    render(
      <GMSButton disabled={true} onClick={handleClick} label="Click Me" />,
    );

    const button = screen.getByRole("button", { name: /click me/i });
    expect(button).toBeDisabled();

    await user.click(button);
    expect(handleClick).not.toHaveBeenCalled();
  });

  it("renders with a different button type", () => {
    render(<GMSButton type="submit" label="Submit" />);
    const button = screen.getByRole("button", { name: /submit/i });
    expect(button).toHaveAttribute("type", "submit");
  });
});
