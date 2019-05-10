import { makeAuthorizedApiRequest } from './helpers'

export const getVault = async () => {
  const { data } = await makeAuthorizedApiRequest({
    method: 'get',
    url: '/users/vault'
  })

  return data.vault
}

export const updateVault = async wallet => {
  const { data } = await makeAuthorizedApiRequest({
    method: 'patch',
    url: '/users/vault',
    data: { wallet }
  })

  return data.vault
}

export const createVault = async vault => {
  const { data } = await makeAuthorizedApiRequest({
    method: 'post',
    url: '/users/vault',
    data: { wallet: vault }
  })

  return data.vault
}
