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

  handleUpdateAccount = acc => {
    this.setState({ account: acc })
  }

  render() {
    const { router, styles } = this.props
    const { account } = this.state
    let nanoAddress = 'Oops, something is wrong'
    if (mockState.accounts.byId.hasOwnProperty(account)) {
      nanoAddress = mockState.accounts.byId[account].address
    }
    if (mockState.nanoAddresses.byId.hasOwnProperty(account)) {
      nanoAddress = mockState.nanoAddresses.byId[account].address
    }
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
                  addresses={mockState.nanoAddresses}
                  onChange={this.handleUpdateAccount}
                  vaultSelectable={false}
                />
              </FormField>
            </FormItem>
          </GridItem>
          <GridItem>
            <FormItem label="Address" fieldId="receive-address">
              <FormField adornEnd={<Button type="util">Copy</Button>}>
                <Input readOnly id="receive-address" value={nanoAddress} />
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
