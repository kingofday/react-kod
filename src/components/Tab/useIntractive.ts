import { ITabProps } from "./Model";
interface RenderedTabs {
  [key: string]: boolean;
}
type TProps = {
  activeKey: string;
  setActiveKey: React.Dispatch<React.SetStateAction<string>>;
  listTabs: ITabProps[];
  clientTouchX: React.MutableRefObject<number | null>;
  wrapperList: React.MutableRefObject<HTMLDivElement | null>;
  renderedTabs?: React.MutableRefObject<RenderedTabs>;
  thresholdCentralizeTab:number,
};
const useInteractive = ({ activeKey, setActiveKey, clientTouchX, wrapperList, listTabs, renderedTabs,thresholdCentralizeTab }: TProps) => {
  const centralizeTab = (key: string) => {
    const parentTabElement = wrapperList?.current as HTMLDivElement | undefined;
    const activeElement = parentTabElement?.querySelector(`.tab-btn-${key} `) as HTMLUListElement | undefined;
    if (parentTabElement && activeElement) {
      parentTabElement.scrollLeft = activeElement.offsetLeft - (parentTabElement.offsetWidth - activeElement.offsetWidth) / 2 - thresholdCentralizeTab;
    }
  };
  const handleTouchStart = (e: React.TouchEvent) => {
    clientTouchX.current = e.touches[0].clientX;
  };
  const handleTouchMove = (e: React.TouchEvent) => {
    if (clientTouchX.current === null) return;

    const currentX = e.touches[0].clientX;
    const deltaX = currentX - clientTouchX.current;
    if (deltaX < -100) {
      const swipedTab = activeKey === listTabs[listTabs.length - 1].key ? listTabs[0].key : listTabs[listTabs.findIndex((c) => c.key === activeKey) + 1].key;
      renderedTabs && (renderedTabs.current[swipedTab] = true);
      setActiveKey(swipedTab);
      clientTouchX.current = null;
    } else if (deltaX > 100) {
      const swipedTab = activeKey === listTabs[0].key ? listTabs[listTabs.length - 1].key : listTabs[listTabs.findIndex((c) => c.key === activeKey) - 1].key;
      renderedTabs && (renderedTabs.current[swipedTab] = true);
      setActiveKey(swipedTab);
      clientTouchX.current = null;
    }
    centralizeTab(activeKey);
  };
  const handleTouchEnd = () => {
    clientTouchX.current = null;
  };
  return { handleTouchStart, handleTouchMove, handleTouchEnd, centralizeTab };
};

export default useInteractive;
