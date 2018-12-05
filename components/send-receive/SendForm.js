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
  from: string,
  to: string,
  message: string,
  amountField: number,
  toFieldValid: boolean,
  btnDisabled: boolean
}

class SendForm extends Component<Props, State> {
  constructor(props) {
    super(props)
    this.state = {
      from: props.router.query.from || mockState.accounts.allIds[0],
      to: props.router.query.to || '',
      message: '',
      amountField: props.router.query.amount || 0,
      toFieldValid: true,
      btnDisabled: true
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

  handleSend = () => {
    console.log('Send', this.state)
  }

  render() {
    const { styles, router } = this.props
    const {
      from,
      to,
      message,
      amountField,
      toFieldValid,
      btnDisabled
    } = this.state
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
                  onChange={this.getHandleUpdateValue('from')}
                />
              </FormField>
            </FormItem>
          </GridItem>
          <GridItem>
            <FormItem label="To" fieldId="send-to" extra="Send as payment link">
              <FormField
                valid={toFieldValid}
                adornEnd={<Button variant="util">Paste</Button>}
              >
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
              <FormField>
                <Input
                  id="send-amount"
                  type="number"
                  value={amountField}
                  onChange={this.getHandleUpdateValue('amountField')}
                />
              </FormField>
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
