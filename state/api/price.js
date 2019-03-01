export const getNanoPrices = () => {
  return new Promise(resolve =>
    setTimeout(() => {
      resolve({
        usd: 0.89,
        aud: 1.18
      })
    }, 500)
  )
}
