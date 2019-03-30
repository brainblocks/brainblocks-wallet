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
import { Formik } from 'formik'
import AccountSelector from '~/components/accounts/AccountSelector'
import type { NormalizedState } from '~/types'

type Props = {
  router: Object,
  accounts: NormalizedState,
  styles: Object,
  nanoPrice: number,
  preferredCurrency: string,
  defaultAccount: string,
  onSend: (from: string, to: string, amount: string | number) => void
}

type State = {
  amountFieldEditing: string
}

class TransferForm extends Component<Props, State> {
  constructor(props) {
    super(props)
    this.form = React.createRef()
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
    this.initialFrom = from
    this.initialTo = to
    this.state = {
      amountFieldEditing: 'nano'
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
    this.setState({
      amountFieldEditing:
        this.state.amountFieldEditing === 'nano' ? 'fiat' : 'nano'
    })
  }

  handleSubmit = async (values, { setSubmitting }) => {
    try {
      this.props.onSend(values.from, values.to, this.getAmountNano(values))
    } catch (e) {
      console.error(e)
    }
  }

  render() {
    const {
      styles,
      accounts,
      nanoPrice,
      preferredCurrency,
      router
    } = this.props
    const { amountFieldEditing } = this.state

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
                      fieldId="transfer-from"
                      error={errors.from && touched.from && errors.from}
                    >
                      <FormField valid={touched.from && !errors.from}>
                        <AccountSelector
                          twoLine
                          balances="all"
                          name="from"
                          id="transfer-from"
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
                      fieldId="transfer-to"
                      error={errors.to && touched.to && errors.to}
                    >
                      <FormField valid={touched.to && !errors.to}>
                        <AccountSelector
                          twoLine
                          balances="all"
                          name="to"
                          id="transfer-from"
                          account={values.to}
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
                    <FormItem label="Message" fieldId="transfer-message">
                      <FormField>
                        <Input
                          multiline
                          style={{ height: 100 }}
                          rows={2}
                          id="transfer-message"
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

export default destyle(TransferForm, 'TransferForm')
