## 事前準備

- 使用 react 開發第一個 Dapp
  
	```shell
	$ npx create-react-app my-first-dapp
	$ cd my-first-dapp
	
	# Open in VSCode, press CMD+Shift+P to install code package
	$ code .
	
	# Open terminal in VSCode
	$ CTRL+`
	
	# Install packages
	$ yarn add ethers web3modal
	$ yarn start
	```

## 智能合約
- 在 Remix - Ethereum IDE 部署智能合約
```solidity
//SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.7.0 <0.9.0;

contract Storage {
	 string public message; // public 可以直接看到
	 string paidMessage;    // private 無法直接看到

	 function store(string memory str) public {
		message = str;
	 }

	 function storePaidMsg(string memory str) public payable{
	   require(msg.value == 0.1 ether, "Not enough fund");
	   paidMessage = str;
	 }

	 function retrievePaidMsg() public view returns (string memory){
	   return paidMessage;
	 }
}
```

- 合約變數
    - 變數 message，中 public 代表可以直接被看到
    - 變數 paidMessage，沒寫代表 private 不能直接被看到
- 此合約有三個 function
    - `memory` 代表該 function 執行完就消失了
    - `public` 代表任何人都可以調動 function
    - `payable` 代表此 function 會額外收小費，一般的 function 呼叫只會有手續費
    - `msg` 是保留字，代表小費要等於 0.1 顆以太幣
    - `view` 代表看智能合約的變數
    - `returns` 代表會回傳值

## 流程
1. 取得 provider (用來與區塊鏈溝通的中間人, ex : MetaMask )
	```js
	import Web3Modal from "web3modal";
	```
	```js
	const web3Modal = new Web3Modal({
	  network: "rinkeby", 
	  providerOptions: {} 
	});
	const instance = await web3Modal.connect();

	// it assumes that users are already connected to a wallet, so you don't need a wallet selection interface
	// const instance = window.ethereum; 
	```
1. 取的 signer 後可接續取得錢包地址和錢包餘額（需要執行改變以太坊區塊鏈狀態的操作，以確保交易的安全性、真實性和完整性）
	```js
	import { ethers } from "ethers";
	```
	```js
	const provider = new ethers.BrowserProvider(instance);
	const signer = await provider.getSigner();
	const address = await signer.getAddress();
	const balance = await provider.getBalance(address); // the unit is wei ( 10^18 wei = 1 ether)
	console.log(balance);
	
	// only available in mainnet
	// const ensAddress = await provider.lookupAddress(address);
	// console.log(ensAddress);
	```
1. 在 Remix - Ethereum IDE 部署智能合約後，並取得其提供的 abi(json format) 和合約地址，並可以使用合約有的 function，執行 function 必須 await `tx.wait()` 等待 function 執行成功，即可使用 function 取得 private variable 或是直接取得 public variable
	- 以下 contract 呼叫的 function 在 solidity 智能合約有撰寫好，才能使用
	- 呼叫後需在錢包介面確認執行該交易
	```js
	const contract = new ethers.Contract(contractAddress, abi,signer)
	```
	```js
	let tx = await contract.store(inputMsg);
	await tx.wait();
	let _msg = contract.message();
	
	let tx = await contract.storePaidMsg(inputMsg,{value:ethers.parseEther("0.1")});
	await tx.wait();
	let _paidMsg = await contract.retrievePaidMsg();
	```