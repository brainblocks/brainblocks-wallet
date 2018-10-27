// @flow
import { Component } from 'react'
import { connect } from 'react-redux'
import { init as initAuth } from '~/state/actions/authActions'
import { currentAuthSelector } from '~/state/selectors/authSelectors'

class Authorize extends Component {
	componentWillMount() {
		this.props.initAuth()
	}

	render() {
		if (!this.props.auth || !this.props.auth.didCheck) {
			return this.props.loadingComponent
		}

		if (!this.props.auth.isAuthorized) {
			return this.props.unauthorizedComponent
		}

		return this.props.authorizedComponent
	}
}

const mapStateToProps = state => ({
	auth: currentAuthSelector(state)
})

const mapDispatchToProps = dispatch => ({
	initAuth: () => dispatch(initAuth())
})

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Authorize)
