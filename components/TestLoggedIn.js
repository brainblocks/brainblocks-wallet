import { Component } from 'react'
import * as Auth from '~/state/actions/authActions'
import { connect } from 'react-redux'
import { currentAuthSelector } from '~/state/selectors/authSelectors'

const TestComponent = props => {
	return (
		props.auth && (
			<div>
				Logged In!
				{props.auth.user.username}
				<button onClick={props.logout}>Logout</button>
			</div>
		)
	)
}

const mapStateToProps = state => ({
	auth: currentAuthSelector(state)
})

const mapDispatchToProps = dispatch => ({
	logout: () => dispatch(Auth.logout())
})

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(TestComponent)
