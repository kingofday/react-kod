import { CSSProperties, ReactNode } from "react";
import { mergeClasses } from "../helpers/strings";

interface IContainer {
  id?: string;
  className?: string;
  children: ReactNode;
  autoPadding?: boolean;
  style?: CSSProperties;
  [key: string]: any;
}
const Container = ({
  id,
  className,
  children,
  style,
  autoPadding = true,
  ...rest
}: IContainer) => {
  return (
    <div
      id={id}
      className={mergeClasses([
        "container",
        [autoPadding, "auto-padding"],
        [!!className, className!],
      ])}
      style={style}
      {...rest}
    >
      {children}
    </div>
  );
};
export default Container;
