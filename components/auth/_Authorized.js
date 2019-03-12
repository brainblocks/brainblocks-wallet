// @flow
import { Component } from 'react'
import { connect } from 'react-redux'
import { getCurrentAuth } from '~/state/selectors/authSelectors'
import { withRouter } from 'next/router'
import { getCurrentUser } from '~/state/selectors/userSelectors'

type State = {}

type Props = {
  auth: Object,
  verifyEmail: boolean,
  onAuthorize?: Function
}

/***
 * Component to wrap screens that require authorization to access.
 * Before the component mounts, this will check to ensure that an
 * auth session has been established and is active. If not, this will
 * redirect the user to the login screen.
 *
 * TODO:
 * - Consider saving the previous route to go back to once authorization is successful
 */
class Authorized extends Component<State, Props> {
  constructor(...args) {
    super(...args)
    this.tryForceRedirect()
  }

  componentDidUpdate() {
    this.tryForceRedirect()
  }

  get isAuthorized() {
    return this.props.auth && this.props.auth.isAuthorized
  }

  get hasVerifiedEmail() {
    return (
      this.props.verifyEmail === false ||
      (this.props.auth &&
        this.props.auth.user &&
        this.props.user.hasVerifiedEmail)
    )
  }

  tryForceRedirect() {
    const auth = this.props.auth

    if (!this.isAuthorized) {
      this.props.router.push('/login')
    } else if (!this.hasVerifiedEmail) {
      this.props.router.push('/email-verification')
    }
  }

  render() {
    if (!this.isAuthorized || !this.hasVerifiedEmail) {
      return null
    }

    return this.props.children
  }
}

const mapStateToProps = state => ({
  auth: getCurrentAuth(state),
  user: getCurrentUser(state)
})

export default withRouter(connect(mapStateToProps)(Authorized))
