// @flow
import { makeAuthorizedApiRequest } from './helpers'
import type { APIAccountsObject } from '~/types/apiTypes'

export async function getChains(
  accounts: Array<string>
): Promise<APIAccountsObject> {
  const { data } = await makeAuthorizedApiRequest({
    method: 'post',
    url: '/node/chains',
    data: { accounts }
  })

  return data.accounts
}

export async function broadcast(
  blockJSON: string,
  prevHash: string,
  amount: string = 'false'
): Promise<Object> {
  const { data } = await makeAuthorizedApiRequest({
    method: 'post',
    url: '/node/broadcast',
    data: { block: blockJSON, amount, hash: prevHash }
  })

  return data
}
