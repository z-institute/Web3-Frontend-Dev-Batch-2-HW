"use client";

import { ConnectButton } from "@rainbow-me/rainbowkit";

import { useAccount, useContractRead } from "wagmi";
import NFTabi from "./components/abi/RamonDemoNFT.json";
import NFTDisplay from "./nft-display/page";

export default function Home() {
  const { address, isConnecting, isDisconnected } = useAccount();
  const add = NFTabi.address as `0x${string}`;

  const { data, isError, isLoading } = useContractRead({
    address: add,
    abi: NFTabi.abi,
    functionName: "balanceOf",
    args: ["0x70eDa64ed775789342762013A156b4A37514B63b"], //owner address
  });
  // const { data: tokenID } = useContractRead({
  //   address: add,
  //   abi: NFTabi.abi,
  //   functionName: "tokenOfOwnerByIndex",
  //   args: ["0x70eDa64ed775789342762013A156b4A37514B63b", 4],
  // });

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="flex flex-col flex-end p-3">
        <ConnectButton />

        <NFTDisplay number={data} tokenID={"4"} />
      </div>
    </main>
  );
}
