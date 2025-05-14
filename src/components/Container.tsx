import { CSSProperties, ReactNode } from "react";
import { mergeClass } from "../helpers/strings";

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
      className={mergeClass(
        "container",
        [autoPadding, "auto-padding"],
        [!!className, className!],
      )}
      style={style}
      {...rest}
    >
      {children}
    </div>
  );
};
export default Container;
