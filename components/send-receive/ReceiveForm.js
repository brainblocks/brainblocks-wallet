// @flow
import React, { Component } from 'react'
import { destyle } from 'destyle'
import { isValidNanoAddress } from '~/functions/validate'
import Grid from '~/bb-components/grid/Grid'
import GridItem from '~/bb-components/grid/GridItem'
import FormItem from '~/bb-components/form-item/FormItem'
import FormField from '~/bb-components/form-field/FormField'
import Input from '~/bb-components/input/Input'
import Button from '~/bb-components/button/Button'
import AccountSelector from '~/components/accounts/AccountSelector'

import mockState from '~/state/mockState'

type Props = {
  router: Object,
  styles: Object
}

type State = {
  account: string
}

class ReceiveForm extends Component<Props, State> {
  constructor(props) {
    super(props)
    let account = mockState.accounts.allIds[0]
    if (
      props.router.query.account &&
      mockState.accounts.allIds.includes(props.router.query.account)
    ) {
      account = props.router.query.account
    }
    this.state = {
      account
    }
  }

  getHandleUpdateValue = (stateKey: string) => e => {
    this.setState({
      [stateKey]: e.target.value
    })
  }

  render() {
    const { router, styles } = this.props
    const { account } = this.state
    return (
      <div className={styles.root}>
        <Grid>
          <GridItem>
            <FormItem label="Account" fieldId="receive-account">
              <FormField>
                <AccountSelector
                  twoLine
                  balances="all"
                  account={account}
                  accounts={mockState.accounts}
                  onChange={this.getHandleUpdateValue('account')}
                />
              </FormField>
            </FormItem>
          </GridItem>
          <GridItem>
            <FormItem label="Address" fieldId="receive-address">
              <FormField adornEnd={<Button variant="util">Copy</Button>}>
                <Input
                  readOnly
                  id="receive-address"
                  value={mockState.accounts.byId[account].address}
                />
              </FormField>
            </FormItem>
          </GridItem>
          <GridItem>
            QR Code (can be wrapped in FormField for the white background)
          </GridItem>
        </Grid>
      </div>
    )
  }
}

export default destyle(ReceiveForm, 'ReceiveForm')
