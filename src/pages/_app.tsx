import FallbackComponent from "@/components/FallbackComponent";
import WalletProvider from "@/contexts/WalletContext";
import Web3Provider from "@/contexts/Web3Context";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Roboto } from "next/font/google";
import { ErrorBoundary } from "react-error-boundary";

const roboto = Roboto({
  weight: ["400", "700"],
  style: ["normal", "italic"],
  subsets: ["latin"],
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ErrorBoundary FallbackComponent={FallbackComponent}>
      <main className={roboto.className}>
        <Web3Provider>
          <WalletProvider>
            <Component {...pageProps} />
          </WalletProvider>
        </Web3Provider>
      </main>
    </ErrorBoundary>
  );
}
