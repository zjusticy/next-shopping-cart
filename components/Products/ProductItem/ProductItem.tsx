import React, { useState, useEffect } from "react";
import Counter from "../../Counter/Counter";
import styles from "./ProductItem.module.scss";

import { ProductLocal, QuickPreview } from "../../../context/ShoppingCart";

/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable consistent-return */
/* eslint-disable  jsx-a11y/no-static-element-interactions */
/* eslint-disable  jsx-a11y/interactive-supports-focus */

type Props = {
  addToCart: (prodect: ProductLocal) => void;
  openModal: (prodect: QuickPreview) => void;
  id: number;
  price: number;
  image: string;
  name: string;
  unit: string;
};

const ProductItem = ({
  addToCart,
  openModal,
  id,
  price,
  image,
  name,
  unit,
}: Props) => {
  const [quantity, updateQuantity] = useState<number>(1);
  const [isAdded, setAddState] = useState<boolean>(false);

  useEffect(() => {
    if (!isAdded) {
      return;
    }
    const timer1 = setTimeout(() => setAddState(false), 3500);
    // this will clear Timeout when component unmount like in willComponentUnmount
    return () => {
      clearTimeout(timer1);
    };
  }, [isAdded]);

  const addButtonClicked = (
    imageLocal: string,
    nameLocal: string,
    priceLocal: number,
    idLocal: number,
    unitLocal: string,
    quantityLocal: number
  ) => {
    const selectedProduct = {
      image: imageLocal,
      name: nameLocal,
      price: priceLocal,
      id: idLocal,
      quantity: quantityLocal,
      unit: unitLocal,
    };
    addToCart(selectedProduct);
    setAddState(true);
  };

  const quickView = (
    quickImage: string,
    quickName: string,
    quickPrice: number,
    quickId: number
  ) => {
    const quickViewProduct = {
      image: quickImage,
      name: quickName,
      price: quickPrice,
      id: quickId,
    };
    openModal(quickViewProduct);
  };

  // let quantity = props.productQuantity;
  return (
    <div className={styles.productWrapper}>
      <div className={styles.product}>
        <div className={styles.outline}>
          <div
            className={styles.productImage}
            onClick={() => quickView(image, name, price, id)}
            role="button"
          >
            <img src={image} alt={name} />
          </div>
          <h4 className={styles.productName}>{`${name} - ${unit}`}</h4>
          <p className={styles.productPrice}>{price}</p>
          <Counter productQuantity={quantity} updateQuantity={updateQuantity} />
          <div className={styles.productAction}>
            <button
              className={!isAdded ? "" : styles.added}
              type="button"
              onClick={() =>
                addButtonClicked(image, name, price, id, unit, quantity)
              }
            >
              {!isAdded ? "ADD TO CART" : "✔ ADDED"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductItem;
