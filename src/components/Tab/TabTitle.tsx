import { ReactNode } from "react";
interface Props {
  tabKey: string;
  title: ReactNode;
  selectedTab: string;
  icon?: ReactNode;
  setSelectedTab: (key: string) => void;
  disabled?: boolean;
  asElement?: keyof JSX.IntrinsicElements;
}

const TabTitle = ({ title, icon = null, setSelectedTab, selectedTab, tabKey, disabled}: Props) => {
  return (
    <li
      role="tab"
      className={`${`tab-${tabKey} `}tab-title ${tabKey === selectedTab ? "active" : ""} ${disabled ? "disabled" : ""}`}
      onClick={disabled ? undefined : () => setSelectedTab(tabKey)}
    >
      {icon ? <span className="icon">{icon}</span> : null}
      {title}
    </li>
  );
};

export default TabTitle;
