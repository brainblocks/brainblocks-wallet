import { wallet } from '~/state/wallet'

export const getWallet = user => {
  return false
}

export const updateWallet = () => {
  const hex = wallet.pack()
  // push it up!
}
