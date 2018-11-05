// @flow
import { Component } from 'react'
import { connect } from 'react-redux'
import { getCurrentAuth } from '~/state/selectors/authSelectors'
import Router from 'next/router'

/***
 * Component to wrap screens that require authorization to access.
 * Before the component mounts, this will check to ensure that an
 * auth session has been established and is active. If not, this will
 * redirect the user to the login screen.
 *
 * TODO:
 * - Consider saving the previous route to go back to once authorization is successful
 */
class Authorized extends Component {
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

  tryForceRedirect() {
    if (!this.isAuthorized) {
      Router.push('/login')
    }
  }

  render() {
    if (!this.props.auth.isAuthorized) {
      return null
    }

    return this.props.children
  }
}

const mapStateToProps = state => ({
  auth: getCurrentAuth(state)
})

export default connect(mapStateToProps)(Authorized)
