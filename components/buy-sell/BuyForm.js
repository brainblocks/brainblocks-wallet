// @flow
import React, { Component } from 'react'
import { destyle } from 'destyle'
import { Formik } from 'formik'
import { convert } from '~/functions/convert'
import { formatNano } from '~/functions/format'
import { isValidNanoAddress } from '~/functions/validate'
import { getEstimate } from '~/state/api/trade'
import Alert from 'brainblocks-components/build/Alert'
import Grid from 'brainblocks-components/build/Grid'
import GridItem from 'brainblocks-components/build/GridItem'
import FormItem from 'brainblocks-components/build/FormItem'
import FormField from 'brainblocks-components/build/FormField'
import Input from 'brainblocks-components/build/Input'
import Select from 'brainblocks-components/build/Select'
import Spinner from 'brainblocks-components/build/Spinner'
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
    onResetBuyQuote: () => void,
    buyQuote: TradeQuote,
    currentBuy: CurrentBuy
  }

type State = {
  amountFieldEditing: string,
  sellCurrency: string,
  exchangeRate: number,
  useRefundAddress: boolean,
  errorMsg: ?string
}

class BuyForm extends Component<Props, State> {
  initialReceiveAcc: string
  form: Object

  constructor(props) {
    super(props)
    const { accounts, defaultAccount } = props
    this.form = React.createRef()
    this.initialReceiveAcc =
      defaultAccount && accounts.allIds.includes(defaultAccount)
        ? defaultAccount
        : accounts.allIds[0]
    this.state = {
      amountFieldEditing: 'nano',
      sellCurrency: props.currentBuy.sellCurrency,
      exchangeRate: 0,
      useRefundAddress: false,
      errorMsg: null
    }
  }

  componentDidMount() {
    this.getRate()
    // validate form immediately
    this.form.current.validateForm()
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.sellCurrency !== prevState.sellCurrency) {
      this.getRate()
    }
  }

  getAmountNano = values =>
    this.state.amountFieldEditing === 'nano'
      ? values.amount
      : this.state.exchangeRate > 0
      ? convert(values.amount, 'fiat', 1 / this.state.exchangeRate)
      : 0

  getAmountSellCurrency = values =>
    this.state.amountFieldEditing === 'fiat'
      ? values.amount
      : this.state.exchangeRate > 0
      ? convert(values.amount, 'nano', 1 / this.state.exchangeRate)
      : 0

  getRate = async () => {
    const currency = this.state.sellCurrency.toUpperCase()
    try {
      const rate = await getEstimate(1, `${currency}_NANO`)
      this.setState({
        exchangeRate: rate.estimate.estimatedAmount
      })
    } catch (e) {
      log.error(`Could not get rate for ${currency}_NANO`, e)
    }
  }

  validate = values => {
    let errors = {}

    if (!values.sell) {
      errors.sell = 'Required'
    }

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

  handleSellCurrencyChange = (e, formikOnChangeFunc) => {
    formikOnChangeFunc(e)
    this.setState({
      exchangeRate: 0,
      sellCurrency: e.target.value
    })
  }

  handleAmountChange = (e, formikOnChangeFunc) => {
    formikOnChangeFunc(e)
    this.form.current.setStatus({
      amountValid: true
    })
  }

  handleRefundAddressChange = (e, formikOnChangeFunc) => {
    formikOnChangeFunc(e)
    this.form.current.setStatus({
      refundAddressValid: true
    })
  }

  handleUseRefundAddress = e => {
    e.preventDefault()
    this.setState({
      useRefundAddress: true
    })
  }

  handleSubmit = async (values, { setSubmitting, resetForm }) => {
    this.setState({
      errorMsg: null
    })
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
      if (e.response.data.hasOwnProperty('reason')) {
        switch (e.response.data.reason.error) {
          case 'not_valid_refund_address':
            this.form.current.setStatus({
              refundAddressValid: false
            })
            break
          case 'out_of_range':
            this.form.current.setStatus({
              amountValid: false
            })
            break
          default:
            break
        }
        this.setState({
          errorMsg: `Could not create trade: ${e.response.data.reason.message}`
        })
      }
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
      currentBuy,
      buyQuote,
      onResetBuyQuote,
      styles
    } = this.props
    const {
      amountFieldEditing,
      exchangeRate,
      useRefundAddress,
      errorMsg
    } = this.state
    return (
      <div className={styles.root}>
        {!buyQuote ? (
          <Formik
            ref={this.form}
            initialStatus={{}}
            initialValues={{
              receiveAcc: currentBuy.receiveAcc || this.initialReceiveAcc,
              sell: currentBuy.sellCurrency,
              amount: currentBuy.sellAmount,
              refundAddr: currentBuy.refundAddr
            }}
            validate={this.validate}
            onSubmit={this.handleSubmit}
          >
            {({
              values,
              errors,
              touched,
              status,
              handleChange,
              handleBlur,
              handleSubmit,
              isSubmitting,
              setFieldValue
            }) => {
              const amountFieldNano = this.getAmountNano(values)
              const amountFieldSellCurrency = this.getAmountSellCurrency(values)

              return (
                <form onSubmit={handleSubmit}>
                  <Grid>
                    {!!errorMsg && (
                      <GridItem>
                        <Alert variant="error">{errorMsg}</Alert>
                      </GridItem>
                    )}
                    <GridItem spanTablet={6}>
                      <FormItem
                        label="Buy NANO with"
                        extra={
                          exchangeRate > 0 ? (
                            `1 ${values.sell} = ~${formatNano(
                              exchangeRate,
                              2
                            )} NANO`
                          ) : (
                            <Spinner size={16} />
                          )
                        }
                        fieldId="sell-currency"
                      >
                        <FormField>
                          <Select
                            id="sell-currency"
                            value={values.sell}
                            name="sell"
                            options={nanoPairs}
                            onChange={e =>
                              this.handleSellCurrencyChange(e, handleChange)
                            }
                            onBlur={handleBlur}
                          />
                        </FormField>
                      </FormItem>
                    </GridItem>
                    <GridItem spanTablet={6}>
                      <FormItem
                        label="Amount"
                        fieldId="send-amount"
                        error={
                          status.amountValid === false
                            ? 'Out of range'
                            : errors.amount && touched.amount && errors.amount
                        }
                        extra={exchangeRate === 0 && <Spinner size={16} />}
                        description={
                          <span>
                            You receive{' '}
                            <strong>~{formatNano(amountFieldNano)} NANO</strong>
                          </span>
                        }
                      >
                        <AmountField
                          value={values.amount}
                          name="amount"
                          fiatCode={values.sell}
                          editing={amountFieldEditing}
                          nanoFormatted={formatNano(amountFieldNano)}
                          fiatFormatted={formatNano(amountFieldSellCurrency, 5)}
                          formFieldProps={{
                            valid:
                              status.amountValid !== false &&
                              touched.amount &&
                              !errors.amount
                          }}
                          onSwitchCurrency={
                            this.handleAmountFieldSwitchCurrency
                          }
                          onChange={e =>
                            this.handleAmountChange(e, handleChange)
                          }
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
                      {useRefundAddress || values.refundAddr ? (
                        <FormItem
                          label="Refund address"
                          fieldId="refund-address"
                          description={`If all or part of your trade cannot be processed, your ${
                            values.sell
                          } will be returned to this address. It should be a${
                            [
                              'A',
                              'E',
                              'I',
                              'O',
                              'U',
                              'F',
                              'L',
                              'M',
                              'N',
                              'R',
                              'S',
                              'X'
                            ].includes(values.sell[0])
                              ? 'n'
                              : ''
                          } ${values.sell} address that you control.`}
                          error={
                            status.refundAddressValid === false &&
                            'Please enter a valid address'
                          }
                        >
                          <FormField
                            valid={status.refundAddressValid !== false}
                          >
                            <Input
                              id="refund-address"
                              name="refundAddr"
                              placeholder=""
                              value={values.refundAddr}
                              onChange={e =>
                                this.handleRefundAddressChange(e, handleChange)
                              }
                              onBlur={handleBlur}
                            />
                          </FormField>
                        </FormItem>
                      ) : (
                        <div className={styles.textComponent}>
                          <div>Sending from an exchange?</div>
                          <a href="#" onClick={this.handleUseRefundAddress}>
                            + Add a refund address
                          </a>
                        </div>
                      )}
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
          <div>
            {JSON.stringify(buyQuote, null, 2)}
            <button onClick={onResetBuyQuote}>Back</button>
          </div>
        )}
      </div>
    )
  }
}

export default withSnackbar(destyle(BuyForm, 'TxForm'))
