import IconProps from "./Models";
const MinimizeIcon = ({ size = 14, className, ...rest }: IconProps) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} viewBox="0 0 24 24" fill="none" {...rest}>
      <path d="M15 22V19.5C15 17.01 17.01 15 19.5 15H22" stroke="#323E54" strokeWidth={1.2} strokeLinecap="round" strokeLinejoin="round" />
      <path d="M2 15H4.5C6.99 15 9 17.01 9 19.5V22" stroke="#323E54" strokeWidth={1.2} strokeLinecap="round" strokeLinejoin="round" />
      <path d="M9 2V3.75C9 6.655 6.655 9 3.75 9H2" stroke="#323E54" strokeWidth={1.2} strokeLinecap="round" strokeLinejoin="round" />
      <path d="M22 9H19.5C17.01 9 15 6.99 15 4.5V2" stroke="#323E54" strokeWidth={1.2} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
};
export default MinimizeIcon;
