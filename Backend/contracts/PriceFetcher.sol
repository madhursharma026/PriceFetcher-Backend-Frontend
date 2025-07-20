// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./interfaces/AggregatorV3Interface.sol";

contract PriceFetcher {
    AggregatorV3Interface internal btcPriceFeed;
    AggregatorV3Interface internal ethPriceFeed;

    constructor(address _btcFeed, address _ethFeed) {
        btcPriceFeed = AggregatorV3Interface(_btcFeed);
        ethPriceFeed = AggregatorV3Interface(_ethFeed);
    }

    function getBTCPrice() public view returns (int) {
        (, int price, , , ) = btcPriceFeed.latestRoundData();
        require(price > 0, "Invalid BTC price");
        return price;
    }

    function getETHPrice() public view returns (int) {
        (, int price, , , ) = ethPriceFeed.latestRoundData();
        require(price > 0, "Invalid ETH price");
        return price;
    }
}
