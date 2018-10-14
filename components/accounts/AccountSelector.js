// @flow
import React from 'react'
import { destyle } from 'destyle'
import type { NormalizedState } from '~/types'
import FormField from '~/bb-components/form-field/FormField'
import Select from '~/bb-components/select/Select'
import WalletIcon from '~/static/svg/icons/wallet.svg'
import HotWalletIcon from '~/static/svg/icons/wallet-hot.svg'

type Props = {
  /** Currently selected account id */
  account: string,
  /** Accounts */
  accounts: NormalizedState,
  /** Include an 'all' option */
  all?: false,
  /** Two line version */
  twoLine?: boolean,
  /** Include balances? `dropdown` = only show balances in dropdown */
  balances?: 'all' | 'dropdown' | 'none',
  /** Arbitrary theme passed to `FormField` which can be used in styles */
  theme?: string,
  onChange: (SyntheticEvent<>) => mixed,
  /** Given by destyle. Do not pass this to the component as a prop. */
  styles: Object
}

/**
 * AccountSelector
 *
 * @todo use a custom dropdown rather than a `select` field
 * @todo twoLine version
 * @todo include balances
 */
const AccountSelector = ({
  styles,
  account,
  accounts,
  balances = 'none',
  theme,
  onChange,
  all = false,
  ...rest
}: Props) => {
  const options = accounts.allIds.map(accId => ({
    value: accId,
    title: accounts.byId[accId].name
  }))
  if (all) {
    options.unshift({ value: 'all', title: 'All Accounts' })
  }

  return (
    <div className={styles.root}>
      <FormField theme={theme}>
        <Select options={options} value={account} onChange={onChange} />
      </FormField>
    </div>
  )
}

export default destyle(AccountSelector, 'AccountSelector')
