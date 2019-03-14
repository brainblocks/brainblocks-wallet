/* @flow */

/**
 * This file exports a wallet singleton that needs to be instantiated
 * using `createWallet(password)`. It also includes middleware functions
 * for interfacing between the BrainBlocks API and the wallet, and functions
 * to help convert wallet types to redux format.
 */

import { Wallet, Block, RaiFunctions } from 'rai-wallet'
import type { NanoTransactionRedux } from '~/types'
import nanoTransactionTemplate from '~/state/reducers/transactionsReducer'

export let wallet: Object | null = null

export const createWallet = (password: string) => {
  wallet = new Wallet(password)
  wallet.lightWallet(true)
}

/**
 * Takes an object of accounts as given by the BrainBlocks API
 * and adds them to the wallet accounts.
 * @param {Object} accounts
 */
export const populateChains = (accounts: Object) => {
  if (wallet === null) throw new Error('Wallet not instantiated')

  const txs = {}

  for (let acc in accounts) {
    let blocks = accounts[acc].blocks
    blocks.reverse()
    for (let i in blocks) {
      var blk = new Block(blocks[i].type === 'state')
      blk.buildFromJSON(blocks[i].contents)
      if (blocks[i].origin) blk.setOrigin(blocks[i].origin)
      blk.setAccount(acc)
      blk.setAmount(blocks[i].amount)
      blk.setImmutable(true)
      wallet.importBlock(blk, acc, false)

      if (getBlockIntent(blk) !== 'change') {
        const tx = blockToReduxTx(blk)
        tx.timestamp = parseInt(blocks[i].height, 10)
        txs[tx.id] = tx
      }
    }
    wallet.useAccount(acc)
    wallet.setAccountBalancePublic(accounts[acc].balance, acc)
  }

  return txs
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

  if (wallet === null) throw new Error('Wallet not instantiated')

  wallet.useAccount(block.getAccount())
  const previousBalance = wallet.getBalanceUpToBlock(block.getPrevious())

  if (block.getPrevious() === block.getAccount()) return 'open'
  if (previousBalance.eq(block.getBalance())) return 'change'
  if (block.getBalance().greater(previousBalance)) return 'receive'
  if (block.getBalance().lesser(previousBalance)) return 'send'
  throw new Error(`Cannot determine block intent for ${block.getHash()}`)
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
      return RaiFunctions.accountFromHexKey(block.getSource())
    case 'send':
      return RaiFunctions.accountFromHexKey(block.getDestination())
    default:
      return ''
  }
}

/**
 * Get Nano amount as Native JS Number from block
 */
const getBlockAmountNano: Object => number = block =>
  block
    .getAmount()
    .over('1000000000000000000000000')
    .toJSNumber() / 1000000

/**
 * Convert a block from the wallet into a redux transaction format
 */
export const blockToReduxTx: Object => NanoTransactionRedux = block => {
  const tx: NanoTransactionRedux = {
    ...nanoTransactionTemplate,
    id: block.getHash(true),
    accountId: block.getAccount(),
    timestamp: 0, // @todo
    amountNano: getBlockAmountNano(block),
    type: getBlockIntent(block),
    isState: block.getType() === 'state',
    linkAddress: getBlockLinkAsAddress(block),
    status: 'confirmed', // @todo
    note: ''
  }
  return tx
}
