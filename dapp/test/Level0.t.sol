// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import {Test} from "forge-std/Test.sol";
import {Level0} from "../src/Level0.sol";

contract Level0Test is Test {
    function test_constructor() public {
        Level0 level0 = new Level0();
        assertEq(address(level0.owner()), address(this));
    }

    function test_unlock_not_owner() public {
        Level0 level0 = new Level0();
        assertEq(address(level0.owner()), address(this));
        vm.prank(address(0x1));
        try level0.unlock(address(this), 10) {
            fail();
        } catch Error(string memory reason) {
            assertEq(reason, "You are not the owner");
        }
    }

    function test_unlock() public {
        Level0 level0 = new Level0();
        assertEq(address(level0.owner()), address(this));
        level0.unlock(address(this), 10);
        assertEq(level0.unlocked(address(this)), 10);
    }

    function test_unlock_fail() public {
        Level0 level0 = new Level0();
        level0.unlock(address(this), 10);
        assertEq(level0.unlocked(address(this)), 10);
        try level0.unlock(address(this), 20) {
            fail();
        } catch Error(string memory reason) {
            assertEq(reason, "Player already unlocked");
        }
        assertEq(level0.unlocked(address(this)), 10);
    }
}
