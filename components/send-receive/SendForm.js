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
  AmountField,
  withSnackbar
} from 'brainblocks-components'
import { Formik } from 'formik'
import AccountSelector from '~/components/accounts/AccountSelector'
import type { NormalizedState } from '~/types'

type Props = {
  router: Object,
  accounts: NormalizedState,
  defaultAccount: string,
  nanoPrice: number,
  preferredCurrency: string,
  styles: Object,
  onSend: (from: string, to: string, amount: string | number) => void,
  onSendComplete: () => void,
  variant?: 'send' | 'transfer',
  enqueueSnackbar: (string, ?Object) => void
}

type State = {
  amountFieldEditing: string
}

class SendForm extends Component<Props, State> {
  form: Object
  initialFrom: string
  initialTo: string

  constructor(props) {
    super(props)
    const { accounts, router, defaultAccount, variant } = props
    this.form = React.createRef()
    this.state = {
      amountFieldEditing: 'nano'
    }

    if (variant === 'transfer') {
      let from = accounts.allIds[0]
      if (router.query.from && accounts.allIds.includes(router.query.from)) {
        from = router.query.from
      } else if (accounts.allIds.includes(defaultAccount)) {
        from = defaultAccount
      }
      let to = accounts.allIds[1]
      if (router.query.to && accounts.allIds.includes(router.query.to)) {
        to = router.query.to
      }
      if (from === to) {
        to = accounts.allIds.find(id => id !== from)
      }
      this.initialFrom = from
      this.initialTo = to
    } else {
      this.initialFrom =
        router.query.from || defaultAccount || accounts.allIds[0]
      this.initialTo = router.query.to || ''
    }
  }

  componentDidMount() {
    // validate form immediately
    this.form.current.validateForm()
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

    if (!values.to) {
      errors.to = 'Required'
    } else if (!isValidNanoAddress(values.to)) {
      errors.to = 'Invalid Nano Address'
    } else if (values.to === values.from) {
      errors.to = '"From" and "To" must be different accounts'
    }

    if (!values.amount) {
      errors.amount = 'Required'
    } else if (values.amount <= 0) {
      errors.amount = 'Amount must be positive'
    } // @todo get account balance here and ensure amount is less

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
      await this.props.onSend(
        values.from,
        values.to,
        this.getAmountNano(values)
      )
      this.props.enqueueSnackbar('Transaction broadcast successfully', {
        variant: 'success'
      })
      resetForm({ to: this.initialTo, amount: 0, from: this.initialFrom })
      this.props.onSendComplete()
    } catch (e) {
      console.error(e)
      this.props.enqueueSnackbar('Could not broadcast transaction', {
        variant: 'error'
      })
      setSubmitting(false)
    }
  }

  render() {
    const {
      styles,
      accounts,
      nanoPrice,
      preferredCurrency,
      defaultAccount,
      router,
      variant = 'send'
    } = this.props
    const { amountFieldEditing = 'nano' } = this.state

    return (
      <div className={styles.root}>
        <Formik
          ref={this.form}
          initialValues={{
            from: this.initialFrom,
            to: this.initialTo,
            message: '',
            amount: router.query.amount || 0
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
            isSubmitting
          }) => {
            const amountFieldNano = this.getAmountNano(values)
            const amountFieldFiat = this.getAmountFiat(values)

            return (
              <form onSubmit={handleSubmit}>
                <Grid>
                  <GridItem>
                    <FormItem
                      label="From"
                      fieldId="send-from"
                      error={errors.from && touched.from && errors.from}
                    >
                      <FormField valid={touched.from && !errors.from}>
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
                  <GridItem>
                    <FormItem
                      label="To"
                      fieldId="send-to"
                      error={errors.to && touched.to && errors.to}
                    >
                      <FormField valid={touched.to && !errors.to}>
                        {variant === 'transfer' ? (
                          <AccountSelector
                            twoLine
                            balances="all"
                            name="to"
                            id="send-to"
                            account={values.to}
                            accounts={accounts}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            nanoPrice={nanoPrice}
                            vaultSelectable={false}
                          />
                        ) : (
                          <Input
                            id="send-to"
                            name="to"
                            placeholder="NANO address or contact..."
                            value={values.to}
                            onChange={handleChange}
                            onBlur={handleBlur}
                          />
                        )}
                      </FormField>
                    </FormItem>
                  </GridItem>
                  <GridItem spanTablet={6}>
                    <FormItem
                      label="Amount"
                      fieldId="send-amount"
                      error={errors.amount && touched.amount && errors.amount}
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
                  <GridItem spanTablet={6}>
                    <FormItem label="Message" fieldId="send-message">
                      <FormField>
                        <Input
                          multiline
                          style={{ height: 100 }}
                          rows={2}
                          id="send-message"
                          name="message"
                          readOnly
                          placeholder="This feature is coming soon"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.message}
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
                      Send
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

export default withSnackbar(destyle(SendForm, 'SendForm'))
