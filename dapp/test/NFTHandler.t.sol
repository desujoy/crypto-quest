// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import {Test} from "forge-std/Test.sol";
import {NFTHandler} from "../src/NFTHandler.sol";

contract NFTHandlerTest is Test {
    address nftOwner = address(0x1);
    address bob = address(0x2);
    address alice = address(0x3);

    function test_constructor() public {
        vm.prank(nftOwner);
        NFTHandler nft = new NFTHandler();
        assertEq(nft.ownerOf(0), address(nftOwner));
    }

    function test_mint() public {
        vm.startPrank(nftOwner);
        NFTHandler nft = new NFTHandler();
        nft.mint(bob);
        vm.stopPrank();
        assertEq(nft.ownerOf(1), bob);
    }

    function test_mint_fail() public {
        vm.startPrank(nftOwner);
        NFTHandler nft = new NFTHandler();
        nft.mint(bob);
        assertEq(nft.ownerOf(1), bob);
        try nft.mint(bob) {
            fail();
        } catch Error(string memory reason) {
            assertEq(reason, "ERC721: token already minted");
        }
        vm.stopPrank();
        assertEq(nft.ownerOf(1), bob);
    }

    function test_mint_not_owner() public {
        vm.prank(nftOwner);
        NFTHandler nft = new NFTHandler();
        vm.prank(bob);
        try nft.mint(bob) {
            fail();
        } catch Error(string memory reason) {
            assertEq(reason, "You are not the owner");
        }
    }

    function test_setBaseURI() public {
        vm.prank(nftOwner);
        NFTHandler nft = new NFTHandler();
        vm.prank(nftOwner);
        nft.setBaseURI("https://example.com/");
        assertEq(nft.tokenURI(0), "https://example.com/0");
    }

    function test_setBaseURI_not_owner() public {
        vm.prank(nftOwner);
        NFTHandler nft = new NFTHandler();
        vm.prank(bob);
        try nft.setBaseURI("https://example.com/") {
            fail();
        } catch Error(string memory reason) {
            assertEq(reason, "You are not the owner");
        }
    }

    function test_tokenURI() public {
        vm.prank(nftOwner);
        NFTHandler nft = new NFTHandler();
        vm.prank(nftOwner);
        nft.setBaseURI("https://example.com/");
        assertEq(nft.tokenURI(0), "https://example.com/0");
    }
}
