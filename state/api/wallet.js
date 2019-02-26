import { wallet } from '~/state/wallet'

export const getWallet = user => {
  return new Promise(resolve =>
    setTimeout(() => {
      resolve(false)
    }, 500)
  )
}

export const updateWallet = () => {
  return new Promise(resolve =>
    setTimeout(() => {
      resolve()
    }, 500)
  )
  //const hex = wallet.pack()
  // push it up!
}
