import { Component } from 'react'
import * as Auth from '~/state/actions/authActions'
import * as User from '~/state/actions/userActions'
import { connect } from 'react-redux'
import Head from 'next/head'
import Layout from '~/components/layout/Layout'
import PageContent from '~/components/layout/PageContent'
import Router from 'next/router'
import { authSelector } from '~/state/selectors/authSelectors'

class Login extends Component {
  state = {
    isRegistering: false,
    username: '',
    email: '',
    password: '',
    retype: ''
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

  set isRegistering(value) {
    this.state.isRegistering = value // Set immediately to avoid double clicks
    this.forceUpdate() // Also trigger the update
  }

  get isRegistering() {
    return this.state.isRegistering
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

    // Stop early if we're already registering
    if (this.isRegistering) {
      return
    }

    this.setState({
      isRegistering: true
    })

    // TODO: Add validations

    this.props.register({
      username: this.state.username,
      email: this.state.email,
      password: this.state.password
    })
  }

  render() {
    console.log('Rendering...', this.state.isRegistering)

    // If the user is already authorized, we'll be redirecting so don't render anything
    // This avoid a flash on the screen
    if (this.isAuthorized) {
      return null
    }

    return (
      <Layout includeHeader={false}>
        <Head>
          <title>Register</title>
        </Head>
        <PageContent>
          <form onSubmit={this.onSubmit.bind(this)}>
            <label>
              Username:
              <input
                type="text"
                name="username"
                onChange={this.onChange.bind(this)}
              />
            </label>
            <br />
            <label>
              Email:
              <input
                type="email"
                name="email"
                onChange={this.onChange.bind(this)}
              />
            </label>
            <br />
            <label>
              Password:
              <input
                type="password"
                name="password"
                onChange={this.onChange.bind(this)}
              />
            </label>
            <br />
            <label>
              Retype Password:
              <input
                type="password"
                name="retype"
                onChange={this.onChange.bind(this)}
              />
            </label>
            <br />
            <button type="submit">Register</button>
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
  login: accountInfo => dispatch(User.create(accountInfo))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login)
