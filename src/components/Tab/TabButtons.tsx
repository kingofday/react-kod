import { ReactNode, useState } from "react";
import Button from "@/src/components/Button";
export interface TabItem {
    key: string;
    icon?: ReactNode;
    className?: string;
    text?: ReactNode;
    disabled?: boolean;
    [key: string]: any
}
interface TabButtonsProps {
    id?: string;
    variant?: "pill" | "bordered" | "ink-bar";
    initialActiveKey?: string;
    activeKey?: string;
    className?: string;
    tabs: TabItem[];
    hideScrollBar?: boolean;
    onChange?: (key: string, tab?: TabItem) => void,
    afterChange?: (key: string) => void,
}
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
}: TabButtonsProps) => {
    const [innerActiveKey, chnageActiveKey] = useState(initialActiveKey ?? tabs.length ? tabs[0].key : "");
    const handleClick = (key: string) => {
        chnageActiveKey(key);
        afterChange?.(key)
    };
    return <div id={id} className={`tab-buttons horizontal-scroll-bar ${variant}${className ? " " + className : ""}${hideScrollBar ? " hide-scroll-bar" : ""}`}>
        {tabs.map((t) => <Button key={t.key} icon={t.icon} className={`${t.className ? " " + t.className : ""}${(onChange ? activeKey : innerActiveKey) === t.key ? " " + "active" : ""} ${t.disabled ? " disabled" : ""}`} variant="tab" onClick={() => t.disabled ? undefined : (onChange ? onChange(t.key, t) : handleClick(t.key))}>{t.text}</Button>)}
    </div>;
};
export default TabButtons;