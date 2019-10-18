// @flow
import React, { Component } from 'react'
import { destyle } from 'destyle'
import { Formik } from 'formik'
import { convert } from '~/functions/convert'
import { formatNano } from '~/functions/format'
import { getEstimate } from '~/state/api/trade'
import { isValidNanoAddress } from '~/functions/validate'
import Alert from 'brainblocks-components/build/Alert'
import Grid from 'brainblocks-components/build/Grid'
import GridItem from 'brainblocks-components/build/GridItem'
import FormItem from 'brainblocks-components/build/FormItem'
import FormField from 'brainblocks-components/build/FormField'
import Input from 'brainblocks-components/build/Input'
import Select from 'brainblocks-components/build/Select'
import Spinner from 'brainblocks-components/build/Spinner'
import Button from 'brainblocks-components/build/Button'
import Checkbox from 'brainblocks-components/build/Checkbox'
import AmountField from 'brainblocks-components/build/AmountField'
import { withSnackbar } from 'brainblocks-components/build/Snackbar'
import AccountSelector from '~/components/accounts/AccountSelector'
import TradeInfo from './TradeInfo'
import type { WithRouter, WithSnackbar } from '~/types'
import type {
  AccountsState,
  CurrentSell,
  TradesState,
  TradeQuote
} from '~/types/reduxTypes'
import { VALIDATE_SELL_AMOUNT } from '~/constants/config'
import log from '~/functions/log'

type Props = WithRouter &
  WithSnackbar & {
    accounts: AccountsState,
    nanoPrice: number,
    defaultAccount: string,
    nanoPairs: Array<Object>,
    styles: Object,
    onSell: CurrentSell => Promise<void>,
    currentSell: CurrentSell,
    onSell: CurrentSell => Promise<void>,
    onResetSellQuote: () => void,
    onComplete: () => void,
    sellQuote: TradeQuote,
    trades: TradesState,
    onExecuteSend: (
      fromAddr: string,
      toAddr: string,
      amountNano: number
    ) => Promise<void>
  }

type State = {
  amountFieldEditing: string,
  exchangeRate: number,
  buyCurrency: string,
  errorMsg: ?string,
  addressConfirmed: boolean,
  isExecuting: boolean
}

class SellForm extends Component<Props, State> {
  initialFrom: string
  form: Object

  constructor(props) {
    super(props)
    const { accounts, defaultAccount } = props
    this.form = React.createRef()
    this.initialFrom =
      defaultAccount && accounts.allIds.includes(defaultAccount)
        ? defaultAccount
        : accounts.allIds[0]
    this.state = {
      amountFieldEditing: 'nano',
      exchangeRate: 0,
      buyCurrency: props.currentSell.buyCurrency,
      errorMsg: null,
      addressConfirmed: false,
      isExecuting: false
    }
  }

  componentDidMount() {
    // validate form immediately
    if (this.form.current) {
      this.form.current.validateForm()
      this.getEstimate(this.form.current.state.values)
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.form.current && this.state.buyCurrency !== prevState.buyCurrency) {
      const { values } = this.form.current.state
      this.getEstimate(values)
    }
  }

  getAmountNano = values =>
    this.state.amountFieldEditing === 'nano'
      ? values.amount
      : convert(values.amount, 'nano', 1 / this.state.exchangeRate)

  getAmountBuyCurrency = values =>
    this.state.amountFieldEditing === 'fiat'
      ? values.amount
      : this.state.exchangeRate > 0
      ? convert(values.amount, 'fiat', 1 / this.state.exchangeRate)
      : 0

  getEstimate = async values => {
    const currency = values.buy.toUpperCase()
    const amountNano = this.getAmountNano(values) || 100
    try {
      const rate = await getEstimate(amountNano, `NANO_${currency}`)
      this.setState({
        exchangeRate: rate.estimate.estimatedAmount / amountNano
      })
    } catch (e) {
      log.error(`Could not get rate for ${currency}_NANO`, e)
    }
  }

  handleAmountFieldSwitchCurrency = val => {
    this.setState(oldState => ({
      amountFieldEditing:
        oldState.amountFieldEditing === 'nano' ? 'fiat' : 'nano'
    }))
  }

  handleBuyCurrencyChange = (e, formikOnChangeFunc) => {
    formikOnChangeFunc(e)
    this.setState({
      exchangeRate: 0,
      buyCurrency: e.target.value
    })
  }

  handleAmountChange = (e, formikOnChangeFunc) => {
    formikOnChangeFunc(e)
    this.getEstimate(this.form.current.state.values)
    this.form.current.setStatus({
      amountValid: true
    })
  }

  handleBack = e => {
    e.preventDefault()
    this.props.onResetSellQuote()
  }

  handleConfirmAddress = e => {
    this.setState({
      addressConfirmed: e.target.checked
    })
  }

  validate = values => {
    let errors = {}

    if (!values.from) {
      errors.from = 'Required'
    } else if (!isValidNanoAddress(values.from)) {
      errors.from = 'Invalid Nano Address'
    }

    if (!values.buy) {
      errors.buy = 'Required'
    }

    if (!values.amount) {
      errors.amount = 'Required'
    } else if (values.amount <= 0) {
      errors.amount = 'Amount must be positive'
    } else if (
      this.getAmountNano(values) >
        this.props.accounts.byId[values.from].balance &&
      VALIDATE_SELL_AMOUNT
    ) {
      errors.amount = 'Insufficient balance'
    }

    return errors
  }

  handleSubmit = async (values, { setSubmitting, resetForm }) => {
    this.setState({
      errorMsg: null
    })
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
          errorMsg: `Could not create trade: ${e.response.data.reason.message.replace(
            'less then minimal',
            'less than minimum'
          )}`
        })
      }
      this.props.enqueueSnackbar('Could not create trade', {
        variant: 'error'
      })
      setSubmitting(false)
    }
  }

  handleExecuteSend = () => {
    this.setState({ isExecuting: true }, async () => {
      const { currentSell, sellQuote, trades } = this.props
      const tradeStatus = trades.byId[sellQuote.id]
      try {
        if (typeof tradeStatus.expectedSendAmount !== 'number') {
          throw new Error('tradeStatus.expectedSendAmount is not a number')
        }
        await this.props.onExecuteSend(
          currentSell.fromAcc,
          tradeStatus.payinAddress,
          tradeStatus.expectedSendAmount
        )
        this.props.enqueueSnackbar('Transaction broadcast successfully', {
          variant: 'success'
        })
        this.props.onComplete()
      } catch (e) {
        log.error(e)
        this.props.enqueueSnackbar('Could not broadcast transaction', {
          variant: 'error'
        })
      }
      this.setState({
        isExecuting: false
      })
    })
  }

  render() {
    const {
      accounts,
      nanoPrice,
      sellQuote,
      nanoPairs,
      currentSell,
      styles
    } = this.props
    const {
      amountFieldEditing,
      exchangeRate,
      errorMsg,
      addressConfirmed,
      isExecuting
    } = this.state
    return (
      <div className={styles.root}>
        {!sellQuote ? (
          <Formik
            ref={this.form}
            initialStatus={{}}
            initialValues={{
              from: this.initialFrom,
              buy: currentSell.buyCurrency,
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
              status,
              handleChange,
              handleBlur,
              handleSubmit,
              isSubmitting,
              setFieldValue
            }) => {
              const amountFieldNano = this.getAmountNano(values)
              const amountFieldBuyCurrency = this.getAmountBuyCurrency(values)

              return (
                <form onSubmit={handleSubmit}>
                  <Grid>
                    {!!errorMsg && (
                      <GridItem>
                        <Alert variant="error">{errorMsg}</Alert>
                      </GridItem>
                    )}
                    <GridItem>
                      <FormItem
                        label="Sell from account"
                        fieldId="sell-account"
                      >
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
                      <FormItem
                        label="Currency to buy"
                        fieldId="buy-currency"
                        extra={
                          exchangeRate === 0 && (
                            <Spinner size={16} color="blue" />
                          )
                        }
                        description={
                          exchangeRate > 0 &&
                          `1 NANO = ~${formatNano(exchangeRate, 5)} ${
                            values.buy
                          }`
                        }
                      >
                        <FormField>
                          <Select
                            id="buy-currency"
                            value={values.buy}
                            name="buy"
                            options={nanoPairs}
                            onChange={e =>
                              this.handleBuyCurrencyChange(e, handleChange)
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
                        description={
                          <span>
                            You receive{' '}
                            <strong>
                              ~{formatNano(amountFieldBuyCurrency, 5)}{' '}
                              {values.buy}
                            </strong>
                          </span>
                        }
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
                          fiatCode={values.buy}
                          editing={amountFieldEditing}
                          nanoFormatted={formatNano(amountFieldNano)}
                          fiatFormatted={formatNano(amountFieldBuyCurrency, 5)}
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
                        label={`Your ${values.buy} address`}
                        description={`We will send the ${
                          values.buy
                        } to this address. It's VERY IMPORTANT you get this right.`}
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
                            placeholder={`${values.buy} address`}
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
        ) : (
          <Grid>
            <GridItem>
              <Alert variant="info">
                Your sell order is pending. Review the details then continue
                below.
              </Alert>
            </GridItem>
            <GridItem>
              <FormItem label="Your Sell Order">
                <FormField>
                  <div className={styles.defTableInField}>
                    <TradeInfo tradeId={sellQuote.id} />
                  </div>
                </FormField>
              </FormItem>
            </GridItem>
            <GridItem>
              <div className={styles.intermediateHeader}>
                <div className={styles.intermediateHeaderInner}>
                  <h2>Complete your order below</h2>
                  <p>
                    Or{' '}
                    <a href="#" onClick={this.handleBack}>
                      go back
                    </a>{' '}
                    to make changes
                  </p>
                </div>
              </div>
            </GridItem>
            <GridItem>
              <Checkbox
                checked={addressConfirmed}
                name="addressConfirmed"
                label={`I confirm that my ${sellQuote.toCurrency.toUpperCase()} address is correct. I understand there is no way to recover funds sent to an incorrect address.`}
                onChange={this.handleConfirmAddress}
              />
            </GridItem>
            <GridItem>
              <Button
                block
                variant="primary"
                color="green"
                onClick={this.handleExecuteSend}
                disabled={!addressConfirmed}
                loading={isExecuting}
              >
                Complete Order
              </Button>
            </GridItem>
          </Grid>
        )}
      </div>
    )
  }
}

export default withSnackbar(destyle(SellForm, 'TxForm'))
