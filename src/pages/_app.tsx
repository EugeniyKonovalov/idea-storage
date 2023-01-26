import "../../styles/globals.css";
import type { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import theme from "../../styles/theme";
import { NextFont } from "@next/font/dist/types";
import { Inter } from "@next/font/google";
import { Provider } from "react-redux";
import store from "store";

const inter: NextFont = Inter({ subsets: ["latin"] });

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <main className={inter.className}>
        <ChakraProvider theme={theme}>
          <Provider store={store}>
            <Component {...pageProps} />
          </Provider>
        </ChakraProvider>
      </main>
    </>
  );
}
