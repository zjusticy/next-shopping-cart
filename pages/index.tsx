import React, { useState, FunctionComponent } from "react";
import { GetServerSideProps } from "next";

import axios from "axios";

import Header from "../components/Header";
import Products from "../components/Products";
import Footer from "../components/Footer";
import QuickView from "../components/QuickView";

import { Product, QuickPreview } from "../context/ShoppingCart";

const Home: FunctionComponent<{ products: Product[] }> = ({
  products,
}: {
  products: Product[];
}) => {
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

export const getServerSideProps: GetServerSideProps = async () => {
  const url =
    "https://res.cloudinary.com/sivadass/raw/upload/v1535817394/json/products.json";
  const res = await axios.get(url);

  const data = await res.data;

  return { props: { products: data } };
};
