import { ReactNode } from "react";
import { spacings } from "@/src/helpers/variables";

type gutter = typeof spacings[number];
interface Props {
  gutter?: gutter | [gutter, gutter];
  className?: string;
  children?: ReactNode;
  [key: string]: any;
}
const Row = ({ gutter, className, children, ...rest }: Props) => {
  let gutterClass = "";
  if (gutter) {
    if (!Array.isArray(gutter)) {
      gutterClass += `h-spacing-${gutter}`;
    } else {
      gutterClass += `h-spacing-${(gutter as number[])[0]} v-spacing-${(gutter as number[])[1]
        }`;
    }
  }
  return <div className={`row ${gutterClass} ${className ?? ""}`} {...rest}>{children}</div>;
};
export default Row;
