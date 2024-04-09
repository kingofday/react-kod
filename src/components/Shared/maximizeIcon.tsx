import IconProps from "./Models";
const MaximizeIcon = ({ className, ...rest }: IconProps) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} fill="none" {...rest}>
      <path
        stroke="#323E54"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M6.667 3h-2.5A1.667 1.667 0 0 0 2.5 4.667v2.5m15 0v-2.5A1.667 1.667 0 0 0 15.833 3h-2.5m0 15h2.5a1.666 1.666 0 0 0 1.667-1.667v-2.5m-15 0v2.5A1.666 1.666 0 0 0 4.167 18h2.5"
      />
    </svg>
  );
};
export default MaximizeIcon;
