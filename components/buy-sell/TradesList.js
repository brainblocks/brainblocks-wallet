// @flow
import * as React from 'react'
import { connect } from 'react-redux'
import { destyle } from 'destyle'
import { getActiveProcesses } from '~/state/selectors/uiSelectors'
import { getTrades as selectTrades } from '~/state/selectors/tradesSelectors'
import { getTrades } from '~/state/thunks/tradesThunks'
import type { TradesState } from '~/types/reduxTypes'
import TradeListItem from './TradeListItem'
import NoTrades from './NoTrades'
import Spinner from 'brainblocks-components/build/Spinner'
import Typography from 'brainblocks-components/build/Typography'
import Button from 'brainblocks-components/build/Button'
import RefreshIcon from 'mdi-react/RefreshIcon'

type Props = {
  trades: TradesState,
  isRefreshing: boolean,
  styles: Object,
  getTrades: () => Promise<void>
}

class TradesList extends React.Component<Props> {
  /**
   * Render the trades as table rows
   */
  renderTrades = () => {
    const { trades } = this.props
    return trades.allIds.map((txId, i) => {
      const trade = trades.byId[txId]
      return <TradeListItem key={txId} trade={trade} />
    })
  }

  render() {
    const { styles, trades, isRefreshing, getTrades } = this.props
    return (
      <div className={styles.root}>
        {trades.didGetTrades && trades.allIds.length === 0 ? (
          <div style={{ margin: '40px 0' }}>
            <NoTrades />
          </div>
        ) : (
          <>
            <div className={styles.header}>
              <Typography el="h2">Your Trades</Typography>
              {isRefreshing ? (
                <Spinner color="blue" size={18} />
              ) : (
                <Button
                  variant="icon"
                  size={30}
                  iconSize={20}
                  destyleMerge={{ root: styles.iconButton }}
                  onClick={getTrades}
                >
                  <RefreshIcon />
                </Button>
              )}
            </div>
            <table className={styles.table} data-cy="trades-table">
              <thead>
                <tr>
                  <th className={styles.typeCol}>Type</th>
                  <th className={styles.buyCol}>Buy</th>
                  <th className={styles.sellCol}>Sell</th>
                  <th className={styles.statusCol}>Status</th>
                  <th className={styles.updatedCol}>Updated</th>
                  <th className={styles.actionCol} />
                </tr>
              </thead>
              <tbody>{trades.didGetTrades && this.renderTrades()}</tbody>
            </table>
            {!trades.didGetTrades && (
              <div className={styles.loading}>
                <Spinner color="#666" size={24} />
              </div>
            )}
            {/* <div className={styles.pagination}>{pagination}</div> */}
          </>
        )}
      </div>
    )
  }
}

export default connect(
  (state, ownProps) => ({
    trades: selectTrades(state),
    isRefreshing:
      getActiveProcesses(state).filter(p => p.indexOf('get-trades') === 0)
        .length > 0
  }),
  (dispatch, ownProps) => ({
    getTrades: () => dispatch(getTrades())
  })
)(destyle(TradesList, 'TradesList'))
