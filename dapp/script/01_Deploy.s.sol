// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import {Script} from "forge-std/Script.sol";
import {Level0} from "../src/Level0.sol";
import {Level1} from "../src/Level1.sol";
import {Level2} from "../src/Level2.sol";

contract Deploy is Script {
    function run() public {
        vm.startBroadcast();
        new Level0();
        new Level1();
        new Level2();
        vm.stopBroadcast();
    }
}
