// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.7.0 <0.9.0;

contract Storage {
    string public message;
    string paidMessage;

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