"use client";

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

const { chains, publicClient } = configureChains(
  [
    mainnet,
    polygon,
    optimism,
    arbitrum,
    base,
    zora,
    goerli,
    sepolia,
    ...(process.env.ENABLE_TESTNETS === "true" ? [sepolia] : []),
  ],
  [alchemyProvider({ apiKey: process.env.ALCHEMY_ID || "" }), publicProvider()]
);

const projectId = process.env.WALLETCONNECT_PROJECTID || "";

const { wallets } = getDefaultWallets({
  appName: "dApp-Demo",
  projectId: projectId,
  chains,
});

const demoAppInfo = {
  appName: "Rainbowkit Demo",
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
});

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <WagmiConfig config={wagmiConfig}>
      <RainbowKitProvider chains={chains} appInfo={demoAppInfo}>
        {children}
      </RainbowKitProvider>
    </WagmiConfig>
  );
}
