import { ReactNode, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
export interface ITooltip {
    delay?: number;
    children?: ReactNode;
    title?: ReactNode;
    direction?: "top" | "bottom";
    className?: string;
    rtl?: boolean;
    fontSize?: number;
}
const Tooltip = ({ delay, children, title, className, fontSize, direction = "top" }: ITooltip) => {
    const ref = useRef<HTMLDivElement>(null);
    const tipRef = useRef<HTMLDivElement>(null);
    const [isActive, setActive] = useState<boolean>(false);
    const [loaded, toggleLoading] = useState<boolean>(false);
    const [position, setPosition] = useState<{
        top: number | string,
        left: number | string,
        right: number | string,
    }>({
        top: "auto",
        left: "auto",
        right: "auto"
    });
    const [trianglePosition, setTrianglePosition] = useState<{
        top: number | string,
        left: number | string,
    }>({
        top: "auto",
        left: "auto",
    });
    let timeout: number;
    const showTip = (): void => {
        if (!delay)
            setActive(true);
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
        if (!isActive) return
        if (ref.current && tipRef.current) {
            let rect = ref.current?.getBoundingClientRect();
            let tipRect = tipRef.current?.getBoundingClientRect();
            let left: number | string = rect.x + (rect.width / 2) - (tipRect.width / 2);
            let right: number | string = "auto";
            if (left + tipRect.width > window.innerWidth) {
                left = "auto";
                right = 0
            }
            let top: string | number = direction === "top" ? rect.top - tipRect.height - 10 :
                rect.top + rect.height + 10;
            setPosition({
                left: left,
                right: right,
                top: top,
            });
            setTrianglePosition({
                left: rect.x + rect.width / 2,
                top: direction === "top" ? rect.top - 11 : rect.top + rect.height + 4,
            })
        }
    }, [loaded, isActive])
    return (
        <div
            ref={ref}
            className={`tooltip-wrapper ${className ?? ""}`}
            onMouseEnter={showTip}
            onMouseLeave={hideTip}
        >
            {children}
            {isActive && loaded && createPortal(
                <div
                    ref={tipRef}
                    style={{
                        left: position.left,
                        top: position.top,
                        right: position.right,
                        fontSize: `${fontSize}px`
                    }}
                    className="tooltip-tip"
                >
                    {title}
                    <span style={trianglePosition} className={`triangle ${direction}`}></span>
                </div>
                , document.body)}
        </div>
    );
}

export default Tooltip;