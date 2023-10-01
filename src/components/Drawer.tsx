import { ReactNode, useEffect, useRef } from "react";

interface DrawerProps {
    position?: "left" | "right";
    children?: ReactNode;
    className?: string;
    animate?: boolean;
    onClose?:()=>void;
    size?: "small" | "medium" | "large"
}
const Drawer = ({
    position = "right",
    children,
    className,
    onClose,
    animate = true,
    size = "medium"
}: DrawerProps) => {
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
    return <aside className={`drawer ${size} ${position} ${className} ${animate?"animate":""}`}>
        <div ref={ref} className="drawer-content">
            {children}
        </div>
    </aside>
}
export default Drawer;