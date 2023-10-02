import IconProps from "./Models";

const ChevronDown = ({ size = 10, className, ...rest }: IconProps) => {
    return <svg className={`chevron${className ? ` ${className}` : ""}`} width={size} height={(size * 6 / 10)} viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg" {...rest}>
        <path d="M0.5 0.75L5 5.25L9.5 0.75" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
        ;
};
export default ChevronDown;