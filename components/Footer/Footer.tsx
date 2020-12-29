import React from "react";
import styles from "./Footer.module.scss";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <p className="footer-links">
        <a
          href="https://github.com/zjusticy/next-shopping-cart"
          target="_blank"
          rel="noreferrer"
        >
          View Source on Github
        </a>
        <span> / </span>
        <a href="mailto:tzhu618@gmail.com" target="_blank" rel="noreferrer">
          Need any help?
        </a>
        <span> / </span>
        <a
          href="https://zjusticy.github.io/blog"
          target="_blank"
          rel="noreferrer"
        >
          Read My Blog
        </a>
      </p>
      <p>
        &copy; 2020 <strong>Veggy</strong> - Organic Green Store
      </p>
    </footer>
  );
};

export default Footer;
