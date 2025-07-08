// @ts-nocheck
import { renderHook, act } from "@testing-library/react";
import { describe, expect, it, mock } from "bun:test";
import { useModal } from "./useModal";

describe("useModal", () => {
  it("should initialize with isOpen as false", () => {
    const { result } = renderHook(() => useModal({}));
    expect(result.current.isOpen).toBe(false);
  });

  it("should set isOpen to true when openModal is called", () => {
    const { result } = renderHook(() => useModal({}));
    act(() => {
      result.current.openModal();
    });
    expect(result.current.isOpen).toBe(true);
  });

  it("should set isOpen to false when closeModal is called", () => {
    const { result } = renderHook(() => useModal({}));
    act(() => {
      result.current.openModal();
    });
    expect(result.current.isOpen).toBe(true);
    act(() => {
      result.current.closeModal();
    });
    expect(result.current.isOpen).toBe(false);
  });

  it("should call onConfirm and close the modal on handleConfirm", () => {
    const mockOnConfirm = mock(() => {});
    const { result } = renderHook(() => useModal({ onConfirm: mockOnConfirm }));

    act(() => {
      result.current.openModal();
    });

    act(() => {
      result.current.handleConfirm();
    });

    expect(mockOnConfirm).toHaveBeenCalledTimes(1);
    expect(result.current.isOpen).toBe(false);
  });

  it("should call onCancel and close the modal on handleCancel", () => {
    const mockOnCancel = mock(() => {});
    const { result } = renderHook(() => useModal({ onCancel: mockOnCancel }));

    act(() => {
      result.current.openModal();
    });

    act(() => {
      result.current.handleCancel();
    });

    expect(mockOnCancel).toHaveBeenCalledTimes(1);
    expect(result.current.isOpen).toBe(false);
  });

  it("should close the modal on handleConfirm even if onConfirm is not provided", () => {
    const { result } = renderHook(() => useModal({}));

    act(() => {
      result.current.openModal();
    });

    act(() => {
      result.current.handleConfirm();
    });

    expect(result.current.isOpen).toBe(false);
  });

  it("should close the modal on handleCancel even if onCancel is not provided", () => {
    const { result } = renderHook(() => useModal({}));

    act(() => {
      result.current.openModal();
    });

    act(() => {
      result.current.handleCancel();
    });

    expect(result.current.isOpen).toBe(false);
  });
});
