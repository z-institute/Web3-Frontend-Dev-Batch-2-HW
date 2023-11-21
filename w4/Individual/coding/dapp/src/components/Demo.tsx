import { useContractRead } from "wagmi";
import { useEffect, useMemo, useState } from "react";
import axios from "axios";

import NFTabi from "./abi/basic.json";

export default function Demo({ number, tokenID }: any) {
  const [NFTData, setNFTData] = useState({} as any);
  const image = useMemo(
    () =>
      NFTData.image &&
      `https://ipfs.io/ipfs/${NFTData.image.replace("ipfs://", "")}`,
    [NFTData]
  );

  const add = NFTabi.address as `0x${string}`;
  const { data, isError, isLoading } = useContractRead({
    address: add,
    abi: NFTabi.abi,
    functionName: "tokenURI",
    args: [tokenID],
  });

  const getNFTs = async (address?: string) => {
    try {
      const res = await axios.get(
        `https://ipfs.io/ipfs/${data.replace("ipfs://", "")}`
      );
      setNFTData(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const openNFTImg = () => window.open(image);

  useEffect(() => {
    getNFTs();
  }, []);

  return (
    <div className={`flex flex-col items-center justify-between p-24`}>
      <div
        className="h-[394px] w-[394px]"
        style={{ background: "rgb(99, 99, 102)" }}
      >
        <div style={{ cursor: "pointer" }} onClick={openNFTImg}>
          <img src={image} alt="NFT" className="h-full w-full object-contain" />
        </div>
        <div className="p-2">
          <p className="text-white">{NFTData.name}</p>
          <p className="text-white">balance: {Number(number)}</p>
          <p className="text-white">tokenID: {Number(tokenID)}</p>
        </div>
      </div>
    </div>
  );
}
