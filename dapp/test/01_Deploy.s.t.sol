//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import {Test} from "forge-std/Test.sol";
import {Deploy} from "../script/01_Deploy.s.sol";

contract DeployTest is Test {
    function test_run() public {
        Deploy deploy = new Deploy();
        deploy.run();
    }
}
