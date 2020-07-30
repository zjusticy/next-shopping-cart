import React, { useRef } from "react";

import useClickOutside from "../util/clickOutside";

import { QuickPreview } from "../context/ShoppingCart";

type Props = {
  closeModal: () => void;
  openModalState: boolean;
  product: QuickPreview;
};

const QuickView = ({ closeModal, openModalState, product }: Props) => {
  const domNode = useRef<HTMLDivElement>();

  useClickOutside(closeModal, domNode, false);

  return (
    <div className={openModalState ? "modal-wrapper active" : "modal-wrapper"}>
      <div className="modal" ref={domNode}>
        <button type="button" className="close" onClick={closeModal}>
          &times;
        </button>
        <div className="quick-view">
          <div className="quick-view-image">
            <img src={product.image} alt={product.name} />
          </div>
          <div className="quick-view-details">
            <span className="product-name">{product.name}</span>
            <span className="product-price">{product.price}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuickView;
