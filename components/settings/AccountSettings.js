// @flow
import * as React from 'react'
import { destyle } from 'destyle'
import AccountSelector from '~/components/accounts/AccountSelector'
import {
  FormItem,
  FormField,
  Input,
  Grid,
  GridItem,
  Button
} from 'brainblocks-components'

import mockState from '~/state/mockState'

type Props = {
  account: string,
  /** Given by destyle. Do not pass this to the component as a prop. */
  styles: Object
}

const AccountSettings = ({ account, styles, ...rest }: Props) => (
  <div className={styles.root}>
    <Grid>
      <GridItem>
        <FormItem
          label="Choose Account"
          fieldId="settings-account"
          description="Select an account to view/update the settings for"
        >
          <FormField>
            <AccountSelector
              twoLine
              balances="all"
              account={account}
              accounts={mockState.accounts}
              addresses={mockState.nanoAddresses}
              onChange={() => {}}
              vaultSelectable={true}
            />
          </FormField>
        </FormItem>
      </GridItem>
    </Grid>
  </div>
)

export default destyle(AccountSettings, 'SettingsForm')
