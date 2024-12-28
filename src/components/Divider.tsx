import { CSSProperties } from "react";

interface IDividerProps {
  mode?: "horizontal" | "vertical";
  height?: number | string;
  width?: number | string;
  id?: string;
  className?: string;
  style?: CSSProperties;
  [key: string]: any;
}
const Divider = ({
  mode,
  height,
  width,
  id,
  className,
  style,
  ...rest
}: IDividerProps) => {
  return (
    <div
      style={{ width: width, height: height, ...style }}
      className={`divider ${mode ?? "horizontal"}${
        className ? ` ${className}` : ""
      }`}
      id={id}
      {...rest}
    ></div>
  );
};
export default Divider;
