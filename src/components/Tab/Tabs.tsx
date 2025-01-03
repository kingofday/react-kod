import { ForwardRefExoticComponent, ReactElement, forwardRef, useEffect, useRef, useState } from "react";
import { Select } from "../Inputs";
import { ITabProps } from "./Model";
import TabButton from "./TabButton";
import useCentralizeTab from "./useCentralizeTab";
type TabsProps = {
  defaultActiveTab?: string;
  activeTab?: string;
  className?: string;
  children?: (ReactElement<ITabProps> | null)[];
  items?: ITabProps[];
  variant?: "pill" | "normal" | "bordered-pill" | "secondary";
  alignTitles?: "start" | "end" | "center";
  visibility?: boolean;
  hideScrollBar?: boolean;
  onChange?: (key: string) => void;
  afterChange?: (key: string) => void;
  changeToInputSelectInMobile?: boolean;
  thresholdCentralizeTab?: number;
  [key: string]: any;
};
interface RenderedTabs {
  [key: string]: boolean;
}
const Tabs: ForwardRefExoticComponent<TabsProps> = forwardRef<HTMLDivElement, TabsProps>(
  (
    {
      items,
      defaultActiveTab,
      children,
      className = "",
      variant = "normal",
      alignTitles = "start",
      visibility,
      hideScrollBar,
      afterChange,
      activeTab,
      thresholdCentralizeTab = 0,
      onChange,
      changeToInputSelectInMobile,
      ...rest
    },
    forwardedRef
  ) => {
    const wrapperList = useRef<HTMLDivElement | null>(null);
    const tabProps: ITabProps[] = children
      ? children
          .filter((x): x is ReactElement<ITabProps> => x !== null)
          .map((x) => ({
            key: x.key as string,
            children: x.props.children,
            title: x.props.title,
            icon: x.props.icon,
            disabled: x.props.disabled,
          }))
      : items
      ? items
      : [];
    const renderedTabs = useRef<RenderedTabs>(
      tabProps.reduce(
        (acc, x) => ({
          [x.key]: x.key === (activeTab ?? defaultActiveTab ?? tabProps[0].key),
          ...acc,
        }),
        {}
      )
    );
    const [activeKey, setActiveKey] = useState<string>(activeTab ?? defaultActiveTab ?? tabProps[0].key);
    const centralizeTab = useCentralizeTab({ wrapperList, thresholdCentralizeTab })

    const handleSelect = (key: string) => {
      const parentTabElement = wrapperList?.current as HTMLDivElement | undefined;
      const activeElement = parentTabElement?.querySelector(`.tab-${key} `) as HTMLDivElement | undefined;
      if (parentTabElement && activeElement) {
        parentTabElement.scrollLeft = activeElement.offsetLeft - (parentTabElement.offsetWidth - activeElement.offsetWidth) / 2 - thresholdCentralizeTab;
      }
      renderedTabs.current[key] = true;
      if (onChange) onChange(key);
      else setActiveKey(key);
      centralizeTab(key);
    };

    useEffect(() => {
      if (!onChange) afterChange?.(activeKey);
    }, [activeKey]);
    useEffect(() => {
      if (activeTab && !renderedTabs.current[activeTab]) renderedTabs.current[activeTab] = true;
    }, [activeTab]);
    return (
      <div className={`tabs ${variant} ${alignTitles}${className ? ` ${className}` : ""}${visibility ? " visibility" : ""}`} ref={forwardedRef} {...rest}>
        <div ref={wrapperList} className={`${changeToInputSelectInMobile ? "desktop_mode" : ""} tab-nav-list horizontal-scroll-bar ${hideScrollBar ? " hide-scroll-bar" : ""}`} role="tablist">
          {tabProps.map((item) => (
            <TabButton
              key={item.key}
              activeTabKey={activeTab ?? activeKey}
              tabKey={item.key}
              onClick={() => handleSelect(item.key)}
              disabled={item.disabled}
              icon={item.icon}
              className={item.className}
            >
              {item.title}
            </TabButton>
          ))}
        </div>
        {changeToInputSelectInMobile && (
          <Select value={activeTab ?? activeKey} onChange={handleSelect} className="mobile_mode">
            {tabProps.map((item) => (
              <Select.Option key={item.key} value={item.key}>
                {item.title}
              </Select.Option>
            ))}
          </Select>
        )}
        <ul className="tab-content-list" >
          {tabProps.map((x) => (
            <li className={`tab-content ${(activeTab ?? activeKey) !== x.key ? "d-none" : ""}`} key={x.key}>
              {(renderedTabs.current[x.key] as boolean) || (activeTab ?? activeKey) === x.key ? x.children : null}
            </li>
          ))}
        </ul>
      </div>
    );
  }
);
export { Tabs, TabsProps };
