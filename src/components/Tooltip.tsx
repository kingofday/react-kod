import { CSSProperties, ReactNode, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

export interface ITooltip {
  delay?: number;
  children?: ReactNode;
  title?: ReactNode;
  direction?: "top" | "bottom";
  className?: string;
  style?: CSSProperties;
  wrapperClassName?: string;
  wrapperStyle?: CSSProperties;
  rtl?: boolean;
  fontSize?: number;
}

const Tooltip = ({
  delay,
  children,
  title,
  wrapperClassName,
  className,
  fontSize,
  style,
  wrapperStyle,
  direction = "top",
}: ITooltip) => {
  const ref = useRef<HTMLDivElement>(null);
  const tipRef = useRef<HTMLDivElement>(null);
  const [isActive, setActive] = useState<boolean>(false);
  const [loaded, toggleLoading] = useState<boolean>(false);
  const [position, setPosition] = useState<{
    top: number | string;
    left: number | string;
    right: number | string;
  }>({
    top: "auto",
    left: "auto",
    right: "auto",
  });
  const [trianglePosition, setTrianglePosition] = useState<{
    top: number | string;
    left: number | string;
  }>({
    top: "auto",
    left: "auto",
  });

  let timeout: number;

  const showTip = (): void => {
    if (!children || !title) return;
    if (!delay) setActive(true);
    else
      timeout = window.setTimeout(() => {
        setActive(true);
      }, delay);
  };

  const hideTip = (): void => {
    clearInterval(timeout);
    setActive(false);
  };

  useEffect(() => {
    if (!loaded) {
      toggleLoading(true);
      return;
    }
    if (!isActive || !ref.current || !tipRef.current) return;

    const rect = ref.current.getBoundingClientRect();
    const tipRect = tipRef.current.getBoundingClientRect();

    let left: number | string = rect.x + rect.width / 2 - tipRect.width / 2;
    let right: number | string = "auto";
    let top: number | string =
      direction === "top"
        ? rect.top - tipRect.height - 10
        : rect.top + rect.height + 10;

    if (rect.left <= 50) {
      left = rect.x;
    } else if (rect.x + tipRect.width > window.innerWidth) {
      left = rect.x - rect.width / 2 - tipRect.width / 2;
    }

    setPosition((prev) => {
      if (
        prev.top === top &&
        prev.left === left &&
        prev.right === right
      ) {
        return prev;
      }
      return { top, left, right };
    });

    const newTrianglePosition = {
      left: rect.x + rect.width / 2,
      top: direction === "top" ? rect.top - 11 : rect.top + rect.height + 4,
    };

    setTrianglePosition((prev) => {
      if (prev.top === newTrianglePosition.top && prev.left === newTrianglePosition.left) {
        return prev;
      }
      return newTrianglePosition;
    });
  }, [loaded, isActive, direction]);

  return (
    <div
      ref={ref}
      className={`tooltip-wrapper ${wrapperClassName ?? ""}`}
      style={wrapperStyle}
      onMouseEnter={showTip}
      onMouseLeave={hideTip}
    >
      {children}
      {isActive &&
        loaded &&
        createPortal(
          <div
            ref={tipRef}
            style={{
              left: position.left,
              top: position.top,
              right: position.right,
              fontSize: `${fontSize}px`,
              ...(style || {}),
            }}
            className={`tooltip-tip${className ? ` ${className}` : ""}`}
          >
            {title}
            <span
              style={trianglePosition}
              className={`triangle ${direction}`}
            ></span>
          </div>,
          document.body
        )}
    </div>
  );
};

export default Tooltip;