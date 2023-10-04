import { ReactNode, forwardRef, ForwardRefExoticComponent } from "react";

export type ICardProps = {
    title?: ReactNode;
    children: ReactNode;
    className?: string;
    hoverable?: boolean;
    withShadow?: boolean;
    extra?: ReactNode
    [key: string]: any
}

const Card: ForwardRefExoticComponent<ICardProps> = forwardRef<HTMLDivElement, ICardProps>(({ title, children, className, hoverable, extra, withShadow=true, ...props }: ICardProps,ref) => {
    return (
        <div ref={ref} className={`card${withShadow ? " with-shadow" : ""}${hoverable ? " hoverable" : ""}${className ? ` ${className}` : ""}`} {...props}>
            {title ? <div className="title">{title} {extra ? <div className="extra">{extra}</div> : null}</div> : null}
            <div className="content">{children}</div>
        </div>
    );
});

export default Card