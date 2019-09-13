// @flow
import { makeAuthorizedApiRequest } from './helpers'

export async function getAllPairs(): Promise<Object> {
  const { data } = await makeAuthorizedApiRequest({
    method: 'get',
    url: '/trade/pairs'
  })

  return data
}

export async function getCurrencyPairs(currency: string): Promise<Object> {
  const { data } = await makeAuthorizedApiRequest({
    method: 'get',
    url: `/trade/pairs/${currency}`
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

export async function getEstimate(
  amount: number,
  pair: string
): Promise<Object> {
  const { data } = await makeAuthorizedApiRequest({
    method: 'get',
    url: '/trade/estimate',
    params: {
      amount,
      pair
    }
  })

  return data
}

export async function getTrades(params: Object = {}): Promise<Object> {
  const { data } = await makeAuthorizedApiRequest({
    method: 'get',
    url: '/trade/trades',
    params
  })

  return data
}

export async function getTrade(id: string): Promise<Object> {
  const { data } = await makeAuthorizedApiRequest({
    method: 'get',
    url: `/trade/trades/${id}`
  })

  return data
}
