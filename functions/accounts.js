// We'll need to swap this for the redux store
import mockState from '~/state/mockState'

// deprecated
export const getAccountType = acc =>
  mockState.nanoAddresses.byId.hasOwnProperty(acc) ? 'address' : 'nano'

// deprecated
export const getAccountById = acc => {
  const type = getAccountType(acc)
  return type === 'nano'
    ? mockState.accounts.byId[acc]
    : mockState.nanoAddresses.byId[acc]
}

export const getAccountLabel = acc =>
  acc.label || acc.account || acc.address || acc.id
