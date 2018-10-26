// @flow
import { Component } from 'react'
import { connect } from 'react-redux'
import * as Auth from '~/state/actions/authActions'

class Authorize extends Component {
	componentWillMount() {
		this.props.initAuth()
	}

	render() {
		if (!this.props.didCheck) {
			return this.props.loadingComponent
		}

		if (!this.props.isAuthorized) {
			return this.props.unauthorizedComponent
		}

		return this.props.authorizedComponent
	}
}

const mapStateToProps = state => ({
	isChecking: state.auth.isChecking,
	didCheck: state.auth.didCheck,
	isAuthorized: state.auth.isAuthorized
})

const mapDispatchToProps = dispatch => ({
	initAuth: () => dispatch(Auth.init())
})

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Authorize)
