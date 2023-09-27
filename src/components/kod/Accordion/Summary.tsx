import React, { ReactNode } from "react";
// Context
import { useAccordionContext } from "./Context";
// Module
import Expand from "./expand";
import { ChildrenAccordionStatus } from "../Shared/Models/Accordions";

// Type
interface SummaryType {
  element?: keyof JSX.IntrinsicElements;
  children: ReactNode;
  panelKey: number;
  reverse?: boolean;
  size?: "sm" | "lg" | "xl";
  disable?: boolean;
  shadowWhenOpen?: boolean;
}

const Summary = ({
  element = "div",
  panelKey,
  children,
  reverse = false,
  size,
  shadowWhenOpen = false,
  disable,
  ...otherProps
}: SummaryType) => {

  const Component = element;
  const { onToggle, childrenStatus, allOpenness } = useAccordionContext();
  const statusOpen = childrenStatus
    ? childrenStatus[panelKey]?.statusOpen
    : false;

    const handleToggle = (panelKey: number) => {
    if (disable) return null;
    const finedActiveItem = childrenStatus.map(
      (item: ChildrenAccordionStatus) => {
        return {
          panelKey: item.panelKey,
          statusOpen: allOpenness
            ? item.panelKey == panelKey
              ? !item.statusOpen
              : item.statusOpen
            : item.panelKey == panelKey && !item.statusOpen,
        };
      }
    );
    onToggle(finedActiveItem);
  };
  const manageClasses = `accordion_summary ${size ? size : ""} ${
    statusOpen && shadowWhenOpen ? "visableborderWhenOpen" : ""
  } ${reverse ? "reverse" : ""} ${disable ? "disable" : ""}`;

  return (
    <Component
      className={manageClasses}
      onClick={() => handleToggle(panelKey)}
      {...otherProps}
    >
      {children}
      <Expand iconStatus={statusOpen} />
    </Component>
  );
};

export default Summary;
