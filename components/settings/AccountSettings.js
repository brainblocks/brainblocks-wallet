// @flow
import * as React from 'react'
import ReactGA from 'react-ga'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { destyle } from 'destyle'
import AccountSelector from '~/components/accounts/AccountSelector'
import Grid from 'brainblocks-components/build/Grid'
import GridItem from 'brainblocks-components/build/GridItem'
import FormItem from 'brainblocks-components/build/FormItem'
import FormField from 'brainblocks-components/build/FormField'
import Input from 'brainblocks-components/build/Input'
import Button from 'brainblocks-components/build/Button'
import ColorChoice from 'brainblocks-components/build/ColorChoice'
import { withSnackbar } from 'brainblocks-components/build/Snackbar'
import type { WithRouter, WithSnackbar } from '~/types'
import type { AccountsState } from '~/types/reduxTypes'
import { getAccounts } from '~/state/selectors/accountSelectors'
import { getDefaultAccount } from '~/state/selectors/userSelectors'
import { updateAccount } from '~/state/thunks/accountsThunks'
import { createChange } from '~/state/thunks/transactionsThunks'
import { isValidNanoAddress, isValidAccountName } from '~/functions/validate'
import { ACCOUNT_LABEL_MAX_CHARS, ACCOUNT_COLORS } from '~/constants/config'
import log from '~/functions/log'

type Props = WithRouter &
  WithSnackbar & {
    accounts: AccountsState,
    updateAccount: Object => Promise<string | void>,
    createChange: (string, string) => Promise<string | void>,
    /** Given by destyle. Do not pass this to the component as a prop. */
    styles: Object
  }

type State = {
  account: string,
  label: string,
  rep: string
}

class AccountSettings extends React.Component<Props, State> {
  constructor(props) {
    super(props)
    let routerAccount = null
    if (
      // XSS-safe
      props.router.query.hasOwnProperty('account') &&
      isValidNanoAddress(props.router.query.account) &&
      props.accounts.allIds.includes(props.router.query.account)
    ) {
      routerAccount = props.router.query.account
    }
    const account =
      routerAccount || props.defaultAccount || props.accounts.allIds[0]
    this.state = {
      account,
      label: props.accounts.byId[account].label,
      rep: props.accounts.byId[account].representative
    }
  }

  componentDidUpdate(prevProps) {
    if (
      prevProps.accounts.byId[this.state.account].representative !==
      this.props.accounts.byId[this.state.account].representative
    ) {
      this.setState({
        rep: this.props.accounts.byId[this.state.account].representative
      })
    }
  }

  handleSwitchAccount = e => {
    const acc = e.target.value
    this.setState({
      account: acc,
      label: this.props.accounts.byId[acc].label,
      rep: this.props.accounts.byId[acc].representative
    })
  }

  handleDirtyLabel = e => {
    this.setState({
      label: e.target.value
    })
  }

  handleDirtyRep = e => {
    this.setState({
      rep: e.target.value
    })
  }

  handleUpdateAccount = (
    account,
    successMsg = 'Account settings updated',
    errorMsg = "Couldn't update account settings"
  ) => {
    const acc = { ...account, account: this.state.account }
    if (acc.label && !isValidAccountName(acc.label)) {
      log.error('Account label invalid')
      return
    }
    this.props
      .updateAccount(acc)
      .then(updatedAccount =>
        this.props.enqueueSnackbar(successMsg, {
          variant: 'success'
        })
      )
      .catch(e => this.props.enqueueSnackbar(errorMsg, { variant: 'error' }))
  }

  handleUpdateRep = () => {
    const { account, rep } = this.state
    this.props
      .createChange(account, rep)
      .then(() => {
        this.props.enqueueSnackbar('Successfully updated representative', {
          variant: 'success'
        })
      })
      .catch(e => {
        this.setState({
          rep: this.props.accounts.byId[account].representative
        })
        this.props.enqueueSnackbar('Could not update representative', {
          variant: 'error'
        })
      })
  }

  render() {
    const { styles, accounts }: Props = this.props
    const { account, rep, label } = this.state
    const accountObj = accounts.byId[account]
    const accountRep = accountObj.representative
    const isLabelDirty = label !== accounts.byId[account].label
    const isLabelValid = isValidAccountName(label)
    const isRepDirty = !!accountRep && rep !== accountRep
    return (
      <div className={styles.root}>
        <Grid>
          <GridItem>
            <FormItem
              label="Choose Account"
              fieldId="settings-account"
              description="Select an account to view/update the settings for"
            >
              <FormField>
                <AccountSelector
                  twoLine
                  balances="all"
                  account={account}
                  accounts={accounts}
                  onChange={this.handleSwitchAccount}
                />
              </FormField>
            </FormItem>
          </GridItem>
          <GridItem>
            <hr className={styles.divider} />
          </GridItem>
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
              <FormField
                valid={isLabelValid}
                adornEnd={
                  isLabelDirty && isLabelValid ? (
                    <Button
                      variant="util"
                      color="teal"
                      onClick={() => this.handleUpdateAccount({ label })}
                    >
                      Save
                    </Button>
                  ) : null
                }
              >
                <Input
                  id="account-name"
                  placeholder="E.g. 'Savings' or 'Spending'"
                  value={label}
                  onChange={this.handleDirtyLabel}
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
                  value={accountObj.color}
                  options={ACCOUNT_COLORS}
                  onChange={e =>
                    this.handleUpdateAccount({ color: e.target.value })
                  }
                />
              </FormField>
            </FormItem>
          </GridItem>
          <GridItem>
            <FormItem
              label="Representative"
              fieldId="account-name"
              error={
                !!accountRep &&
                !!rep &&
                !isValidNanoAddress(rep) &&
                'Please enter a valid Nano address'
              }
              extra={
                <ReactGA.OutboundLink
                  eventLabel="Choose a rep"
                  to="https://mynano.ninja/"
                  target="_blank"
                >
                  Choose a rep
                </ReactGA.OutboundLink>
              }
              description={
                accountRep
                  ? 'Your representative confirms Nano transactions on your behalf'
                  : 'Your account must be opened before you can set a representative'
              }
            >
              <FormField
                valid={!accountRep || rep === '' || isValidNanoAddress(rep)}
                adornEnd={
                  isRepDirty && isValidNanoAddress(rep) ? (
                    <Button
                      variant="util"
                      color="teal"
                      onClick={this.handleUpdateRep}
                    >
                      Save
                    </Button>
                  ) : null
                }
              >
                <Input
                  id="account-rep"
                  value={rep || ''}
                  readOnly={!accountRep}
                  onChange={this.handleDirtyRep}
                />
              </FormField>
            </FormItem>
          </GridItem>
        </Grid>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  accounts: getAccounts(state),
  defaultAccount: getDefaultAccount(state)
})

const mapDispatchToProps = {
  updateAccount,
  createChange
}

export default compose(
  withSnackbar,
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(destyle(AccountSettings, 'SettingsForm'))
