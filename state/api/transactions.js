import { makeApiRequest, makeAuthorizedApiRequest } from '~/state/helpers'
import sampleChains from '~/state/sampleChains.json'

export async function getChains(accounts) {
  const chains = sampleChains
  return chains
}
