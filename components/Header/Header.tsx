import React, { useState, useEffect, useRef, useContext } from "react";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import CartScrollBar from "../CartScrollBar/CartScrollBar";
import EmptyCart from "../empty-states/EmptyCart/EmptyCart";
import { CartContext, Init, ProductLocal } from "../../context/ShoppingCart";
import styles from "./Header.module.scss";

import useClickOutside from "../../util/clickOutside";

/* eslint-disable consistent-return */

type Props = {
  handleSearch: (e: React.ChangeEvent<HTMLInputElement>) => void;
  resetSearch: () => void;
  searchValue: string;
};

const Header = ({ handleSearch, resetSearch, searchValue }: Props) => {
  const [showCart, flipState] = useState<boolean>(false);
  const [mobileSearch, setSearch] = useState<boolean>(false);

  const {
    cart,
    totalItems,
    totalAmount,
    removeProduct,
    bounce,
    bouceEnd,
  } = useContext<Init>(CartContext);

  const cartPreview = useRef<HTMLDivElement>();

  useEffect(() => {
    if (bounce) {
      const timer1 = setTimeout(() => bouceEnd(), 1000);
      // this will clear Timeout when component unmount like in willComponentUnmount
      return () => {
        clearTimeout(timer1);
      };
    }
  }, [bounce, bouceEnd]);

  const handleCart = () => {
    flipState((prevCart) => !prevCart);
  };

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
  };

  const handleMobileSearch = () => {
    setSearch(true);
  };

  const handleSearchNav = () => {
    setSearch(false);
    resetSearch();
  };

  useClickOutside(() => flipState(false), cartPreview, true);

  const cartItems = cart.map((product: ProductLocal) => {
    return (
      <CSSTransition
        key={product.id}
        classNames="fadeIn"
        timeout={{
          enter: 500,
          exit: 300,
        }}
      >
        <li className={styles.cartItem} key={product.name}>
          <img
            className={styles.productImage}
            src={product.image}
            alt="product"
          />
          <div className={styles.productInfo}>
            <p className={styles.productName}>{product.name}</p>
            <p className={styles.productPrice}>{product.price}</p>
          </div>
          <div className={styles.productTotal}>
            <p className={styles.quantity}>
              {product.quantity} {product.quantity > 1 ? "Nos." : "No."}{" "}
            </p>
            <p className={styles.amount}>{product.quantity * product.price}</p>
          </div>
          <button
            className={styles.productRemove}
            onClick={() => removeProduct(product.id)}
            type="button"
          >
            ×
          </button>
        </li>
      </CSSTransition>
    );
  });
  let view;
  if (cartItems.length <= 0) {
    view = <EmptyCart />;
  } else {
    view = (
      <TransitionGroup component="ul" className={styles.cartItems}>
        {cartItems}
      </TransitionGroup>
    );
  }

  let cartBox = null;

  if (showCart)
    cartBox = (
      <div
        className={`${styles.cartPreview} ${styles.active}`}
        ref={cartPreview}
      >
        <CartScrollBar>{view}</CartScrollBar>
        <div className={styles.actionBlock}>
          <button
            type="button"
            className={cart.length > 0 ? " " : styles.disabled}
          >
            PROCEED TO CHECKOUT
          </button>
        </div>
      </div>
    );

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.brand}>
          <img
            className={styles.logo}
            src="https://res.cloudinary.com/sivadass/image/upload/v1493547373/dummy-logo/Veggy.png"
            alt="Veggy Brand Logo"
          />
        </div>

        <div className={styles.search}>
          <button
            className={styles.mobileSearch}
            onClick={handleMobileSearch}
            type="button"
          >
            <img
              src="https://res.cloudinary.com/sivadass/image/upload/v1494756966/icons/search-green.png"
              alt="search"
            />
          </button>
          <form
            action="#"
            method="get"
            className={
              mobileSearch
                ? `${styles.searchForm} ${styles.active}`
                : `${styles.searchForm}`
            }
          >
            <button
              className={styles.backButton}
              onClick={handleSearchNav}
              type="button"
            >
              <img
                src="https://res.cloudinary.com/sivadass/image/upload/v1494756030/icons/back.png"
                alt="back"
              />
            </button>
            <input
              type="search"
              placeholder="Search for Vegetables and Fruits"
              className={styles.searchKeyword}
              value={searchValue}
              onChange={handleSearch}
            />
            <button
              className={styles.searchButton}
              type="submit"
              onClick={handleSubmit}
              aria-label="submit"
            />
          </form>
        </div>

        <div className={styles.cart}>
          <div className={styles.cartInfo}>
            <table>
              <tbody>
                <tr>
                  <td>No. of items</td>
                  <td>:</td>
                  <td>
                    <strong>{totalItems}</strong>
                  </td>
                </tr>
                <tr>
                  <td>Sub Total</td>
                  <td>:</td>
                  <td>
                    <strong>{totalAmount}</strong>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <button
            className={styles.cartIcon}
            onClick={handleCart}
            type="button"
          >
            <img
              className={bounce ? styles.tada : " "}
              src="https://res.cloudinary.com/sivadass/image/upload/v1493548928/icons/bag.png"
              alt="Cart"
            />
            {totalItems ? (
              <span className={styles.cartCount}>{totalItems}</span>
            ) : (
              ""
            )}
          </button>
          {cartBox}
        </div>
      </div>
    </header>
  );
};

export default Header;
