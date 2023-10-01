import { useRef } from "react";
// Context
import { useAccordionContext } from "./Context";
// Type
import { PanelProps } from "../Shared/Models/Accordions";
import Summary from "./Summary";

const _staticSize: number = 20;

const Panel = ({
  panelKey,
  children,
  header,
  disable = false,
  shadowWhenOpen,
  size,
  reverse,
  innerRef,
  ...rest
}: PanelProps) => {
  const { separation, childrenStatus } =
    useAccordionContext();

  const statusOpen = childrenStatus[panelKey]?.statusOpen;

  const wrapperRef = useRef<HTMLDivElement>(null);

  const propsSummary = {
    panelKey,
    disable,
    shadowWhenOpen,
    size,
    reverse,
  };

  const style = {
    ...(statusOpen
      ? {
          style: {
            height: wrapperRef.current
              ? wrapperRef.current.clientHeight + _staticSize
              : 0,
          },
        }
      : {}),
  };
  const manageClasses = `accordion_details ${statusOpen ? "open_details" : ""}`;
  return (
    <div
      className={`accordion_wrapper_item ${
        separation ? "visible_border_item" : ""
      } `}
      id="accordion_wrapper_item"
      ref={innerRef}
      {...rest}
    >
      <Summary {...propsSummary}>{header}</Summary>
      <div className={`${manageClasses}`} {...style}>
        <div ref={wrapperRef}>{children}</div>
      </div>
    </div>
  );
};

export default Panel;
