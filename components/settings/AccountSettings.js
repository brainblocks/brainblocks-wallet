// @flow
import * as React from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { destyle } from 'destyle'
import AccountSelector from '~/components/accounts/AccountSelector'
import {
  FormItem,
  FormField,
  Input,
  Grid,
  GridItem,
  Button,
  withSnackbar,
  ColorChoice
} from 'brainblocks-components'
import type { NormalizedState } from '~/types'
import { getAccounts } from '~/state/selectors/accountSelectors'
import { getDefaultAccount } from '~/state/selectors/userSelectors'
import { updateAccount } from '~/state/thunks/accountsThunks'
import { isValidNanoAddress } from '~/functions/validate'
import { wallet } from '~/state/wallet'

type Props = {
  router: Object,
  /** Given by destyle. Do not pass this to the component as a prop. */
  styles: Object
}

class AccountSettings extends React.Component {
  constructor(props) {
    super(props)
    let routerAccount = null
    if (
      props.router.query.hasOwnProperty('account') &&
      isValidNanoAddress(props.router.query.account)
    ) {
      routerAccount = props.router.query.account
    }
    const account =
      routerAccount || props.defaultAccount || props.accounts.allIds[0]
    this.state = {
      account,
      label: props.accounts.byId[account].label,
      rep:
        props.accounts.byId[account].representative ||
        wallet.getRepresentative(account) ||
        ''
    }
  }

  handleSwitchAccount = acc => {
    this.setState({
      account: acc,
      label: this.props.accounts.byId[acc].label
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
    // Do update rep in wallet
    this.handleUpdateAccount({ representative: this.state.rep })
  }

  render() {
    const { styles, accounts, ...rest }: Props = this.props
    const { account, rep, label } = this.state
    const accountObj = accounts.byId[account]
    const isLabelDirty = label !== accounts.byId[account].label
    const isRepDirty =
      rep !== accounts.byId[account].representative ||
      wallet.getRepresentative(account)
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
                rep !== '' &&
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
              description="Your representative confirms Nano transactions on your behalf"
            >
              <FormField
                valid={rep === '' || isValidNanoAddress(rep)}
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
                  value={rep}
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
  updateAccount
}

export default compose(
  withSnackbar,
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(destyle(AccountSettings, 'SettingsForm'))