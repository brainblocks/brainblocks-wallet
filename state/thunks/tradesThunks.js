// @flow
import { creators } from '~/state/actions/tradesActions'
import { creators as uiCreators } from '~/state/actions/uiActions'
import * as tradeAPI from '~/state/api/trade'
import log from '~/functions/log'
import type { ThunkAction } from '~/types/reduxTypes'

export const getTrades: () => ThunkAction = () => (dispatch, getState) => {
  return new Promise(async (resolve, reject) => {
    const rejector = (reason, e) => {
      log.error(reason, e)
      dispatch(uiCreators.removeActiveProcess(`get-trades`))
      return reject(reason)
    }

    // let ui know we're working
    dispatch(uiCreators.addActiveProcess(`get-trades`))

    try {
      // @todo these parameters are hard-coded while developing
      // we need to figure out a better way to get the latest trades by user
      const { trades } = await tradeAPI.getTrades({ limit: 10000, offset: 100 })
      // update in redux
      dispatch(creators.bulkAddTrades(trades))
    } catch (e) {
      rejector('Error getting trades', e)
    }

    // let ui know we're done
    dispatch(uiCreators.removeActiveProcess(`get-trades`))

    resolve()
  })
}

export const getTrade: string => ThunkAction = tradeId => (
  dispatch,
  getState
) => {
  return new Promise(async (resolve, reject) => {
    const time = Date.now()
    const uiAction = `get-trade-${tradeId}-${time}`
    const rejector = (reason, e) => {
      log.error(reason, e)
      dispatch(uiCreators.removeActiveProcess(uiAction))
      return reject(reason)
    }

    // let ui know we're working
    dispatch(uiCreators.addActiveProcess(uiAction))

    try {
      const { trade } = await tradeAPI.getTrade(tradeId)
      // update in redux
      dispatch(creators.upsertTrade(trade))
    } catch (e) {
      rejector('Error getting trades', e)
    }

    // let ui know we're done
    dispatch(uiCreators.removeActiveProcess(uiAction))

    resolve()
  })
}
