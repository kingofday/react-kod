import React from "react";
// Type
import { ChildrenAccordionStatus } from "../../Shared/Models/Accordions";

// export type AccordionTypePick = Pick<AccordionProps, "allOpenness" | "defaultOpen"> | React.Dispatch<React.SetStateAction<ChildrenAccordionStatus[]>>;
export type AccordionTypePick = {
  onToggle: React.Dispatch<React.SetStateAction<ChildrenAccordionStatus[]>>;
  allOpenness?: boolean;
  childrenStatus: ChildrenAccordionStatus[];
  separation?: boolean;
};

export default React.createContext<AccordionTypePick | null>(null);
