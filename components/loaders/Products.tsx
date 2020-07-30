import React from "react";

import Product from "./Product";

const LoadingProducts = () => {
  return (
    <div className="products loading">
      <Product />
      <Product />
      <Product />
      <Product />
      <Product />
      <Product />
      <Product />
      <Product />
    </div>
  );
};

export default LoadingProducts;
