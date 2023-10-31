// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

contract MessageBoard {
    uint constant PAID_MESSAGE_PRICE = 0.1 ether;

    struct Message {
        string message;
        address from;
    }

    event NewMessage(address indexed _from, string _message, bool _paid);

    Message[] _messages;
    Message[] _paidMessages;

    function writeMessage(string memory str, bool isPaid) public payable {
        if (isPaid) {
            require(msg.value == PAID_MESSAGE_PRICE, "Not enough fund");
            _paidMessages.push(Message(str, msg.sender));
        } else {
            _messages.push(Message(str, msg.sender));
        }
        emit NewMessage(msg.sender, str, isPaid);
    }

    function getMessages() public view returns (Message[] memory) {
        return _messages;
    }

    function getPaidMessages() public view returns (Message[] memory) {
        return _paidMessages;
    }
}
