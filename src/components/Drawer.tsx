import { ReactNode, useEffect, useRef } from "react";

export interface IDrawerProps {
  position?: "left" | "right";
  children?: ReactNode;
  id?: string,
  className?: string;
  animate?: boolean;
  onClose?: () => void;
  size?: "small" | "medium" | "large",
  [key: string]: any
}
const Drawer = ({
  position = "right",
  children,
  id,
  className,
  onClose,
  animate = true,
  size = "medium",
  ...rest
}: IDrawerProps) => {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        onClose?.();
      }
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);
  return <aside id={id} className={`drawer ${size} ${position} ${className} ${animate ? "animate" : ""}`} {...rest}>
    <div ref={ref} className="drawer-content">
      {children}
    </div>
  </aside>
}
export default Drawer;