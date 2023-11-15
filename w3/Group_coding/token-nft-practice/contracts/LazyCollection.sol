// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "contracts/LazyToken.sol";

contract LazyCollection is ERC721, Ownable {
    uint256 private _nextTokenId;
    address private _lazyTokenAddress;

    constructor(
        address initialOwner
    ) ERC721("LazyCollection", "ZZZ") Ownable(initialOwner) {}

    function safeMint(address to) public {
        LazyToken lazyToken = LazyToken(_lazyTokenAddress);
        lazyToken.transferFrom(
            msg.sender,
            address(this),
            100 * 10 ** lazyToken.decimals()
        );
        uint256 tokenId = _nextTokenId++;
        _safeMint(to, tokenId);
    }

    function setLazyTokenAddress(address _newAddress) public onlyOwner {
        _lazyTokenAddress = _newAddress;
    }

    function withdrawLazyToken() public onlyOwner {
        LazyToken lazyToken = LazyToken(_lazyTokenAddress);
        lazyToken.transferFrom(
            address(this),
            payable(msg.sender),
            lazyToken.balanceOf(address(this))
        );
    }
}
