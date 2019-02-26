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

import mockState from '~/state/mockState'
const nanoPrice = 2.14

type Props = {
  router: Object,
  accounts: NormalizedState,
  styles: Object
}

type State = {
  from: string,
  to: string,
  message: string,
  amountField: number,
  amountFieldEditing: string,
  toFieldValid: boolean,
  btnDisabled: boolean,
  sending: boolean
}

class TransferForm extends Component<Props, State> {
  constructor(props) {
    super(props)
    this.state = {
      from: props.router.query.from || this.props.accounts.allIds[0],
      to: props.router.query.to || this.props.accounts.allIds[0],
      message: '',
      amountField: props.router.query.amount || 0,
      amountFieldEditing: 'nano',
      toFieldValid: true,
      btnDisabled: false,
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
    const { styles, accounts, router } = this.props
    const {
      from,
      to,
      message,
      amountField = 0,
      amountFieldEditing = 'nano',
      toFieldValid,
      btnDisabled,
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
                  nanoPrice={3.24}
                  vaultSelectable={false}
                />
              </FormField>
            </FormItem>
          </GridItem>
          <GridItem>
            <FormItem label="To" fieldId="send-to">
              <FormField valid={toFieldValid}>
                <AccountSelector
                  twoLine
                  balances="all"
                  account={to}
                  accounts={accounts}
                  onChange={acc => this.handleUpdateAccount(acc, 'to')}
                  nanoPrice={3.24}
                  vaultSelectable={false}
                />
              </FormField>
            </FormItem>
          </GridItem>
          <GridItem spanTablet={6}>
            <FormItem label="Amount" fieldId="send-amount">
              <AmountField
                value={amountField}
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
              disabled={btnDisabled}
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
