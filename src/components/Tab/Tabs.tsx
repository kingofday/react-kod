import { ForwardRefExoticComponent, ReactElement, forwardRef, useEffect, useRef, useState } from "react";
import { TabProps } from "./Tab";
import TabTitle from "./TabTitle";
import { Select } from "../Inputs";
type TabsProps = {
  defaultActiveTab?: string;
  activeTab?: string;
  className?: string;
  children?: (ReactElement<TabProps> | null)[];
  items?: TabProps[];
  variant?: "pill" | "normal" | "bordered-pill" | "bordered" | "secondary";
  alignTitles?: "start" | "end" | "center",
  visibility?: boolean;
  hideScrollBar?: boolean;
  onChange?: (key: string) => void,
  afterChange?: (key: string) => void,
  swipable?: boolean;
  changeToInputSelectInMobile?:boolean;
  threshold?: number;
  [key: string]: any
}
interface RenderedTabs {
  [key: string]: boolean;
}
const Tabs: ForwardRefExoticComponent<TabsProps> = forwardRef<HTMLDivElement, TabsProps>(({
  items,
  defaultActiveTab,
  children,
  className = "",
  variant = "normal",
  alignTitles = "start",
  visibility,
  hideScrollBar,
  afterChange,
  swipable,
  activeTab,
  threshold = 0,
  onChange,
  changeToInputSelectInMobile,
  ...rest
},
  forwardedRef,
) => {
  const clientTouchX = useRef<number | null>(null);
  const wrapperList = useRef<HTMLUListElement | null>(null);


  const tabProps: TabProps[] = children
    ? children.filter((x): x is ReactElement<TabProps> => x !== null).map((x) => ({
      key: x.key as string,
      children: x.props.children,
      title: x.props.title,
      icon: x.props.icon,
      disabled: x.props.disabled
    }))
    : items
      ? items
      : [];
  const renderedTabs = useRef<RenderedTabs>(tabProps.reduce(
    (acc, x) => ({
      [x.key]: x.key === (activeTab ?? defaultActiveTab ?? tabProps[0].key),
      ...acc,
    }),
    {}
  ))
  const [activeKey, setActiveKey] = useState<string>(activeTab ?? defaultActiveTab ?? tabProps[0].key);
  const handleSelect = (key: string) => {
    const parentTabElement = wrapperList?.current as HTMLUListElement | undefined
    const activeElement = parentTabElement?.querySelector(`.tab-${key} `) as HTMLUListElement | undefined;
    if (parentTabElement && activeElement) {
      parentTabElement.scrollLeft = activeElement.offsetLeft - (parentTabElement.offsetWidth - activeElement.offsetWidth) / 2 - threshold;
    }
    renderedTabs.current[key] = true;
    if (onChange)
      onChange(key);
    else
      setActiveKey(key);
  };
  const handleTouchStart = (e: React.TouchEvent) => {
    clientTouchX.current = e.touches[0].clientX;
  };
  const handleTouchMove = (e: React.TouchEvent) => {
    if (clientTouchX.current === null) return;

    const currentX = e.touches[0].clientX;
    const deltaX = currentX - clientTouchX.current;
    if (deltaX < -100) {
      const swipedTab = activeKey === tabProps[tabProps.length - 1].key ? tabProps[0].key : tabProps[tabProps.findIndex(c => c.key === activeKey) + 1].key
      renderedTabs.current[swipedTab] = true;
      setActiveKey(swipedTab)
      clientTouchX.current = null;
    } else if (deltaX > 100) {
      const swipedTab = activeKey === tabProps[0].key ? tabProps[tabProps.length - 1].key : tabProps[tabProps.findIndex(c => c.key === activeKey) - 1].key
      renderedTabs.current[swipedTab] = true;
      setActiveKey(swipedTab)
      clientTouchX.current = null;
    }
  };
  const handleTouchEnd = () => {
    clientTouchX.current = null;
  };
  // useImperativeHandle(forwardedRef, () => ({
  //   changeTab(key: string) {
  //     handleSelect(key);
  //   }
  // }));
  useEffect(() => {
    if (!onChange)
      afterChange?.(activeKey);
  }, [activeKey]);
  useEffect(() => {
    if (activeTab && !renderedTabs.current[activeTab])
      renderedTabs.current[activeTab] = true;
  }, [activeTab]);
  return (
    <div className={`tabs ${variant} ${alignTitles}${className ? ` ${className}` : ""}${visibility ? " visibility" : ""}`} ref={forwardedRef} {...rest}>
      <ul ref={wrapperList} className={`${changeToInputSelectInMobile ?"desktop_mode":""} tab-nav-list horizontal-scroll-bar ${hideScrollBar ? " hide-scroll-bar" : ""}`} role="tablist">
        {tabProps.map((item) => (
          <TabTitle
            key={item.key}
            tabKey={item.key}
            title={item.title}
            selectedTab={activeTab ?? activeKey}
            setSelectedTab={handleSelect}
            icon={item.icon}
            disabled={item.disabled}
          />
        ))}
      </ul>
      {changeToInputSelectInMobile &&
      <Select value={activeTab ?? activeKey} onChange={handleSelect} className="mobile_mode">
            {tabProps.map((item) => (
              <Select.Option key={item.key} value={item.key}>
                {item.title}
              </Select.Option>
            ))}
          </Select>
    }
      <ul
      className="tab-content-list"
        onTouchStart={swipable ? handleTouchStart : undefined}
        onTouchMove={swipable ? handleTouchMove : undefined}
        onTouchEnd={swipable ? handleTouchEnd : undefined}
      >
        {tabProps.map((x) => (
          <li className={`tab-content ${(activeTab ?? activeKey) !== x.key ? "d-none" : ""}`} key={x.key}>
            {(renderedTabs.current[x.key] as boolean) || ((activeTab ?? activeKey) === x.key) ? x.children : null}
          </li>
        ))}
      </ul>
    </div>
  );
});
export { Tabs, TabsProps };

