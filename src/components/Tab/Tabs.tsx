import {
  ForwardRefExoticComponent,
  ReactElement,
  forwardRef,
  useEffect,
  useRef,
  useState,
} from 'react';
import { Select } from '../Inputs';
import { ITabProps } from './Model';
import TabButton from './TabButton';
import useCentralizeTab from './useCentralizeTab';
import { mergeClass } from '../../helpers/strings';
type TabsProps = {
  defaultActiveTab?: string;
  activeTab?: string;
  className?: string;
  children?: (ReactElement<ITabProps> | null)[];
  items?: ITabProps[];
  variant?: 'pill' | 'normal' | 'bordered-pill' | 'secondary';
  mobileVariant?: 'pill' | 'normal' | 'bordered-pill' | 'secondary';
  alignTitles?: 'start' | 'end' | 'center';
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
const Tabs: ForwardRefExoticComponent<TabsProps> = forwardRef<
  HTMLDivElement,
  TabsProps
>(
  (
    {
      items,
      defaultActiveTab,
      children,
      className = '',
      variant = 'normal',
      mobileVariant,
      alignTitles = 'start',
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
          .map((x) => {
            const { title, children, className, disabled, icon, tabKey, ...rest } =
              x.props;
            return {
              tabKey,
              children: children,
              title: title,
              icon: icon,
              disabled: disabled,
              className: className,
              ...rest,
            };
          })
      : items
      ? items
      : [];
    const renderedTabs = useRef<RenderedTabs>(
      tabProps.reduce(
        (acc, x) => ({
          [x.tabKey]: x.tabKey === (activeTab ?? defaultActiveTab ?? tabProps[0].tabKey),
          ...acc,
        }),
        {}
      )
    );
    const [activeKey, setActiveKey] = useState<string>(
      activeTab ?? defaultActiveTab ?? tabProps[0].tabKey
    );
    const centralizeTab = useCentralizeTab({
      wrapperList,
      thresholdCentralizeTab,
    });

    const handleSelect = (key: string) => {
      const parentTabElement = wrapperList?.current as
        | HTMLDivElement
        | undefined;
      const activeElement = parentTabElement?.querySelector(`.tab-${key} `) as
        | HTMLDivElement
        | undefined;
      if (parentTabElement && activeElement) {
        parentTabElement.scrollLeft =
          activeElement.offsetLeft -
          (parentTabElement.offsetWidth - activeElement.offsetWidth) / 2 -
          thresholdCentralizeTab;
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
      if (activeTab && !renderedTabs.current[activeTab])
        renderedTabs.current[activeTab] = true;
    }, [activeTab]);
    return (
      <div
        className={mergeClass(
          'tabs',
          `${!!mobileVariant ? 'desktop-' : ''}${variant}`,
          [!!mobileVariant, `mobile-${mobileVariant}`],
          alignTitles,
          [!!visibility, 'visibility'],
          className
        )}
        ref={forwardedRef}
        {...rest}
      >
        <div
          ref={wrapperList}
          className={mergeClass(
            'tab-nav-list',
            'horizontal-scroll-bar',
            [!!hideScrollBar, 'hide-scroll-bar'],
            [!!changeToInputSelectInMobile, 'desktop_mode']
          )}
          role="tablist"
        >
          {tabProps.map(
            ({ tabKey, title, children, className, disabled, icon, ...rest }) => (
              <TabButton
                key={tabKey}
                activeTabKey={activeTab ?? activeKey}
                tabKey={tabKey}
                onClick={() => handleSelect(tabKey)}
                disabled={disabled}
                icon={icon}
                className={className}
                {...rest}
              >
                {title}
              </TabButton>
            )
          )}
        </div>
        {changeToInputSelectInMobile && (
          <Select
            value={activeTab ?? activeKey}
            onChange={handleSelect}
            className="mobile_mode"
          >
            {tabProps.map((item) => (
              <Select.Option key={item.tabKey} value={item.tabKey}>
                {item.title}
              </Select.Option>
            ))}
          </Select>
        )}
        <ul className="tab-content-list">
          {tabProps.map((x) => (
            <li
              className={`tab-content ${
                (activeTab ?? activeKey) !== x.tabKey ? 'd-none' : ''
              }`}
              key={x.tabKey}
            >
              {(renderedTabs.current[x.tabKey] as boolean) ||
              (activeTab ?? activeKey) === x.tabKey
                ? x.children
                : null}
            </li>
          ))}
        </ul>
      </div>
    );
  }
);
export { Tabs, TabsProps };
