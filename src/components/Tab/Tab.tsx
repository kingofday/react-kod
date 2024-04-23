import { ITabProps } from "./Model";

const Tab = ({
  children,
}: ITabProps): JSX.Element => {
  return <div className="tab-content">{children}</div>;
};

export default Tab;
