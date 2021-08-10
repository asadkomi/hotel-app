import { useEffect } from "react";
import { wrapper } from "../redux/store/store";
import { SnackbarProvider } from "notistack";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);
  return (
    <SnackbarProvider anchorOrigin={{ vertical: "bottom", horizontal: "left" }}>
      <Component {...pageProps} />
    </SnackbarProvider>
  );
}

export default wrapper.withRedux(MyApp);
