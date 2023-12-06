import { useState, useEffect, ReactNode, ElementType } from "react";
export type MenuItem = {
  key: string;
  label: ReactNode;
  icon?: ReactNode;
  children?: MenuItem[];
  disabled?: boolean;
  href?: string;
  afterClick?: () => void;
};
export interface IMenu {
  className?: string;
  items?: MenuItem[];
  variant?: "horizontal" | "vertical";
  selectedKeys?: string[];
  hideIndicator?: boolean;
  openKeys?: string[];
  openOnClick?: boolean;
  link?: ElementType;
  onClick?: ((key: string) => void) | undefined;
  [key: string]: any;
}
const Menu = ({
  className,
  children,
  items,
  selectedKeys,
  openKeys,
  onClick,
  link,
  openOnClick = false,
  hideIndicator = false,
  variant = "horizontal",
  ...rest
}: IMenu) => {
  const [state, setState] = useState({
    selectedKeys,
    openKeys,
  });
  const handleCollapse = (key: string, newState?: boolean) => {
    setState((s) => {
      let isOpen = typeof newState !== "undefined" ? !newState : s.openKeys?.some((x) => x === key);
      if (isOpen) return { ...s, openKeys: s.openKeys?.filter((x) => x !== key) };
      else return { ...s, openKeys: [key].concat(s.openKeys ?? []) };
    });
  };
  const handleSelect = (k: string) => {
    onClick?.(k);
  };
  const createMenu = (item: MenuItem, Link?: ElementType) => {
    if (!item.children)
      return (
        <li className={`item ${item.disabled ? "disabled" : ""} ${state.selectedKeys?.some((x) => x === item.key) ? "selected" : ""}`} key={item.key}>
          {Link && item.href ? (
            <Link className="menu-content" href={item.href} disabled={item.disabled}>
              {item.icon ? <span className="menu-icon">{item.icon}</span> : null}
              {item.label}
            </Link>
          ) : (
            <div className="menu-content" onClick={() => {
                handleSelect(item.key);
                item?.afterClick && item?.afterClick();
            }}>
              {item.icon ? <span className="menu-icon">{item.icon}</span> : null}
              {item.label}
            </div>
          )}
        </li>
      );
    else
      return (
        <li
          key={item.key}
          className={`item ${item.disabled ? "disabled" : ""} ${state.selectedKeys?.some((k) => item.children?.some((c) => c.key === k)) ? "selected" : ""} ${
            state.openKeys?.some((x) => x === item.key) ? "collapsed" : ""
          }`}
          onClick={openOnClick ? () => handleCollapse(item.key) : undefined}
          onMouseLeave={openOnClick ? undefined : variant === "horizontal" ? () => handleCollapse(item.key, false) : undefined}
        >
          <div
            className="menu-content"
            onClick={variant === "horizontal" ? undefined : () => handleCollapse(item.key)}
            onMouseEnter={openOnClick ? undefined : variant === "horizontal" ? () => handleCollapse(item.key) : undefined}
          >
            <span>
              {item.icon ? <span className="menu-icon">{item.icon}</span> : null}
              {item.label}
            </span>
            {hideIndicator ? null : (
              <svg width="8" height="4" viewBox="0 0 8 4" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M0.514404 0.5L3.5144 3.5L6.5144 0.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            )}
          </div>
          <ul className="sub-menu">{item.children.map((x) => createMenu(x, Link))}</ul>
        </li>
      );
  };
  useEffect(() => {
    if (selectedKeys?.some((k) => !state.selectedKeys?.includes(k)) || !selectedKeys?.length) {
      setState((s) => ({ ...s, selectedKeys }));
    }
    if (openKeys?.some((k) => !state.openKeys?.includes(k))) {
      setState((s) => ({ ...s, openKeys }));
    }
  }, [selectedKeys, openKeys]);
  return (
    <ul className={`menu ${variant} ${className ?? ""}`} {...rest}>
      {items?.map((x) => createMenu(x, link))}
    </ul>
  );
};
export default Menu;
