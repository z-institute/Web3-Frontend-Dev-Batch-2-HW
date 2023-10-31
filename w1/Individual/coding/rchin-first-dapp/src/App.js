import logo from './logo.svg';
import './App.css';
import Web3Modal from "web3modal";
import { useEffect, useState } from "react";
import { ethers } from "ethers";

const web3Modal = new Web3Modal({
  network: "sepolia",
  providerOptions: {}
});

function App() {
  const [contract, setContract] = useState(null)
  const [address, setAddress] = useState("0x0")
  const [balance, setBalance] = useState("0")
  // const [ensAddress, setEnsAddress] = useState("0")
  const [message, setMessage] = useState("")
  const [paidMsg, setPaidMsg] = useState("")
  const [inputMsg, setInputMsg] = useState("")

  useEffect(() => {
    async function init() {
      const instance = await web3Modal.connect();
      const provider = new ethers.BrowserProvider(instance);
      const signer = await provider.getSigner();
      const address = await signer.getAddress();
      const balance = await provider.getBalance(address);
      setAddress(address)
      setBalance(ethers.formatEther(balance))

      // const ensAddress = await provider.lookupAddress(address);
      // console.log(ensAddress); // only available in mainnet
      // setEnsAddress(ensAddress)

      const contractAddr = '0xC080004ea96f2daeDCE1C0d7E81B3526C120f721'
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
      ]
      const contract = new ethers.Contract(contractAddr, abi, signer);
      setContract(contract)

      let msg = await contract.message()
      let paidMsg = await contract.retrievePaidMsg()
      setMessage(msg)
      setPaidMsg(paidMsg)
    }
    init()
  }, [])
  return (
    <div className="App">
      <header className="App-header">
        <p>Hi {address} !</p>
        <p>Your balance is {balance} ETH.</p>
        <p>Your message is {message}.</p>
        <p>Your paid message is {paidMsg}.</p>

        <input value={inputMsg} onChange={e => setInputMsg(e.target.value)} />
        <button
          onClick={() => {
            async function storeFunction() {
              let tx = await contract.store(inputMsg)
              await tx.wait()

              let _msg = await contract.message()
              setMessage(_msg)
            }
            storeFunction()
          }}
        >
          store msg
        </button>
        <button
          onClick={() => {
            async function storePaidFunction() {
              let payEtherAmount = ethers.parseEther("0.00001");
              let ptx = await contract.storePaidMsg(inputMsg, {value: payEtherAmount})
              await ptx.wait()

              let _paidMsg = await contract.retrievePaidMsg()
              setPaidMsg(_paidMsg)
            }
            storePaidFunction()
          }}
        >
          store paid msg
        </button>
      </header>
    </div>
  );
}

export default App;
