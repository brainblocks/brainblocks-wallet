// @flow

/**
 * This file exports a wallet singleton that needs to be instantiated
 * using `createWallet(password)`. It also includes middleware functions
 * for interfacing between the BrainBlocks API and the wallet, and functions
 * to help convert wallet types to redux format.
 */

import { Wallet, Block, RaiFunctions } from 'rai-wallet'
import bigInt from 'big-integer'
import nanoTransactionTemplate from '~/state/reducers/transactionsReducer'
import * as VaultAPI from '~/state/api/vault'
import log from '~/functions/log'
import { isValidNanoAddress } from '~/functions/validate'
import type {
  MutableReduxNanoTransaction,
  ReduxNanoTransactionsObject
} from '~/types/reduxTypes'
import type {
  APIAccountsObject,
  WebsocketReceiveAccountsObject
} from '~/types/apiTypes'

let cachedWallet: Object | null = null

export const getWallet = () => {
  if (cachedWallet === null) throw new Error('Wallet not instantiated')
  return cachedWallet
}

export const createWallet = (password: string) => {
  cachedWallet = new Wallet(password)
  cachedWallet.lightWallet(true)
}

export const destroyWallet = () => {
  cachedWallet = null
}

export const isPasswordCorrect = (password: string) => {
  const wallet = getWallet()
  try {
    wallet.changePass(password, 'temppassword')
    wallet.changePass('temppassword', password)
  } catch (e) {
    return false
  }
  return true
}

/**
 * Pack the wallet and update it on the server
 */
export const syncVault = async () => {
  const wallet = getWallet()
  const hex = wallet.pack()
  return await VaultAPI.updateVault(hex)
}

/**
 * Takes an object of accounts as given by the BrainBlocks API
 * and returns them in redux transaction format.
 * @param {APIAccountsObject} accounts
 */
export function populateChains(
  accounts: APIAccountsObject
): ReduxNanoTransactionsObject {
  const wallet = getWallet()

  const txs = {}

  for (let acc in accounts) {
    let blocks = accounts[acc].blocks
    blocks.reverse()
    for (let block of blocks) {
      const contents = JSON.parse(block.contents)
      const blk = new Block(contents.type === 'state')
      blk.buildFromJSON(block.contents)
      if (block.origin) blk.setOrigin(block.origin)
      blk.setAccount(acc)
      blk.setAmount(block.amount)
      blk.setImmutable(true)
      wallet.importBlock(blk, acc, false)

      if (getBlockIntent(blk) !== 'change') {
        const tx = blockToReduxTx(blk)
        if (isValidNanoAddress(block.source_account)) {
          tx.linkAddress = block.source_account
        }
        tx.timestamp = parseInt(block.local_timestamp, 10) * 1000
        tx.height = parseInt(block.height, 10)
        tx.balanceNano = rawToNano(block.balance)
        txs[tx.id] = tx
      }
    }
    wallet.useAccount(acc)
    wallet.setAccountBalancePublic(accounts[acc].balance, acc)
  }

  return txs
}

/**
 * Takes an object of accounts and their pending transactions
 * as given by the BrainBlocks API
 * and returns them in both redux transaction format and as block objects.
 * IMPORTANT: The returned blocks array must be in the order of the chain
 * @param {WebsocketReceiveAccountsObject} accounts
 * @returns { reduxTxs: ReduxNanoTransactionsObject, blocks: array }
 */
export function getPendingBlocksFromAccountsObject(
  accounts: WebsocketReceiveAccountsObject
): { reduxTxs: ReduxNanoTransactionsObject, blocks: Array<Object> } {
  const wallet = getWallet()

  const txs = {}
  const blocks = []
  for (let acc in accounts) {
    if (!Array.isArray(accounts[acc].blocks)) continue

    accounts[acc].blocks.forEach(blk => {
      // wallet format
      const block = wallet.addPendingReceiveBlock(
        blk.hash,
        acc,
        blk.from,
        blk.amount
      )
      if (!block) {
        log.error(`Error adding block ${blk.hash}`)
        return
      }
      blocks.push(block)

      // redux format
      const tx = blockToReduxTx(block)
      tx.status = 'pending'
      tx.linkAddress = blk.from
      tx.timestamp = Date.now()
      tx.balanceNano = rawToNano(block.balance)
      txs[tx.id] = tx
    })

    // do I need this?
    /*wallet.useAccount(acc)
    wallet.setAccountBalancePublic(accounts[acc].balance, acc)*/
  }

  return { reduxTxs: txs, blocks }
}

/**
 * Return whether a block is a send|receive|open|change (regardless of being a state block)
 */
const getBlockIntent: Object =>
  | 'send'
  | 'receive'
  | 'open'
  | 'change' = block => {
  if (block.getType() !== 'state') return block.getType()

  const wallet = getWallet()

  wallet.useAccount(block.getAccount())
  const previousBalance = wallet.getBalanceUpToBlock(block.getPrevious())

  if (block.getPrevious() === block.getAccount()) return 'open'
  if (previousBalance.eq(block.getBalance())) return 'change'
  if (block.getBalance().greater(previousBalance)) return 'receive'
  if (block.getBalance().lesser(previousBalance)) return 'send'
  throw new Error(`Cannot determine block intent for ${block.getHash(true)}`)
}

/**
 * Get the link for a block
 * For state block = link
 * For receive or block = source
 * For send block = destination
 * For change block = ''
 */
const getBlockLinkAsAddress: Object => string = block => {
  switch (block.getType()) {
    case 'state':
      return block.getLinkAsAccount()
    case 'open':
    case 'receive':
      return RaiFunctions.accountFromHexKey(block.getOrigin())
    case 'send':
      return RaiFunctions.accountFromHexKey(block.getDestination())
    default:
      return ''
  }
}

/**
 * Raw to Nano
 */
export const rawToNano: (string | Object) => number = raw =>
  bigInt(raw)
    .over('1000000000000000000000000')
    .toJSNumber() / 1000000

/**
 * Nano to Raw
 */
export const nanoToRaw: number => Object = nano => {
  const amountRai = parseInt(nano * 1000000, 10)
  return bigInt(amountRai).multiply('1000000000000000000000000')
}

/**
 * Get Nano amount as Native JS Number from block
 */
const getBlockAmountNano: Object => number = block =>
  rawToNano(block.getAmount())

/**
 * Convert a block from the wallet into a redux transaction format
 */
export const blockToReduxTx: Object => MutableReduxNanoTransaction = block => {
  const tx: MutableReduxNanoTransaction = {
    ...nanoTransactionTemplate,
    id: block.getHash(true),
    accountId: block.getAccount(),
    amountNano: getBlockAmountNano(block),
    type: getBlockIntent(block),
    isState: block.getType() === 'state',
    linkAddress: getBlockLinkAsAddress(block),
    status: 'confirmed', // @todo
    note: ''
  }
  return tx
}
