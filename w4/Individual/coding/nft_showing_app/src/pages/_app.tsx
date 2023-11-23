import "@/styles/globals.css";
import type { AppProps } from "next/app";

import { getDefaultWallets, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { configureChains, createConfig, WagmiConfig } from "wagmi";
import { mainnet, polygon } from "wagmi/chains";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { publicProvider } from "wagmi/providers/public";

const { chains, publicClient } = configureChains(
  [mainnet, polygon],
  [
    alchemyProvider({ apiKey: "pahQdp1ViyOSuofQWIxs4dDFb0rjEo5R" }),
    publicProvider(),
  ]
);

const { connectors } = getDefaultWallets({
  appName: "Demo",
  projectId: "631e3d900609032a9571370557f3cef1",
  chains,
});

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
});


export default function App({ Component, pageProps }: AppProps) {
  
  return (
    <WagmiConfig config={wagmiConfig}>
      <RainbowKitProvider chains={chains}>
        <Component {...pageProps} />
      </RainbowKitProvider>
    </WagmiConfig>
  );
}