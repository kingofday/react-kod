import { ReactNode, useState, MouseEvent } from "react";
interface Props {
    className?: string;
    children: ReactNode;
    icon?: ReactNode;
    closable?: boolean;
    hoverable?: boolean;
    state?: "active" | "disabled";
    onClick?: (e: MouseEvent) => void;
    onClose?: () => void;
    [key: string]: any;
}
const Tag = ({ children, className, state, onClick, active = false, icon, closable = false, hoverable = false, onClose, ...props }: Props): JSX.Element | null => {
    const [hidden, hide] = useState(false)
    const handleClose = (e: MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        hide(true);
        onClose?.();
    }
    if (hidden) return null;
    return <div className={`tag ${hoverable ? "hoverable" : ""} ${onClick ? " cursor-p" : ""}${className ? ` ${className}` : ""}${state ? ` ${state}` : ""}`} onClick={onClick} {...props}>
        {icon ? <span className="icon">{icon}</span> : null}
        {children ? <div className="children">{children}</div> : null}
        {closable ? <button className="btn-close" onClick={handleClose} disabled={state === "disabled"}>
            {<svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9 3L3 9" stroke="#787B86" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M3 3L9 9" stroke="#787B86" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            }</button> : null}
    </div>;
}
export default Tag;