import { useContractRead } from "wagmi";
import { watchContractEvent } from "@wagmi/core";
import messageBoard from "../abi/MessageBoard.json";
import { CONTRACT_ADDRESS } from "../constants";

interface Message {
  message: string;
  from: string;
}

const truncateAddress = (address: string) => {
  if (!address) {
    return "";
  }

  return `${address.slice(0, 4)}...${address.slice(-4)}`;
};

const MessageItem = ({ item }: { item: Message }) => (
  <div>
    {truncateAddress(item.from)}: {item.message}
  </div>
);

const MessageList = ({ paid }: { paid?: boolean }) => {
  const { data, isError, isLoading, refetch } = useContractRead({
    address: CONTRACT_ADDRESS,
    abi: messageBoard.abi,
    functionName: paid ? "getPaidMessages" : "getMessages",
    watch: true,
  });

  const unwatch = watchContractEvent(
    {
      address: CONTRACT_ADDRESS,
      abi: messageBoard.abi,
      eventName: "NewMessage",
    },
    (log) => {
      console.log(log);
      refetch();
    }
  );

  if (isLoading) {
    return <div>Fetching messages...</div>;
  }

  return (
    <div>
      {(data as Message[])?.toReversed()?.map((msg, idx) => (
        <MessageItem key={`${msg.message}-${idx}`} item={msg} />
      ))}
    </div>
  );
};

export default MessageList;
