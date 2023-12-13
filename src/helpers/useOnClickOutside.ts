import { useEffect, RefObject } from "react";

const useOnClickOutside = (
  ref: RefObject<any> | RefObject<any>[],
  handleToggle: () => void
): void => {
  useEffect(() => {
    const checkIfClickedOutside = (e: MouseEvent) => {
      if (Array.isArray(ref)) {
        let outClicked = true;
        for (const r of (ref as RefObject<any>[])) {
          if (r.current && r.current.contains(e.target as Node)) {
            outClicked = false;
            break;
          }
        }
        if (outClicked) {
          handleToggle();
        }
      }
      else {
        const r = (ref as RefObject<any>);
        if (r.current && !r.current.contains(e.target as Node)) {
          handleToggle();
        }
      };
    }

    document.addEventListener("mousedown", checkIfClickedOutside);

    return () => {
      // Cleanup the event listener
      document.removeEventListener("mousedown", checkIfClickedOutside);
    };
  }, [handleToggle]);
};

export default useOnClickOutside;