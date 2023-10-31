import logo from './logo.svg';
import './App.css';
import Web3Modal from 'web3modal'
import { useEffect, useState } from 'react';
import { ethers, formatEther } from 'ethers';

const web3Modal = new Web3Modal({
  network: "rinkeby",
  // network: "sepolia",
  providerOptions: {}
})


function App() {
  const [contract, setContract] = useState(null)
  const [address, setAddress] = useState('0x0')
  const [balance, setBalance] = useState("0")
  const [ensAddress, setEnsAddress] = useState("0")
  const [message, setMessage] = useState("")
  const [paidMsg, setPaidMsg] = useState("")
  const [inputMsg, setInputMsg] = useState("")

  useEffect(() => {
    async function init() {
      const instance = await web3Modal.connect();
      const provider = new ethers.BrowserProvider(instance)
      const signer = await provider.getSigner();
      const address = await signer.getAddress();
      const balance = await provider.getBalance(address)
      // const ensAddress = await provider.lookupAddress(address)
      // console.log(ensAddress)
      console.log(instance)


      const contractAddr = '0xAb29500DffbfB04b176aB7730Cd70153C97f1805'
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
      const contract = new ethers.Contract(contractAddr, abi, signer)
      // let tx = await contract.store("Free fish!!");
      // await tx.wait()

      let msg = await contract.message();
      let paidMsg = await contract.retrievePaidMsg();

      // let tx = await contract.storePaidMsg("Paid fish!", { value: ethers.parseEther("0.1") });
      // await tx.wait()


      setAddress(address)
      setBalance(ethers.formatEther(balance))
      setContract(contract)
      setMessage(msg)
      setPaidMsg(paidMsg)



    }
    init()
  }, [])
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p> Hi {address} ! Your balance is {balance} ETH.</p>
        <p> Your address is {address}.</p>
        <p>Your message is {message}.</p>
        <p>Your paid message is {paidMsg}.</p>
        <input value={inputMsg} onChange={e => setInputMsg(e.target.value)} />
        <button onClick={() => {
          async function storeFunction() {
            let tx = await contract.store(inputMsg);
            await tx.wait()

            let _msg = await contract.message();
            setMessage(_msg)
          }
          storeFunction()
        }}>
          store msg
        </button>
        <button onClick={() => {
          async function storeFunction() {
            let tx = await contract.storePaidMsg(inputMsg, { value: ethers.parseEther("0.1") });
            await tx.wait()

            let _paidMsg = await contract.retrievePaidMsg();
            setPaidMsg(_paidMsg)
          }
          storeFunction()
        }}>
          store paid msg
        </button>
      </header>
    </div>
  );
}

export default App;
