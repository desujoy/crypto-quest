// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import {ERC721} from "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import {Strings} from "@openzeppelin/contracts/utils/Strings.sol";

contract NFTHandler is ERC721 {
    uint256 public currentTokenId;
    address public owner;
    string public baseURI;

    constructor() ERC721("CryptoQuestNFT", "CQT") {
        owner = msg.sender;
        _mint(owner, 0);
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "You are not the owner");
        _;
    }

    function setBaseURI(string memory _baseURI) public onlyOwner {
        baseURI = _baseURI;
    }

    function mint(address to) public onlyOwner {
        require(balanceOf(to) == 0, "ERC721: token already minted");
        uint256 tokenId = ++currentTokenId;
        _safeMint(to, tokenId);
        currentTokenId += 1;
    }

    function tokenURI(
        uint256 tokenId
    ) public view override returns (string memory) {
        return string(abi.encodePacked(baseURI, Strings.toString(tokenId)));
    }
}
