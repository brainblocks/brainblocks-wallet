import { Component } from 'react'
import * as Auth from '~/state/actions/authActions'
import { connect } from 'react-redux'
import Head from 'next/head'
import Layout from '~/components/layout/Layout'
import PageContent from '~/components/layout/PageContent'

class TestComponent extends Component {
	constructor(...args) {
		super(...args)

		this.state = {
			username: 'mochatest_login',
			password: 'mochatestpassword'
		}
	}

	onChange(event) {
		let elm = event.target
		let name = elm.getAttribute('name')
		this.setState({
			[name]: elm.value
		})
	}

	onSubmit(event) {
		event.preventDefault()
		event.stopPropagation()

		this.props.login(this.state.username, this.state.password)
	}

	render() {
		return (
			<Layout includeHeader={false}>
				<Head>
					<title>Login</title>
				</Head>
				<PageContent>
					<form onSubmit={this.onSubmit.bind(this)}>
						<label>
							Username:
							<input
								type="text"
								name="username"
								defaultValue={this.state.username}
								onChange={this.onChange.bind(this)}
							/>
						</label>
						<br />
						<label>
							Password:
							<input
								type="password"
								name="password"
								defaultValue={this.state.password}
								onChange={this.onChange.bind(this)}
							/>
						</label>
						<br />
						<button type="submit">Login</button>
					</form>
				</PageContent>
			</Layout>
		)
	}
}

const mapStateToProps = state => ({})

const mapDispatchToProps = dispatch => ({
	login: (username, password, twoFactorAuthToken) =>
		dispatch(Auth.login(username, password, twoFactorAuthToken))
})

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(TestComponent)
