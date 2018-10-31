import { Component } from 'react'
import * as Auth from '~/state/actions/authActions'
import { connect } from 'react-redux'
import Head from 'next/head'
import Layout from '~/components/layout/Layout'
import PageContent from '~/components/layout/PageContent'
import Router from 'next/router'
import { authSelector } from '~/state/selectors/authSelectors'

class Login extends Component {
  constructor(...args) {
    super(...args)

    this.state = {
      username: 'mochatest_login',
      password: 'mochatestpassword'
    }
  }

  componentWillMount() {
    this.tryForceRedirect()
  }

  componentDidUpdate() {
    this.tryForceRedirect()
  }

  get isAuthorized() {
    return this.props.auth && this.props.auth.isAuthorized
  }

  tryForceRedirect() {
    if (this.isAuthorized) {
      Router.push('/')
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
    if (this.isAuthorized) {
      return null
    }

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

const mapStateToProps = state => ({
  auth: authSelector(state)
})

const mapDispatchToProps = dispatch => ({
  login: (username, password, twoFactorAuthToken) =>
    dispatch(Auth.login(username, password, twoFactorAuthToken))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login)
