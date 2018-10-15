// @flow
import React from 'react'
import { destyle } from 'destyle'
import type { NormalizedState } from '~/types'
import AccountListItem from './AccountListItem'

type Props = {
  /** Accounts */
  accounts: NormalizedState,
  /** Addresses */
  nanoAddresses: NormalizedState,
  /** Nano price */
  nanoPrice: number,
  /** Filter by type. Keyword 'all' for no filtering. */
  type?: string,
  /** Given by destyle. Do not pass this to the component as a prop. */
  styles: Object
}

const AccountsList = ({
  styles,
  accounts,
  nanoAddresses,
  nanoPrice,
  type = 'all',
  ...rest
}: Props) => {
  const filtered = accounts.allIds.filter(
    accId => type === 'all' || accounts.byId[accId].type === type
  )
  return (
    <div className={styles.root}>
      {filtered.map((accId, i) => (
        <div className={styles.item} key={`account-${accId}`}>
          <AccountListItem
            nanoAddresses={nanoAddresses}
            nanoPrice={nanoPrice}
            account={accounts.byId[accId]}
          />
        </div>
      ))}
    </div>
  )
}

export default destyle(AccountsList, 'AccountsList')
