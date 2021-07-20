import React from "react";
import Head from "next/head";

import Navbar from "./Navbar";

import Footer from "./Footer";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styles from "../../styles/Layout.module.css";

const Layout = ({ children, title = "5 Star Hotel Rooms" }) => {
  return (
    <>
      <div className={styles.container}>
        <Head>
          <title>{title}</title>
          <meta charSet="utf-8" />
          <meta
            name="viewport"
            content="initial-scale=1.0, width=device-width"
          />
        </Head>
        <Navbar />
        {children}
        <Footer />
      </div>
    </>
  );
};

export default Layout;
