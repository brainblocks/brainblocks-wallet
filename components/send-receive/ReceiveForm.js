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
  Button,
  withSnackbar
} from 'brainblocks-components'
import AccountSelector from '~/components/accounts/AccountSelector'
import type { NormalizedState } from '~/types'

import mockState from '~/state/mockState'

type Props = {
  enqueueSnackbar: func,
  router: Object,
  accounts: NormalizedState,
  defaultAccount: string,
  styles: Object
}

type State = {
  account: string,
  amount: string,
  copied: boolean
}

class ReceiveForm extends Component<Props, State> {
  constructor(props) {
    super(props)
    let account = props.defaultAccount || props.accounts.allIds[0]
    if (
      props.router.query.account &&
      this.props.accounts.allIds.includes(props.router.query.account)
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
    this.props.enqueueSnackbar('Address copied to clipboard', {
      variant: 'info'
    })
  }

  render() {
    const { router, accounts, styles } = this.props
    const { account, amount, copied } = this.state
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
                  accounts={accounts}
                  onChange={this.handleUpdateAccount}
                  vaultSelectable={false}
                />
              </FormField>
            </FormItem>
          </GridItem>
          <GridItem>
            <FormItem label="Address" fieldId="receive-address">
              <FormField
                adornEnd={
                  <CopyToClipboard
                    text={accounts.byId[account].account}
                    onCopy={this.handleCopyAddress}
                  >
                    <Button variant="util">Copy</Button>
                  </CopyToClipboard>
                }
              >
                <Input
                  readOnly
                  id="receive-address"
                  value={accounts.byId[account].account}
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
                    value={`xrb:${
                      accounts.byId[account].account
                    }?amount=${amount}`}
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

export default withSnackbar(destyle(ReceiveForm, 'ReceiveForm'))
