import { ethers } from 'ethers'
import { useEffect, useState } from 'react'
import PriceFetcherABI from '../constants/PriceFetcherABI.json'
import styles from '../styles/Home.module.css'

const CONTRACT_ADDRESS = '0xe6D472C173784CF472952A44850488AE530f3977'
const RPC_URL = 'https://eth-sepolia.g.alchemy.com/v2/WrxZl-erFCdmAXNZpVsXY'

export default function Home() {
  const [btcPrice, setBtcPrice] = useState(null)
  const [ethPrice, setEthPrice] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const formatPrice = (price) => (Number(price) / 1e8).toFixed(2)

  async function fetchPrices() {
    setLoading(true)
    setError('')

    try {
      const provider = new ethers.JsonRpcProvider(RPC_URL)
      const contract = new ethers.Contract(
        CONTRACT_ADDRESS,
        PriceFetcherABI,
        provider
      )

      // BTC
      try {
        const btcRaw = await contract.getBTCPrice()
        setBtcPrice(`$${formatPrice(btcRaw)}`)
      } catch {
        setBtcPrice('Feed Paused / Unavailable')
      }

      // ETH
      const ethRaw = await contract.getETHPrice()
      setEthPrice(`$${formatPrice(ethRaw)}`)
    } catch (err) {
      console.error(err)
      setError('Failed to fetch prices. Please try again later.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchPrices()
  }, [])

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Chainlink Price Fetcher</h1>

      {error && <p className={styles.error}>{error}</p>}

      <div className={styles.prices}>
        <PriceCard label="BTC/USD" value={btcPrice} loading={loading} />
        <PriceCard label="ETH/USD" value={ethPrice} loading={loading} />
      </div>

      <button onClick={fetchPrices} className={styles.button}>
        {loading ? 'Refreshing...' : 'Refresh Prices'}
      </button>
    </div>
  )
}

function PriceCard({ label, value, loading }) {
  return (
    <div className={styles.card}>
      <h2 className={styles.cardLabel}>{label}</h2>
      <p className={styles.cardValue}>
        {loading ? 'Loading...' : value || 'Unavailable'}
      </p>
    </div>
  )
}
