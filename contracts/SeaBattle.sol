// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract SeaBattle is ERC721, Ownable {
    uint256 public tokenCounter;
    struct Ship {
        uint256 id;
        string name;
        uint256 positionX;
        uint256 positionY;
    }

    mapping(uint256 => Ship) public ships;

    constructor() ERC721("SeaBattleShip", "SBS") {
        tokenCounter = 0;
    }

    function createShip(string memory name, uint256 x, uint256 y) public onlyOwner returns (uint256) {
        uint256 newShipId = tokenCounter;
        ships[newShipId] = Ship(newShipId, name, x, y);
        _safeMint(msg.sender, newShipId);
        tokenCounter += 1;
        return newShipId;
    }

    function moveShip(uint256 tokenId, uint256 newX, uint256 newY) public {
        require(ownerOf(tokenId) == msg.sender, "Not the owner");
        Ship storage ship = ships[tokenId];
        ship.positionX = newX;
        ship.positionY = newY;
    }

    // Additional game functions
}
