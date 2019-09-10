// @flow
import React, { Component } from 'react'
import { destyle } from 'destyle'
import { Formik } from 'formik'
import { convert } from '~/functions/convert'
import { formatNano, formatFiat } from '~/functions/format'
import { isValidNanoAddress } from '~/functions/validate'
import Grid from 'brainblocks-components/build/Grid'
import GridItem from 'brainblocks-components/build/GridItem'
import FormItem from 'brainblocks-components/build/FormItem'
import FormField from 'brainblocks-components/build/FormField'
import Input from 'brainblocks-components/build/Input'
import Select from 'brainblocks-components/build/Select'
import Button from 'brainblocks-components/build/Button'
import AmountField from 'brainblocks-components/build/AmountField'
import { withSnackbar } from 'brainblocks-components/build/Snackbar'
import AccountSelector from '~/components/accounts/AccountSelector'
import type { WithRouter, WithSnackbar } from '~/types'
import type { AccountsState, CurrentBuy, TradeQuote } from '~/types/reduxTypes'
import log from '~/functions/log'

type Props = WithRouter &
  WithSnackbar & {
    accounts: AccountsState,
    nanoPrice: number,
    preferredCurrency: string,
    defaultAccount: string,
    nanoPairs: Array<Object>,
    styles: Object,
    onBuy: CurrentBuy => Promise<void>,
    buyQuote: TradeQuote,
    currentBuy: CurrentBuy
  }

type State = {
  amountFieldEditing: string
}

class ReceiveForm extends Component<Props, State> {
  initialReceiveAcc: string

  constructor(props) {
    super(props)
    const { accounts, defaultAccount } = props
    this.initialReceiveAcc =
      defaultAccount && accounts.allIds.includes(defaultAccount)
        ? defaultAccount
        : accounts.allIds[0]
    this.state = {
      amountFieldEditing: 'nano'
    }
  }

  getAmountNano = values =>
    this.state.amountFieldEditing === 'nano'
      ? values.amount
      : convert(values.amount, 'fiat', this.props.nanoPrice)

  getAmountFiat = values =>
    this.state.amountFieldEditing === 'fiat'
      ? values.amount
      : convert(values.amount, 'nano', this.props.nanoPrice)

  validate = values => {
    let errors = {}

    if (!values.receiveAcc) {
      errors.receiveAcc = 'Required'
    } else if (!isValidNanoAddress(values.from)) {
      errors.receiveAcc = 'Invalid Nano Address'
    }

    // @todo validate buy currency

    if (!values.amount) {
      errors.amount = 'Required'
    } else if (values.amount <= 0) {
      errors.amount = 'Amount must be positive'
    }

    return errors
  }

  handleAmountFieldSwitchCurrency = val => {
    this.setState(oldState => ({
      amountFieldEditing:
        oldState.amountFieldEditing === 'nano' ? 'fiat' : 'nano'
    }))
  }

  handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      await this.props.onBuy({
        sellCurrency: values.sell,
        sellAmount: this.getAmountNano(values), // @todo - this should be in the sell currency, not NANO
        receiveAcc: values.receiveAcc,
        refundAddr: values.refundAddr,
        isFinal: true
      })
    } catch (e) {
      log.error(e)
      this.props.enqueueSnackbar('Could not create trade', {
        variant: 'error'
      })
      setSubmitting(false)
    }
  }

  render() {
    const {
      accounts,
      nanoPrice,
      nanoPairs,
      preferredCurrency,
      currentBuy,
      buyQuote,
      styles
    } = this.props
    const { amountFieldEditing } = this.state
    return (
      <div className={styles.root}>
        {!buyQuote ? (
          <Formik
            initialValues={{
              receiveAcc: this.initialReceiveAcc,
              sell: 'btc',
              amount: 0,
              refundAddr: ''
            }}
            validate={this.validate}
            onSubmit={this.handleSubmit}
          >
            {({
              values,
              errors,
              touched,
              handleChange,
              handleBlur,
              handleSubmit,
              isSubmitting,
              setFieldValue
            }) => {
              const amountFieldNano = this.getAmountNano(values)
              const amountFieldFiat = this.getAmountFiat(values)

              return (
                <form onSubmit={handleSubmit}>
                  <Grid>
                    <GridItem spanTablet={6}>
                      <FormItem label="Buy NANO with" fieldId="sell-currency">
                        <FormField>
                          <Select
                            id="sell-currency"
                            value={values.sell}
                            name="sell"
                            options={nanoPairs}
                            onChange={handleChange}
                            onBlur={handleBlur}
                          />
                        </FormField>
                      </FormItem>
                    </GridItem>
                    <GridItem spanTablet={6}>
                      <FormItem
                        label="Amount"
                        fieldId="send-amount"
                        error={errors.amount && touched.amount && errors.amount}
                        extra={
                          accounts.byId.hasOwnProperty(values.from) && (
                            <a
                              href="#"
                              onClick={e => {
                                e.preventDefault()
                                this.setState(
                                  {
                                    amountFieldEditing: 'nano'
                                  },
                                  () => {
                                    setFieldValue(
                                      'amount',
                                      accounts.byId[values.from].balance,
                                      true
                                    )
                                  }
                                )
                              }}
                            >
                              Max
                            </a>
                          )
                        }
                      >
                        <AmountField
                          value={values.amount}
                          name="amount"
                          fiatCode={preferredCurrency.toUpperCase()}
                          editing={amountFieldEditing}
                          nanoFormatted={formatNano(amountFieldNano)}
                          fiatFormatted={formatFiat(
                            amountFieldFiat,
                            preferredCurrency
                          )}
                          formFieldProps={{
                            valid: touched.amount && !errors.amount
                          }}
                          onSwitchCurrency={
                            this.handleAmountFieldSwitchCurrency
                          }
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                      </FormItem>
                    </GridItem>
                    <GridItem>
                      <FormItem
                        label="Receive account"
                        fieldId="receive-account"
                      >
                        <FormField>
                          <AccountSelector
                            twoLine
                            balances="all"
                            name="receiveAcc"
                            account={values.receiveAcc}
                            accounts={accounts}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            nanoPrice={nanoPrice}
                            vaultSelectable={false}
                          />
                        </FormField>
                      </FormItem>
                    </GridItem>

                    <GridItem>
                      <FormItem
                        label="Refund address"
                        fieldId="refund-address"
                        error={
                          errors.refundAddr &&
                          touched.refundAddr &&
                          errors.refundAddr
                        }
                      >
                        <FormField
                          valid={touched.refundAddr && !errors.refundAddr}
                        >
                          <Input
                            id="refund-address"
                            name="refundAddr"
                            placeholder=""
                            value={values.refundAddr}
                            onChange={handleChange}
                            onBlur={handleBlur}
                          />
                        </FormField>
                      </FormItem>
                    </GridItem>
                    <GridItem>
                      <Button
                        block
                        variant="primary"
                        color="green"
                        type="submit"
                        disabled={Object.keys(errors).length > 0}
                        loading={isSubmitting}
                      >
                        Buy Nano
                      </Button>
                    </GridItem>
                  </Grid>
                </form>
              )
            }}
          </Formik>
        ) : (
          <div>{JSON.stringify(buyQuote, null, 2)}</div>
        )}
      </div>
    )
  }
}

export default withSnackbar(destyle(ReceiveForm, 'ReceiveForm'))
