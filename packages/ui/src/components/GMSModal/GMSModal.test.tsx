// @ts-nocheck
/// <reference lib="dom" />

import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, mock } from "bun:test";
import { GMSModal } from "./GMSModal";

describe("GMSModal", () => {
  const mockConfirmCallback = mock(() => {});
  const mockCancelCallback = mock(() => {});

  const defaultProps = {
    id: "test-modal",
    isOpen: true,
    modalSize: "medium" as const,
    confirmBtnConfig: {
      confirmCallback: mockConfirmCallback,
      confirmLabel: "Confirm",
    },
    cancelBtnConfig: {
      cancelCallback: mockCancelCallback,
      cancelLabel: "Cancel",
    },
  };

  it("does not render when isOpen is false", () => {
    render(
      <GMSModal {...defaultProps} isOpen={false}>
        <p>Modal Content</p>
      </GMSModal>,
    );
    expect(screen.queryByRole("dialog")).toBeNull();
  });

  it("renders correctly when isOpen is true", () => {
    render(
      <GMSModal {...defaultProps}>
        <p>Modal Content</p>
      </GMSModal>,
    );
    expect(screen.getByRole("dialog")).toBeInTheDocument();
    expect(screen.getByText("Modal Content")).toBeInTheDocument();
  });

  it("renders confirm and cancel buttons with correct labels", () => {
    render(
      <GMSModal {...defaultProps}>
        <p>Modal Content</p>
      </GMSModal>,
    );
    expect(
      screen.getByRole("button", { name: /confirm/i }),
    ).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /cancel/i })).toBeInTheDocument();
  });

  it("handles confirm button click", async () => {
    const user = userEvent.setup();
    render(
      <GMSModal {...defaultProps}>
        <p>Modal Content</p>
      </GMSModal>,
    );
    const confirmButton = screen.getByRole("button", { name: /confirm/i });
    await user.click(confirmButton);
    expect(mockConfirmCallback).toHaveBeenCalledTimes(1);
  });

  it("handles cancel button click", async () => {
    const user = userEvent.setup();
    render(
      <GMSModal {...defaultProps}>
        <p>Modal Content</p>
      </GMSModal>,
    );
    const cancelButton = screen.getByRole("button", { name: /cancel/i });
    await user.click(cancelButton);
    expect(mockCancelCallback).toHaveBeenCalledTimes(1);
  });

  it("disables buttons when isDisabled is true", () => {
    render(
      <GMSModal
        {...defaultProps}
        confirmBtnConfig={{
          ...defaultProps.confirmBtnConfig,
          isDisabled: true,
        }}
        cancelBtnConfig={{ ...defaultProps.cancelBtnConfig, isDisabled: true }}
      >
        <p>Modal Content</p>
      </GMSModal>,
    );
    expect(screen.getByRole("button", { name: /confirm/i })).toBeDisabled();
    expect(screen.getByRole("button", { name: /cancel/i })).toBeDisabled();
  });

  it("applies the correct size class", () => {
    const { container } = render(
      <GMSModal {...defaultProps} modalSize="large">
        <p>Modal Content</p>
      </GMSModal>,
    );
    const modalBox = container.querySelector(".modal-box");
    expect(modalBox).toHaveClass("max-w-xl");
  });

  it("calls cancel callback on Escape key press", async () => {
    const user = userEvent.setup();
    render(
      <GMSModal {...defaultProps}>
        <p>Modal Content</p>
      </GMSModal>,
    );
    await user.keyboard("{Escape}");
    expect(mockCancelCallback).toHaveBeenCalled();
  });
});
