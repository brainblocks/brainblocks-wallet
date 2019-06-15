// @flow
import * as React from 'react'
import ReactGA from 'react-ga'
import { connect } from 'react-redux'
import { withRouter } from 'next/router'
import {
  getAccounts,
  getDidGetChainForAnyAccount
} from '~/state/selectors/accountSelectors'
import { creators as accountActions } from '~/state/actions/accountActions'
import { getWallet, createWallet } from '~/state/wallet'
import { getPassword, destroyPassword } from '~/state/password'
import { initWs, subscribeAccounts, getPending } from '~/state/websocket'
import {
  getCurrentAuth,
  getIsAuthorized
} from '~/state/selectors/authSelectors'
import { getActiveProcesses } from '~/state/selectors/uiSelectors'
import { updatePrice } from '~/state/thunks/priceThunks'
import Loading from '~/pages/loading'
import Error from '~/pages/_error'
import ReEnterPassword from '~/components/bootstrap/ReEnterPassword'
import { getCurrentUser } from '~/state/selectors/userSelectors'
import { getTransactions } from '~/state/selectors/transactionSelectors'
import {
  importChains,
  handlePendingBlocks
} from '~/state/thunks/transactionsThunks'
import { getCipheredWallet } from '~/state/selectors/vaultSelectors'
import { getVault } from '~/state/thunks/vaultThunks'
import type { WithRouter } from '~/types'
import type {
  UserState,
  TransactionsState,
  AccountsState
} from '~/types/reduxTypes'
import log from '~/functions/log'
import { setupRouterEvents } from '~/state/router'

type Props = WithRouter & {
  children: React.Node,
  getPrice?: boolean,
  getWallet?: boolean,
  verifyEmail?: boolean,
  requiresAuth?: boolean,
  // From mapStateToProps
  auth: Object,
  transactions: TransactionsState,
  isAuthorized: boolean,
  user: UserState,
  cipheredWallet: string,
  accounts: AccountsState,
  didGetChainForAnyAccount: boolean,
  activeProcesses: Array<string>,
  // From mapDispatchToProps
  updatePrice: (?boolean) => Promise<void>,
  importChains: (?Array<Object>) => Promise<void>,
  getVault: () => Promise<void>,
  bulkAddAccounts: (Array<Object>) => Promise<void>,
  handlePendingBlocks: Object => Promise<void>
}

type State = {
  error: ?string
}

/**
 * ClientBootstrap
 * This is a special component that wraps every page
 * and coordinates redirection and initial
 * redux and wallet hydration.
 */
class Bootstrap extends React.Component<Props, State> {
  isGettingVault: boolean
  isGettingChains: boolean
  didAddAccounts: boolean
  didGetTransactions: boolean
  priceInterval: ?IntervalID
  socketPingInterval: ?IntervalID

  constructor(props) {
    super(props)
    this.isGettingVault = false
    this.isGettingChains = false
    this.didAddAccounts = false
    this.didGetTransactions = false
    this.priceInterval = null
    this.socketPingInterval = null

    // If we navigate between pages while the getTransactions reqeust
    // is outstanding, it fires twice. This prevents that.
    if (
      this.props.activeProcesses.find(
        process => process.indexOf('get-chains-') === 0
      )
    ) {
      this.isGettingChains = true
    }

    this.state = {
      error: null
    }
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

  get wallet() {
    try {
      const wallet = getWallet()
      return wallet
    } catch (e) {
      return null
    }
  }

  get password() {
    try {
      const password = getPassword()
      return password
    } catch (e) {
      return null
    }
  }

  get hasVault() {
    return this.props.getWallet === false || !!this.props.cipheredWallet
  }

  get needsPassword() {
    return this.props.getWallet !== false && !this.wallet && !this.password
  }

  get hasWallet() {
    return this.props.getWallet === false || !!this.wallet
  }

  get hasAccounts() {
    return this.props.getWallet === false || !!this.props.accounts.allIds.length
  }

  get hasTransactions() {
    return this.props.getWallet === false || this.props.didGetChainForAnyAccount
  }

  componentDidMount() {
    setupRouterEvents(this.props.router)
    const didRedirect = this.maybeRedirect()
    if (!didRedirect) {
      this.setGAData()
      this.getPrice()
      this.getVault()
      this.createWallet()
      this.addAccounts()
      this.getTransactions()
      this.socketInit()
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (!this.state.error) {
      const didRedirect = this.maybeRedirect()
      if (!didRedirect) {
        this.setGAData(prevProps)
        this.getVault()
        this.createWallet()
        this.addAccounts()
        this.getTransactions()
        this.socketInit()
      }
    }
  }

  componentWillUnmount() {
    clearInterval(this.priceInterval)
    clearInterval(this.socketPingInterval)
  }

  // returns true if redirected
  maybeRedirect: () => boolean = () => {
    const { router } = this.props

    // Never redirect if we are already routing
    // but return true to prevent the rest of the
    // bootstrapping functions from running
    if (
      this.props.activeProcesses.find(
        process => process.indexOf(`Routing to`) === 0
      )
    ) {
      return true
    }

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

  setGAData = prevProps => {
    if (
      this.props.user.id &&
      (!prevProps || prevProps.user.id !== this.props.user.id)
    ) {
      ReactGA.set({ userId: this.props.user.id })
    }
  }

  getVault = () => {
    if (!this.hasVault && !this.isGettingVault) {
      this.isGettingVault = true
      this.props
        .getVault()
        .then(() => (this.isGettingVault = false))
        .catch(e => {
          log.error('Error in getVault', e)
          this.isGettingVault = false
          this.setState({ error: 'Error in getVault' })
        })
    }
  }

  createWallet = () => {
    if (this.hasVault && !this.hasWallet && !this.needsPassword) {
      createWallet(getPassword())
      const wallet = getWallet()
      wallet.load(this.props.cipheredWallet)
      destroyPassword()
    }
  }

  addAccounts = () => {
    if (!!this.wallet && !this.hasAccounts && !this.didAddAccounts) {
      const accounts = this.wallet.getAccounts()
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
          log.error('Error in getTransactions', e)
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

  socketInit = () => {
    if (this.props.didGetChainForAnyAccount) {
      // get/init ws
      const ws = initWs()
      // ws won't exist on the server
      if (ws) {
        // handle errors
        ws.onerror = err => {
          log.error('Websocket error', err)
          clearInterval(this.socketPingInterval)
        }
        // handle close
        ws.onclose = () => {
          log.warn('Websocket closed')
          this.socketInit()
        }
        // subscribe when connected
        ws.onopen = () => {
          subscribeAccounts(this.props.accounts.allIds)
        }
        // handle new messages
        ws.onmessage = message => {
          let { data } = message
          if (typeof data !== 'string')
            throw new Error('Unknown websocket message data')
          data = JSON.parse(data)
          switch (data.event) {
            case 'newBlock':
              this.props.handlePendingBlocks(data.data.accounts)
              break
            case 'subscribed':
              getPending([data.data])
              break
            case 'error':
              log.error('Error message from socket: ', data.data)
              break
            case 'ping':
              //log.info('Socket: server ping')
              break
            default:
              log.info('Unknown socket event: ' + data)
              break
          }
        }
        // setup ping pong
        clearInterval(this.socketPingInterval)
        this.socketPingInterval = setInterval(() => {
          log.info('Socket: client ping')
          if (ws.readyState === 1) {
            ws.send(JSON.stringify({ event: 'ping' }))
          }
        }, 25 * 1000)
        // ping immediately to avoid a loss of ping-pong if continuously changing pages
        if (ws.readyState === 1) {
          ws.send(JSON.stringify({ event: 'ping' }))
        }
      }
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
  didGetChainForAnyAccount: getDidGetChainForAnyAccount(state),
  transactions: getTransactions(state),
  cipheredWallet: getCipheredWallet(state),
  activeProcesses: getActiveProcesses(state)
})

const mapDispatchToProps = dispatch => ({
  updatePrice: focusCheck => dispatch(updatePrice(focusCheck)),
  importChains: () => dispatch(importChains()),
  getVault: () => dispatch(getVault()),
  bulkAddAccounts: accounts =>
    dispatch(accountActions.bulkAddAccounts(accounts)),
  handlePendingBlocks: accountsObject =>
    dispatch(handlePendingBlocks(accountsObject))
})

const ConnectedBootstrap = connect(
  mapStateToProps,
  mapDispatchToProps
)(Bootstrap)

export default withRouter(ConnectedBootstrap)
