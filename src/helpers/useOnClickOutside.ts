import { useEffect, RefObject } from "react";

const useOnClickOutside = (
  ref: RefObject<any> | RefObject<any>[],
  handleToggle: () => void,
  toggle: boolean
): void => {
  useEffect(() => {
    const checkIfClickedOutside = (e: MouseEvent) => {
      // If the menu is open and the clicked target is not within the menu,
      // then close the menu
      if (Array.isArray(ref)) {
        let outClicked = true;
        for (const r of (ref as RefObject<any>[])) {
          if (toggle && r.current && r.current.contains(e.target as Node)) {
            outClicked = false;
          }
        }
        if (outClicked) {
          handleToggle();
        }
      }
      else {
        const r = (ref as RefObject<any>);
        if (toggle && r.current && !r.current.contains(e.target as Node)) {
          handleToggle();
        }
      };
    }

    document.addEventListener("mousedown", checkIfClickedOutside);

    return () => {
      // Cleanup the event listener
      document.removeEventListener("mousedown", checkIfClickedOutside);
    };
  }, [ref, handleToggle, toggle]);
};

export default useOnClickOutside;