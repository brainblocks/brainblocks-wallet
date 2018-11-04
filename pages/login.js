import { Component } from 'react'
import * as Auth from '~/state/actions/authActions'
import { connect } from 'react-redux'
import Head from 'next/head'
import Layout from '~/components/layout/Layout'
import PageContent from '~/components/layout/PageContent'
import Router from 'next/router'
import { getCurrentAuth } from '~/state/selectors/authSelectors'
import { getError } from '~/state/selectors/errorSelectors'
import { reduxForm, Field, getFormValues } from 'redux-form'
import ValidatedInput from '~/components/form/ValidatedInput'
import Notice from '~/components/alerts/Notice'

const LoginForm = reduxForm({
  form: 'login',
  initialValues: {
    username: 'mochatest_login',
    password: 'mochatestpassword'
  },
  validate: ({ username, password }) => {
    const errors = {}

    if (!username) {
      errors['username'] = 'Please enter a username'
    }

    if (!password) {
      errors['password'] = 'Please enter a password'
    }

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
    <Field
      name="password"
      type="password"
      label="Password"
      component={ValidatedInput}
    />
    <button type="submit">Login</button>
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

  onSubmit(event) {
    const { username, password } = this.props.formValues || {}

    this.props.login(username, password)
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
          {this.props.error && <Notice>{this.props.error.message}</Notice>}
          <LoginForm onSubmit={this.onSubmit.bind(this)} />
        </PageContent>
      </Layout>
    )
  }
}

const mapStateToProps = state => ({
  auth: getCurrentAuth(state),
  error: getError('login')(state),
  formValues: getFormValues('login')(state)
})

const mapDispatchToProps = dispatch => ({
  login: (username, password, twoFactorAuthToken) =>
    dispatch(Auth.login(username, password, twoFactorAuthToken))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login)
