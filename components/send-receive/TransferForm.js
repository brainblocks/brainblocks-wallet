// @flow
import React, { Component } from 'react'
import { destyle } from 'destyle'
import { isValidNanoAddress } from '~/functions/validate'
import { formatNano, formatFiat } from '~/functions/format'
import { convert } from '~/functions/convert'
import {
  Grid,
  GridItem,
  FormItem,
  FormField,
  AmountField,
  Input,
  Button
} from 'brainblocks-components'
import AccountSelector from '~/components/accounts/AccountSelector'
import type { NormalizedState } from '~/types'

type Props = {
  router: Object,
  accounts: NormalizedState,
  styles: Object,
  nanoPrice: number,
  preferredCurrency: string,
  defaultAccount: string
}

type State = {
  from: string,
  to: string,
  message: string,
  amountField: number,
  amountFieldEditing: string,
  sending: boolean
}

class TransferForm extends Component<Props, State> {
  constructor(props) {
    super(props)
    let from = props.accounts.allIds[0]
    if (
      props.router.query.from &&
      props.accounts.allIds.includes(props.router.query.from)
    ) {
      from = props.router.query.from
    } else if (props.accounts.allIds.includes(props.defaultAccount)) {
      from = props.defaultAccount
    }
    let to = props.accounts.allIds[1]
    if (
      props.router.query.to &&
      props.accounts.allIds.includes(props.router.query.to)
    ) {
      to = props.router.query.to
    }
    if (from === to) {
      to = props.accounts.allIds.find(id => id !== from)
    }
    this.state = {
      from,
      to,
      message: '',
      amountField: props.router.query.amount || 0,
      amountFieldEditing: 'nano',
      sending: false
    }
  }

  getHandleUpdateValue = (stateKey: string) => e => {
    this.setState({
      [stateKey]: e.target.value
    })
  }

  handleAmountFieldSwitchCurrency = val => {
    this.setState({
      amountFieldEditing:
        this.state.amountFieldEditing === 'nano' ? 'fiat' : 'nano'
    })
  }

  handleUpdateAccount = (acc, stateKey) => {
    this.setState({ [stateKey]: acc })
  }

  handleSend = () => {
    this.setState(
      {
        sending: true
      },
      () => {
        setTimeout(() => this.setState({ sending: false }), 3000)
      }
    )
  }

  render() {
    const {
      styles,
      accounts,
      nanoPrice,
      preferredCurrency,
      router
    } = this.props
    const {
      from,
      to,
      message,
      amountField = 0,
      amountFieldEditing = 'nano',
      sending
    } = this.state

    const amountFieldNano =
      amountFieldEditing === 'nano'
        ? amountField
        : convert(amountField, 'fiat', nanoPrice)
    const amountFieldFiat =
      amountFieldEditing === 'fiat'
        ? amountField
        : convert(amountField, 'nano', nanoPrice)

    const accountsValid = from !== to
    const fieldsValid = accountsValid && amountField > 0

    return (
      <div className={styles.root}>
        <Grid>
          <GridItem>
            <FormItem label="From" fieldId="send-from">
              <FormField>
                <AccountSelector
                  twoLine
                  balances="all"
                  account={from}
                  accounts={accounts}
                  onChange={acc => this.handleUpdateAccount(acc, 'from')}
                  nanoPrice={nanoPrice}
                  vaultSelectable={false}
                />
              </FormField>
            </FormItem>
          </GridItem>
          <GridItem>
            <FormItem
              label="To"
              fieldId="send-to"
              error={accountsValid ? null : 'Accounts must be different'}
            >
              <FormField valid={accountsValid}>
                <AccountSelector
                  twoLine
                  balances="all"
                  account={to}
                  accounts={accounts}
                  onChange={acc => this.handleUpdateAccount(acc, 'to')}
                  nanoPrice={nanoPrice}
                  vaultSelectable={false}
                />
              </FormField>
            </FormItem>
          </GridItem>
          <GridItem spanTablet={6}>
            <FormItem label="Amount" fieldId="send-amount">
              <AmountField
                value={amountField}
                fiatCode={preferredCurrency}
                editing={amountFieldEditing}
                nanoFormatted={formatNano(amountFieldNano)}
                fiatFormatted={formatFiat(amountFieldFiat)}
                onSwitchCurrency={this.handleAmountFieldSwitchCurrency}
                onChange={this.getHandleUpdateValue('amountField')}
              />
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
                  onChange={this.getHandleUpdateValue('message')}
                  value={message}
                />
              </FormField>
            </FormItem>
          </GridItem>
          <GridItem>
            <Button
              block
              variant="primary"
              color="green"
              onClick={this.handleSend}
              disabled={!fieldsValid}
              loading={sending}
            >
              Send
            </Button>
          </GridItem>
        </Grid>
      </div>
    )
  }
}

export default destyle(TransferForm, 'TransferForm')
