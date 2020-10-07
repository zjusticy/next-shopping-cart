import { useEffect } from "react";

const useClickOutside = (
  closeModel: () => void,
  ref: React.RefObject<HTMLDivElement>,
  activeCheck: boolean
) => {
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (activeCheck && ref.current.classList.contains("active")) {
        if (!ref || !ref.current.contains(e.target as Element)) {
          // inside click
          closeModel();
          e.stopPropagation();
        }
      } else if (!ref || !ref.current.contains(e.target as Element)) {
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
