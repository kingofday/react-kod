import { ReactNode } from "react";
interface BadgeProps {
    children: ReactNode,
    variant?: "primary" | "danger",
    size?: "small" | "medium" | "large"
    [key: string]: any
}
const Badge = ({ children, size, variant = "danger", ...rest }: BadgeProps) => {
    return <span className={`badge ${size ?? ""} ${variant}`} {...rest}>{children}</span>;
};
export default Badge;