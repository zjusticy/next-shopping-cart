import React from "react";
import styles from "./Counter.module.scss";

type Props = {
  productQuantity: number;
  updateQuantity: (qty: number) => void;
};

const Counter = ({ productQuantity, updateQuantity }: Props) => {
  const increment = () => {
    updateQuantity(productQuantity + 1);
  };

  const decrement = () => {
    if (productQuantity > 1) {
      updateQuantity(productQuantity - 1);
    }
  };

  const feed = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateQuantity(parseInt(e.target.value, 10));
  };

  // const resetQuantity = () => {
  //   updateQuantity(1);
  // };

  return (
    <div className={styles.stepperInput}>
      <button className={styles.decrement} onClick={decrement} type="button">
        –
      </button>
      <input
        type="number"
        className={styles.quantity}
        value={productQuantity}
        onChange={feed}
      />
      <button className={styles.increment} onClick={increment} type="button">
        +
      </button>
    </div>
  );
};

export default Counter;
