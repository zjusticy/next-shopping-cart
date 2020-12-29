import React, { ReactNode } from "react";

import { Scrollbars } from "react-custom-scrollbars";
import useLockBodyScroll from "../../util/preventScroll";

type Props = {
  children: ReactNode;
};

/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable  jsx-a11y/no-static-element-interactions */

const CartScrollBar = ({ children }: Props) => {
  // const cartPreview = useRef(null);

  useLockBodyScroll();
  // useLayoutEffect(() => {
  //   // Get original body overflow
  //   const originalStyle = window.getComputedStyle(document.body).overflow;
  //   // Prevent scrolling on mount
  //   // console.log(originalStyle);
  //   document.body.style.overflow = "hidden";
  //   // Re-enable scrolling when component unmounts
  //   return () => {
  //     document.body.style.overflow = originalStyle;
  //   };
  // }, []); // Empty array ensures effect is only run on mount and unmount
  // useEffect(() => {
  // const handleScroll = (event: MouseEvent) => {
  //   const positions = node.current.getValues();
  //   // When the bottom is reached and we're scrolling down, prevent scrolling of the window
  //   if (positions.top >= 1) {
  //     // console.log("Reached scroll end!");
  //     event.stopPropagation();
  //   }
  // };
  // // add when mounted
  // document.addEventListener("scroll", handleScroll);
  // // return function to be called when unmounted
  // return () => {
  //   document.removeEventListener("scroll", handleScroll);
  // };
  // }, []);

  return (
    <Scrollbars style={{ width: 360, height: 350 }}>{children}</Scrollbars>
  );
};

export default CartScrollBar;
