import React, { useState, FunctionComponent } from "react";
import { GetStaticProps } from "next";

// import axios from "axios";

import Header from "../components/Header/Header";
import Products from "../components/Products/Products";
import Footer from "../components/Footer/Footer";
import QuickView from "../components/QuickView/QuickView";

import { ProductWeb, QuickPreview } from "../context/ShoppingCart";

const Home: FunctionComponent<{ products: ProductWeb[] }> = ({ products }) => {
  const [term, setTerm] = useState<string>("");

  const [modalActive, flipModelState] = useState<boolean>(false);

  const initQuickPreview = {
    image: "blank",
    id: 0,
    price: 0,
    name: "blank",
  };

  const [quickViewProduct, setQuickViewProduct] = useState<QuickPreview>(
    initQuickPreview
  );

  // Search by Keyword
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTerm(e.target.value);
  };

  // Mobile Search Reset
  const resetSearch = () => {
    setTerm("");
  };

  // Open Modal
  const openModal = (product: QuickPreview) => {
    setQuickViewProduct(product);
    flipModelState(true);
  };

  // Close Modal
  const closeModal = () => {
    flipModelState(false);
  };

  return (
    <div className="container">
      <Header
        handleSearch={handleSearch}
        resetSearch={resetSearch}
        searchValue={term}
      />
      <Products
        productsList={products}
        searchTerm={term}
        openModal={openModal}
      />
      <Footer />
      <QuickView
        product={quickViewProduct}
        openModalState={modalActive}
        closeModal={closeModal}
      />
    </div>
  );
};
export default Home;

export const getStaticProps: GetStaticProps = async () => {
  const url =
    "https://script.google.com/macros/s/AKfycbwrtpxP95JWg2GghdxdxXDltiL101EWGhOGaJZZ0rRmedAow0t4hrQ4/exec";
  // const res = await axios.get(url);
  const res = await fetch(url);

  const data = await res.json();
  // const data = await res.data;

  return { props: { products: data } };
};
