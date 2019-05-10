import { makeAuthorizedApiRequest } from './helpers'

export const getChains = async accounts => {
  const { data } = await makeAuthorizedApiRequest({
    method: 'post',
    url: '/node/chains',
    data: { accounts }
  })

  return data.accounts
}

export const broadcast = async (blockJSON, prevHash, amount = 'false') => {
  const { data } = await makeAuthorizedApiRequest({
    method: 'post',
    url: '/node/broadcast',
    data: { block: blockJSON, amount, hash: prevHash }
  })

  return data
}
