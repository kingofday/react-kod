import { ReactNode } from "react";
export interface IBadgeProps {
    children: ReactNode,
    variant?: "primary" | "danger",
    size?: "small" | "medium" | "large"
    [key: string]: any
}
const Badge = ({ children, size, variant = "danger", ...rest }: IBadgeProps) => {
    return <span className={`badge ${size ?? ""} ${variant}`} {...rest}>{children}</span>;
};
export default Badge;