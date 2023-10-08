import { forwardRef, MouseEventHandler, ForwardRefExoticComponent } from "react";
import { ReactNode } from "react";
import Spinner from "./Spinner";
export type ButttonVariant = "solid" | "secondary" | "tab" | "link" | "square" | "circle" | "secondary-square" | "secondary-circle" | "gray" | "ghost";
export interface IButtonProps {
  children?: ReactNode;
  className?: string;
  type?: "button" | "submit" | "reset";
  loading?: boolean;
  icon?: ReactNode;
  disabled?: boolean;
  danger?: boolean;
  spinnerType?: "co" | "circle" | "dot";
  size?: "small" | "medium" | "large";
  variant?: ButttonVariant;
  onClick?: MouseEventHandler<HTMLButtonElement> | undefined;
  onMouseEnter?: MouseEventHandler<HTMLButtonElement>;
  onMouseLeave?: MouseEventHandler<HTMLButtonElement>;
  ariaLabel?: string;
  [key: string]: any;
}
const Button: ForwardRefExoticComponent<IButtonProps> = forwardRef<HTMLButtonElement, IButtonProps>(({
  type,
  className,
  loading,
  children,
  icon,
  disabled,
  spinnerType,
  variant,
  danger,
  size,
  ariaLabel,
  onClick,
  onMouseEnter,
  onMouseLeave,
  ...rest
}: IButtonProps, ref) => {
  return (
    <button
      ref={ref}
      type={type || "button"}
      className={`btn ${size ?? ""} ${variant ?? "solid"} ${danger ? "danger" : ""} ${className ?? ""}`}
      disabled={disabled}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      aria-label={ariaLabel}
      {...rest}
    >
      {loading ? (
        <Spinner type={spinnerType} size={size} />
      ) : (
        icon && variant !== "square" && variant !== "circle" ? <span className="icon">{icon}</span> : null
      )}
      {loading && (variant === "square" || variant === "circle") ? null : children}
    </button>
  );
});
export default Button;
