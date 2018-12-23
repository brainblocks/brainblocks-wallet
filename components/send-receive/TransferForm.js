// @flow
import React, { Component } from 'react'
import { destyle } from 'destyle'
import { isValidNanoAddress } from '~/functions/validate'
import { formatNano, formatFiat } from '~/functions/format'
import { convert } from '~/functions/convert'
import Grid from '~/bb-components/grid/Grid'
import GridItem from '~/bb-components/grid/GridItem'
import FormItem from '~/bb-components/form-item/FormItem'
import FormField from '~/bb-components/form-field/FormField'
import AmountField from '~/bb-components/amount-field/AmountField'
import Input from '~/bb-components/input/Input'
import Button from '~/bb-components/button/Button'
import AccountSelector from '~/components/accounts/AccountSelector'

import mockState from '~/state/mockState'
const nanoPrice = 2.14

type Props = {
  router: Object,
  styles: Object
}

type State = {
  from: string,
  to: string,
  message: string,
  amountField: number,
  toFieldValid: boolean,
  btnDisabled: boolean
}

class TransferForm extends Component<Props, State> {
  constructor(props) {
    super(props)
    this.state = {
      from: props.router.query.from || mockState.accounts.allIds[0],
      to: props.router.query.to || mockState.accounts.allIds[0],
      message: '',
      amountField: props.router.query.amount || 0,
      amountFieldEditing: 'nano',
      toFieldValid: true,
      btnDisabled: true
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
    console.log('Send', this.state)
  }

  render() {
    const { styles, router } = this.props
    const {
      from,
      to,
      message,
      amountField = 0,
      amountFieldEditing = 'nano',
      toFieldValid,
      btnDisabled
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
                  accounts={mockState.accounts}
                  addresses={mockState.nanoAddresses}
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
                  accounts={mockState.accounts}
                  addresses={mockState.nanoAddresses}
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
              type="primary"
              color="green"
              onClick={this.handleSend}
              disabled={btnDisabled}
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
