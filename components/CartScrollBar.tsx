import React, { useRef, useEffect, ReactNode } from "react";
import { Scrollbars } from "react-custom-scrollbars";

type Props = {
  children: ReactNode;
};

/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable  jsx-a11y/no-static-element-interactions */

const CartScrollBar = ({ children }: Props) => {
  const node = useRef(null);

  const handleScroll = (event: MouseEvent) => {
    const positions = node.current.getValues();
    // When the bottom is reached and we're scrolling down, prevent scrolling of the window
    if (positions.top >= 1) {
      // console.log("Reached scroll end!");
      event.stopPropagation();
    }
  };
  useEffect(() => {
    // add when mounted
    document.addEventListener("scroll", handleScroll);
    // return function to be called when unmounted
    return () => {
      document.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <Scrollbars style={{ width: 360, height: 320 }} ref={node}>
      {children}
    </Scrollbars>
  );
};

export default CartScrollBar;
