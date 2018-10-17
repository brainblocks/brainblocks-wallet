import React from 'react'
import { destyle } from 'destyle'
import Grid from '~/bb-components/grid/Grid'
import GridItem from '~/bb-components/grid/GridItem'
import FormItem from '~/bb-components/form-item/FormItem'
import FormField from '~/bb-components/form-field/FormField'
import Input from '~/bb-components/input/Input'
import Button from '~/bb-components/button/Button'
import AccountSelector from '~/components/accounts/AccountSelector'

import mockState from '~/state/mockState'

const SendForm = ({ styles }) => {
  return (
    <div className={styles.root}>
      <Grid>
        <GridItem>
          <FormItem label="From" fieldId="send-from">
            <FormField>
              <AccountSelector
                twoLine
                balances="all"
                account={mockState.accounts.allIds[0]}
                accounts={mockState.accounts}
              />
            </FormField>
          </FormItem>
        </GridItem>
        <GridItem>
          <FormItem label="To" fieldId="send-to" extra="Extra!">
            <FormField adornEnd={<Button type="util">Paste</Button>}>
              <Input
                id="send-to"
                placeholder="NANO address or contact..."
                value=""
                onChange={() => null}
              />
            </FormField>
          </FormItem>
        </GridItem>
        <GridItem spanTablet={6}>
          <FormItem label="Amount" fieldId="send-amount">
            <FormField>
              <Input
                id="send-amount"
                type="number"
                value="0"
                onChange={() => null}
              />
            </FormField>
          </FormItem>
        </GridItem>
        <GridItem spanTablet={6}>
          <FormItem label="Message" fieldId="send-message">
            <FormField>
              <Input
                multiline
                rows={2}
                id="send-message"
                placeholder="Add a note here"
                onChange={() => null}
              />
            </FormField>
          </FormItem>
        </GridItem>
        <GridItem>
          <Button block type="primary" color="green" onClick={() => {}}>
            Send
          </Button>
        </GridItem>
      </Grid>
    </div>
  )
}

export default destyle(SendForm, 'SendForm')
