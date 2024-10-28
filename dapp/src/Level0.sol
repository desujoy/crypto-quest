// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Level0 {
    mapping(address => uint8) public unlocked;
    address public owner;

    constructor() {
        owner = msg.sender;
    }

    function unlock(address player, uint8 score) public {
        require(msg.sender == owner, "You are not the owner");
        require(unlocked[player] == 0, "Player already unlocked");
        unlocked[player] = score;
    }
}
