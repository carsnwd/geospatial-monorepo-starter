import type { IconInterface } from "../icons/icons";

export interface ButtonProps {
  label?: string;
  color?: GMSButtonColor;
  size?: GMSButtonSize;
  style?: GMSButtonStyle;
  onClick?: () => void;
  icon?: IconInterface;
  cssStyles?: string;
  disabled?: boolean;
}

type GMSButtonColor =
  | "primary"
  | "secondary"
  | "accent"
  | "neutral"
  | "info"
  | "success"
  | "warning"
  | "error";
type GMSButtonSize = "small" | "medium" | "large";
type GMSButtonStyle = "solid" | "soft" | "outline" | "dash" | "ghost" | "link";

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

function getDaisyUIBtnColor(color: GMSButtonColor): string {
  switch (color) {
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

function getDaisyUIBtnStyle(style: GMSButtonStyle): string {
  switch (style) {
    case "solid":
      return "btn-solid";
    case "soft":
      return "btn-soft";
    case "outline":
      return "btn-outline";
    case "dash":
      return "btn-dash";
    case "ghost":
      return "btn-ghost";
    case "link":
      return "btn-link";
    default:
      return "btn-solid"; // Default to solid if style is not recognized
  }
}

/** Primary UI component for user interaction */
export const GMSButton = ({
  color: mode,
  size,
  label,
  icon,
  style,
  cssStyles,
  disabled = false,
  ...props
}: ButtonProps) => {
  const btnMode = getDaisyUIBtnColor(mode ?? "neutral");
  const btnSize = getDaisyUISize(size ?? "medium");
  const btnStyle = getDaisyUIBtnStyle(style ?? "solid");
  const btnDisabled = disabled ? "btn-disabled" : "";
  return (
    <button
      type="button"
      className={[
        "btn",
        btnSize,
        btnMode,
        btnDisabled,
        btnStyle,
        cssStyles,
      ].join(" ")}
      {...props}
    >
      {icon ? icon({ iconSize: size ?? "medium" }) : null}
      {label}
    </button>
  );
};
