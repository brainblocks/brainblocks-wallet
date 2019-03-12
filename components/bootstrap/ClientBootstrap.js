/* flow */
import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'next/router'
import { getAccounts } from '~/state/selectors/accountSelectors'
import { wallet } from '~/state/wallet'
import {
  getCurrentAuth,
  getIsAuthorized
} from '~/state/selectors/authSelectors'
import { updatePrice } from '~/state/thunks/priceThunks'
import Loading from '~/pages/loading'
import Error from '~/pages/_error'
import { getCurrentUser } from '~/state/selectors/userSelectors'
import { getOrCreateWallet } from '~/state/thunks/walletThunks'

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
  isGettingWallet = false
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

  get hasWallet() {
    return (
      this.props.getWallet === false ||
      (!!wallet && !!this.props.accounts.allIds.length)
    )
  }

  componentDidMount() {
    const didRedirect = this.maybeRedirect()
    if (!didRedirect) {
      this.getPrice()
      this.getWallet()
    }
  }

  componentDidUpdate() {
    const didRedirect = this.maybeRedirect()
    if (!didRedirect) {
      this.getWallet()
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

    // Redirect login to dashboard if authorized
    if (router.pathname === '/login' && this.props.isAuthorized) {
      router.push('/')
      return true
    }

    // Redirect email-verification page to dashboard if already verified
    if (
      this.props.user.hasVerifiedEmail &&
      router.pathname === '/email-verification'
    ) {
      router.push('/')
      return true
    }

    return false
  }

  getWallet = () => {
    if (
      !this.hasWallet &&
      !this.isGettingWallet &&
      this.props.isAuthorized &&
      this.hasVerifiedEmail
    ) {
      console.log('getting wallet')
      this.isGettingWallet = true
      this.props
        .getOrCreateWallet(this.props.auth.user)
        .then(res => (this.isGettingWallet = false))
        .catch(err => {
          console.error('Error in getOrCreateWallet', err)
          this.isGettingWallet = false
          this.setState({ error: 'Error in getOrCreateWallet' })
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
  accounts: getAccounts(state)
})

const mapDispatchToProps = (dispatch, ownProps) => ({
  updatePrice: focusCheck => dispatch(updatePrice(focusCheck)),
  getOrCreateWallet: userId => dispatch(getOrCreateWallet(userId))
})

const ConnectedBootstrap = connect(
  mapStateToProps,
  mapDispatchToProps
)(Bootstrap)

export default withRouter(ConnectedBootstrap)
