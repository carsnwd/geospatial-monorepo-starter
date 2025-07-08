// @ts-nocheck
/// <reference lib="dom" />

import { renderHook } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, mock } from "bun:test";
import { useCloseOnEscape } from "./useCloseOnEscape";

describe("useCloseOnEscape", () => {
  it("should call the callback function when the Escape key is pressed", async () => {
    const user = userEvent.setup();
    const mockCloseModal = mock(() => {});
    renderHook(() => useCloseOnEscape(mockCloseModal));

    await user.keyboard("{Escape}");

    expect(mockCloseModal).toHaveBeenCalledTimes(1);
  });

  it("should not call the callback function when a key other than Escape is pressed", async () => {
    const user = userEvent.setup();
    const mockCloseModal = mock(() => {});
    renderHook(() => useCloseOnEscape(mockCloseModal));

    await user.keyboard("a");

    expect(mockCloseModal).not.toHaveBeenCalled();
  });

  it("should remove the event listener on unmount", async () => {
    const user = userEvent.setup();
    const mockCloseModal = mock(() => {});
    const { unmount } = renderHook(() => useCloseOnEscape(mockCloseModal));

    unmount();

    await user.keyboard("{Escape}");

    expect(mockCloseModal).not.toHaveBeenCalled();
  });
});
