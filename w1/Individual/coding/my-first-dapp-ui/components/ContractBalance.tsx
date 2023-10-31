import { useBalance } from "wagmi";
import { CONTRACT_ADDRESS } from "../constants";

const MessageList = () => {
  const { data } = useBalance({
    address: CONTRACT_ADDRESS,
    watch: true,
  });

  return (
    <div>
      Currently inside our piggy bank: {data?.formatted} {data?.symbol}
    </div>
  );
};

export default MessageList;
