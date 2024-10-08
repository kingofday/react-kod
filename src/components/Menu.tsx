import { ReactNode, ElementType, HTMLAttributeAnchorTarget } from "react";
export type MenuItem = {
  key: string;
  label: ReactNode;
  icon?: ReactNode;
  children?: MenuItem[];
  disabled?: boolean;
  href?: string;
  target?: HTMLAttributeAnchorTarget;
};
export interface IMenu {
  className?: string;
  items?: MenuItem[];
  variant?: "horizontal" | "vertical";
  trigger?: "click" | "hover";
  defaultSelectedKeys?: string[];
  hideIndicator?: boolean;
  defaultOpenKeys?: string[];
  link?: ElementType;
  [key: string]: any;
}
const Menu = ({
  className,
  children,
  items,
  defaultSelectedKeys,
  link,
  hideIndicator = false,
  trigger = "hover",
  variant = "horizontal",
  ...rest
}: IMenu) => {
  const createMenu = (
    { key, label, href, target, disabled, icon, children, ...rest }: MenuItem,
    Link?: ElementType
  ) => {
    if (!children)
      return (
        <li
          className={`item ${disabled ? "disabled" : ""} ${
            defaultSelectedKeys?.some((x) => x === key) ? "selected" : ""
          }`}
          key={key}
        >
          {Link && href ? (
            <Link className="menu-content" href={href} disabled={disabled}>
              {icon ? <span className="menu-icon">{icon}</span> : null}
              {label}
            </Link>
          ) : (
            <a className="menu-content" href={href} target={target} {...rest}>
              {icon ? <span className="menu-icon">{icon}</span> : null}
              {label}
            </a>
          )}
        </li>
      );
    else
      return (
        <li
          key={key}
          className={`item ${disabled ? "disabled" : ""} ${
            defaultSelectedKeys?.some((k) => children?.some((c) => c.key === k))
              ? "selected"
              : ""
          }`}
        >
          {trigger === "click" && (
            <input id={`chb-${key}`} className="" type="checkbox" />
          )}
          <label
            htmlFor={trigger === "click" ? `chb-${key}` : undefined}
            className="menu-content"
          >
            <span>
              {icon ? <span className="menu-icon">{icon}</span> : null}
              {label}
            </span>
            {hideIndicator ? null : (
              <svg
                width="8"
                height="4"
                viewBox="0 0 8 4"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M0.514404 0.5L3.5144 3.5L6.5144 0.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            )}
          </label>
          <ul className="sub-menu">
            {children.map((x) => createMenu(x, Link))}
          </ul>
        </li>
      );
  };
  return (
    <ul className={`menu2 trigger-${trigger} ${variant} ${className ?? ""}`} {...rest}>
      {items?.map((x) => createMenu(x, link))}
    </ul>
  );
};
export default Menu;
