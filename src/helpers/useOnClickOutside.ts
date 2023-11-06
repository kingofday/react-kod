import { useEffect, RefObject } from "react";

const useOnClickOutside = (
  ref: RefObject<HTMLElement>,
  handleToggle: () => void,
  toggle: boolean
): void => {
  useEffect(() => {
    const checkIfClickedOutside = (e: MouseEvent) => {
      // If the menu is open and the clicked target is not within the menu,
      // then close the menu
      if (toggle && ref.current && !ref.current.contains(e.target as Node)) {
        handleToggle();
      }
    };

    document.addEventListener("mousedown", checkIfClickedOutside);

    return () => {
      // Cleanup the event listener
      document.removeEventListener("mousedown", checkIfClickedOutside);
    };
  }, [ref, handleToggle, toggle]);
};

export default useOnClickOutside;