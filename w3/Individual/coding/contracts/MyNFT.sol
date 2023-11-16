// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts@5.0.0/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts@5.0.0/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts@5.0.0/access/Ownable.sol";

contract MyNFT is ERC721, Ownable {
    uint256 private _nextTokenId;
    IERC20 public tokenAddress;
    uint public cost = 100 * 10 ** 18;

    constructor(address initialOwner,address _tokenAddress)
        ERC721("MyToken", "MTK")
        Ownable(initialOwner)
    {
        tokenAddress = IERC20(_tokenAddress);
    }

    function safeMint(address to) public onlyOwner {
        tokenAddress.transferFrom(msg.sender, address(this), cost);
        uint256 tokenId = _nextTokenId++;
        _safeMint(to, tokenId);
    }

    function withdrawToken() public onlyOwner{
        tokenAddress.transfer(msg.sender, tokenAddress.balanceOf(address(this)));
        emit Transfer(address(tokenAddress), msg.sender, tokenAddress.balanceOf(address(this)));
    }
}
