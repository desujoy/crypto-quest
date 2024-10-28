// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import {Test} from "forge-std/Test.sol";
import {Level2} from "../src/Level2.sol";

contract Level2Test is Test {
    Level2 contractInstance;
    address validSigner;
    uint256 validPrivateKey;

    function setUp() public {
        contractInstance = new Level2();
        validPrivateKey = uint256(keccak256(abi.encodePacked(block.timestamp, block.prevrandao)));
        validSigner = vm.addr(validPrivateKey);
    }

    function testVerifyMessageValidSignature() public {
        bytes32 message = keccak256(abi.encodePacked("satoshinakamoto"));
        bytes32 prefixedMessage = keccak256(abi.encodePacked("\x19Ethereum Signed Message:\n32", message));

        (uint8 v, bytes32 r, bytes32 s) = vm.sign(validPrivateKey, prefixedMessage);

        vm.prank(validSigner);
        contractInstance.verifyMessage(message, v, r, s);

        bool isUnlocked = contractInstance.unlocked(validSigner);
        assertTrue(isUnlocked, "Message verification failed.");
    }

    function testVerifyMessageInvalidSignature() public {
        bytes32 message = keccak256(abi.encodePacked("satoshinakamoto"));
        bytes32 prefixedMessage = keccak256(abi.encodePacked("\x19Ethereum Signed Message:\n32", message));

        (uint8 v, bytes32 r, bytes32 s) = vm.sign(uint256(uint160(address(0xDeAdBeEf))), prefixedMessage);
        vm.expectRevert("Invalid signature");
        contractInstance.verifyMessage(message, v, r, s);
    }

    function testVerifyMessageInvalidMessage() public {
        bytes32 message = keccak256(abi.encodePacked("somethingelse"));
        bytes32 prefixedMessage = keccak256(abi.encodePacked("\x19Ethereum Signed Message:\n32", message));

        (uint8 v, bytes32 r, bytes32 s) = vm.sign(validPrivateKey, prefixedMessage);
        vm.prank(validSigner);
        vm.expectRevert("Invalid message");
        contractInstance.verifyMessage(message, v, r, s);
    }
}
