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

export async function createTrade(
  pair: string,
  receiveAddress: string,
  tradeAmount: number,
  extraId: ?string,
  refundAddress: string
): Promise<Object> {
  const { data } = await makeAuthorizedApiRequest({
    method: 'post',
    url: '/trade/create',
    data: {
      pair,
      receiveAddress,
      tradeAmount,
      extraId: extraId || null,
      refundAddress
    }
  })

  return data
}
