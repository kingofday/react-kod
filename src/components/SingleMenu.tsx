import { CSSProperties, ElementType, ReactNode, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Button from "./Button";
import useOnClickOutside from "../helpers/useOnClickOutside";
export type TSingleMenuItem = {
  key: string;
  className?:string;
  label: ReactNode;
  icon?: ReactNode;
  disabled?: boolean;
  color?: string;
  as?: ElementType;
  [key: string]: any;
};
export type Pos = "auto" | number;

export type TSingleMenuProps = {
  anchor?: ReactNode;
  openOnClick?: boolean;
  isOpen?: boolean;
  items: TSingleMenuItem[];
  popupTargetId?: string;
  ariaLabel?: string;
  onClick?: ((key: string) => void) | undefined;
  [key: string]: any;
};

const SingleMenu = ({
  items,
  icon,
  isOpen,
  popupTargetId,
  ariaLabel,
  anchor,
  openOnClick = false,
  onClick,
  ...rest
}: TSingleMenuProps) => {
  const [statusOpen, togglePopUp] = useState(isOpen);
  const [popupStyle, setPopupStyle] = useState<CSSProperties | undefined>(
    undefined
  );
  const popupRef = useRef<HTMLUListElement | null>(null);
  const ref = useRef<HTMLDivElement>(null);
  const popupTarget = useRef<HTMLElement | null>(null);

  const handleCollapse = () => {
    togglePopUp((isOpen) => !isOpen);
  };
  const handleSelect = (k: string) => {
    onClick?.(k);
  };

  const adjustPosition = () => {
    const inputRect = ref.current?.getBoundingClientRect();
    const popupRect = popupRef.current?.getBoundingClientRect();
    const parentRect = popupTarget.current?.getBoundingClientRect();
    if (!popupRect || !inputRect) return;
    const h = window.innerHeight;
    let left: Pos = "auto";
    let top: Pos = "auto";
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const scrollLeft = window.scrollX || document.documentElement.scrollLeft;
    const inputOffsetTop = ref.current?.offsetTop ?? 0;
    const inputOffsetLeft = ref.current?.offsetLeft ?? 0;
    const offsetHeight =
      popupTargetId && popupTarget.current
        ? popupTarget.current.offsetHeight - popupTarget.current.clientHeight
        : 0;
    const offsetWidth =
      popupTargetId && popupTarget.current
        ? popupTarget.current.offsetWidth - popupTarget.current.clientWidth
        : 0;

    if (inputRect.top + popupRect.height > h) {
      top =
        (popupTargetId && parentRect
          ? inputOffsetTop
          : inputRect.top + scrollTop) -
        popupRect.height -
        offsetHeight;
    } else {
      top =
        (popupTargetId && parentRect
          ? inputOffsetTop
          : inputRect.top + scrollTop) +
        inputRect.height -
        offsetHeight;
    }
    left =
      (popupTargetId && parentRect
        ? inputOffsetLeft
        : inputRect.left + scrollLeft) - offsetWidth;
    setPopupStyle({ top, left, right: "auto" });
  };

  useOnClickOutside([ref, popupRef], () => openOnClick && togglePopUp(false));
  useEffect(() => {
    popupTarget.current = popupTargetId
      ? document.getElementById(popupTargetId)
      : document.body;
  }, [popupTargetId]);

  useEffect(() => {
    if (statusOpen) {
      adjustPosition();
    }
  }, [statusOpen]);

  return (
    <div
      ref={ref}
      className="single-menu"
      onMouseEnter={openOnClick ? undefined : handleCollapse}
      onMouseLeave={openOnClick ? undefined : handleCollapse}
      {...rest}
    >
      <Button
        className="single-menu-icon"
        variant="circle"
        onClick={openOnClick ? handleCollapse : undefined}
        ariaLabel={ariaLabel}
      >
        {anchor}
      </Button>
      {statusOpen && createPortal(
          <ul
            ref={popupRef}
            className={`wrapper-items ${
              statusOpen ? "" : "wrapper-items-none"
            }`}
            style={popupStyle}
          >
            {items.map(({
              key,
              className,
              label,
              color,
              disabled,
              as,
              icon,
              ...rest
            }) => {
              const Link = as;
              return (
                <li
                  style={{ "--customColor": color } as any}
                  onClick={() => {
                    if (disabled) return;
                    handleSelect(key);
                    togglePopUp(false);
                  }}
                  key={key}
                  className={`item ${color ? "item-custom-color" : ""} ${
                    disabled ? "disabled" : ""
                  }`}
                >
                  {Link ? (
                    <Link className={`item-content ${className??""}`} {...rest}>
                      {icon}
                      {label}
                    </Link>
                  ) : (
                    <div className="item-content" {...rest}>
                      {icon}
                      {label}
                    </div>
                  )}
                </li>
              );
            })}
          </ul>,
          popupTarget.current ?? document.body
        )}
    </div>
  );
};

export default SingleMenu;
