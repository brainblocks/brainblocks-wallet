// @flow
import { Component } from 'react'
import { connect } from 'react-redux'
import { getCurrentAuth } from '~/state/selectors/authSelectors'
import Loading from '~/pages/loading'

// Error handling
import { deduceError } from '~/state/errors'

// Import API
import * as AuthAPI from '~/state/api/auth'

// Import actions
import { creators as authActions } from '~/state/actions/authActions'

/***
 * Component that wraps the entire application prior to loading to ensure we check and verify
 * the user's current auth session if one is present. Will render the loading page during the check
 */
class Authorize extends Component {
  state = {
    error: undefined
  }

  componentWillMount() {
    this.init()
  }

  async init() {
    // Leaving this here for now (rather than a thunk)
    // to keep the error local to the component
    this.props.setIsCheckingAuth(true)
    try {
      const authData = await AuthAPI.init()
      this.props.updateAuth(authData)
    } catch (error) {
      this.setState({ error: deduceError(error) })
    }

    this.props.didCheckAuth()
    this.props.setIsCheckingAuth(false)
  }

  render() {
    if (
      !this.props.auth ||
      !this.props.auth.didCheck ||
      this.props.auth.isChecking
    ) {
      return <Loading />
    }

    return this.props.children
  }
}

const mapStateToProps = state => ({
  auth: getCurrentAuth(state)
})

const mapDispatchToProps = dispatch => ({
  setIsCheckingAuth: payload => dispatch(authActions.setIsChecking(payload)),
  didCheckAuth: () => dispatch(authActions.didCheck()),
  updateAuth: payload => dispatch(authActions.update(payload))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Authorize)
