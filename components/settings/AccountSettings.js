// @flow
import * as React from 'react'
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
import type { NormalizedState } from '~/types'
import { getAccounts } from '~/state/selectors/accountSelectors'
import { getDefaultAccount } from '~/state/selectors/userSelectors'
import { updateAccount } from '~/state/thunks/accountsThunks'
import { createChange } from '~/state/thunks/transactionsThunks'
import { isValidNanoAddress } from '~/functions/validate'
import { wallet } from '~/state/wallet'

type Props = {
  router: Object,
  accounts: NormalizedState,
  updateAccount: Object => Promise<string | void>,
  createChange: (string, string) => Promise<string | void>,
  enqueueSnackbar: (string, ?Object) => void,
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
    errorMsg = "Could'nt update account settings"
  ) => {
    const acc = { ...account, account: this.state.account }
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
    const { styles, accounts, ...rest }: Props = this.props
    const { account, rep, label } = this.state
    const accountObj = accounts.byId[account]
    const accountRep = accountObj.representative
    const isLabelDirty = label !== accounts.byId[account].label
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
            <FormItem label="Account Name" fieldId="account-name">
              <FormField
                adornEnd={
                  isLabelDirty ? (
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
                  options={['gold', 'purple', 'pink', 'aqua', 'orange', 'jade']}
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
                <a
                  href="https://mynano.ninja/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Choose a rep
                </a>
              }
              description={
                !!accountRep
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
