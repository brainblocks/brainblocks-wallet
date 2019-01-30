// @flow
import React from 'react'
import { destyle } from 'destyle'
import {
  Grid,
  GridItem,
  FormItem,
  FormField,
  Input,
  Button,
  ColorChoice
} from 'brainblocks-components'

type Props = {
  /** Given by destyle. Do not pass this to the component as a prop. */
  styles: Object
}

const NewAccountSettings = ({ styles, ...rest }: Props) => {
  return (
    <div className={styles.root}>
      <Grid>
        <GridItem>
          <FormItem label="Account Name" fieldId="account-name">
            <FormField>
              <Input
                id="account-name"
                placeholder="E.g. 'Savings' or 'Spending'"
              />
            </FormField>
          </FormItem>
        </GridItem>
        <GridItem>
          <FormItem
            label="Account Color"
            fieldId="color"
            description="The color helps you quickly identify this account."
          >
            <FormField>
              <ColorChoice
                value="pink"
                options={['gold', 'purple', 'pink', 'aqua', 'orange', 'jade']}
                onChange={() => {}}
              />
            </FormField>
          </FormItem>
        </GridItem>
        <GridItem>
          <Button variant="primary" color="green">
            Save
          </Button>
          <a className={styles.moreSettings} href="#">
            More account settings
          </a>
        </GridItem>
      </Grid>
    </div>
  )
}

export default destyle(NewAccountSettings, 'NewAccountSettings')
