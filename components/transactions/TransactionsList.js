// @flow
import * as React from 'react'
import { destyle } from 'destyle'
import type { AccountsState, TransactionsState } from '~/types/reduxTypes'
import TransactionListItem from './TransactionListItem'
import NoTransactions from './NoTransactions'
import Spinner from 'brainblocks-components/build/Spinner'
import Typography from 'brainblocks-components/build/Typography'
import { Media } from 'react-breakpoints'

type Props = {
  accounts: AccountsState,
  transactions: TransactionsState,
  showTransactions: Array<string>,
  styles: Object,
  account: string,
  pagination: React.Node,
  loading: boolean,
  empty: boolean,
  tradesByTxHash: Object
}

class TransactionsList extends React.Component<Props> {
  /**
   * Render the transactions as table rows
   */
  renderTransactions = txKeys => {
    const { transactions, account, accounts, tradesByTxHash } = this.props
    return txKeys.map((txId, i) => {
      const tx = transactions.byId[txId]
      const trade =
        tx.type === 'send' ? tradesByTxHash[txId] : tradesByTxHash[tx.link]
      return (
        <TransactionListItem
          key={txId}
          trade={trade}
          transaction={tx}
          accounts={accounts}
          account={account === 'all' ? accounts.byId[tx.accountId] : null}
        />
      )
    })
  }

  render() {
    const {
      styles,
      transactions,
      showTransactions,
      account = 'all',
      accounts,
      pagination,
      loading = false,
      empty = false
    } = this.props
    const txIds = showTransactions.filter(
      txId => account === 'all' || transactions.byId[txId].accountId === account
    )
    return (
      <div className={styles.root}>
        {empty ? (
          <div style={{ margin: '40px 0' }}>
            <NoTransactions
              faucet={transactions.allIds.length === 0}
              address={account === 'all' ? accounts.allIds[0] : account}
            />
          </div>
        ) : (
          <>
            <Media>
              {({ breakpoints, currentBreakpoint }) =>
                breakpoints[currentBreakpoint] >= breakpoints.tablet && (
                  <Typography el="h2" spaceBelow={1}>
                    Transactions
                  </Typography>
                )
              }
            </Media>
            <table className={styles.table} data-cy="transactions-table">
              <thead>
                <tr>
                  <th className={styles.imgCol}>Type</th>
                  {account === 'all' && (
                    <th className={styles.accountCol}>Account</th>
                  )}
                  <th className={styles.contactCol}>Contact</th>
                  <th className={styles.noteCol}>Note</th>
                  <th className={styles.valueCol}>Value</th>
                  <th className={styles.actionCol} />
                </tr>
              </thead>
              <tbody>{!loading && this.renderTransactions(txIds)}</tbody>
            </table>
            {loading && (
              <div className={styles.loading}>
                <Spinner color="#666" size={24} />
              </div>
            )}
            <div className={styles.pagination}>{pagination}</div>
          </>
        )}
      </div>
    )
  }
}

export default destyle(TransactionsList, 'TransactionsList')
