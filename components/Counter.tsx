import React from "react";

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
    <div className="stepper-input">
      <button className="decrement" onClick={decrement} type="button">
        –
      </button>
      <input
        type="number"
        className="quantity"
        value={productQuantity}
        onChange={feed}
      />
      <button className="increment" onClick={increment} type="button">
        +
      </button>
    </div>
  );
};

export default Counter;
