// @flow
import { makeAuthorizedApiRequest } from './helpers'

export async function getCurrencyPairs(currency: string): Promise<Object> {
  const { data } = await makeAuthorizedApiRequest({
    method: 'post',
    url: '/trade/currencyPairs',
    data: {
      currency
    }
  })

  return data
}

export async function createTrade(tradeData: {
  pair: string,
  receiveAddress: string,
  tradeAmount: number,
  extraId: ?string,
  refundAddress: string
}): Promise<Object> {
  const { data } = await makeAuthorizedApiRequest({
    method: 'post',
    url: '/trade/create',
    data: tradeData
  })

  return data
}
