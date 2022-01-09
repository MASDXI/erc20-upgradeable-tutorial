// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts-upgradeable/token/ERC20/ERC20Upgradeable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";

contract MyERC20 is Initializable, ERC20Upgradeable, UUPSUpgradeable, OwnableUpgradeable {
    event NameChanged(string newName, address by);

    function initialize() public initializer {
        __ERC20_init("ERC20V1","v1");
        __Ownable_init();
        _mint(msg.sender,10*(10**decimals()));
    }

    function version() public pure virtual returns (string memory) {
        return "v1";
    }

    function _authorizeUpgrade(address newImplementation) internal override onlyOwner {}
}