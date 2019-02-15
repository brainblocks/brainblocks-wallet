import { Wallet } from 'rai-wallet'

export let wallet

export const createWallet = password => {
  wallet = new Wallet(password)
}
