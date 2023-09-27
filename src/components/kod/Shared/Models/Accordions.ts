import { ReactNode } from "react";

export interface AccordionProps {
  element?: keyof JSX.IntrinsicElements;
  defaultOpen?: number | null;
  allOpenness?: boolean;
  children: ReactNode;
  separation?: boolean;
  gap?: "xs" | "sm" | "md" | "lg";
}

export interface ChildrenAccordionStatus {
  panelKey: number;
  statusOpen: boolean;
}

export interface PanelProps {
  header: string | ReactNode;
  element?: keyof JSX.IntrinsicElements;
  panelKey: number;
  children: ReactNode;
  disable?: boolean;
  shadowWhenOpen?: boolean;
  size?: "sm" | "lg" | "xl";
  [key: string]: any;
  reverse?: boolean;
}
