// @ts-nocheck
/// <reference lib="dom" />

import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, mock } from "bun:test";
import { GMSSearchBar } from "./GMSSearchBar";

describe("GMSSearchBar", () => {
  it("renders the search input with a placeholder", () => {
    const placeholderText = "Search here...";
    render(<GMSSearchBar placeholder={placeholderText} />);
    const searchInput = screen.getByPlaceholderText(placeholderText);
    expect(searchInput).toBeInTheDocument();
  });

  it("uses the placeholder as an aria-label for accessibility", () => {
    const placeholderText = "Search for places";
    render(<GMSSearchBar placeholder={placeholderText} />);
    const searchInput = screen.getByLabelText(placeholderText);
    expect(searchInput).toBeInTheDocument();
  });

  it("calls the onChange handler when text is entered", async () => {
    const user = userEvent.setup();
    const mockOnChange = mock(() => {});
    render(<GMSSearchBar onChange={mockOnChange} placeholder="Search..." />);

    const searchInput = screen.getByPlaceholderText("Search...");
    await user.type(searchInput, "hello world");

    expect(mockOnChange).toHaveBeenCalledTimes("hello world".length);
  });

  it("renders correctly without any props", () => {
    render(<GMSSearchBar />);
    const searchInput = screen.getByRole("searchbox");
    expect(searchInput).toBeInTheDocument();
    expect(searchInput).not.toHaveAttribute("placeholder");
  });
});
