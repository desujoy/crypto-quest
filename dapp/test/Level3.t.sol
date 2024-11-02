// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import {Test} from "forge-std/Test.sol";
import {Level3} from "../src/Level3.sol";

contract Level3Test is Test {
    function test_doMission1() public {
        Level3 level3 = new Level3();
        assertEq(level3.mission1(), "Hello, World!");
        level3.doMission1("Hello, Forge!");
        assertEq(level3.mission1(), "Hello, Forge!");
    }

    function test_doMission2() public {
        Level3 level3 = new Level3();
        assertEq(level3.mission2(address(this)), "");
        level3.doMission2("1234567890");
        assertEq(level3.mission2(address(this)), "1234567890");
    }

    function test_doMission3() public {
        Level3 level3 = new Level3();
        assertEq(level3.mission3(address(this)), false);
        try level3.doMission3{value: 0.01 ether}(address(this)) {
            fail();
        } catch Error(string memory reason) {
            assertEq(reason, "Pay 0.05 ether");
        }
        assertEq(level3.mission3(address(this)), false);
        try level3.doMission3{value: 0.05 ether}(address(this)) {
            assertEq(level3.mission3(address(this)), true);
        } catch {
            fail();
        }
    }

    function test_withdraw() public {
        Level3 level3 = new Level3();
        address me = 0x8DF46E0eFf4070AcBF994B2c5479732b804c4EC0;
        assertEq(address(level3).balance, 0);
        level3.doMission3{value: 0.05 ether}(address(this));
        assertEq(address(level3).balance, 0.05 ether);
        level3.withdraw();
        assertEq(address(level3).balance, 0);
        assertEq(address(me).balance, 0.05 ether);
    }
}
