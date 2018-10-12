// @flow
import React from 'react'
import { destyle } from 'destyle'
import TransactionImage from './TransactionImage'

const accounts = {
  abcd: {
    id: 'abcd',
    balance: 55,
    name: 'Spending',
    color: 'purple'
  },
  efg: {
    id: 'efg',
    balance: 12.3456,
    name: 'Trading',
    color: 'gold'
  },
  hij: {
    id: 'hij',
    type: 'vault',
    seed: 'abcd',
    name: 'Vault',
    color: 'pink',
    addresses: [
      {
        address:
          'xrb_1brainb3zz81wmhxndsbrjb94hx3fhr1fyydmg6iresyk76f3k7y7jiazoji',
        balance: 3.789,
        representative:
          'xrb_1brainb3zz81wmhxndsbrjb94hx3fhr1fyydmg6iresyk76f3k7y7jiazoji',
        name: 'HODL'
      },
      {
        address:
          'xrb_112345b3zz81wmhxndsbrjb94hx3fhr1fyydmg6iresyk76f3k7y7ji12345',
        balance: 125.79,
        representative:
          'xrb_1brainb3zz81wmhxndsbrjb94hx3fhr1fyydmg6iresyk76f3k7y7jiazoji',
        name: 'Holiday Savings'
      }
    ]
  }
}
const transactions = {
  abcd: {
    id: 'abcd',
    timestamp: Date.now() - 10000,
    amountNano: 2.1,
    valueUsd: 5.32,
    valueFiat: 5.32,
    type: 'send',
    toType: 'address',
    toAddress:
      'xrb_1brainb3zz81wmhxndsbrjb94hx3fhr1fyydmg6iresyk76f3k7y7jiazoji',
    note: '',
    accountType: 'nano',
    accountId: 'abcd',
    status: 'pending',
    note: 'Electricity Bill'
  },
  efg: {
    id: 'efg',
    timestamp: 1539315703941,
    amountNano: 2.1,
    valueUsd: 5.32,
    valueFiat: 5.32,
    type: 'receive',
    fromType: 'address',
    fromAddress:
      'xrb_1brainb3zz81wmhxndsbrjb94hx3fhr1fyydmg6iresyk76f3k7y7jiazoji',
    note: '',
    accountType: 'nano',
    accountId: 'abcd',
    status: 'confirmed',
    note: ''
  },
  hij: {
    id: 'hij',
    timestamp: 1539315503941,
    amountNano: 12.21,
    valueUsd: 55.32,
    valueFiat: 55.32,
    type: 'receive',
    fromType: 'account',
    fromAccount: 'abcd',
    note: '',
    accountType: 'account',
    accountId: 'abcd',
    status: 'confirmed',
    note: 'Thanks for the beers'
  },
  klm: {
    id: 'klm',
    timestamp: 1539314503941,
    amountNano: 2.1,
    valueUsd: 5.32,
    valueFiat: 5.32,
    type: 'send',
    toType: 'contact',
    toContact: 'abcd',
    note: '',
    accountType: 'nano',
    accountId: 'abcd',
    status: 'pending',
    note: 'Electricity Bill'
  }
}

type Props = {
  styles: Object,
  account: 'all'
}

type State = {
  expandedTransactions: string[]
}

class TransactionsList extends React.Component<Props, State> {
  state = {
    expandedTransactions: []
  }

  /**
   * Render the transactions as table rows
   */
  renderTransactions = txKeys => {
    const { styles, account } = this.props

    return txKeys.map((txId, i) => {
      const tx = transactions[txId]

      return (
        <tr key={`tx${i}`}>
          <td className={styles.imgCol}>
            <TransactionImage transaction={tx} />
          </td>
          {account === 'all' && (
            <td className={styles.accountCol}>{accounts[tx.accountId].name}</td>
          )}
          <td className={styles.contactCol}>
            {tx.type === 'receive' && (
              <>
                {tx.fromType === 'address' && <span>{tx.fromAddress}</span>}
                {tx.fromType === 'account' && <span>{tx.fromAccount}</span>}
              </>
            )}
          </td>
          <td className={styles.noteCol}>{tx.note}</td>
          <td className={styles.valueCol}>{tx.amountNano}</td>
          <td className={styles.actionCol}>v</td>
        </tr>
      )
    })
  }

  render() {
    const { styles, account = 'all', ...rest } = this.props
    const txKeys = Object.keys(transactions) // @todo - order this list by timestamp

    return (
      <div className={styles.root} {...rest}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th className={styles.imgCol}>Image</th>
              {account === 'all' && (
                <th className={styles.accountCol}>Account</th>
              )}
              <th className={styles.contactCol}>Contact</th>
              <th className={styles.noteCol}>Note</th>
              <th className={styles.valueCol}>Value</th>
              <th className={styles.actionCol} />
            </tr>
          </thead>
          <tbody>{this.renderTransactions(txKeys)}</tbody>
        </table>
      </div>
    )
  }
}

export default destyle(TransactionsList, 'TransactionsList')
