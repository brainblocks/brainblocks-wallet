import { makeApiRequest, makeAuthorizedApiRequest } from '~/state/helpers'

export async function updateAccount() {
  return new Promise(resolve => {
    setTimeout(() => resolve(), 1500)
  })
}
