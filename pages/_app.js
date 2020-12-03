import Head from "next/head";
import { ThemeProvider } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Footer from "../components/Footer";
import Header from "../components/Header";
import theme from "../theme";

function MyApp({ Component, pageProps }) {
  return (
    <div>
      <Head>
        <title>Work From Home Setups</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>
      <ThemeProvider theme={theme}>
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline />
        <Header />
        <main>
          <Component {...pageProps} />
        </main>
        <Footer />
      </ThemeProvider>
    </div>
  );
}

export default MyApp;
