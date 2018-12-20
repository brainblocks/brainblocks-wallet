// @flow
import * as React from 'react'
import { destyle } from 'destyle'
import type { NormalizedState } from '~/types'
import TransactionListItem from './TransactionListItem'
import { getAccountById } from '~/functions/accounts'
import mockState from '~/state/mockState'
const { transactions, accounts } = mockState

type Props = {
  accounts: NormalizedState,
  transactions: NormalizedState,
  styles: Object,
  account: string
}

class TransactionsList extends React.Component<Props> {
  /**
   * Render the transactions as table rows
   */
  renderTransactions = txKeys => {
    const { styles, account } = this.props
    return txKeys.map((txId, i) => {
      const tx = transactions.byId[txId]
      return (
        <TransactionListItem
          key={txId}
          transaction={tx}
          account={account === 'all' ? getAccountById(tx.accountId) : null}
        />
      )
    })
  }

  render() {
    const { styles, account = 'all', ...rest } = this.props
    const txIds = transactions.allIds.filter(
      txId => account === 'all' || transactions.byId[txId].accountId === account
    )

    return (
      <div className={styles.root} {...rest}>
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
      </div>
    )
  }
}

export default destyle(TransactionsList, 'TransactionsList')
