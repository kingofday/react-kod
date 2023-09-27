import { ReactNode } from "react";

export interface TabProps {
  key: string;
  title: ReactNode;
  children?: ReactNode;
  icon?: ReactNode;
  disabled?:boolean;
}

const Tab = ({ key, children }: TabProps): JSX.Element => {
  return <div key={key} className="tab-content">{children}</div>;
};

export default Tab;
