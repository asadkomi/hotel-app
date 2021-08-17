import React from "react";
import Head from "next/head";
import { createTheme, ThemeProvider, CssBaseline } from "@material-ui/core";
import "react-toastify/dist/ReactToastify.css";
import styles from "../../styles/Layout.module.css";
import MiniDrawer from "./MiniDrawer";
import Footer from "./Footer";

const DashboardLayout = ({ children, title = "Home | Hotels Co." }) => {
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
          <MiniDrawer />
          {children}
          <Footer />
        </ThemeProvider>
      </div>
    </>
  );
};

export default DashboardLayout;
