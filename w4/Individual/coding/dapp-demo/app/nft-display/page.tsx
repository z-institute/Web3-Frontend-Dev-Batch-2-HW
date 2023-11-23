"use client";

import "@rainbow-me/rainbowkit/styles.css";
import { useContractRead } from "wagmi";
import NFTabi from "@components/abi/RamonDemoNFT.json";
import { Suspense, useState } from "react";
import axios from "axios";

export default function NFTDisplay({ ...props }: any) {
  const { number, tokenID } = props;

  const add = NFTabi.address as `0x${string}`;
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState("");
  const [NFTData, setNFTData] = useState({} as any);

  const { data, isError, isLoading } = useContractRead({
    address: add,
    abi: NFTabi.abi,
    functionName: "tokenURI",
    args: [tokenID],
  });

  const getNFTs = async (address?: string) => {
    setLoading(true);
    console.log(data);
    try {
      const res = await axios.get(
        "https://ipfs.io/ipfs/bafkreid3dpobfzozvgtuem4z7bsboz2n3dfb2t6leaq6rceggrqa5zq4u4"
      );
      const imageURL = new URL(res.data.image);
      const imageCID = imageURL.pathname.slice(2);
      console.log(imageURL.pathname, imageCID);
      setImage("https://ipfs.io/ipfs/" + imageCID);
      setNFTData(res.data);
      console.log(res.data);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  return (
    <div className={`flex flex-col items-center justify-between p-24`}>
      <a className="text-white">balance: {number && Number(number)}</a>
      <a className="text-white">tokenID: {tokenID && Number(tokenID)}</a>
      <div className="h-[394px] w-[394px]">
        {image && (
          <img src={image} alt="NFT" className="h-full w-full object-contain" />
        )}
      </div>
      <div className="text-[32px] text-white">{NFTData.name}</div>
      <div className="text-white">tokenURI: {isLoading ? "" : ""}</div>
      <button
        onClick={() => getNFTs()}
        className="p-10 bg-white text-black rounded-3xl hover:opacity-30 hover:text-white"
      >
        getImage
      </button>
    </div>
  );
}
