import { Component } from 'react'
import { connect } from 'react-redux'
import { getCurrentAuth } from '~/state/selectors/authSelectors'
import { getError } from '~/state/selectors/errorSelectors'
import { reduxForm, Field, getFormValues } from 'redux-form'
import { validate as isEmail } from 'isemail'
import * as UserActions from '~/state/actions/userActions'
import Head from 'next/head'
import Layout from '~/components/layout/Layout'
import Link from 'next/link'
import Notice, { ERROR_TYPE } from '~/components/alerts/Notice'
import PageContent from '~/components/layout/PageContent'
import Router from 'next/router'
import ValidatedInput from '~/components/form/ValidatedInput'
import validatePassword from '~/utils/validatePassword'
import { getUIState } from '~/state/selectors/uiSelectors'

const RegisterForm = reduxForm({
  form: 'register',
  validate: ({ username, email, password, retype }) => {
    const errors = {}

    if (!username) {
      errors['username'] = 'Please enter a username'
    }

    if (!email) {
      errors['email'] = 'Please enter an email'
    } else if (!isEmail(email)) {
      errors['email'] = 'Please enter a valid email'
    }

    const passwordValidation = validatePassword(password)
    if (passwordValidation) {
      errors['password'] = passwordValidation
    }

    if (!retype) {
      errors['retype'] = 'Please retype your password'
    } else if (password !== retype) {
      errors['retype'] = "Passwords don't match"
    }

    return errors
  }
})(({ handleSubmit, onSubmit, isRegistering }) => (
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
    <button type="submit" disabled={isRegistering}>
      {isRegistering ? 'Registering...' : 'Register'}
    </button>
  </form>
))

class Login extends Component {
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

  onSubmit() {
    // Stop early if we're already registering
    if (this.props.ui.isRegistering) {
      return
    }

    const { username, email, password } = this.props.formValues || {}

    this.props.register({ username, email, password })
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
          {this.props.error && (
            <Notice type={ERROR_TYPE}>{this.props.error.message}</Notice>
          )}
          <RegisterForm
            onSubmit={this.onSubmit.bind(this)}
            isRegistering={this.props.isRegistering}
          />
          <Link href="/login">Login</Link>
        </PageContent>
      </Layout>
    )
  }
}

const mapStateToProps = state => ({
  auth: getCurrentAuth(state),
  error: getError('register')(state),
  ui: getUIState('register')(state),
  formValues: getFormValues('register')(state)
})

const mapDispatchToProps = dispatch => ({
  register: accountInfo => dispatch(UserActions.register(accountInfo))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login)
