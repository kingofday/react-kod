import { mergeClasses } from "../helpers/strings";
import useLockBodyScroll from "../helpers/useLockBodyScroll";
import { ReactNode, useEffect, useState } from "react";

type FullScreenProps = {
  children: ReactNode;
  id?: string;
  className?: string;
  isFullScreen: boolean;
};

const FullScreen = ({
  children,
  id,
  className,
  isFullScreen,
}: FullScreenProps) => {
  const [returningToDefault, setReturningToDefault] = useState(false);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    if (!isFullScreen) {
      setReturningToDefault(true);
      timeoutId = setTimeout(() => {
        setReturningToDefault(false);
      }, 500);
    }

    return () => {
      clearTimeout(timeoutId);
    };
  }, [isFullScreen]);

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

export default FullScreen;
