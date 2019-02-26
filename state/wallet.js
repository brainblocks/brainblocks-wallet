import { Wallet } from 'rai-wallet'

export let wallet = null

export const createWallet = password => {
  wallet = new Wallet(password)
}
