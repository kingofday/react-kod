type TProps = {
  wrapperList: React.MutableRefObject<HTMLDivElement | null>;
  thresholdCentralizeTab: number;
};
const useCentralizeTab = ({ wrapperList, thresholdCentralizeTab }: TProps) => {
  return (key: string) => {
    const parentTabElement = wrapperList?.current as HTMLDivElement | undefined;
    const activeElement = parentTabElement?.querySelector(`.tab-btn-${key} `) as HTMLUListElement | undefined;
    if (parentTabElement && activeElement) {
      parentTabElement.scrollLeft = activeElement.offsetLeft - (parentTabElement.offsetWidth - activeElement.offsetWidth) / 2 - thresholdCentralizeTab;
    }
  };
};

export default useCentralizeTab;
