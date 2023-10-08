interface IconProps {
    size?: number,
}
const Check = ({ size = 16 }: IconProps) => {
    return <svg style={{ width: `${size}px`, height: `${size}px` }} className="check" width={size} height={size * 11 / 16} viewBox="0 0 16 11" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M14.6663 0.5L5.49967 9.66667L1.33301 5.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>;
};
export default Check;