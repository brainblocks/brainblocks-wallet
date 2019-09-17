// @flow
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { destyle } from 'destyle'
import { formatNano, formatTimeAgo } from '~/functions/format'
import DefTable from 'brainblocks-components/build/DefTable'
import DefTableItem from 'brainblocks-components/build/DefTableItem'
import Spinner from 'brainblocks-components/build/Spinner'
import { getAccounts } from '~/state/selectors/accountSelectors'
import { getTrades } from '~/state/selectors/tradesSelectors'
import { getTrade } from '~/state/thunks/tradesThunks'
// import { withSnackbar } from 'brainblocks-components/build/Snackbar'
import AccountTitle from '~/components/accounts/AccountTitle'
import type { WithSnackbar } from '~/types'
import type { AccountsState, Trade } from '~/types/reduxTypes'
import type { TradeStatus } from '~/types/apiTypes'

export const redStatuses: Array<TradeStatus> = ['failed', 'refunded', 'expired']
export const amberStatuses: Array<TradeStatus> = [
  'new',
  'waiting',
  'confirming',
  'exchanging',
  'sending'
]
export const greenStatuses: Array<TradeStatus> = ['finished']

type Props = WithSnackbar & {
  accounts: AccountsState,
  tradeId: string,
  trade: Trade,
  styles: Object,
  getTrade: () => void
}

class TradeInfoTable extends Component<Props> {
  pollTimer: IntervalID

  componentDidMount() {
    this.refresh()
    this.pollTimer = setInterval(this.refresh, 5000)
  }

  componentWillUnmount() {
    clearInterval(this.pollTimer)
  }

  refresh = () => {
    if (!document.hasFocus()) return
    if (typeof this.props.trade === 'object') {
      if (amberStatuses.includes(this.props.trade.status)) {
        this.props.getTrade()
      } else {
        clearInterval(this.pollTimer)
      }
    }
  }

  render() {
    const { accounts, trade, styles } = this.props
    return (
      <div className={styles.root}>
        {trade ? (
          <DefTable>
            <DefTableItem label="Trade ID">
              <span className={styles.tradeId}>{trade.id}</span>
            </DefTableItem>
            <DefTableItem label="Status">
              <span className={styles.status}>
                <span className={styles.statusIndicator} />
                {trade.status}
              </span>
            </DefTableItem>
            <DefTableItem label="Sell">
              <span className={styles.sell}>
                {formatNano(trade.expectedSendAmount, 5)}{' '}
                {trade.fromCurrency.toUpperCase()}
              </span>
            </DefTableItem>
            <DefTableItem label="Buy">
              <span className={styles.buy}>
                {formatNano(trade.expectedReceiveAmount, 5)}{' '}
                {trade.toCurrency.toUpperCase()}
              </span>
            </DefTableItem>
            <DefTableItem label="Expected Exchange Rate">
              <span
                className={styles.rate}
              >{`1 ${trade.fromCurrency.toUpperCase()} = ~${formatNano(
                trade.expectedReceiveAmount / trade.expectedSendAmount,
                5
              )} ${trade.toCurrency.toUpperCase()}`}</span>
            </DefTableItem>
            <DefTableItem label="Receive Account">
              {accounts.allIds.includes(trade.payoutAddress) ? (
                <AccountTitle account={accounts.byId[trade.payoutAddress]} />
              ) : (
                trade.payoutAddress
              )}
            </DefTableItem>
            <DefTableItem
              label={`${trade.fromCurrency.toUpperCase()} Deposit Address`}
            >
              <span className={styles.payinAddress}>{trade.payinAddress}</span>
            </DefTableItem>
            <DefTableItem label="Refund Address">
              <span className={styles.refund}>
                {trade.refundAddress ||
                  'No refund address. Refunds will be returned to the sending address.'}
              </span>
            </DefTableItem>
            <DefTableItem label="Last Updated">
              <span className={styles.updated}>
                {formatTimeAgo(trade.updatedAt)}
              </span>
            </DefTableItem>
          </DefTable>
        ) : (
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-around',
              margin: 60
            }}
          >
            <Spinner />
          </div>
        )}
      </div>
    )
  }
}

export default connect(
  (state, ownProps) => ({
    accounts: getAccounts(state),
    trade: getTrades(state).byId[ownProps.tradeId]
  }),
  (dispatch, ownProps) => ({
    getTrade: () => dispatch(getTrade(ownProps.tradeId))
  })
)(destyle(TradeInfoTable, 'TradeInfoTable'))
