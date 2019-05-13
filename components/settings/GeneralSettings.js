// @flow
import * as React from 'react'
import { destyle } from 'destyle'
import AccountSelector from '~/components/accounts/AccountSelector'
import Grid from 'brainblocks-components/build/Grid'
import GridItem from 'brainblocks-components/build/GridItem'
import FormItem from 'brainblocks-components/build/FormItem'
import FormField from 'brainblocks-components/build/FormField'
import Input from 'brainblocks-components/build/Input'
import Button from 'brainblocks-components/build/Button'
import Select from 'brainblocks-components/build/Select'
import type { NormalizedState } from '~/types'
import { SUPPORTED_CURRENCIES } from '~/constants/currencies'

type Props = {
  defaultAccount: string,
  user: Object,
  accounts: NormalizedState,
  onUpdateUser: () => mixed,
  supportedCurrencies: Array<string>,
  /** Given by destyle. Do not pass this to the component as a prop. */
  styles: Object
}

const GeneralSettings = ({
  defaultAccount,
  accounts,
  styles,
  user,
  onUpdateUser,
  supportedCurrencies,
  ...rest
}: Props) => (
  <div className={styles.root}>
    <Grid>
      <GridItem>
        <FormItem
          label="Default account"
          fieldId="default-account"
          description="Select an account to be your default spending account"
        >
          <FormField>
            <AccountSelector
              twoLine
              balances="all"
              account={defaultAccount}
              accounts={accounts}
              onChange={e => {
                onUpdateUser({ defaultAccount: e.target.value })
              }}
            />
          </FormField>
        </FormItem>
      </GridItem>
      <GridItem>
        <FormItem
          label="Base Currency"
          fieldId="base-currency"
          description="Select your local currency"
        >
          <FormField>
            <Select
              id="base-currency"
              value={user.preferredCurrency}
              options={supportedCurrencies.map(curr => ({
                value: curr,
                title: curr.toUpperCase()
              }))}
              onChange={e => {
                onUpdateUser({ preferredCurrency: e.target.value })
              }}
            />
          </FormField>
        </FormItem>
      </GridItem>
    </Grid>
  </div>
)

export default destyle(GeneralSettings, 'SettingsForm')
