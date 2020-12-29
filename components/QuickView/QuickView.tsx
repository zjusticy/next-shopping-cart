import React, { useRef } from "react";

import useClickOutside from "../../util/clickOutside";
import styles from "./QuickView.module.scss";

import { QuickPreview } from "../../context/ShoppingCart";

type Props = {
  closeModal: () => void;
  openModalState: boolean;
  product: QuickPreview;
};

const QuickView = ({ closeModal, openModalState, product }: Props) => {
  const domNode = useRef<HTMLDivElement>();

  useClickOutside(closeModal, domNode, false);

  return (
    <div
      className={
        openModalState
          ? `${styles.modalWrapper} ${styles.active}`
          : styles.modalWrapper
      }
    >
      <div className={styles.modal} ref={domNode}>
        <button type="button" className={styles.close} onClick={closeModal}>
          &times;
        </button>
        <div className={styles.quickView}>
          <div className={styles.quickViewImage}>
            <img src={product.image} alt={product.name} />
          </div>
          <div className={styles.quickViewDetails}>
            <span className={styles.productName}>{product.name}</span>
            <span className={styles.productPrice}>{product.price}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuickView;
