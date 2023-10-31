import logo from './logo.svg';
import './App.css';
import Web3Modal from "web3modal";
import { ethers, formatEther, parseEther } from "ethers";
import { useEffect, useState } from 'react';


const web3Modal = new Web3Modal({
  network: "Sepolia", 
  providerOptions: {} 
});


function App() {

  const [contract, setContract] = useState(null);
  const [address, setAddress] = useState("0x0");
  const [balance, setBalance] = useState("0");
  const [message, setMessage] = useState("");
  const [paidMessage, setPaidMessage] = useState("");
  const [inputMsg, setInputMsg] = useState("");

  useEffect(() =>{
    async function init(){
      const instance = await web3Modal.connect();
      // const instance = window.ethereum; // it assumes that users are already connected to a wallet, so you don't need a wallet selection interface
      console.log(instance);
      const provider = new ethers.BrowserProvider(instance);

      const signer = await provider.getSigner();
      const address = await signer.getAddress();
      setAddress(address);
      // console.log(address);
      const balanceWei = await provider.getBalance(address); // the unit is wei ( 10^18 wei = 1 ether)
      console.log(balanceWei); 
      setBalance(formatEther(balanceWei.toString()));
      // const balanceEth = formatEther(balanceWei.toString())
      // console.log(balanceEth);  // convert wei to ether
      // console.log(parseEther(balanceEth)); // convert ether to wei
      // const ensAddress = await provider.lookupAddress(address); // only available in mainnet
      // console.log(ensAddress);

      const contractAddress = '0x15cacB829dB1885ff325b744c58aAb48FCdE409b';
      const abi = [
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
        },
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
        }
      ];
      const contract = new ethers.Contract(contractAddress, abi,signer)
      setContract(contract);

      const paidMsg = await contract.retrievePaidMsg();
      setPaidMessage(paidMsg);
      console.log(paidMsg);
      // let tx = await contract.storePaidMsg("hello storePaidMsg funtion",{value:ethers.parseEther("0.1")});
      // await tx.wait();
      let msg = await contract.message();
      setMessage(msg);
      console.log(msg);
    }
    init();
  },[]);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Your address is {address}! <br/>
          Your balance is {balance} ETH <br/>
          Your message is {message} <br/>
          Your paid message is {paidMessage} <br/>
        </p>
        <input onChange={(e) => setInputMsg(e.target.value)} />
        <button onClick={() => {
          async function storeFunction(){
            let tx = await contract.store(inputMsg);
            await tx.wait();

            let _msg = contract.message();
            setMessage(_msg);
          }
          storeFunction();
          }}>store message
        </button>
        <button onClick={() => {
          async function storePaidMsgFunction(){
            let tx = await contract.storePaidMsg(inputMsg,{value:ethers.parseEther("0.1")});
            await tx.wait();
            
            const _paidMsg = await contract.retrievePaidMsg();
            setPaidMessage(_paidMsg);
          }
          storePaidMsgFunction();
          }}>store paid message
        </button>
      </header>
    </div>
  );
}

export default App;
