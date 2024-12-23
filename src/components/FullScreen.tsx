import Button from "@/src/components/Button";
import CloseIcon from "@/src/components/Shared/ClosedIcon";
import { mergeClasses } from "@/src/helpers/strings";
import useLockBodyScroll from "@/src/helpers/useLockBodyScroll";
import { forwardRef, ReactNode, useImperativeHandle, useState } from "react";

type FullScreenProps = {
  children: ReactNode;
  id?: string;
  className?: string;
};
export interface FullScreenRefrence {
  handleToggle: () => void;
  isFullScreen?: boolean;
}
const FullScreen: React.ForwardRefRenderFunction<
  FullScreenRefrence,
  FullScreenProps
> = ({ children, id, className }, ref) => {
  const [isFullScreen, setToggle] = useState(false);
  const [returningToDefault, setReturningToDefault] = useState(false);

  const handleToggle = () => {
    if (isFullScreen) {
      setReturningToDefault(true);
      setTimeout(() => {
        setToggle(false);
        setReturningToDefault(false);
      }, 500); // Match this duration with `resize-down` animation time
    } else {
      setToggle(true);
    }
  };

  useImperativeHandle(ref, () => ({
    handleToggle,
    isFullScreen,
  }));

  useLockBodyScroll(isFullScreen);

  return (
    <div
      id={id}
      className={mergeClasses([
        className,
        "full-screen",
        [isFullScreen, "isFullscreen"],
        [returningToDefault, "returningToDefault"],
      ])}
      data-status={isFullScreen ? "full-screen" : "default"}
    >
      <div className={"wrapperOperation"}>
        <Button className={"closeBtn"} onClick={handleToggle}>
          <CloseIcon size={24} />
        </Button>
      </div>
      {children}
    </div>
  );
};

export default forwardRef(FullScreen);
