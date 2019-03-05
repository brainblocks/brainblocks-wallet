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
  preferredCurrency: string,
  /** Nano price */
  nanoPrice: number,
  /** Filter by type. Keyword 'all' for no filtering. */
  type?: string | Array<string>,
  /** Given by destyle. Do not pass this to the component as a prop. */
  styles: Object
}

const AccountsList = ({
  styles,
  accounts,
  nanoAddresses,
  preferredCurrency,
  nanoPrice,
  type = 'all',
  ...rest
}: Props) => {
  const filtered = accounts.allIds.filter(
    accId =>
      type === 'all' ||
      accounts.byId[accId].type === type ||
      type.includes(accounts.byId[accId].type)
  )
  return (
    <div className={styles.root}>
      {filtered.map((accId, i) => (
        <div className={styles.item} key={`account-${accId}`}>
          <AccountListItem
            nanoPrice={nanoPrice}
            account={accounts.byId[accId]}
            preferredCurrency={preferredCurrency}
          />
        </div>
      ))}
    </div>
  )
}

export default destyle(AccountsList, 'AccountsList')
