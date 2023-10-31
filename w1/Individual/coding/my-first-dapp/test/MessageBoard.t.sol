// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Test, console2} from "forge-std/Test.sol";
import {MessageBoard} from "../src/MessageBoard.sol";

import "forge-std/console.sol";

contract MessageBoardTest is Test {
    uint constant PAID_MESSAGE_PRICE = 0.1 ether;
    address constant SENDER = 0x99C179213E7bf388C8b46f897dcB222874354573;

    MessageBoard public messageBoard;

    function setUp() public {
        messageBoard = new MessageBoard();
    }

    function testWriteMessage() public {
        assertEq(messageBoard.getMessages().length, 0);

        vm.prank(SENDER);
        messageBoard.writeMessage("hello world", false);
        MessageBoard.Message[] memory messages = messageBoard.getMessages();
        assertEq(messages.length, 1);

        MessageBoard.Message memory lastMessage = messages[messages.length - 1];
        assertEq(lastMessage.message, "hello world");
        assertEq(lastMessage.from, SENDER);
    }

    function testWritePaidMessage() public {
        assertEq(messageBoard.getPaidMessages().length, 0);

        vm.prank(SENDER);
        vm.deal(SENDER, 1 ether);
        messageBoard.writeMessage{value: PAID_MESSAGE_PRICE}(
            "hello world",
            true
        );

        MessageBoard.Message[] memory paidMessages = messageBoard
            .getPaidMessages();
        assertEq(paidMessages.length, 1);

        MessageBoard.Message memory lastMessage = paidMessages[
            paidMessages.length - 1
        ];
        assertEq(lastMessage.message, "hello world");
        assertEq(lastMessage.from, SENDER);
    }

    function testWritePaidMessageNotEnoughFund() public {
        vm.prank(SENDER);
        vm.deal(SENDER, 0.01 ether);

        vm.expectRevert();
        messageBoard.writeMessage{value: PAID_MESSAGE_PRICE}(
            "hello world",
            true
        );
    }
}
