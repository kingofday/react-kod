import { ReactNode, Fragment } from "react";
interface BreadcrumbChildrenProps {
  children: ReactNode;
  [key: string]: any;
}
export interface BreadcrumbItemProps {
  key: string;
  label: ReactNode;
}
interface BreadcrumbProps {
  items?: BreadcrumbItemProps[];
  separator?: ReactNode;
  rtl?: boolean;
  className?: string;
  [key: string]: any;
}
export const BreadcrumbItem = ({
  items,
  children,
  separator,

  rtl = true,
  ...rest
}: BreadcrumbChildrenProps) => {
  return (
    <li className="breadcrumb-item" {...rest}>
      {children}
    </li>
  );
};
const Breadcrumb = ({
  separator,
  rtl = true,
  items,
  className,
  ...rest
}: BreadcrumbProps) => {
  return (
    <ul className={`breadcrumb${className ? " " + className : ""}`} {...rest}>
      {items?.map((x, idx) => {
        return (
          <Fragment key={x.key}>
            <BreadcrumbItem>{x.label}</BreadcrumbItem>
            {idx + 1 !== items?.length ? (
              <li className="seperator">{separator ?? rtl ? "/" : "\\"}</li>
            ) : null}
          </Fragment>
        );
      })}
    </ul>
  );
};
export default Breadcrumb;
