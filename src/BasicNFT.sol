// contracts/GameItem.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract BasicNFT is ERC721URIStorage {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    uint public constant MAX_SUPPLY = 100;
    uint public constant PRICE = 0.01 ether;

    constructor() ERC721("GameItem", "ITM") {}

    /* URGENT TODO: Make sure this code is safe */
    function uint2str(
      uint256 _i
    )
      internal
      pure
      returns (string memory str)
    {
      if (_i == 0)
      {
        return "0";
      }
      uint256 j = _i;
      uint256 length;
      while (j != 0)
      {
        length++;
        j /= 10;
      }
      bytes memory bstr = new bytes(length);
      uint256 k = length;
      j = _i;
      while (j != 0)
      {
        bstr[--k] = bytes1(uint8(48 + j % 10));
        j /= 10;
      }
      str = string(bstr);
    }
    /* also this */
    function concat(string memory _a, string memory _b) private pure returns (string memory){
      bytes memory bytes_a = bytes(_a);
      bytes memory bytes_b = bytes(_b);
      string memory length_ab = new string(bytes_a.length + bytes_b.length);
      bytes memory bytes_c = bytes(length_ab);
      uint k = 0;
      for (uint i = 0; i < bytes_a.length; i++) bytes_c[k++] = bytes_a[i];
      for (uint i = 0; i < bytes_b.length; i++) bytes_c[k++] = bytes_b[i];
      return string(bytes_c);
    } 

    function mint(address minter)
        public payable
        returns (uint256)
    {
        uint256 newItemId = _tokenIds.current();
        require(newItemId <= MAX_SUPPLY, "Not enough NFTs left!");
        require(msg.value >= PRICE, "Not enough ether to purchase NFTs.");
        _mint(minter, newItemId);
        string memory tokenURI = "lol";
        _setTokenURI(newItemId, concat(tokenURI, uint2str(newItemId)));

        _tokenIds.increment();
        return newItemId;
    }
}