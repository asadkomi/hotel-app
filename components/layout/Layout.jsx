import React from "react";
import Head from "next/head";

import {
  Typography,
  Container,
  createTheme,
  ThemeProvider,
  CssBaseline,
} from "@material-ui/core";

import Navbar from "./Navbar";

import Footer from "./Footer";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styles from "../../styles/Layout.module.css";

const Layout = ({ children, title = "Home | Hotels Co." }) => {
  const theme = createTheme({
    typography: {
      h1: {
        fontSize: "1.6rem",
        fontWeight: 400,
        margin: "1rem 0",
      },
      h2: {
        fontSize: "1.4rem",
        fontWeight: 400,
        margin: "1rem 0",
      },

      body1: {
        fontWeight: "normal",
      },
    },
    palette: {
      // type: darkMode ? "dark" : "light",
      primary: {
        main: "#982479",
      },
      secondary: {
        main: "#6B63FF",
      },
    },
  });
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
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Navbar />
          <ToastContainer position="bottom-right" />
          {children}
          <Footer />
        </ThemeProvider>
      </div>
    </>
  );
};

export default Layout;
