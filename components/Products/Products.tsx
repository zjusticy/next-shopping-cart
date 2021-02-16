import React, { useContext } from "react";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import ProductItem from "./ProductItem/ProductItem";
// import LoadingProducts from "./loaders/Products";
import NoResults from "../empty-states/NoResults/NoResults";
import styles from "./Products.module.scss";
import {
  CartContext,
  Init,
  ProductWeb,
  QuickPreview,
} from "../../context/ShoppingCart";

type Props = {
  searchTerm: string;
  productsList: ProductWeb[];
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
            id={parseInt(product.id, 10)}
            unit={product.unit}
            addToCart={addProduct}
            // productQuantity={props.productQuantity}
            openModal={openModal}
          />
        </CSSTransition>
      );
    });

  // Empty and Loading States
  let view;
  // if (productsData.length <= 0 && !term) {
  //   view = <LoadingProducts />;
  // } else
  if (productsData.length <= 0 && term) {
    view = <NoResults />;
  } else {
    view = (
      <TransitionGroup component="div" className={styles.products}>
        {productsData}
      </TransitionGroup>
    );
  }
  return <div className={styles.productsWrapper}>{view}</div>;
};

export default Products;
