# Contract

- state variable : 永久儲存在合約儲存中。這意味著它們被寫入以太坊區塊鏈。將它們想像成寫入資料庫
- abstract contract : 不可以被獨立編譯，必須被 contract 繼承 ( **大於 0.6.0 版本** )
- this 在 contract 中代表 contract 本身
	```sol
	import "hardhat/console.sol";
	
	contract Contract {
	    constructor() {
	        console.log( address(this) ); // 0x7c2c195cd6d34b8f845992d380aadb2730bb9c6f
	        console.log( address(this).balance ); // 0
	    }
	}
	```
## 範例

```sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

// Importing a single contract from a local file
import "./Token.sol";

// Importing an entire file's contents
import "./utils/Helpers.sol";

// Importing multiple contracts from a single file
import { ContractA, ContractB } from "./contracts/MultipleContracts.sol";

// Assume ContractA and ContractB have some functions you want to use in MyContract

contract MyContract {
    // Instantiate a ContractA and ContractB
    ContractA private contractA;
    ContractB private contractB;

    // Assume Token has a constructor that takes an initial supply
    Token private myToken = new Token(1000);

    constructor() {
        // Here you might want to do something with contractA and contractB
        contractA = new ContractA();
        contractB = new ContractB();
    }

    function useContractA() public {
        // Example of calling a function from ContractA
        contractA.someFunctionFromA();
    }

    function useContractB() public {
        // Example of calling a function from ContractB
        contractB.someFunctionFromB();
    }

    function tokenBalance() public view returns (uint) {
        // Assume Token.sol has a balanceOf function
        return myToken.balanceOf(msg.sender);
    }
}
```