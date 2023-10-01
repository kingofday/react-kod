import React from "react";
import { ChildrenAccordionStatus } from "../Models";
export type AccordionTypePick = {
  onToggle: React.Dispatch<React.SetStateAction<ChildrenAccordionStatus[]>>;
  allOpenness?: boolean;
  childrenStatus: ChildrenAccordionStatus[];
  separation?: boolean;
};

export default React.createContext<AccordionTypePick | null>(null);
