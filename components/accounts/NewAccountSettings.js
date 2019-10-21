// @flow
import React from 'react'
import { destyle } from 'destyle'
import { withRouter } from 'next/router'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { addAccount } from '~/state/thunks/accountsThunks'
import Grid from 'brainblocks-components/build/Grid'
import GridItem from 'brainblocks-components/build/GridItem'
import FormItem from 'brainblocks-components/build/FormItem'
import FormField from 'brainblocks-components/build/FormField'
import Input from 'brainblocks-components/build/Input'
import Button from 'brainblocks-components/build/Button'
import ColorChoice from 'brainblocks-components/build/ColorChoice'
import { withSnackbar } from 'brainblocks-components/build/Snackbar'
import type { WithSnackbar } from '~/types'
import { isValidAccountName } from '~/functions/validate'
import { ACCOUNT_LABEL_MAX_CHARS, ACCOUNT_COLORS } from '~/constants/config'
import log from '~/functions/log'

type Props = WithSnackbar & {
  addAccount: Object => Promise<Object>,
  router: Object,
  /** Given by destyle. Do not pass this to the component as a prop. */
  styles: Object
}

type State = {
  label: string,
  color: string
}

class NewAccountSettings extends React.Component<Props, State> {
  state = {
    label: '',
    color: 'gold'
  }

  createAccountWithSettings = () => {
    const { label, color } = this.state
    if (!isValidAccountName(label)) {
      log.error('Account label invalid')
      return
    }
    this.props.addAccount({ label, color }).then(() => {
      this.props.enqueueSnackbar(`Added account - ${label}`, {
        variant: 'success'
      })
      this.props.router.push('/accounts')
    })
  }

  getHandleUpdate = fieldName => e => {
    this.setState({
      [fieldName]: e.target.value
    })
  }

  render() {
    const { styles }: Props = this.props
    const { label, color }: State = this.state
    const isLabelValid = isValidAccountName(label)
    return (
      <div className={styles.root}>
        <Grid>
          <GridItem>
            <FormItem
              label="Account Name"
              fieldId="account-name"
              error={
                isLabelValid
                  ? null
                  : `Up to ${ACCOUNT_LABEL_MAX_CHARS} characters. No symbols.`
              }
            >
              <FormField valid={isLabelValid}>
                <Input
                  id="account-name"
                  placeholder="E.g. 'Savings' or 'Spending'"
                  value={label}
                  onChange={this.getHandleUpdate('label')}
                />
              </FormField>
            </FormItem>
          </GridItem>
          <GridItem>
            <FormItem
              label="Account Color"
              fieldId="color"
              description="The color can help you quickly identify this account."
            >
              <FormField>
                <ColorChoice
                  value={color}
                  options={ACCOUNT_COLORS}
                  onChange={this.getHandleUpdate('color')}
                />
              </FormField>
            </FormItem>
          </GridItem>
          <GridItem>
            <Button
              data-cy="create-account-btn"
              onClick={this.createAccountWithSettings}
              variant="primary"
              color="green"
              disabled={!isLabelValid}
            >
              Create Account
            </Button>
            {/*<a className={styles.moreSettings} href="#">
              More account settings
            </a>*/}
          </GridItem>
        </Grid>
      </div>
    )
  }
}

export default compose(
  withRouter,
  withSnackbar,
  connect(
    null,
    { addAccount }
  )
)(destyle(NewAccountSettings, 'NewAccountSettings'))
