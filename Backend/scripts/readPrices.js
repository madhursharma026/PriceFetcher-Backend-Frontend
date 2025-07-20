const { ethers } = require('hardhat')

async function main() {
  const contractAddress = '0x6DdaB5E281fc55E10834672D6D340032EB9a4655'

  const PriceFetcher = await ethers.getContractAt(
    'PriceFetcher',
    contractAddress
  )

  // BTC Price
  try {
    const btcPrice = await PriceFetcher.getBTCPrice()
    console.log('BTC/USD Price:', btcPrice.toString())
  } catch (err) {
    console.log('BTC/USD Price: Not available (feed paused or reverted)')
  }

  // ETH Price
  try {
    const ethPrice = await PriceFetcher.getETHPrice()
    console.log('ETH/USD Price:', ethPrice.toString())
  } catch (err) {
    console.log('ETH/USD Price: Error fetching ETH price')
    console.error(err.message)
  }
}

main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
