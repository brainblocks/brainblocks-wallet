// @flow
import { makeAuthorizedApiRequest } from './helpers'

export async function getVault(): Promise<Object> {
  const { data } = await makeAuthorizedApiRequest({
    method: 'get',
    url: '/users/vault'
  })

  return data.vault
}

export async function updateVault(wallet: Object): Promise<Object> {
  const { data } = await makeAuthorizedApiRequest({
    method: 'patch',
    url: '/users/vault',
    data: { wallet }
  })

  return data.vault
}

export async function createVault(hex: string): Promise<Object> {
  const { data } = await makeAuthorizedApiRequest({
    method: 'post',
    url: '/users/vault',
    data: { wallet: hex }
  })

  return data.vault
}
