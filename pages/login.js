import { Component } from 'react'
import { connect } from 'react-redux'
import { getCurrentAuth } from '~/state/selectors/authSelectors'
import { getError } from '~/state/selectors/errorSelectors'
import { reduxForm, Field, getFormValues } from 'redux-form'
import * as Auth from '~/state/actions/authActions'
import Head from 'next/head'
import Layout from '~/components/layout/Layout'
import AuthPageLayout from '~/components/layout/AuthPageLayout'
import Link from 'next/link'
import Notice, { ERROR_TYPE } from '~/components/alerts/Notice'
import PageContent from '~/components/layout/PageContent'
import Router, { withRouter } from 'next/router'
import ValidatedInput from '~/components/form/ValidatedInput'
import Grid from '~/bb-components/grid/Grid'
import GridItem from '~/bb-components/grid/GridItem'
import Button from '~/bb-components/button/Button'

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
    <Grid>
      <GridItem>
        <Field
          name="username"
          type="text"
          label="Username"
          component={ValidatedInput}
        />
      </GridItem>
      <GridItem>
        <Field
          name="password"
          type="password"
          label="Password"
          component={ValidatedInput}
        />
      </GridItem>
      <GridItem>
        <Button block variant="primary" color="green" type="submit">
          Login
        </Button>
      </GridItem>
    </Grid>
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
    const { styles, router } = this.props

    if (this.isAuthorized) {
      return null
    }

    return (
      <Layout headerVariant="bare">
        <Head>
          <title>Login</title>
        </Head>
        <PageContent>
          <AuthPageLayout
            router={router}
            eyebrow="Welcome"
            title="Log in now or sign up for free"
          >
            {this.props.error && (
              <Notice type={ERROR_TYPE}>{this.props.error.message}</Notice>
            )}
            <LoginForm onSubmit={this.onSubmit.bind(this)} />
          </AuthPageLayout>
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

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Login)
)
