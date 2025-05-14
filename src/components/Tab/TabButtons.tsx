import { useCallback, useRef, useState, useTransition } from 'react';
import TabButton from './TabButton';
import { ITabButtonsProps, ITabItem } from './Model';
import useCentralizeTab from './useCentralizeTab';
import { mergeClass } from '../../helpers/strings';
const TabButtons = ({
  id,
  initialActiveKey,
  activeKey,
  className,
  onChange,
  afterChange,
  variant = 'pill',
  mobileVariant,
  hideScrollBar,
  tabs,
  size,
  thresholdCentralizeTab = 0,
}: ITabButtonsProps) => {
  const [innerActiveKey, chnageActiveKey] = useState(
    initialActiveKey ?? (tabs.length ? tabs[0].key : '')
  );
  const wrapperList = useRef<HTMLDivElement | null>(null);
  const [, startTransition] = useTransition();

  const centralizeTab = useCentralizeTab({
    wrapperList,
    thresholdCentralizeTab,
  });

  const handleSelect = useCallback(
    (key: string) => {
      chnageActiveKey(key);
      startTransition(() => {
        afterChange?.(key);
        centralizeTab(key);
      });
    },
    [afterChange]
  );
  const outSideHandleClick = useCallback(
    (key: string, item: ITabItem) => {
      onChange?.(key, item);
      centralizeTab(key);
    },
    [onChange]
  );
  const handleClick = useCallback(
    (key: string, tab: ITabItem) => {
      onChange ? outSideHandleClick(key, tab) : handleSelect(key);
    },
    [onChange, handleSelect, outSideHandleClick]
  );
  return (
    <div
      ref={wrapperList}
      id={id}
      className={mergeClass(
        'tab-buttons',
        'horizontal-scroll-bar',
        `${mobileVariant ? 'desktop-' : ''}${variant}`,
        className,
        [!!mobileVariant, `mobile-${mobileVariant}`],
        [!!hideScrollBar, 'hide-scroll-bar']
      )}
    >
      {tabs.map(({ key, icon, className, text, disabled, ...rest }) => (
        <TabButton
          key={key}
          tabKey={key}
          tab={{
            key,
            icon,
            className,
            text,
            disabled,
            ...rest,
          }}
          disabled={disabled}
          onClick={() =>
            handleClick(key, {
              key,
              icon,
              className,
              text,
              disabled,
              ...rest,
            })
          }
          activeTabKey={onChange ? activeKey ?? '' : innerActiveKey}
          className={className}
          size={size ?? 'small'}
          {...rest}
        >
          {text}
        </TabButton>
      ))}
    </div>
  );
};
export default TabButtons;
