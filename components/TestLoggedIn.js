import { Component } from 'react'
import * as Auth from '~/state/actions/authActions'
import { connect } from 'react-redux'

const TestComponent = props => (
	<div>
		Logged In!
		{props.auth.user.username}
		<button onClick={props.logout}>Logout</button>
	</div>
)

const mapStateToProps = state => ({
	auth: state.auth
})

const mapDispatchToProps = dispatch => ({
	logout: () => dispatch(Auth.logout())
})

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(TestComponent)
