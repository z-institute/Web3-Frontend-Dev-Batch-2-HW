import './App.css';
import logo from './logo.svg';
import { useEffect } from 'react';
import Web3Modal from "web3modal";
import { ethers } from "ethers";

const web3Modal = new Web3Modal({
  network: "rinkeby", // or mainnet
  providerOptions: {}
})

function App() {

  useEffect(() => {
    const init = async () => {
      const instance = await web3Modal.connect();
      const provider = new ethers.BrowserProvider(instance);
      const signer = await provider.getSigner();
      const address = await signer.getAddress();
      const balance = await provider.getBalance(address);
      // const ensAddress = await provider.lookupAddress(address);

      console.log(instance);
      console.log(provider);
      console.log(signer);
      console.log(address);
      console.log(balance);
      console.log(ethers.formatEther(balance) + " ETH"); // this is big number
      // console.log(ensAddress); // only available in mainnet
    };
    init();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
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
