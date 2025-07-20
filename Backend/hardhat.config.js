require('@nomicfoundation/hardhat-toolbox')

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: '0.8.28',
  networks: {
    localhost: {
      url: 'http://127.0.0.1:9545',
    },
    sepolia: {
      url: 'https://eth-sepolia.g.alchemy.com/v2/WrxZl-erFCdmAXNZpVsXY',
      accounts: [
        '279c4cb55130c70596d58ad0a0445a63c7e6e0cca422d53f24d287839fbe25ad',
      ],
      timeout: 120000,
    },
  },
}
