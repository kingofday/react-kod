import IconProps from "./Models/IconProps";
const CloseIcon = ({ size = 14, className, ...rest }: IconProps) => {
    return <svg className={className} width={size} height={size} viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg" {...rest}>
        <path d="M18 6.5L6 18.5" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M6 6.5L18 18.5" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
    </svg>


};
export default CloseIcon;