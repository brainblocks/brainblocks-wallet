// @flow
import { creators } from '~/state/actions/tradeActions'
import { creators as tradesCreators } from '~/state/actions/tradesActions'
import { creators as uiCreators } from '~/state/actions/uiActions'
import { isValidNanoAddress } from '~/functions/validate'
import * as tradeAPI from '~/state/api/trade'
import { getWallet, nanoToRaw } from '~/state/wallet'
import log from '~/functions/log'
import type { ThunkAction, CurrentSell, CurrentBuy } from '~/types/reduxTypes'
import { VALIDATE_SELL_AMOUNT } from '~/constants/config'

export const updateNanoPairs: () => ThunkAction = () => (
  dispatch,
  getState
) => {
  return new Promise(async (resolve, reject) => {
    // let ui know we're working
    dispatch(uiCreators.addActiveProcess(`get-nano-pairs`))

    try {
      // Get all pairs as nano_btc / btc_nano
      const allPairs = await tradeAPI.getAllPairs()
      // Filter it to a list of tickers that ended in _nano
      const buyNanoPairs = allPairs.pairs
        .filter(pair => pair.indexOf('_nano') >= 0)
        .map(pair => pair.replace('_nano', ''))
      // Filter it to a list of tickers that started in nano_
      const sellNanoPairs = allPairs.pairs
        .filter(pair => pair.indexOf('nano_') === 0)
        .map(pair => pair.replace('nano_', ''))
      // Get a list of currencies with which you can buy NANO
      // (there is no equivalent call for sells)
      const response = await tradeAPI.getCurrencyPairs('NANO')
      // Filter the list to Nano pairs and add availableMethods array
      const pairs = response.currencies
        .filter(
          currency =>
            buyNanoPairs.includes(currency.ticker) ||
            sellNanoPairs.includes(currency.ticker)
        )
        .map(currency => {
          const availableMethods = []
          if (buyNanoPairs.includes(currency.ticker)) {
            availableMethods.push('buy')
          }
          if (buyNanoPairs.includes(currency.ticker)) {
            availableMethods.push('sell')
          }
          return { ...currency, availableMethods }
        })
      // update in redux
      dispatch(creators.updateNanoPairs(pairs))
    } catch (e) {
      log.error('Error getting Nano trade pairs', e)
      dispatch(uiCreators.removeActiveProcess(`get-nano-pairs`))
      return reject('Error getting Nano trade pairs')
    }

    // let ui know we're done
    dispatch(uiCreators.removeActiveProcess(`get-nano-pairs`))

    resolve()
  })
}

export const createSell: CurrentSell => ThunkAction = currentSell => (
  dispatch,
  getState
) => {
  return new Promise(async (resolve, reject) => {
    const wallet = getWallet()
    const time = Date.now()
    currentSell.sellAmount = parseFloat(currentSell.sellAmount)
    const rejector = (reason, e) => {
      log.error(reason, e)
      dispatch(uiCreators.removeActiveProcess(`create-sell-${time}`))
      return reject(e)
    }

    // show we're working
    dispatch(uiCreators.addActiveProcess(`create-sell-${time}`))

    // validate fields
    if (!isValidNanoAddress(currentSell.fromAcc))
      return rejector('Invalid "from" address')
    if (isNaN(currentSell.sellAmount) || currentSell.sellAmount <= 0)
      return reject('Amount must be positive')

    // ensure sufficient balance
    const accountBalance = wallet.getAccountBalance(currentSell.fromAcc)
    const amountRaw = nanoToRaw(currentSell.sellAmount)
    if (amountRaw.greater(accountBalance) && VALIDATE_SELL_AMOUNT)
      return rejector('Insufficient funds in account')

    // set current sell in redux
    dispatch(creators.setCurrentSell(currentSell))

    // create trade
    const pair = `NANO_${currentSell.buyCurrency}`
    const tradeAmount = currentSell.sellAmount
    let trade
    let tradeStatus
    try {
      trade = await tradeAPI.createTrade({
        pair,
        receiveAddress: currentSell.receiveAddr,
        tradeAmount,
        extraId: currentSell.extraId || null,
        refundAddress: currentSell.fromAcc
      })
      tradeStatus = await tradeAPI.getTrade(trade.trade.id)
    } catch (e) {
      return rejector('Error creating trade', e)
    }

    if (!trade.status === 'success') {
      return rejector('Error creating trade')
    }

    dispatch(creators.setSellQuote(trade.trade))
    dispatch(tradesCreators.upsertTrade(tradeStatus.trade))

    dispatch(uiCreators.removeActiveProcess(`create-sell-${time}`))
    resolve()
  })
}

export const createBuy: CurrentBuy => ThunkAction = currentBuy => (
  dispatch,
  getState
) => {
  return new Promise(async (resolve, reject) => {
    const time = Date.now()
    currentBuy.sellAmount = parseFloat(currentBuy.sellAmount)
    const rejector = (reason, e) => {
      log.error(reason, e)
      dispatch(uiCreators.removeActiveProcess(`create-buy-${time}`))
      return reject(e)
    }

    // show we're working
    dispatch(uiCreators.addActiveProcess(`create-buy-${time}`))

    // set current buy in redux
    dispatch(creators.setCurrentBuy(currentBuy))

    // create trade
    const pair = `${currentBuy.sellCurrency}_NANO`
    const tradeAmount = currentBuy.sellAmount
    let trade
    let tradeStatus
    try {
      trade = await tradeAPI.createTrade({
        pair,
        receiveAddress: currentBuy.receiveAcc,
        tradeAmount,
        extraId: null,
        refundAddress: currentBuy.refundAddr
      })
      tradeStatus = await tradeAPI.getTrade(trade.trade.id)
    } catch (e) {
      return rejector('Error creating trade', e)
    }

    if (!trade.status === 'success') {
      return rejector('Error creating trade')
    }

    dispatch(creators.setBuyQuote(trade.trade))
    dispatch(tradesCreators.upsertTrade(tradeStatus.trade))

    dispatch(uiCreators.removeActiveProcess(`create-buy-${time}`))
    resolve()
  })
}
