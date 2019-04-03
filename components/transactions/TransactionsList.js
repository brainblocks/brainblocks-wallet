// @flow
import * as React from 'react'
import { destyle } from 'destyle'
import type { NormalizedState } from '~/types'
import TransactionListItem from './TransactionListItem'
import { Spinner } from 'brainblocks-components'

type Props = {
  accounts: NormalizedState,
  transactions: NormalizedState,
  showTransactions: Array<string>,
  styles: Object,
  account: string,
  pagination: React.Node,
  loading: boolean
}

class TransactionsList extends React.Component<Props> {
  /**
   * Render the transactions as table rows
   */
  renderTransactions = txKeys => {
    const { transactions, account, accounts } = this.props
    console.log(accounts)
    return txKeys.map((txId, i) => {
      const tx = transactions.byId[txId]
      return (
        <TransactionListItem
          key={txId}
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
      pagination,
      loading = false,
      ...rest
    } = this.props
    const txIds = showTransactions.filter(
      txId => account === 'all' || transactions.byId[txId].accountId === account
    )
    return (
      <div className={styles.root}>
        <table className={styles.table}>
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
      </div>
    )
  }
}

export default destyle(TransactionsList, 'TransactionsList')
