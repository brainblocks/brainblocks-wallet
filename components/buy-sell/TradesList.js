// @flow
import * as React from 'react'
import { connect } from 'react-redux'
import { destyle } from 'destyle'
import { getTrades } from '~/state/selectors/tradesSelectors'
import type { TradesState } from '~/types/reduxTypes'
import TradeListItem from './TradeListItem'
import NoTrades from './NoTrades'
import Spinner from 'brainblocks-components/build/Spinner'
import Typography from 'brainblocks-components/build/Typography'

type Props = {
  trades: TradesState,
  styles: Object
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
    const { styles, trades } = this.props
    return (
      <div className={styles.root}>
        {trades.didGetTrades && trades.allIds.length === 0 ? (
          <div style={{ margin: '40px 0' }}>
            <NoTrades />
          </div>
        ) : (
          <>
            <Typography el="h2" spaceBelow={1}>
              Your Trades
            </Typography>
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

export default connect((state, ownProps) => ({
  trades: getTrades(state)
}))(destyle(TradesList, 'TradesList'))
