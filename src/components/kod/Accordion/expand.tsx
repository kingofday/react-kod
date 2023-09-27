import React from "react";
// Icon
import { ChevronDown, Minus } from "react-feather";
// Type
interface PropsType {
  iconStatus: boolean;
}

const Expand = ({ iconStatus }: PropsType) => {
  return iconStatus ?  <Minus size={14}/> :<ChevronDown size={14}/>;
};

export default Expand;
