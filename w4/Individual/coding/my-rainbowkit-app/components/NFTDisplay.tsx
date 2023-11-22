import { useEffect, useState } from "react";

interface NFTDisplayProps {
  nameIsLoading?: boolean;
  name?: string;
  totalSupplyIsLoading?: boolean;
  totalSupply?: string;
  imageUrlIsLoading?: boolean;
  imageUrl?: string;
}

const NFTDisplay = ({
  nameIsLoading,
  name,
  totalSupplyIsLoading,
  totalSupply = "n/a",
  imageUrlIsLoading,
  imageUrl,
}: NFTDisplayProps) => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    isClient && (
      <div className="text-center lg:text-left">
        <h2 className="text-2xl">{nameIsLoading ? "Loading..." : name}</h2>
        <div>
          Total supply: {totalSupplyIsLoading ? "Loading..." : totalSupply}
        </div>
        {imageUrlIsLoading ? (
          <div className="h-96 flex justify-center">
            <span className="loading loading-spinner loading-lg"></span>
          </div>
        ) : (
          <div className="max-w-md">
            <img src={imageUrl} alt="" />
          </div>
        )}
      </div>
    )
  );
};

export default NFTDisplay;
