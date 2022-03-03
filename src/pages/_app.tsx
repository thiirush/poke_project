import "styles/global.css";

import "@fontsource/roboto/400.css";
import "@fontsource/roboto/700.css";

import type { AppProps } from "next/app";
import { theme } from "styles/theme";
import { ChakraProvider } from "@chakra-ui/react";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <Component {...pageProps} />
    </ChakraProvider>
  );
}

export default MyApp;
