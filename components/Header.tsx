import React, { useState, useEffect, useRef, useContext } from "react";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import CartScrollBar from "./CartScrollBar";
import EmptyCart from "./empty-states/EmptyCart";
import { CartContext, Init, Product } from "../context/ShoppingCart";

import useClickOutside from "../util/clickOutside";

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

  const cartItems = cart.map((product: Product) => {
    return (
      <CSSTransition
        key={product.id}
        classNames="fadeIn"
        timeout={{
          enter: 500,
          exit: 300,
        }}
      >
        <li className="cart-item" key={product.name}>
          <img className="product-image" src={product.image} alt="product" />
          <div className="product-info">
            <p className="product-name">{product.name}</p>
            <p className="product-price">{product.price}</p>
          </div>
          <div className="product-total">
            <p className="quantity">
              {product.quantity} {product.quantity > 1 ? "Nos." : "No."}{" "}
            </p>
            <p className="amount">{product.quantity * product.price}</p>
          </div>
          <button
            className="product-remove"
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
      <TransitionGroup component="ul" className="cart-items">
        {cartItems}
      </TransitionGroup>
    );
  }
  return (
    <header>
      <div className="container">
        <div className="brand">
          <img
            className="logo"
            src="https://res.cloudinary.com/sivadass/image/upload/v1493547373/dummy-logo/Veggy.png"
            alt="Veggy Brand Logo"
          />
        </div>

        <div className="search">
          <button
            className="mobile-search"
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
            className={mobileSearch ? "search-form active" : "search-form"}
          >
            <button
              className="back-button"
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
              className="search-keyword"
              value={searchValue}
              onChange={handleSearch}
            />
            <button
              className="search-button"
              type="submit"
              onClick={handleSubmit}
              aria-label="submit"
            />
          </form>
        </div>

        <div className="cart">
          <div className="cart-info">
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
          <button className="cart-icon" onClick={handleCart} type="button">
            <img
              className={bounce ? "tada" : " "}
              src="https://res.cloudinary.com/sivadass/image/upload/v1493548928/icons/bag.png"
              alt="Cart"
            />
            {totalItems ? <span className="cart-count">{totalItems}</span> : ""}
          </button>
          <div
            className={showCart ? "cart-preview active" : "cart-preview"}
            ref={cartPreview}
          >
            <CartScrollBar>{view}</CartScrollBar>
            <div className="action-block">
              <button
                type="button"
                className={cart.length > 0 ? " " : "disabled"}
              >
                PROCEED TO CHECKOUT
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
