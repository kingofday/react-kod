import { useEffect } from "react";

 const useLockBodyScroll = (toggleState: boolean): void => {
  useEffect(() => {
    const originalStyle = window.getComputedStyle(document.body).overflow;
    if (toggleState) {
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.body.style.overflow = originalStyle;
    };
  }, [toggleState]); 
};
export default useLockBodyScroll