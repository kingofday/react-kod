import { useTransition } from "react";
import Button from "../Button";
import { mergeClasses } from "../../helpers/strings";
import { ITabButton } from "./Model";

const TabButton = ({
  tabKey,
  onClick,
  disabled,
  className,
  icon,
  activeTabKey,
  children,
  tab,
  ...rest
}: ITabButton) => {
  const [isPending, startTransition] = useTransition();
  return (
    <Button
      key={tabKey}
      icon={icon}
      className={mergeClasses([
        `tab-btn-${tabKey}`,
        className,
        [tabKey === activeTabKey, "active"],
        [!!disabled, "disabled"],
        [isPending, "pending"],
      ])}
      variant="tab"
      onClick={
        (onClick && !disabled && !isPending)
          ? () =>
              startTransition(() => {
                onClick();
              })
          : undefined
      }
      {...rest}
    >
      {children}
    </Button>
  );
};
export default TabButton;
