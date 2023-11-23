import { ConnectButton } from "@rainbow-me/rainbowkit";
import "@rainbow-me/rainbowkit/styles.css";
import { useContractRead } from "wagmi";
import NFTabi from "../components/abi/basic.json";
import Demo from "./demo";
import {  useEffect, useState } from "react";

const ipfsGateway = (uri: string) =>
  uri.replace("ipfs://", "https://ipfs.io/ipfs/");
  
export default function Home() {
  const [tokenID, setTokenID] = useState("");
  const add = NFTabi.address as `0x${string}`;
  // const [tokenID, setTokenId] = useState("2911");
  // let bigIntTokenId = BigInt("");
  // try {
  //   bigIntTokenId = BigInt(tokenID);
  // } catch (err) {
  //   console.error(err);
  // }

  const { isLoading: totalSupplyIsLoading, data: totalSupply } =
    useContractRead({
      address: add as `0x${string}`,
      abi: NFTabi.abi,
      functionName: "totalSupply",
    });
  console.log("totalSupply:",totalSupply);
    
  const { isLoading: tokenURIIsLoading, data: tokenURI } = useContractRead({
    address: add as `0x${string}`,
    abi: NFTabi.abi,
    functionName: "tokenURI",
    args: [tokenID],
  });
  console.log("tokenURI:",tokenURI);
  
  const [imageURL, setImageURL] = useState("");
  const [name ,setName] = useState("");
  useEffect(() => {
    const fetchData = async () => {
      if (!tokenURI) {
        return;
      }
      try {
        
        const response = await fetch(ipfsGateway(tokenURI as string));
        const data = await response.json();
        console.log("data:",data);
        
        setImageURL(ipfsGateway(data.image));
        setName(data.name);
      } catch (err) {
        console.error(err);
        return;
      }
    };

    fetchData();
  }, [tokenURI]);


  const [placeholderText, setPlaceholderText] = useState("Loading...");

  useEffect(() => {
    // This will only set the placeholder text once the component has mounted on the client side
    if (!totalSupplyIsLoading && totalSupply !== undefined) {
      setPlaceholderText(`Search with tokenID between 0~${Number(totalSupply) - 1}`);
    }
  }, [totalSupplyIsLoading, totalSupply]);

  return (
      <main
      >
        <div className="flex flex-col items-center p-3">
          <ConnectButton/>
        </div>
        {/* Search by tokenID */}
        <form className="m-8 flex justify-center items-center">    
            <label htmlFor="search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
            <div className="relative w-2/3">
                <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                    <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                    </svg>
                </div>
                <input
                  type="search"
                  id="search"
                  className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder={placeholderText}
                  required
                  value={tokenID}
                  onChange={(e) => setTokenID(e.target.value)}
                />
            </div>
        </form>

        <Demo name={name} imageURL={imageURL} />
      </main>
  );
}
