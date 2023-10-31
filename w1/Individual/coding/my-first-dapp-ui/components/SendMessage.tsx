import React from "react";
import {
  useContractWrite,
  usePrepareContractWrite,
  useWaitForTransaction,
} from "wagmi";
import { useDebounce } from "usehooks-ts";

import messageBoard from "../abi/MessageBoard.json";
import { CONTRACT_ADDRESS } from "../constants";
import { parseEther } from "viem";

const SendMessage = () => {
  const [formData, setFormData] = React.useState({
    message: "",
    isPaidMessage: false,
  });
  const debouncedMessage = useDebounce(formData.message, 500);

  const { config } = usePrepareContractWrite({
    address: CONTRACT_ADDRESS,
    abi: messageBoard.abi,
    functionName: "writeMessage",
    args: [debouncedMessage, formData.isPaidMessage],
    value: formData.isPaidMessage ? parseEther("0.1") : parseEther("0"),
  });

  const { data, write } = useContractWrite(config);

  const { isLoading } = useWaitForTransaction({
    hash: data?.hash,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleToggle = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: checked,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    write?.();
  };

  return (
    <div>
      <form className="flex flex-col" onSubmit={handleSubmit}>
        <label className="text-sm text-gray-600 dark:text-gray-200 mb-2">
          Post a message
        </label>
        <textarea
          className="dark:text-gray-900 resize-y p-3 rounded-md shadow-sm border border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
          placeholder="Hello world"
          name="message"
          disabled={isLoading}
          value={formData.message}
          onChange={handleChange}
        />
        <label className="text-sm text-gray-600 dark:text-gray-200 my-2">
          <input
            type="checkbox"
            name="isPaidMessage"
            checked={formData.isPaidMessage}
            onChange={handleToggle}
          />{" "}
          Promote my message (0.1 eth)
        </label>
        <div className="flex justify-end py-4">
          <button
            disabled={isLoading}
            className="bg-blue-500 hover:bg-blue-700 disabled:bg-blue-200 text-white font-bold py-2 px-4 rounded"
          >
            {isLoading ? "Submitting..." : "Submit"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default SendMessage;
