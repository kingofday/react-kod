import { ReactNode, forwardRef, ForwardRefExoticComponent } from "react";

type CardProps = {
    title?: ReactNode;
    children: ReactNode;
    className?: string;
    hoverable?: boolean;
    withShadow?: boolean;
    extra?: ReactNode
    [key: string]: any
}

const Card: ForwardRefExoticComponent<CardProps> = forwardRef<HTMLDivElement, CardProps>(({ title, children, className, hoverable, extra, withShadow=true, ...props }: CardProps,ref) => {
    return (
        <div ref={ref} className={`card${withShadow ? " with-shadow" : ""}${hoverable ? " hoverable" : ""}${className ? ` ${className}` : ""}`} {...props}>
            {title ? <div className="title">{title} {extra ? <div className="extra">{extra}</div> : null}</div> : null}
            <div className="content">{children}</div>
        </div>
    );
});

export default Card