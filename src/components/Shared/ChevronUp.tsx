import IconProps from "./Models";
const ChevronUp = ({ size = 10,className,...rest }: IconProps) => {
    return <svg className={`chevron${className ? ` ${className}` : ""}`} width={size} height={(size * 6 / 10)} viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg" {...rest}>
        <path d="M9.5 5.25L5 0.75L0.5 5.25" strokeLinecap="round" strokeLinejoin="round" />
    </svg>;
};
export default ChevronUp;