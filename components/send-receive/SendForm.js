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
  Input,
  Button,
  AmountField
} from 'brainblocks-components'
import AccountSelector from '~/components/accounts/AccountSelector'

import mockState from '~/state/mockState'

type Props = {
  router: Object,
  accounts: Object,
  defaultAccount: string,
  nanoPrice: number,
  preferredCurrency: string,
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

class SendForm extends Component<Props, State> {
  constructor(props) {
    super(props)
    this.state = {
      from:
        props.router.query.from ||
        props.defaultAccount ||
        props.accounts.allIds[0],
      to: props.router.query.to || '',
      message: '',
      amountField: props.router.query.amount || 0,
      amountFieldEditing: 'nano',
      toFieldValid: true,
      btnDisabled: true,
      sending: false
    }
  }

  isToFieldValid = (value: string) => {
    return isValidNanoAddress(value)
  }

  handleToFieldBlur = e => {
    this.setState({
      toFieldValid: this.isToFieldValid(e.target.value)
    })
  }

  getHandleUpdateValue = (stateKey: string) => e => {
    const newState: Object = {
      [stateKey]: e.target.value
    }
    if (stateKey === 'to' && !this.state.toFieldValid) {
      newState.toFieldValid = this.isToFieldValid(e.target.value)
    }
    this.setState(newState, () => {
      this.setState({
        btnDisabled: !this.isToFieldValid(this.state.to)
      })
    })
  }

  handleUpdateAccount = acc => {
    this.setState({ from: acc })
  }

  handleAmountFieldSwitchCurrency = val => {
    this.setState({
      amountFieldEditing:
        this.state.amountFieldEditing === 'nano' ? 'fiat' : 'nano'
    })
  }

  handleSend = () => {
    console.log(this.state)
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
                  addresses={mockState.nanoAddresses}
                  onChange={this.handleUpdateAccount}
                  nanoPrice={nanoPrice}
                  vaultSelectable={false}
                />
              </FormField>
            </FormItem>
          </GridItem>
          <GridItem>
            <FormItem label="To" fieldId="send-to">
              <FormField valid={toFieldValid}>
                <Input
                  id="send-to"
                  placeholder="NANO address or contact..."
                  value={to}
                  onChange={this.getHandleUpdateValue('to')}
                  onBlur={this.handleToFieldBlur}
                />
              </FormField>
            </FormItem>
          </GridItem>
          <GridItem spanTablet={6}>
            <FormItem label="Amount" fieldId="send-amount">
              <AmountField
                value={amountField}
                fiatCode={preferredCurrency.toUpperCase()}
                editing={amountFieldEditing}
                nanoFormatted={formatNano(amountFieldNano)}
                fiatFormatted={formatFiat(amountFieldFiat, preferredCurrency)}
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

export default destyle(SendForm, 'SendForm')
