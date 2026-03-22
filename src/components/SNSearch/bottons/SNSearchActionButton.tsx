import type { ButtonHTMLAttributes, ReactNode } from "react";

type ButtonVariant =
  | "primary"
  | "secondary"
  | "success"
  | "danger"
  | "warning"
  | "info"
  | "light"
  | "dark"
  | "outline-primary"
  | "outline-secondary"
  | "outline-success"
  | "outline-danger"
  | "outline-warning"
  | "outline-info"
  | "outline-light"
  | "outline-dark";

type ButtonSize = "sm" | "lg";

type SNSearchActionButtonProps = {
  label: ReactNode;
  loadingLabel?: ReactNode;
  isLoading?: boolean;
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
} & Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children">;

export default function SNSearchActionButton({
  label,
  loadingLabel,
  isLoading = false,
  variant = "primary",
  size,
  className = "",
  disabled,
  ...buttonProps
}: SNSearchActionButtonProps) {
  const sizeClass = size ? `btn-${size}` : "";
  const classes = ["btn", `btn-${variant}`, sizeClass, className].filter(Boolean).join(" ");

  return (
    <button {...buttonProps} className={classes} disabled={disabled || isLoading}>
      {isLoading ? (loadingLabel ?? label) : label}
    </button>
  );
}
