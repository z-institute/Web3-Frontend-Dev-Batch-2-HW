import { useContractRead, erc721ABI } from "wagmi";
import type { NextPage } from "next";
import Head from "next/head";
import { useEffect, useState } from "react";
import Form from "@/components/Form";
import NFTDisplay from "@/components/NFTDisplay";

const ipfsGateway = (uri: string) =>
  uri.replace("ipfs://", "https://ipfs.io/ipfs/");

const Home: NextPage = () => {
  const [address, setAddress] = useState(
    process.env.NEXT_PUBLIC_ERC721_ADDRESS || ""
  );
  const [tokenId, setTokenId] = useState("2911");
  let bigIntTokenId = BigInt("");
  try {
    bigIntTokenId = BigInt(tokenId);
  } catch (err) {
    console.error(err);
  }

  const { isLoading: nameIsLoading, data: name } = useContractRead({
    address: address as `0x${string}`,
    abi: erc721ABI,
    functionName: "name",
  });

  const { isLoading: totalSupplyIsLoading, data: totalSupply } =
    useContractRead({
      address: address as `0x${string}`,
      abi: erc721ABI,
      functionName: "totalSupply",
    });

  const { isLoading: tokenURIIsLoading, data: tokenURI } = useContractRead({
    address: address as `0x${string}`,
    abi: erc721ABI,
    functionName: "tokenURI",
    args: [bigIntTokenId],
  });

  const [metadataIsLoading, setMetadataIsLoading] = useState(true);
  const [metadata, setMetadata] = useState();
  const [imageUrlIsLoading, setImageUrlIsLoading] = useState(true);
  const [imageUrl, setImageUrl] = useState("");
  useEffect(() => {
    const fetchData = async () => {
      if (!tokenURI) {
        return;
      }

      setMetadataIsLoading(true);
      setImageUrlIsLoading(true);
      try {
        const response = await fetch(ipfsGateway(tokenURI));
        const data = await response.json();

        setMetadata(data);
        setMetadataIsLoading(false);

        setImageUrl(ipfsGateway(data.image));
        setImageUrlIsLoading(false);
      } catch (err) {
        console.error(err);
        return;
      }
    };

    fetchData();
  }, [tokenURI]);

  return (
    <div className="container max-w-5xl mx-auto">
      <Head>
        <title>NFT Viewer</title>
        <meta
          content="A demo app for displaying NFT collections"
          name="description"
        />
        <link href="/favicon.ico" rel="icon" />
      </Head>

      <main className="py-8 flex flex-col">
        <h1 className="mb-8 text-6xl font-bold text-center">NFT Viewer</h1>
        <div className="flex flex-col lg:flex-row px-4 lg:px-0 gap-2">
          <div className="flex flex-col lg:w-1/2 lg:pr-4 gap-y-2">
            <Form
              address={address}
              setAddress={setAddress}
              tokenId={tokenId}
              setTokenId={setTokenId}
            />
            <div>
              <label className="label">
                <span className="label-text">Metadata</span>
              </label>
              {metadataIsLoading ? (
                <div className="h-64 flex justify-center">
                  <span className="loading loading-spinner loading-lg"></span>
                </div>
              ) : (
                <div className="mockup-code">
                  <pre>
                    <code>{JSON.stringify(metadata, null, 2)}</code>
                  </pre>
                </div>
              )}
            </div>
          </div>
          <div className="flex lg:w-1/2 max-lg:order-first justify-center lg:justify-normal">
            <NFTDisplay
              nameIsLoading={nameIsLoading}
              name={name}
              totalSupplyIsLoading={totalSupplyIsLoading}
              totalSupply={totalSupply?.toString()}
              imageUrlIsLoading={imageUrlIsLoading}
              imageUrl={imageUrl}
            />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;
