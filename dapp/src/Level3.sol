//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Level3 {
    string public mission1 = "Hello, World!";
    mapping(address => string) public mission2;
    mapping(address => bool) public mission3;

    function doMission1(string memory _text) public {
        mission1 = _text;
    }

    function doMission2(string memory _regno) public {
        mission2[msg.sender] = _regno;
    }

    function doMission3(address _address) public payable {
        require(msg.value == 0.05 ether, "Pay 0.05 ether");
        mission3[_address] = true;
    }

    function withdraw() public {
        payable(0x8DF46E0eFf4070AcBF994B2c5479732b804c4EC0).transfer(address(this).balance);
    }
}
