import React from "react";
import { ChildrenAccordionStatus } from "../../Shared/Models/Accordions";
export type AccordionTypePick = {
  onToggle: React.Dispatch<React.SetStateAction<ChildrenAccordionStatus[]>>;
  allOpenness?: boolean;
  childrenStatus: ChildrenAccordionStatus[];
  separation?: boolean;
};

export default React.createContext<AccordionTypePick | null>(null);
