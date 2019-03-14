// @flow
import * as React from 'react'
import { destyle } from 'destyle'
import type { NormalizedState } from '~/types'
import TransactionListItem from './TransactionListItem'
import { getAccountById } from '~/functions/accounts'

type Props = {
  accounts: NormalizedState,
  transactions: NormalizedState,
  showTransactions: Array<string>,
  styles: Object,
  account: string,
  pagination: React.Node
}

class TransactionsList extends React.Component<Props> {
  /**
   * Render the transactions as table rows
   */
  renderTransactions = txKeys => {
    const { transactions, account, accounts } = this.props
    return txKeys.map((txId, i) => {
      const tx = transactions.byId[txId]
      return (
        <TransactionListItem
          key={txId}
          transaction={tx}
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
          <tbody>{this.renderTransactions(txIds)}</tbody>
        </table>
        <div className={styles.pagination}>{pagination}</div>
      </div>
    )
  }
}

export default destyle(TransactionsList, 'TransactionsList')
