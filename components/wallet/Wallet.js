// @flow
import * as React from 'react'
import { connect } from 'react-redux'
import { wallet, createWallet } from '~/state/wallet'
import { getOrCreateWallet } from '~/state/thunks/walletThunks'
import * as walletAPI from '~/state/api/wallet'
import { getCurrentAuth } from '~/state/selectors/authSelectors'
import { getAccounts } from '~/state/selectors/accountSelectors'
import { password, destroyPassword } from '~/state/password'
import { creators as uiCreators } from '~/state/actions/uiActions'
import { creators as accountCreators } from '~/state/actions/accountActions'
import Loading from '~/pages/loading'

type State = {}

type Props = {
  createAccount: string => mixed,
  addActiveProcess: string => mixed,
  removeActiveProcess: string => mixed,
  children: React.Node,
  auth: Object,
  accounts: Object
}

/***
 * This component ensures that the wallet is available.
 * It is intended to sit inside the Authorized component
 * and wrap any other components that make up a page.
 */
class Wallet extends React.Component<Props, State> {
  componentDidMount() {
    this.provideWallet()
  }

  get hasWallet() {
    //console.log('Checking', this.props.accounts)
    return wallet && this.props.accounts.allIds.length
  }

  provideWallet = async () => {
    const userId = this.props.auth.user

    // return early if no auth/user
    if (!this.props.auth.isAuthorized) return

    // return early if wallet already decrypted
    if (this.hasWallet) return

    // let ui know we're working
    this.props.addActiveProcess('create-wallet')

    // if ciphered wallet in localStorage
    if (localStorage.getItem(`__bb-ciphered-wallet-${userId}`)) {
      // get decryption key (via pin or not)
      // decrypt
    }

    // else if we have access to the password
    else if (password || true) {
      createWallet('1234') // @todo use login password

      // get wallet from API
      let encryptedWallet
      try {
        encryptedWallet = await walletAPI.getWallet(userId)
      } catch (e) {
        throw 'Error getting wallet for user'
      }
      // decrypt
      wallet.createWallet(encryptedWallet)

      // if this is a new wallet, name the default account
      // and save it
      if (!encryptedWallet) {
        const accounts = wallet.getAccounts()
        wallet.setLabel(accounts[0].account, 'Default Vault')
        try {
          await walletAPI.updateWallet()
        } catch (e) {
          throw 'Error sending encrypted wallet to server'
        }
      }
    }

    // else logout? (in future just prompt to retype password)
    else {
    }

    // populate accounts in store
    const accounts = wallet.getAccounts()
    accounts.forEach(acc => {
      this.props.createAccount(acc)
    })

    // destroy the password
    destroyPassword()

    // let ui know we're done
    this.props.removeActiveProcess('create-wallet')

    this.forceUpdate()
  }

  render() {
    return this.hasWallet ? this.props.children : <Loading />
  }
}

const mapStateToProps = state => ({
  auth: getCurrentAuth(state),
  accounts: getAccounts(state)
})

const mapDispatchToProps = {
  addActiveProcess: uiCreators.addActiveProcess,
  removeActiveProcess: uiCreators.removeActiveProcess,
  createAccount: accountCreators.createAccount
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Wallet)
