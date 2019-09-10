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
import type { AccountsState, CurrentSell } from '~/types/reduxTypes'
import log from '~/functions/log'

type Props = WithRouter &
  WithSnackbar & {
    accounts: AccountsState,
    nanoPrice: number,
    preferredCurrency: string,
    defaultAccount: string,
    nanoPairs: Array<Object>,
    styles: Object,
    onSell: CurrentSell => Promise<void>
  }

type State = {
  amountFieldEditing: string
}

class ReceiveForm extends Component<Props, State> {
  initialFrom: string

  constructor(props) {
    super(props)
    const { accounts, defaultAccount } = props
    this.initialFrom =
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

    if (!values.from) {
      errors.from = 'Required'
    } else if (!isValidNanoAddress(values.from)) {
      errors.from = 'Invalid Nano Address'
    }

    // @todo validate buy currency

    if (!values.amount) {
      errors.amount = 'Required'
    } else if (values.amount <= 0) {
      errors.amount = 'Amount must be positive'
    } else if (
      this.getAmountNano(values) > this.props.accounts.byId[values.from].balance
    ) {
      errors.amount = 'Insufficient balance'
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
      await this.props.onSell({
        fromAcc: values.from,
        buyCurrency: values.buy,
        sellAmount: this.getAmountNano(values),
        receiveAddr: values.buyAddress,
        extraId: '', // for now
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
      styles
    } = this.props
    const { amountFieldEditing } = this.state
    return (
      <div className={styles.root}>
        <Formik
          initialValues={{
            from: this.initialFrom,
            buy: 'btc',
            amount: 0,
            buyAddress: ''
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
                  <GridItem>
                    <FormItem label="Sell from account" fieldId="sell-account">
                      <FormField>
                        <AccountSelector
                          twoLine
                          balances="all"
                          name="from"
                          account={values.from}
                          accounts={accounts}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          nanoPrice={nanoPrice}
                          vaultSelectable={false}
                        />
                      </FormField>
                    </FormItem>
                  </GridItem>
                  <GridItem spanTablet={6}>
                    <FormItem label="Currency to buy" fieldId="buy-currency">
                      <FormField>
                        <Select
                          id="buy-currency"
                          value={values.buy}
                          name="buy"
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
                        onSwitchCurrency={this.handleAmountFieldSwitchCurrency}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                    </FormItem>
                  </GridItem>
                  <GridItem>
                    <FormItem
                      label="BTC Address"
                      fieldId="buy-currency-address"
                      error={
                        errors.buyAddress &&
                        touched.buyAddress &&
                        errors.buyAddress
                      }
                    >
                      <FormField
                        valid={touched.buyAddress && !errors.buyAddress}
                      >
                        <Input
                          id="buy-currency-address"
                          name="buyAddress"
                          placeholder="BTC address"
                          value={values.buyAddress}
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
                      Sell Nano
                    </Button>
                  </GridItem>
                </Grid>
              </form>
            )
          }}
        </Formik>
      </div>
    )
  }
}

export default withSnackbar(destyle(ReceiveForm, 'ReceiveForm'))
