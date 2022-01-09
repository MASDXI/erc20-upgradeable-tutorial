// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./MyERC20.sol";

contract MyERC20V2 is MyERC20 {

    function version() public pure override returns (string memory) {
        return "v2";
    }

}