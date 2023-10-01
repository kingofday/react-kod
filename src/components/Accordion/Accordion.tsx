import { Children, useEffect, useState } from "react";

import AccordionContext from "./Context/AccordionContext";
// Type
import {
  AccordionProps,
  ChildrenAccordionStatus,
} from "./Models";

const Accordion = ({
  element = "div",
  defaultOpen = 0,
  allOpenness,
  children,
  gap,
  separation = false,
  ...rest
}: AccordionProps) => {
  const childrenLength = Children.count(children);
  const Component = element;
  const initializeModel = (panelKey: number) => {
    return Array.apply(null, Array(childrenLength)).map((item:any, index:number) => {
      return {
        panelKey: index??item.key,
        statusOpen: panelKey === index,
      };
    });
  };
  const [childrenStatus, onToggle] = useState<ChildrenAccordionStatus[]>(
    initializeModel(defaultOpen!)
  );

  const context = {
    childrenStatus,
    onToggle,
    allOpenness,
    separation,
  };

  const manageClasses = `accordion  ${
    separation ? "whiteout_wrapper_border" : ""
  } ${gap ? gap : ""}`;

  useEffect(() => {
    const openChild = childrenStatus.filter((item) => item.statusOpen);
    onToggle(initializeModel(openChild[0]?.panelKey));
  }, [childrenLength]);
  return (
    <AccordionContext.Provider value={context}>
      <Component className={manageClasses} {...rest}>
        {children}
      </Component>
    </AccordionContext.Provider>
  );
};

export default Accordion;
