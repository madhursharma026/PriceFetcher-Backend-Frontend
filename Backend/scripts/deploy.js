const { ethers } = require('hardhat')

async function main() {
  const BTC_FEED = '0xA39434A63A52E749F02807ae27335515BA4b07F7' // BTC/USD Sepolia
  const ETH_FEED = '0x694AA1769357215DE4FAC081bf1f309aDC325306' // ETH/USD Sepolia

  console.log('Deploying PriceFetcher...')
  const PriceFetcher = await ethers.getContractFactory('PriceFetcher')
  const priceFetcher = await PriceFetcher.deploy(BTC_FEED, ETH_FEED)
  await priceFetcher.waitForDeployment()

  console.log(`Contract deployed to: ${priceFetcher.target}`)
}

main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
