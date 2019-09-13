// @flow
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { destyle } from 'destyle'
import { formatNano } from '~/functions/format'
import DefTable from 'brainblocks-components/build/DefTable'
import DefTableItem from 'brainblocks-components/build/DefTableItem'
import Spinner from 'brainblocks-components/build/Spinner'
import { getAccounts } from '~/state/selectors/accountSelectors'
import { getTrades } from '~/state/selectors/tradesSelectors'
// import { withSnackbar } from 'brainblocks-components/build/Snackbar'
import AccountTitle from '~/components/accounts/AccountTitle'
import type { WithSnackbar } from '~/types'
import type { AccountsState, Trade } from '~/types/reduxTypes'

type Props = WithSnackbar & {
  accounts: AccountsState,
  tradeId: string,
  trade: Trade,
  styles: Object
}

class TradeInfoTable extends Component<Props> {
  render() {
    const { accounts, trade, styles } = this.props
    return (
      <div className={styles.root}>
        {trade ? (
          <DefTable>
            <DefTableItem label="Trade ID">{trade.id}</DefTableItem>
            <DefTableItem label="Status">{trade.status}</DefTableItem>
            <DefTableItem label="Sell">
              {formatNano(trade.expectedSendAmount, 5)}{' '}
              {trade.fromCurrency.toUpperCase()}
            </DefTableItem>
            <DefTableItem label="Buy">
              {formatNano(trade.expectedReceiveAmount, 5)}{' '}
              {trade.toCurrency.toUpperCase()}
            </DefTableItem>
            <DefTableItem label="Expected Exchange Rate">
              {`1 ${trade.fromCurrency.toUpperCase()} = ~${formatNano(
                trade.expectedReceiveAmount / trade.expectedSendAmount,
                5
              )} ${trade.toCurrency.toUpperCase()}`}
            </DefTableItem>
            <DefTableItem label="Receive Account">
              <AccountTitle account={accounts.byId[trade.payoutAddress]} />
            </DefTableItem>
            <DefTableItem label="Refund Address">
              {trade.refundAddress ||
                'No refund address. Refunds will be returned to the sending address.'}
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
  {}
)(destyle(TradeInfoTable, 'TradeInfoTable'))
