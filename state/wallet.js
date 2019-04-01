/* @flow */

/**
 * This file exports a wallet singleton that needs to be instantiated
 * using `createWallet(password)`. It also includes middleware functions
 * for interfacing between the BrainBlocks API and the wallet, and functions
 * to help convert wallet types to redux format.
 */

import { Wallet, Block, RaiFunctions } from 'rai-wallet'
import bigInt from 'big-integer'
import type { NanoTransactionRedux } from '~/types'
import nanoTransactionTemplate from '~/state/reducers/transactionsReducer'
import * as VaultAPI from '~/state/api/vault'
import { isValidNanoAddress } from '~/functions/validate'

export let wallet: Object | null = null

export const createWallet = (password: string) => {
  wallet = new Wallet(password)
  wallet.lightWallet(true)
}

export const destroyWallet = () => {
  wallet = null
}

/**
 * Pack the wallet and update it on the server
 */
export const syncVault = async () => {
  if (wallet === null) throw new Error('Wallet not instantiated')
  const hex = wallet.pack()
  return await VaultAPI.updateVault(hex)
}

/**
 * Takes an object of accounts as given by the BrainBlocks API
 * and returns them in redux transaction format.
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
        if (isValidNanoAddress(blocks[i].source_account)) {
          tx.linkAddress = blocks[i].source_account
        }
        tx.timestamp = parseInt(blocks[i].local_timestamp, 10) * 1000
        tx.height = parseInt(blocks[i].height, 10)
        tx.balanceNano = rawToNano(blocks[i].balance)
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
 * @param {Object} accounts
 * @returns { reduxTxs: Object, blocks: array }
 */
export const getPendingBlocksFromAccountsObject = (accounts: Object) => {
  if (wallet === null) throw new Error('Wallet not instantiated')

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
        console.error(`Error adding block ${blk.hash}`)
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

  if (wallet === null) throw new Error('Wallet not instantiated')

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
export const blockToReduxTx: Object => NanoTransactionRedux = block => {
  const tx: NanoTransactionRedux = {
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
