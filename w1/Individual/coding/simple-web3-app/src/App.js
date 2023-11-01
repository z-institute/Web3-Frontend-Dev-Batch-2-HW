import logo from "./ZLogo.svg";
import "./App.css";
import Web3Modal from "web3modal";
import { ethers, BrowserProvider, formatEther } from "ethers";
import { useEffect, useState } from "react";

const web3Modal = new Web3Modal({
  network: "Sepolia", // testnet
  providerOptions: {},
});

function App() {
  const [contract, setConctract] = useState(null);
  const [contractAddr, setContractAddr] = useState(
    "0xAe68654757D3E1d292d1Fe29F7329F249845EF8d"
  );
  const [contractBalance, setContractBalance] = useState("0");
  const [address, setAddress] = useState("0x0");
  const [balance, setBalance] = useState("0");
  // const [ensAddress, setEnsAddress] = useState("");
  const [message, setMessage] = useState("");
  const [paidMsg, setPaidMsg] = useState("");
  const [inputMsg, setInputMsg] = useState("");
  const [paidInputMsg, setPaidInputMsg] = useState("");
  const [disabledEle, setDisabledEle] = useState(false);

  // const contractAddr = "0xAe68654757D3E1d292d1Fe29F7329F249845EF8d";
  const abi = [
    {
      inputs: [
        {
          internalType: "string",
          name: "str",
          type: "string",
        },
      ],
      name: "store",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "string",
          name: "str",
          type: "string",
        },
      ],
      name: "storePaidMsg",
      outputs: [],
      stateMutability: "payable",
      type: "function",
    },
    {
      inputs: [],
      name: "message",
      outputs: [
        {
          internalType: "string",
          name: "",
          type: "string",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "retrievePaidMsg",
      outputs: [
        {
          internalType: "string",
          name: "",
          type: "string",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
  ];

  async function init() {
    const instance = await web3Modal.connect(); // window.ethereum

    let _signer = null;
    let _provider, _address, _balance, _contractBalance;
    // let ensAddress;

    if (instance === null) {
      console.log("MetaMask not installed; using read-only defaults");
      _provider = ethers.getDefaultProvider();
    } else {
      _provider = new BrowserProvider(instance);
      _signer = await _provider.getSigner();
      _address = await _signer.getAddress();
      _balance = await _provider.getBalance(_address);
      // ensAddress = await provider.lookupAddress(address);
      _contractBalance = await _provider.getBalance(contractAddr);
    }

    const _contract = new ethers.Contract(contractAddr, abi, _signer);

    let _message = await _contract.message();
    let _paidMsg = await _contract.retrievePaidMsg();

    setAddress(_address);
    setBalance(formatEther(_balance));
    setContractBalance(formatEther(_contractBalance));
    // setEnsAddress(ensAddress);
    setConctract(_contract);
    setMessage(_message);
    setPaidMsg(_paidMsg);
    console.log(_contract);

    // console.log(_message, _paidMsg);
    // console.log(msg);
    // console.log("Balance: ", formatEther(balance) + " ETH");
    // console.log("Provider: ", provider);
    // console.log("Signer: ", signer);
    // console.log("Address: ", address);
    // console.log("ENS Address: ", ensAddress);
    // console.log(instance);
  }

  useEffect(() => {
    !contract ? setDisabledEle(true) : setDisabledEle(false);
  }, [contract]);

  function handleConnect() {
    init();
  }

  async function handleStoreMsg() {
    let tx = await contract.store(inputMsg);
    await tx.wait();

    const _message = await contract.message();
    setMessage(_message);
  }

  async function handleStorePaidMsg() {
    let payEtherAmount = ethers.parseEther("0.0001");
    let tx = await contract.storePaidMsg(paidInputMsg, {
      value: payEtherAmount,
    });
    await tx.wait();

    const _paidMsg = await contract.retrievePaidMsg();
    setPaidMsg(_paidMsg);
  }

  return (
    <div className="App">
      <header className="App-header">
        <div className="App-logo-container">
          <img src={logo} className="App-logo" alt="logo" />
        </div>
        <div className="App-content">
          <h3>Hi, {address}</h3>
          <p>
            <span>Balance:</span> {balance} ETH
          </p>
          <p>
            <span>Default network:</span> Sepolia (Testnet)
          </p>
          <div className="App-connect-wallet">
            <button onClick={handleConnect}>Connect Wallet</button>
          </div>
        </div>

        <div className="App-contract">
          <div className="App-contract-info">
            <p>
              <span>Contract:</span> {contract && contractAddr}
              {/* <input type="text" disabled value={contractAddr} /> */}
            </p>
            <p>
              <span>Contract Balance:</span> {contractBalance} ETH
            </p>
            <p>
              <span>Your message:</span> {message}
            </p>
            <p>
              <span>Your paid message:</span> {paidMsg}
            </p>
          </div>
          <div className="App-contract-func">
            <input
              type="text"
              onChange={(e) => setInputMsg(e.target.value)}
              placeholder="Your message..."
              value={inputMsg}
              disabled={disabledEle}
            />
            <button onClick={handleStoreMsg} disabled={disabledEle}>
              Store Message
            </button>
          </div>
          <div className="App-contract-func">
            <input
              type="text"
              onChange={(e) => setPaidInputMsg(e.target.value)}
              placeholder="Your message..."
              value={paidInputMsg}
              disabled={disabledEle}
            />
            <button onClick={handleStorePaidMsg} disabled={disabledEle}>
              Store Paid Message
            </button>
          </div>
        </div>
      </header>
    </div>
  );
}

export default App;
