// We'll need to swap this for the redux store
import mockState from '~/state/mockState'

export const getAccountType = acc =>
  mockState.nanoAddresses.byId.hasOwnProperty(acc) ? 'address' : 'nano'

export const getAccountById = acc => {
  const type = getAccountType(acc)
  return type === 'nano'
    ? mockState.accounts.byId[acc]
    : mockState.nanoAddresses.byId[acc]
}
