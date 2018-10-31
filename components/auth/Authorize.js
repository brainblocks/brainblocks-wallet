// @flow
import { Component } from 'react'
import { connect } from 'react-redux'
import { init as initAuth } from '~/state/actions/authActions'
import { authSelector } from '~/state/selectors/authSelectors'
import Loading from '~/pages/loading'

/***
 * Component that wraps the entire application prior to loading to ensure we check and verify
 * the user's current auth session if one is present. Will render the loading page during the check
 */
class Authorize extends Component {
  componentWillMount() {
    this.props.initAuth()
  }

  render() {
    if (!this.props.auth || !this.props.auth.didCheck) {
      return <Loading />
    }

    return this.props.children
  }
}

const mapStateToProps = state => ({
  auth: authSelector(state)
})

const mapDispatchToProps = dispatch => ({
  initAuth: () => dispatch(initAuth())
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Authorize)
