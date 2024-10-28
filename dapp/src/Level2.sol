// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Level2 {
    mapping(address => bool) public unlocked;

    function verifyMessage(bytes32 _hashedMessage, uint8 _v, bytes32 _r, bytes32 _s) public {
        require(unlocked[msg.sender] == false, "Player already unlocked");
        require(_v == 27 || _v == 28, "Invalid signature");
        require(_hashedMessage == 0x595165e57d0d5a26f71f2f387c9e8208831fa957a18aad079218ce42a530bc6e, "Invalid message");
        bytes memory prefix = "\x19Ethereum Signed Message:\n32";
        bytes32 prefixedHashMessage = keccak256(abi.encodePacked(prefix, _hashedMessage));
        address signer = ecrecover(prefixedHashMessage, _v, _r, _s);
        if (signer == msg.sender) {
            unlocked[msg.sender] = true;
        } else {
            revert("Invalid signature");
        }
    }
}
