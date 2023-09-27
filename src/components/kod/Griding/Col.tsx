import { ReactNode } from "react";
interface Props {
  className?: string;
  children?: ReactNode;
  as?: keyof JSX.IntrinsicElements;
  [key: string]: any;
}
const Col = ({ className, children, as = "div", ...rest }: Props) => {
  const Wrapper = as;
  return <Wrapper className={`col ${className ?? ""}`} {...rest}>
    {children}
  </Wrapper>
};
export default Col;
