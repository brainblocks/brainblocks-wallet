// @flow
import axios from 'axios'
import { PRICE_API_URL } from '~/constants/config'

export async function getNanoPrices(): Promise<Object> {
  let res
  try {
    res = await axios.get(PRICE_API_URL)
  } catch (e) {
    throw e
  }
  const prices = {}
  res.data.rates.map(item => (prices[item.id] = item.price))
  return prices
}
