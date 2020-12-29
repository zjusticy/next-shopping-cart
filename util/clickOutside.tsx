import { useEffect } from "react";

const useClickOutside = (
  closeModel: () => void,
  ref: React.RefObject<HTMLDivElement>,
  // Added to prevent event propagating to buttons
  activeCheck: boolean
) => {
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref && ref.current && !ref.current.contains(e.target as Element)) {
        if (activeCheck) {
          e.stopPropagation();
        }
        // if (activeCheck && ref.current.classList.contains("active")) {
        // inside click

        closeModel();
      }
    };

    // add when mounted
    document.addEventListener("click", handleClickOutside, true);
    // return function to be called when unmounted
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, [activeCheck, closeModel, ref]);
};

export default useClickOutside;
