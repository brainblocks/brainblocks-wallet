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
  defaultAccount: string,
  /** Given by destyle. Do not pass this to the component as a prop. */
  styles: Object
}

const GeneralSettings = ({ defaultAccount, styles, ...rest }: Props) => (
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
              accounts={mockState.accounts}
              addresses={mockState.nanoAddresses}
              onChange={() => {}}
              vaultSelectable={false}
            />
          </FormField>
        </FormItem>
      </GridItem>
    </Grid>
  </div>
)

export default destyle(GeneralSettings, 'SettingsForm')
