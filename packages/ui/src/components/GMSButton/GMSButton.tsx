import type { IconInterface } from "../icons/icons";

export interface ButtonProps {
  label?: string;
  mode?: GMSButtonMode;
  size?: GMSButtonSize;
  onClick?: () => void;
  icon?: IconInterface;
  styles?: string;
}

type GMSButtonMode =
  | "primary"
  | "secondary"
  | "accent"
  | "neutral"
  | "info"
  | "success"
  | "warning"
  | "error";
type GMSButtonSize = "small" | "medium" | "large";

function getDaisyUISize(size: GMSButtonSize): string {
  switch (size) {
    case "small":
      return "btn-sm";
    case "medium":
      return "btn-md";
    case "large":
      return "btn-lg";
    default:
      return "btn-md"; // Default to medium if size is not recognized
  }
}

function getDaisyUIBtnStyle(mode: GMSButtonMode): string {
  switch (mode) {
    case "primary":
      return "btn-primary";
    case "secondary":
      return "btn-secondary";
    case "accent":
      return "btn-accent";
    case "neutral":
      return "btn-neutral";
    case "info":
      return "btn-info";
    case "success":
      return "btn-success";
    case "warning":
      return "btn-warning";
    case "error":
      return "btn-error";
    default:
      return "btn-neutral"; // Default to neutral if mode is not recognized
  }
}

/** Primary UI component for user interaction */
export const GMSButton = ({
  mode,
  size,
  label,
  icon,
  styles,
  ...props
}: ButtonProps) => {
  const btnMode = getDaisyUIBtnStyle(mode ?? "neutral");
  const btnSize = getDaisyUISize(size ?? "medium");
  return (
    <button
      type="button"
      className={["btn", btnSize, btnMode, styles].join(" ")}
      {...props}
    >
      {icon ? icon({ iconSize: size ?? "medium" }) : null}
      {label}
    </button>
  );
};
