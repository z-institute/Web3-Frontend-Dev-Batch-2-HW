interface FormProps {
  address: string;
  setAddress: (val: string) => void;
  tokenId: string;
  setTokenId: (val: string) => void;
  tokenIdError?: string;
}

const SAMPLE_NFT_COLLECTIONS = [
  {
    name: "BAYC",
    address: "0xBC4CA0EdA7647A8aB7C2061c2E118A18a936f13D",
  },
  {
    name: "Art Blocks",
    address: "0x059EDD72Cd353dF5106D2B9cC5ab83a52287aC3a",
  },
  {
    name: "Pudgy Penguins",
    address: "0xBd3531dA5CF5857e7CfAA92426877b022e612cf8",
  },
  {
    name: "DeGods",
    address: "0x8821BeE2ba0dF28761AffF119D66390D594CD280",
  },
];

const Form = ({ address, setAddress, tokenId, setTokenId }: FormProps) => {
  return (
    <div>
      <form>
        <div className="form-control w-full max-w-lg">
          <label className="label">
            <span className="label-text">Contract address</span>
          </label>
          <input
            className="input input-bordered w-full max-w-lg"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
          <div className="flex py-2 gap-1">
            {SAMPLE_NFT_COLLECTIONS.map((nft) => (
              <button
                key={nft.name}
                type="button"
                className="btn"
                onClick={() => setAddress(nft.address)}
              >
                {nft.name}
              </button>
            ))}
          </div>
        </div>
        <div className="form-control w-full max-w-lg">
          <label className="label">
            <span className="label-text">Token ID</span>
          </label>
          <input
            className="input input-bordered w-full max-w-lg"
            value={tokenId}
            onChange={(e) => setTokenId(e.target.value)}
          />
        </div>
      </form>
    </div>
  );
};

export default Form;
