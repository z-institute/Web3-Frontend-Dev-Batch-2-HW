"use client";

import "../styles/globals.css";
import "@rainbow-me/rainbowkit/styles.css";
import * as React from "react";

import {
  getDefaultWallets,
  RainbowKitProvider,
  connectorsForWallets,
} from "@rainbow-me/rainbowkit";
import {
  argentWallet,
  trustWallet,
  ledgerWallet,
} from "@rainbow-me/rainbowkit/wallets";
import { configureChains, createConfig, WagmiConfig } from "wagmi";
import {
  mainnet,
  polygon,
  optimism,
  arbitrum,
  base,
  zora,
  goerli,
  sepolia,
} from "wagmi/chains";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { publicProvider } from "wagmi/providers/public";
import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  colors: {
    brand: "#B99362",
    "brand-black": "#19191A",
  },
});

import { ChakraProvider } from "@chakra-ui/react";

const { chains, publicClient, webSocketPublicClient } = configureChains(
  [
    mainnet,
    polygon,
    optimism,
    arbitrum,
    base,
    zora,
    ...(process.env.ENABLE_TESTNETS === "true" ? [sepolia, goerli] : []),
  ],
  [
    alchemyProvider({ apiKey: process.env.ALCHEMY_APIKEY || "" }),
    publicProvider(),
  ]
);

const projectId = process.env.WALLETCONNECT_PROJECTID || "";

const { wallets } = getDefaultWallets({
  appName: "dApp-Demo",
  projectId: projectId,
  chains,
});

const demoAppInfo = {
  appName: "Web3 Namecard",
};

const connectors = connectorsForWallets([
  ...wallets,
  {
    groupName: "Other",
    wallets: [
      argentWallet({ projectId, chains }),
      trustWallet({ projectId, chains }),
      ledgerWallet({ projectId, chains }),
    ],
  },
]);

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
  webSocketPublicClient,
});

export default function Provider({ children }: { children: React.ReactNode }) {
  return (
    <ChakraProvider theme={theme}>
      <WagmiConfig config={wagmiConfig}>
        <RainbowKitProvider chains={chains} appInfo={demoAppInfo}>
          {children}
        </RainbowKitProvider>
      </WagmiConfig>
    </ChakraProvider>
  );
}
