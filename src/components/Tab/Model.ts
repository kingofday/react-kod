import { ReactNode } from 'react';
export interface ITabProps {
  key: string;
  title: ReactNode;
  children?: ReactNode;
  icon?: ReactNode;
  disabled?: boolean;
  className?: string;
}
export interface ITabItem {
  key: string;
  icon?: ReactNode;
  className?: string;
  text?: ReactNode;
  disabled?: boolean;
  [key: string]: any;
}
export type TMobileVariant = 'pill' | 'bordered' | 'ink-bar';
export interface ITabButtonsProps {
  id?: string;
  variant?: TMobileVariant;
  mobileVariant?: TMobileVariant;
  initialActiveKey?: string;
  activeKey?: string;
  className?: string;
  tabs: ITabItem[];
  hideScrollBar?: boolean;
  onChange?: (key: string, tab?: ITabItem) => void;
  afterChange?: (key: string) => void;
  thresholdCentralizeTab?: number;
  size?: 'small' | 'medium' | 'large';
  [key: string]: any;
}
export interface ITabButton {
  icon?: ReactNode;
  className?: string;
  onClick?: () => void;
  activeTabKey: string;
  tabKey: string;
  disabled?: boolean;
  children: ReactNode;
  [key: string]: any;
}
