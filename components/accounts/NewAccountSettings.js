// @flow
import React from 'react'
import { destyle } from 'destyle'
import Grid from '~/bb-components/grid/Grid'
import GridItem from '~/bb-components/grid/GridItem'
import FormItem from '~/bb-components/form-item/FormItem'
import FormField from '~/bb-components/form-field/FormField'
import Input from '~/bb-components/input/Input'
import Button from '~/bb-components/button/Button'

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
            description="The colour helps you quickly identify this account."
          >
            <FormField>
              <Input id="color" />
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
