import './App.css';
import logo from './logo.svg';
import { useEffect, useState } from 'react';
import Web3Modal from "web3modal";
import { ethers } from "ethers";

const web3Modal = new Web3Modal({
  network: "rinkeby", // or mainnet
  providerOptions: {}
})

function App() {
  const [contract, setContract] = useState(null);
  const [address, setAddress] = useState('0x0');
  const [balance, setBalance] = useState('0');
  const [ensAddress, setEnsAddress] = useState('0');
  const [message, setMessage] = useState('');
  const [paidMsg, setPaidMsg] = useState('');
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    const init = async () => {
      const instance = await web3Modal.connect();
      const provider = new ethers.BrowserProvider(instance);
      const signer = await provider.getSigner();
      const address = await signer.getAddress();
      const balance = await provider.getBalance(address);
      // const ensAddress = await provider.lookupAddress(address);

      const contractAddr = '0xa3B688186379f69c28B3A3169F914a41eBA7dcFb';
      const abi = [
        {
          "inputs": [
            {
              "internalType": "string",
              "name": "str",
              "type": "string"
            }
          ],
          "name": "store",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "string",
              "name": "str",
              "type": "string"
            }
          ],
          "name": "storePaidMsg",
          "outputs": [],
          "stateMutability": "payable",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "message",
          "outputs": [
            {
              "internalType": "string",
              "name": "",
              "type": "string"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "retrievePaidMsg",
          "outputs": [
            {
              "internalType": "string",
              "name": "",
              "type": "string"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        }
      ];
      const contract = new ethers.Contract(contractAddr, abi, signer);

      const msg = async () => {
        const res = await contract.message();
        setMessage(res);
      };
      await msg();

      const paidmsg = async () => {
        const res = await contract.retrievePaidMsg();
        setPaidMsg(res);
      };
      await paidmsg();

      // console.log(instance);
      // console.log(provider);
      // console.log(signer);
      // console.log(address);
      // console.log(balance);
      // console.log(ethers.formatEther(balance) + " ETH"); // this is big number
      // console.log(ensAddress); // only available in mainnet
      setAddress(address);
      setBalance(ethers.formatEther(balance) + " ETH");
      setContract(contract);
    };
    init();

  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Hi {address}, your balance is :{balance}.<br />
          your current free message is :{message}<br />
          your current paid message is :{paidMsg}<br />
        </p>
        <input value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        ></input>
        <button onClick={async () => {
          const tx = await contract.store(inputValue);
          await tx.wait();
          setMessage(await contract.message());
        }}>free message</button>

        <button onClick={async () => {
          let payEtherAmount = ethers.parseEther("0.1");
          let tx = await contract.storePaidMsg(
            inputValue,
            { value: payEtherAmount }
          );
          await tx.wait();
          setPaidMsg(await contract.retrievePaidMsg());
        }}>paid message</button>
      </header>
    </div >
  );
}

export default App;
