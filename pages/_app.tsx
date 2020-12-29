import "../scss/base.scss";

import React from "react";

import Head from "next/head";
import { DEFAULT_SEO } from "../config";

import { CartProvider } from "../context/ShoppingCart";

/* eslint-disable react/jsx-props-no-spreading */

// This default export is required in a new `pages/_app.js` file.
export default function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title key="title">{DEFAULT_SEO.title}</title>
        <meta name="description" content={DEFAULT_SEO.description} />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css?family=Roboto:300,400,700"
        />
        <link
          rel="prefetch"
          href="https://res.cloudinary.com/sivadass/image/upload/v1494699523/icons/bare-tree.png"
        />
      </Head>
      <CartProvider>
        <Component {...pageProps} />
      </CartProvider>
    </>
  );
}
