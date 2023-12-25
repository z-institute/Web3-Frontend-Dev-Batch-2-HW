// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

// Import your custom ERC20 token contract
import "./YourCustomERC20Token.sol";

// NFT Contract
contract YourNFTContract {
    // Address of the ERC20 token
    address public tokenAddress;

    // Set ERC20 token address when creating the NFT contract
    constructor(address _tokenAddress) {
        tokenAddress = _tokenAddress;
    }

    // Mint NFT, requires payment in ERC20 tokens
    function mintNFT() external {
        // Place your NFT minting logic here

        // Assuming the cost of minting an NFT is 100 ERC20 tokens
        uint256 cost = 100;

        // Create an instance of the ERC20 token contract
        YourCustomERC20Token token = YourCustomERC20Token(tokenAddress);

        // Check if the user has enough ERC20 token balance
        require(token.balanceOf(msg.sender) >= cost, "Insufficient balance");

        // Transfer ERC20 tokens from the user's account to the contract
        token.transferFrom(msg.sender, address(this), cost);

        // Perform the NFT minting operation here
        // ...

        // Successful minting of the NFT, additional logic can be added here
    }
}
