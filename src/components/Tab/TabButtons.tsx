import { useCallback, useRef, useState, useTransition } from "react";
import TabButton from "./TabButton";
import { ITabButtonsProps, ITabItem } from "./Model";
const TabButtons = ({
  id,
  initialActiveKey,
  activeKey,
  className,
  onChange,
  afterChange,
  variant = "pill",
  hideScrollBar,
  tabs,
  thresholdCentralizeTab = 0,
}: ITabButtonsProps) => {
  const [innerActiveKey, chnageActiveKey] = useState(
    initialActiveKey ?? (tabs.length ? tabs[0].key : "")
  );
  const wrapperList = useRef<HTMLDivElement | null>(null);
  const [, startTransition] = useTransition();
  
  const centralizeTab = (key: string) => {
    const parentTabElement = wrapperList?.current as HTMLDivElement | undefined;
    const activeElement = parentTabElement?.querySelector(
      `.tab-btn-${key} `
    ) as HTMLUListElement | undefined;
    if (parentTabElement && activeElement) {
      parentTabElement.scrollLeft =
        activeElement.offsetLeft -
        (parentTabElement.offsetWidth - activeElement.offsetWidth) / 2 -
        thresholdCentralizeTab;
    }
  };

  const handleSelect = useCallback((key: string) => {
    chnageActiveKey(key);
    startTransition(() => {
      afterChange?.(key);
      centralizeTab(key);
    });
  }, []);
  const outSideHandleClick = useCallback((key: string, item: ITabItem) => {
    onChange?.(key, item);
    centralizeTab(key);
  }, []);
  const handleClick = useCallback((key: string, tab: ITabItem) => {
    onChange ? outSideHandleClick(key, tab) : handleSelect(key);
  }, []);
  return (
    <div
      ref={wrapperList}
      id={id}
      className={`tab-buttons horizontal-scroll-bar ${variant}${
        className ? " " + className : ""
      }${hideScrollBar ? " hide-scroll-bar" : ""}`}
    >
      {tabs.map((t) => (
        <TabButton
          key={t.key}
          tabKey={t.key}
          tab={t}
          disabled={t.disabled}
          onClick={() => handleClick(t.key, t)}
          activeTabKey={onChange ? activeKey ?? "" : innerActiveKey}
          className={t.className}
        >
          {t.text}
        </TabButton>
        // <Button
        //   {...t}
        //   key={t.key}
        //   icon={t.icon}
        //   className={`${`tab-btn-${t.key} `}${t.className ?? ""}${(onChange ? activeKey : innerActiveKey) === t.key ? " active" : ""}${t.disabled ? " disabled" : ""}`}
        //   variant="tab"
        //   onClick={() => (t.disabled ? undefined : (onChange ? outSideHandleClick(t.key, t) : handleClick(t.key)))}
        // >
        //   {t.text}
        // </Button>
      ))}
    </div>
  );
};
export default TabButtons;
