import { Component } from 'react'
import * as UserActions from '~/state/actions/userActions'
import { connect } from 'react-redux'
import Head from 'next/head'
import Layout from '~/components/layout/Layout'
import PageContent from '~/components/layout/PageContent'
import Router from 'next/router'
import { getCurrentAuth } from '~/state/selectors/authSelectors'
import { getError } from '~/state/selectors/errorSelectors'
import { reduxForm, Field, getFormValues } from 'redux-form'
import ValidatedInput from '~/components/form/ValidatedInput'

const RegisterForm = reduxForm({
  form: 'register',
  validate: values => {
    const errors = {}
    return errors
  }
})(({ handleSubmit, onSubmit }) => (
  <form onSubmit={handleSubmit(onSubmit)}>
    <Field
      name="username"
      type="text"
      label="Username"
      component={ValidatedInput}
    />
    <Field name="email" type="email" label="Email" component={ValidatedInput} />
    <Field
      name="password"
      type="password"
      label="Password"
      component={ValidatedInput}
    />
    <Field
      name="retype"
      type="password"
      label="Retype Password"
      component={ValidatedInput}
    />
    <button type="submit">Register</button>
  </form>
))

class Login extends Component {
  state = {
    isRegistering: false
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

  onSubmit() {
    // Stop early if we're already registering
    if (this.isRegistering) {
      return
    }

    this.setState({
      isRegistering: true
    })

    const { username, email, password } = this.props.formValues || {}

    this.props.register({
      username: this.state.username,
      email: this.state.email,
      password: this.state.password
    })
  }

  render() {
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
          <RegisterForm onSubmit={this.onSubmit.bind(this)} />
        </PageContent>
      </Layout>
    )
  }
}

const mapStateToProps = state => ({
  auth: getCurrentAuth(state),
  error: getError('register')(state),
  formValues: getFormValues('register')(state)
})

const mapDispatchToProps = dispatch => ({
  register: accountInfo => dispatch(UserActions.register(accountInfo))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login)
