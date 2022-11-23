import type { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import {
  configureChains,
  createClient,
  defaultChains,
  WagmiConfig,
} from "wagmi";
import { publicProvider } from "wagmi/providers/public";

const { provider, webSocketProvider } = configureChains(defaultChains, [
  publicProvider(),
]);

const client = createClient({
  provider,
  webSocketProvider,
  autoConnect: true,
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <WagmiConfig client={client}>
      <ChakraProvider>
        <Component {...pageProps} />
      </ChakraProvider>
    </WagmiConfig>
  );
}
