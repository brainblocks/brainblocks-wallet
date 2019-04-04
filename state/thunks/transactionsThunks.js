import { creators } from '~/state/actions/transactionActions'
import { creators as uiCreators } from '~/state/actions/uiActions'
import { creators as accountCreators } from '~/state/actions/accountActions'
import { syncReduxAccounts } from '~/state/thunks/accountsThunks'
import { isValidNanoAddress } from '~/functions/validate'
import * as transactionsAPI from '~/state/api/transactions'
import {
  wallet,
  populateChains,
  getPendingBlocksFromAccountsObject,
  blockToReduxTx,
  nanoToRaw,
  rawToNano,
  syncVault
} from '~/state/wallet'
import { getTransactions } from '~/state/selectors/transactionSelectors'

const tryBroadcast = async blk => {
  const json = blk.getJSONBlock()
  const prev = blk.getPrevious()
  // @todo include amount in broadcast for sends
  const { work, hash } = await transactionsAPI.broadcast(json, prev)
  blk.setWork(work)
  wallet.confirmBlock(hash)
}

export const importChains = accounts => (dispatch, getState) => {
  return new Promise(async (resolve, reject) => {
    const time = Date.now()
    const state = getState()
    accounts = accounts || state.accounts.allIds

    // show we're working
    dispatch(uiCreators.addActiveProcess(`get-chains-${time}`))

    // get the chains from the BB API
    let accountsObject
    try {
      accountsObject = await transactionsAPI.getChains(accounts)
    } catch (e) {
      dispatch(uiCreators.removeActiveProcess(`get-chains-${time}`))
      reject('Error getting chains', e)
    }

    // put them into the wallet
    const reduxTxs = populateChains(accountsObject)

    // update redux transactions
    dispatch(creators.bulkAddTransactions(reduxTxs))
    // and accounts...
    const updatedAccounts = accounts.map(acc => ({
      account: acc,
      didGetChain: true
    }))
    dispatch(accountCreators.bulkUpdateAccounts(updatedAccounts))
    dispatch(syncReduxAccounts())

    dispatch(uiCreators.removeActiveProcess(`get-chains-${time}`))
    resolve()
  })
}

export const handlePendingBlocks = accountsObject => async (
  dispatch,
  getState
) => {
  // get the pending blocks in block and redux format
  // blocks is in the correct order to process
  const { reduxTxs, blocks } = getPendingBlocksFromAccountsObject(
    accountsObject
  )

  // update redux transactions
  dispatch(creators.bulkAddTransactions(reduxTxs))

  // broadcast them in sequence
  for (let block of blocks) {
    const hash = block.getHash(true)
    dispatch(uiCreators.addActiveProcess(`broadcast-pending-receive-${hash}`))

    let blk
    try {
      blk = await tryBroadcast(block)
    } catch (e) {
      console.error('Error broadcasting block', e)
      dispatch(
        uiCreators.removeActiveProcess(`broadcast-pending-receive-${hash}`)
      )
      break
    }

    // update in redux
    dispatch(
      creators.updateTransaction({
        id: hash,
        status: 'confirmed',
        timestamp: Date.now()
      })
    )

    // sync redux accounts
    dispatch(syncReduxAccounts())

    dispatch(
      uiCreators.removeActiveProcess(`broadcast-pending-receive-${hash}`)
    )
  }
}

export const createSend = (fromAddr, toAddr, amountNano) => (
  dispatch,
  getState
) => {
  return new Promise(async (resolve, reject) => {
    const state = getState()
    const time = Date.now()
    amountNano = parseFloat(amountNano)
    const rejector = (reason, e) => {
      console.error(reason, e)
      dispatch(uiCreators.removeActiveProcess(`create-send-${time}`))
      return reject(reason)
    }

    // show we're working
    dispatch(uiCreators.addActiveProcess(`create-send-${time}`))

    // validate fields
    if (!isValidNanoAddress(fromAddr)) return rejector('Invalid "from" address')
    if (!isValidNanoAddress(toAddr)) return rejector('Invalid "to" address')
    if (isNaN(amountNano) || amountNano <= 0)
      return reject('Amount must be positive')

    // ensure sufficient balance
    const accountBalance = wallet.getAccountBalance(fromAddr)
    const amountRaw = nanoToRaw(amountNano)
    if (amountRaw.greater(accountBalance))
      return rejector('Insufficient funds in account')

    // create the block
    let blk
    try {
      blk = wallet.addPendingSendBlock(fromAddr, toAddr, amountRaw)
    } catch (e) {
      return rejector('Wallet rejected send block')
    }

    // broadcast
    try {
      await tryBroadcast(blk)
    } catch (e) {
      return rejector('Error broadcasting block', e)
    }

    // add to redux
    const transactions = getTransactions(state)
    const reduxTx = blockToReduxTx(blk)
    reduxTx.timestamp = time
    reduxTx.balanceNano = rawToNano(blk.getBalance())
    if (transactions.byId[blk.getPrevious()]) {
      reduxTx.height = transactions.byId[blk.getPrevious()].height + 1
    }
    dispatch(creators.createTransaction(reduxTx))

    // sync redux accounts
    dispatch(syncReduxAccounts())

    dispatch(uiCreators.removeActiveProcess(`create-send-${time}`))
    resolve()
  })
}

export const createChange = (account, rep) => (dispatch, getState) => {
  return new Promise(async (resolve, reject) => {
    const time = Date.now()
    const rejector = (reason, e) => {
      console.error(reason, e)
      dispatch(uiCreators.removeActiveProcess(`create-change-${time}`))
      return reject(reason)
    }

    // show we're working
    dispatch(uiCreators.addActiveProcess(`create-change-${time}`))

    // validate fields
    if (!isValidNanoAddress(account)) return rejector('Invalid account')
    if (!isValidNanoAddress(rep)) return rejector('Invalid representative')

    // create the block
    let blk
    try {
      blk = wallet.addPendingChangeBlock(account, rep)
    } catch (e) {
      return rejector('Wallet rejected change block', e)
    }

    // broadcast
    try {
      await tryBroadcast(blk)
    } catch (e) {
      return rejector('Error broadcasting block', e)
    }

    // sync the vault
    try {
      await syncVault()
    } catch (e) {
      // we don't need to reject this one
      console.error('Error syncing vault', e)
    }

    // add to redux
    dispatch(accountCreators.updateAccount({ account, representative: rep }))

    dispatch(uiCreators.removeActiveProcess(`create-change-${time}`))
    resolve()
  })
}
