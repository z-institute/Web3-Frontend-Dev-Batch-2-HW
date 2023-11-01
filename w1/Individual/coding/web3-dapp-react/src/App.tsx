import {useEffect, useState} from 'react';
import {Contract, ethers} from 'ethers';
import Web3Modal from 'web3modal';
import {contractABI} from './data/abi';

const web3modal = new Web3Modal({
  network: 'goerli',
  providerOptions: {},
});

type AccountType = {
  address: string;
  balance: string;
  ensAddress: string | null;
};

function App() {
  const [contract, setContract] = useState<Contract>();
  const [account, setAccount] = useState<AccountType>({
    address: '',
    balance: '',
    ensAddress: '',
  });
  const [messages, setMessages] = useState({
    message: '',
    paidMessage: '',
  });
  const contractAddress = '0xD81677E7008024eE677dfEB7552D55a23197b460';
  useEffect(() => {
    async function init() {
      const instance = await web3modal.connect();
      const provider = new ethers.BrowserProvider(instance);
      const singer = await provider.getSigner();
      const address = await singer.getAddress();
      const balance = await provider.getBalance(address);
      const ensAddress = await provider.lookupAddress(address);
      const contractBalance = await provider.getBalance(contractAddress);
      console.log('contractBalance: ' + ethers.formatEther(contractBalance) + 'ETH');
      // console.log('address =', address);
      // console.log(ethers.formatEther(balance) + 'ETH');
      // console.log('singer =', singer);
      // console.log('ensAddress =', ensAddress);
      setAccount({
        address,
        balance: ethers.formatEther(balance),
        ensAddress,
      });
      const contract = new ethers.Contract(contractAddress, contractABI, singer);
      setContract(contract);

      const message = await contract.message();
      const paidMessage = await contract.retrievePaidMsg();
      setMessages({
        message,
        paidMessage,
      });
    }
    init();
  }, []);

  async function handleShowMessage() {
    if (contract === undefined) return;
    setMessages({
      message: await contract.message(),
      paidMessage: await contract.retrievePaidMsg(),
    });
  }

  async function handleSendMessage(type: string) {
    if (contract === undefined) return;
    const input = document.getElementById(type) as HTMLInputElement;
    switch (type) {
      case 'message': {
        const res = await contract.store(input.value);
        await res.wait();
        await handleShowMessage();
        break;
      }
      case 'paidMessage': {
        const res = await contract.storePaidMsg(input.value, {value: ethers.parseEther('0.001')});
        await res.wait();
        await handleShowMessage();
        break;
      }
      default:
        break;
    }
  }

  return (
    <>
      <h1 className="my-4 text-3xl font-bold text-center">Web3 Dapp</h1>
      <section className="container max-w-3xl mx-auto">
        <div className="p-6 space-y-4 bg-white border rounded shadow-md">
          <div className="flex flex-col gap-4">
            <span className="text-2xl font-bold text-center">Hi {account.ensAddress} !</span>
            <span>Address: {account.address}</span>
            <span>Balance: {account.balance} ETH</span>
          </div>
          <div className="flex flex-col gap-4">
            <div className="flex justify-between gap-6">
              <div className="flex items-center flex-auto gap-4">
                <label htmlFor="message">Message:</label>
                <input id="message" className="flex-auto p-2 rounded" type="text" />
              </div>
              <button
                className="px-4 py-2 text-white transition duration-300 ease-in-out bg-gray-700 rounded shadow-md hover:bg-gray-900"
                onClick={() => handleSendMessage('message')}
              >
                Send Message
              </button>
            </div>
            <div className="flex justify-between gap-6">
              <div className="flex items-center flex-auto gap-4">
                <label htmlFor="paidMessage">Paid Message:</label>
                <input id="paidMessage" className="flex-auto p-2 rounded" type="text" />
              </div>
              <button
                className="px-4 py-2 text-white transition duration-300 ease-in-out bg-gray-700 rounded shadow-md hover:bg-gray-900"
                onClick={() => handleSendMessage('paidMessage')}
              >
                Send Paid Message
              </button>
            </div>
          </div>
          <p>
            Message: <span>{messages.message}</span>
            <br />
            Paid Message: <span>{messages.paidMessage}</span>
          </p>
          <button
            className="w-full px-4 py-2 text-white transition duration-300 ease-in-out bg-gray-700 rounded shadow-md hover:bg-gray-900"
            type="button"
            onClick={() => handleShowMessage()}
          >
            show Message
          </button>
        </div>
      </section>
    </>
  );
}

export default App;
