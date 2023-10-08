import { useContext } from "react";
import AccordionContext, { AccordionTypePick } from "./AccordionContext";

const useAccordionContext = () => {
  const context: AccordionTypePick | null = useContext(AccordionContext);
  if (!context) {
    throw new Error(
      "Accordion components are compound component. Must be used inside Accordion."
    );
  }
  return context;
};

export default useAccordionContext;
