import type { AppProps } from "next/app";

import { NextUIProvider } from "@nextui-org/react";

import "@/styles/globals.css";
import { darkTheme } from "../themes/darktheme";
import { AppProvider } from "@/store";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <NextUIProvider theme={darkTheme}>
      <AppProvider>
        <Component {...pageProps} />
      </AppProvider>
    </NextUIProvider>
  );
}
