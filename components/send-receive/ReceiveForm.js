// @flow
import React, { Component } from 'react'
import QRCode from 'qrcode.react'
import { destyle } from 'destyle'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import { isValidNanoAddress } from '~/functions/validate'
import {
  Grid,
  GridItem,
  FormItem,
  FormField,
  Input,
  Button
} from 'brainblocks-components'
import AccountSelector from '~/components/accounts/AccountSelector'

import mockState from '~/state/mockState'

type Props = {
  router: Object,
  styles: Object
}

type State = {
  account: string,
  amount: number,
  copied: boolean
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
      account,
      amount: '10000000000000000000000000000000',
      copied: false
    }
  }

  handleUpdateAccount = acc => {
    this.setState({ account: acc, copied: false })
  }

  handleCopyAddress = () => {
    this.setState(
      {
        copied: true
      },
      () => {
        setTimeout(() => {
          this.setState({
            copied: false
          })
        }, 3000)
      }
    )
  }

  render() {
    const { router, styles } = this.props
    const { account, amount, copied } = this.state
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
            <FormItem label="Scan">
              <FormField>
                <div
                  className="formItemPadding"
                  style={{ textAlign: 'center' }}
                >
                  <QRCode
                    value={`xrb:${nanoAddress}?amount=${amount}`}
                    size={150}
                  />
                </div>
              </FormField>
            </FormItem>
          </GridItem>
        </Grid>
      </div>
    )
  }
}

export default destyle(ReceiveForm, 'ReceiveForm')
