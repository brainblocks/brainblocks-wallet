/* flow */
import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'next/router'
import { getAccounts } from '~/state/selectors/accountSelectors'
import { creators as accountActions } from '~/state/actions/accountActions'
import { wallet, createWallet } from '~/state/wallet'
import { password, destroyPassword } from '~/state/password'
import {
  getCurrentAuth,
  getIsAuthorized
} from '~/state/selectors/authSelectors'
import { updatePrice } from '~/state/thunks/priceThunks'
import Loading from '~/pages/loading'
import Error from '~/pages/_error'
import ReEnterPassword from '~/pages/re-enter-password'
import { getCurrentUser } from '~/state/selectors/userSelectors'
import { getTransactions } from '~/state/selectors/transactionSelectors'
import { getOrCreateWallet } from '~/state/thunks/vaultThunks'
import { importChains } from '~/state/thunks/transactionsThunks'
import { getCipheredWallet } from '~/state/selectors/vaultSelectors'
import { getVault } from '~/state/thunks/vaultThunks'

type Props = {
  getPrice?: boolean,
  getWallet?: boolean,
  verifyEmail?: boolean,
  requiresAuth?: boolean
}

/**
 * ClientBootstrap
 * This is a special component that wraps every page
 * and coordinates redirection and initial
 * redux hydration of anything that we only want to get
 * on the client (E.g. Nano price).
 */
class Bootstrap extends React.Component {
  isGettingVault = false
  isGettingChains = false
  didAddAccounts = false
  didGetTransactions = false
  priceInterval = null
  state = {
    error: null
  }

  // isReady is used to show either the child components or the loading page
  get isReady() {
    return this.isAuthorized && this.hasVerifiedEmail && this.hasWallet
  }

  get isAuthorized() {
    return this.props.isAuthorized || this.props.requiresAuth === false
  }

  get hasVerifiedEmail() {
    return (
      this.props.verifyEmail === false ||
      (this.props.isAuthorized && this.props.user.hasVerifiedEmail)
    )
  }

  get hasVault() {
    return this.props.getWallet === false || !!this.props.cipheredWallet
  }

  get needsPassword() {
    return this.props.getWallet !== false && !wallet && !password
  }

  get hasWallet() {
    return this.props.getWallet === false || !!wallet
  }

  get hasAccounts() {
    return this.props.getWallet === false || !!this.props.accounts.allIds.length
  }

  get hasTransactions() {
    return (
      this.props.getWallet === false || !!this.props.transactions.allIds.length
    )
  }

  componentDidMount() {
    const didRedirect = this.maybeRedirect()
    if (!didRedirect) {
      this.getPrice()
      this.getVault()
      this.createWallet()
      this.addAccounts()
      this.getTransactions()
    }
  }

  componentDidUpdate() {
    if (!this.state.error) {
      const didRedirect = this.maybeRedirect()
      if (!didRedirect) {
        this.getVault()
        this.createWallet()
        this.addAccounts()
        this.getTransactions()
      }
    }
  }

  componentWillUnmount() {
    clearInterval(this.priceInterval)
  }

  // returns true if redirected
  maybeRedirect: () => boolean = () => {
    const { router } = this.props

    // Redirect unauthorized to login page
    if (!this.isAuthorized && router.pathname !== '/login') {
      router.push('/login')
      return true
    }

    // Redirect authorized but unverified to email verification
    if (
      this.props.isAuthorized &&
      !this.props.user.hasVerifiedEmail &&
      router.pathname !== '/email-verification'
    ) {
      router.push('/email-verification')
      return true
    }

    // Redirect authorized + verified but no saved wallet to create/import
    if (
      this.props.isAuthorized &&
      this.props.user.hasVerifiedEmail &&
      !this.props.cipheredWallet &&
      router.pathname !== '/email-verification' &&
      router.pathname !== '/new-account/create-import' &&
      router.pathname !== '/new-account/vault'
    ) {
      router.push('/new-account/create-import')
      return true
    }

    // Redirect from create/import to dashboard if we already have a wallet
    if (
      this.props.cipheredWallet &&
      router.pathname === '/new-account/create-import'
    ) {
      router.push('/')
      return true
    }

    // Redirect login to dashboard if authorized
    if (router.pathname === '/login' && this.props.isAuthorized) {
      router.push('/')
      return true
    }

    // Redirect email-verification page to dashboard if already verified
    /*if (
      this.props.user.hasVerifiedEmail &&
      router.pathname === '/email-verification'
    ) {
      router.push('/')
      return true
    }*/

    return false
  }

  getVault = () => {
    if (!this.hasVault && !this.isGettingVault) {
      this.isGettingVault = true
      this.props
        .getVault()
        .then(res => (this.isGettingVault = false))
        .catch(e => {
          console.error('Error in getVault', e)
          this.isGettingVault = false
          this.setState({ error: 'Error in getVault' })
        })
    }
  }

  createWallet = () => {
    if (this.hasVault && !this.hasWallet && !this.needsPassword) {
      createWallet(password)
      wallet.load(this.props.cipheredWallet)
      destroyPassword()
    }
  }

  addAccounts = () => {
    if (!!wallet && !this.hasAccounts && !this.didAddAccounts) {
      const accounts = wallet.getAccounts()
      this.props.bulkAddAccounts(accounts)
      this.didAddAccounts = true
    }
  }

  getTransactions = () => {
    if (
      this.hasAccounts &&
      !this.hasTransactions &&
      !this.isGettingChains &&
      !this.didGetTransactions
    ) {
      this.isGettingChains = true
      this.props
        .importChains(this.props.accounts.allIds)
        .then(() => {
          this.didGetTransactions = true
          this.isGettingChains = false
        })
        .catch(e => {
          console.error('Error in getTransactions', e)
          this.isGettingChains = false
          this.setState({ error: 'Error in getTransactions' })
        })
    }
  }

  getPrice = () => {
    if (this.props.getPrice !== false) {
      this.priceInterval = setInterval(this.props.updatePrice, 30 * 1000)
      this.props.updatePrice(false)
    }
  }

  render() {
    if (this.state.error) {
      return <Error />
    } else if (this.needsPassword) {
      return <ReEnterPassword onSubmit={() => this.forceUpdate()} />
    } else if (this.isReady) {
      return this.props.children
    } else {
      return <Loading />
    }
  }
}

const mapStateToProps = state => ({
  auth: getCurrentAuth(state),
  user: getCurrentUser(state),
  isAuthorized: getIsAuthorized(state),
  accounts: getAccounts(state),
  transactions: getTransactions(state),
  cipheredWallet: getCipheredWallet(state)
})

const mapDispatchToProps = (dispatch, ownProps) => ({
  updatePrice: focusCheck => dispatch(updatePrice(focusCheck)),
  getOrCreateWallet: userId => dispatch(getOrCreateWallet(userId)),
  importChains: () => dispatch(importChains()),
  getVault: () => dispatch(getVault()),
  bulkAddAccounts: accounts =>
    dispatch(accountActions.bulkAddAccounts(accounts))
})

const ConnectedBootstrap = connect(
  mapStateToProps,
  mapDispatchToProps
)(Bootstrap)

export default withRouter(ConnectedBootstrap)
