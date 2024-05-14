import { CSSProperties, ReactNode } from "react";
import { mergeClasses } from "../helpers/strings";

interface IContainer {
  id?: string;
  className?: string;
  children: ReactNode;
  style?:CSSProperties,
  [key:string]:any
}
const Container = ({
    id,
    className,
    children,
    style,
    ...rest
}: IContainer) => {
  return (
    <div
      id={id}
      className={mergeClasses([
        "container",
        [!!className, className!],
      ])}
      {...rest}
    >
      {children}
    </div>
  );
};
export default Container;
