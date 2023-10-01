import { ReactNode } from "react";

type AvatarProps = {
    src?: string | ReactNode;
    alt?: string;
    children?: ReactNode;
    shape?: "circle" | "square";
    size?: "small" | "large" | "medium";
    className?: string;
    [key: string]: any;
}

const Avatar = ({ src, className, children, alt, shape = "circle", size = "medium", ...props }: AvatarProps) => {
    const imageSize = size === "small" ? 24 : size === "medium" ? 38 : size === "large" ? 52 : 38;
    return (
        <div className={`avatar ${shape} ${size} ${className ? ` ${className}` : ""}`} {...props}>
            {children ? children : (src ? (typeof src === "string" ? <img width={imageSize} height={imageSize} src={src} alt={alt} /> : src) : alt?.length ? alt[0] : null)}
        </div>
    );
}

export default Avatar