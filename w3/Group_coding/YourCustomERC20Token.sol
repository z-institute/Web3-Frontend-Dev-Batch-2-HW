// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract YourCustomERC20Token {

    address public tokenAddress;
    
     constructor(address _tokenAddress) {
        tokenAddress = _tokenAddress;
    }
}
