import "../styles/globals.css";
import type { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import { QueryClientProvider, QueryClient } from "react-query";
import { CookiesProvider } from "react-cookie";
import Head from "next/head";

import theme from "../styles/theme";

import { Web3ContextProvider } from "../context/Web3Context";
import { AuthContextProvider } from "../context/AuthContext";

import Web3 from "web3";
import { Web3ReactProvider } from "@web3-react/core";

function MyApp({ Component, pageProps }: AppProps) {
  const queryClient = new QueryClient();

  // Qubic
  const library = (provider: any): Web3 => {
    console.log({
      "provider.isQubic": provider.isQubic,
    });
    return new Web3(provider);
  };

  return (
    <ChakraProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <CookiesProvider>
          <Web3ContextProvider>
            <Web3ReactProvider getLibrary={library}>
              <AuthContextProvider>
                <>
                  <Head>
                    <title>
                      Metalion 宙獅計劃 🌐 虛實結合，展望元宇宙商務賦能
                    </title>
                  </Head>
                  <Component {...pageProps} />
                </>
              </AuthContextProvider>
            </Web3ReactProvider>
          </Web3ContextProvider>
        </CookiesProvider>
      </QueryClientProvider>
    </ChakraProvider>
  );
}

export default MyApp;
