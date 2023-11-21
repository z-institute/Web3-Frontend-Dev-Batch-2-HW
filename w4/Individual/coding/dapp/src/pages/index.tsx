import { Suspense } from "react";
import { Inter } from "next/font/google";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount, useContractRead } from "wagmi";
import NFTabi from "../components/abi/basic.json";

import Demo from "../components/demo";

const inter = Inter({ subsets: ["latin"] });
export default function Home() {
  const { address, isConnecting, isDisconnected } = useAccount();
  const add = NFTabi.address as `0x${string}`;
  const { data, isError, isLoading } = useContractRead({
    address: add,
    abi: NFTabi.abi,
    functionName: "balanceOf",
    args: ["0xcb415344Cd0fC552CE7B48EE9375991Ff5865895"],
  });

  const { data: tokenIndex } = useContractRead({
    address: add,
    abi: NFTabi.abi,
    functionName: "tokenOfOwnerByIndex",
    args: ["0xcb415344Cd0fC552CE7B48EE9375991Ff5865895", 0],
  });

  return (
    <Suspense>
      <main
        className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}
      >
        <ConnectButton />
        <Demo number={data} tokenID={tokenIndex} />
        {/* <a className="text-white">
        balance: {isLoading ? "waiting..." : Number(data)}
      </a> */}
      </main>
    </Suspense>
  );
}
