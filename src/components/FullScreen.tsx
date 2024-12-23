import { mergeClasses } from "../helpers/strings";
import useLockBodyScroll from "../helpers/useLockBodyScroll";
import { forwardRef, ReactNode, useImperativeHandle, useState } from "react";

type FullScreenProps = {
  children: ReactNode;
  id?: string;
  className?: string;
};
export interface FullScreenRefrence {
  handleToggle: () => void;
  isFullScreen?: boolean;
  //   buttonFullScreenToggle?: JSX.Element;
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
    // buttonFullScreenToggle: (
    //   <>
    //     {isFullScreen ? (
    //       <Button
    //         size="small"
    //         id="min-full-screen"
    //         variant="gray"
    //         onClick={handleToggle}
    //         ariaLabel="minimize"
    //       >
    //         <MinimizeIcon size={18} />
    //       </Button>
    //     ) : (
    //       <Button
    //         size="small"
    //         id="max-full-screen"
    //         variant="gray"
    //         onClick={handleToggle}
    //         ariaLabel="maximize"
    //       >
    //         <MaximizeIcon size={18} />
    //       </Button>
    //     )}
    //   </>
    // ),
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
      {children}
    </div>
  );
};

export default forwardRef(FullScreen);
