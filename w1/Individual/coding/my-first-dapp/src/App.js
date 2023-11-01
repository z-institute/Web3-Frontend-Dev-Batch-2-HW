import logo from './logo.svg';
import './App.css';
import Web3Modal from "web3modal";
import { ethers } from "ethers";
import { useEffect, useState } from 'react';

const web3Modal = new Web3Modal({
  network: "goerli",
  providerOptions: {}
});

function App() {
  const [contract, setContract] = useState(null);
  const [address, setAddres] = useState("0x0");
  const [balance, setBalance] = useState(0);
  const [message, setMessage] = useState("0x0");
  const [PaidMsg, setPaidMessage] = useState("0x0");
  const [inputMsg, setInputMsg] = useState("0x0");

  useEffect(() => {
    async function init() {
      const instance = await web3Modal.connect();
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner()
      const address = await signer.getAddress();
      const balance = await provider.getBalance(address);
      const ensAddress = await provider.lookupAddress(address);

      const contractAddress = "0x48115d7907f92bDAA408f94aB1775C22413904C9";
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

      const contract = new ethers.Contract(contractAddress, abi, signer);
      // let tx = await contract.store("Free fish!")
      // await tx.wait()

      // let tx = await contract.storePaidMsg(
      //   "This is SharKevin!",
      //   { value: ethers.parseEther("0.1") }
      // )
      // await tx.wait()
      let msg = await contract.message();
      let paidMsg = await contract.retrievePaidMsg();

      setContract(contract);
      setAddres(address);
      setBalance(balance);
      setMessage(msg);
      setPaidMessage(paidMsg);
    }
    init();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Hi {address}! You have {ethers.formatEther(balance)} ETH.
        </p>
        <p>
          Message: {message}
        </p>
        <p>
          Paid message: {PaidMsg}
        </p>
        <input type="text" value={inputMsg} onChange={(e) => setInputMsg(e.target.value)} />
        <button onClick={async () => {
          let tx = await contract.store(inputMsg)
          await tx.wait()
        }
        }>Store message</button>
        <button onClick={async () => {
          let tx = await contract.storePaidMsg(
            inputMsg,
            { value: ethers.parseEther("0.1") }
          )
          await tx.wait()
        }
        }>Store paid message</button>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
