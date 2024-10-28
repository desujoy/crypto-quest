// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Level1 {
    mapping(address => bool) public unlocked;
    address public owner;

    constructor() {
        owner = msg.sender;
    }

    function unlock(address player) public {
        require(msg.sender == owner, "You are not the owner");
        require(unlocked[player] == false, "Player already unlocked");
        unlocked[player] = true;
    }
}
