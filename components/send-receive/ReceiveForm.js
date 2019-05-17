// @flow
import React, { Component } from 'react'
import QRCode from 'qrcode.react'
import { destyle } from 'destyle'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import Grid from 'brainblocks-components/build/Grid'
import GridItem from 'brainblocks-components/build/GridItem'
import FormItem from 'brainblocks-components/build/FormItem'
import FormField from 'brainblocks-components/build/FormField'
import Input from 'brainblocks-components/build/Input'
import Button from 'brainblocks-components/build/Button'
import { withSnackbar } from 'brainblocks-components/build/Snackbar'
import AccountSelector from '~/components/accounts/AccountSelector'
import type { WithRouter, WithSnackbar } from '~/types'
import type { AccountsState } from '~/types/reduxTypes'

type Props = WithRouter &
  WithSnackbar & {
    accounts: AccountsState,
    defaultAccount: string,
    styles: Object
  }

type State = {
  account: string
}

class ReceiveForm extends Component<Props, State> {
  constructor(props) {
    super(props)
    let account = props.defaultAccount || props.accounts.allIds[0]
    // checking that the router-given account is in the allIds array is a form of XSS prevention
    if (
      props.router.query.account &&
      this.props.accounts.allIds.includes(props.router.query.account)
    ) {
      account = props.router.query.account
    }
    this.state = {
      account
    }
  }

  handleUpdateAccount = e => {
    this.setState({ account: e.target.value })
  }

  handleCopyAddress = () => {
    this.props.enqueueSnackbar('Address copied to clipboard', {
      variant: 'info'
    })
  }

  render() {
    const { accounts, styles } = this.props
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
                    value={`xrb:${accounts.byId[account].account}`}
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
