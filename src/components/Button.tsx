import {
  forwardRef,
  MouseEventHandler,
  ForwardRefExoticComponent,
} from 'react';
import { ReactNode } from 'react';
import Spinner, { SpinnerType } from './Spinner';
import { mergeClass } from '../helpers/strings';
export type ButttonVariant =
  | 'solid'
  | 'secondary'
  | 'tab'
  | 'link'
  | 'square'
  | 'circle'
  | 'secondary-square'
  | 'secondary-circle'
  | 'gray'
  | 'ghost'
  | 'link-gray';
export interface IButtonProps {
  children?: ReactNode;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
  loading?: boolean;
  icon?: ReactNode;
  disabled?: boolean;
  danger?: boolean;
  spinnerType?: SpinnerType;
  size?: 'small' | 'medium' | 'large';
  mobilSize?: 'small' | 'medium' | 'large';
  variant?: ButttonVariant;
  mobileVariant?: ButttonVariant;
  onClick?: MouseEventHandler<HTMLButtonElement> | undefined;
  onMouseEnter?: MouseEventHandler<HTMLButtonElement>;
  onMouseLeave?: MouseEventHandler<HTMLButtonElement>;
  ariaLabel?: string;
  [key: string]: any;
}
const Button: ForwardRefExoticComponent<IButtonProps> = forwardRef<
  HTMLButtonElement,
  IButtonProps
>(
  (
    {
      type,
      className,
      loading,
      children,
      icon,
      disabled,
      spinnerType,
      variant,
      mobileVariant,
      danger,
      size,
      mobilSize,
      ariaLabel,
      onClick,
      onMouseEnter,
      onMouseLeave,
      ...rest
    }: IButtonProps,
    ref
  ) => {
    return (
      <button
        ref={ref}
        type={type || 'button'}
        className={mergeClass(
          'btn',
          size,
          [!!mobilSize, `mobile-${mobilSize}`],
          `${mobileVariant ? 'desktop-' : ''}${variant ?? 'solid'}`,
          [!!mobileVariant, `mobile-${mobileVariant}`],
          [!!danger, 'danger'],
          className
        )}
        disabled={disabled}
        onClick={onClick}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        aria-label={ariaLabel}
        {...rest}
      >
        {loading ? (
          <Spinner type={spinnerType} size={size} />
        ) : icon && variant !== 'square' && variant !== 'circle' ? (
          <span className="icon">{icon}</span>
        ) : null}
        {loading && (variant === 'square' || variant === 'circle')
          ? null
          : children}
      </button>
    );
  }
);
export default Button;
