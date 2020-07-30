import React, { useContext } from "react";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import ProductItem from "./ProductItem";
import LoadingProducts from "./loaders/Products";
import NoResults from "./empty-states/NoResults";
import {
  CartContext,
  Init,
  Product,
  QuickPreview,
} from "../context/ShoppingCart";

type Props = {
  searchTerm: string;
  productsList: Product[];
  openModal: (prodect: QuickPreview) => void;
};

const Products = ({ searchTerm, productsList, openModal }: Props) => {
  const { addProduct } = useContext<Init>(CartContext);

  const term = searchTerm;

  const searchingFor = (searchText: string) => {
    return (x) => {
      return (
        x.name.toLowerCase().includes(searchText.toLowerCase()) || !searchText
      );
    };
  };

  const productsData = productsList
    .filter(searchingFor(term))
    .map((product) => {
      return (
        <CSSTransition
          key={product.id}
          classNames="fadeIn"
          timeout={{
            enter: 300,
            exit: 500,
          }}
        >
          <ProductItem
            // key={product.id}
            price={product.price}
            name={product.name}
            image={product.image}
            id={product.id}
            addToCart={addProduct}
            // productQuantity={props.productQuantity}
            openModal={openModal}
          />
        </CSSTransition>
      );
    });

  // Empty and Loading States
  let view;
  if (productsData.length <= 0 && !term) {
    view = <LoadingProducts />;
  } else if (productsData.length <= 0 && term) {
    view = <NoResults />;
  } else {
    view = (
      <TransitionGroup component="div" className="products">
        {productsData}
      </TransitionGroup>
    );
  }
  return <div className="products-wrapper">{view}</div>;
};

export default Products;
