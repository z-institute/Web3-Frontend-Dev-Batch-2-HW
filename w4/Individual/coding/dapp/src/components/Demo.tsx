import { useAccount, useContractRead } from "wagmi";
import { Suspense, useState } from "react";
import axios from "axios";

import NFTabi from "./abi/basic.json";

export default function Demo({ number, tokenID }: any) {
  console.log(Number(number), Number(tokenID));

  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState("");
  const [NFTData, setNFTData] = useState({} as any);

  const add = NFTabi.address as `0x${string}`;
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
        "https://bafybeiambgfilw53az2jo43udnleq76z6er2l56abp6xirgabwt4guqllu.ipfs.dweb.link/6792.json"
      );
      setImage(res.data.image);
      setNFTData(res.data);
      console.log(res.data);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  return (
    <div className={`flex flex-col items-center justify-between p-24`}>
      <a className="text-white">balance: {Number(number)}</a>
      <a className="text-white">tokenID: {Number(tokenID)}</a>
      <a className="text-white">tokenURI: {data as string}</a>
      <div className="h-[394px] w-[394px]">
        <img
          src="https://ipfs.io/ipfs/QmYDvPAXtiJg7s8JdRBSLWdgSphQdac8j1YuQNNxcGE1hg/6962.png"
          alt="NFT"
          className="h-full w-full object-contain"
        />
      </div>

      <button
        onClick={() => getNFTs()}
        className="p-10 bg-white text-black rounded-3xl hover:opacity-30 hover:text-white"
      >
        getImage
      </button>
    </div>
  );
}
