// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import {Test} from "forge-std/Test.sol";
import {Level1} from "../src/Level1.sol";

contract Level1Test is Test {
    function test_constructor() public {
        Level1 level1 = new Level1();
        assertEq(address(level1.owner()), address(this));
    }

    function test_unlock_not_owner() public {
        Level1 level1 = new Level1();
        assertEq(address(level1.owner()), address(this));
        vm.prank(address(0x1));
        try level1.unlock(address(this)) {
            fail();
        } catch Error(string memory reason) {
            assertEq(reason, "You are not the owner");
        }
    }

    function test_unlock() public {
        Level1 level1 = new Level1();
        assertEq(address(level1.owner()), address(this));
        level1.unlock(address(this));
        assertEq(level1.unlocked(address(this)), true);
    }

    function test_unlock_fail() public {
        Level1 level1 = new Level1();
        level1.unlock(address(this));
        assertEq(level1.unlocked(address(this)), true);
        try level1.unlock(address(this)) {
            fail();
        } catch Error(string memory reason) {
            assertEq(reason, "Player already unlocked");
        }
        assertEq(level1.unlocked(address(this)), true);
    }
}
