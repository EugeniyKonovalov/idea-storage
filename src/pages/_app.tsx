import "../../styles/globals.css";
import type { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import theme from "../../styles/theme";
import { NextFont } from "@next/font/dist/types";
import { Inter } from "@next/font/google";
import { Provider } from "react-redux";
import store, { persistor } from "store";
import { PersistGate } from "redux-persist/integration/react";
import ProivateRoute from "providers/private_route";

const inter: NextFont = Inter({ subsets: ["latin"] });

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <main className={inter.className}>
        <ChakraProvider theme={theme}>
          <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
              <ProivateRoute>
                <Component {...pageProps} />
              </ProivateRoute>
            </PersistGate>
          </Provider>
        </ChakraProvider>
      </main>
    </>
  );
}
