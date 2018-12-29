import { Component } from 'react'
import * as Auth from '~/state/actions/authActions'
import Head from 'next/head'
import Layout from '~/components/layout/Layout'
import AuthPageLayout from '~/components/layout/AuthPageLayout'
import Link from 'next/link'
import Notice, { ERROR_TYPE } from '~/components/alerts/Notice'
import PageContent from '~/components/layout/PageContent'
import Router, { withRouter } from 'next/router'
import ValidatedInput from '~/components/form/ValidatedInput'

class Login extends Component {
  recaptcha
  isLoggingIn

  constructor() {
    super()
    this.isLoggingIn = false
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

  async onSubmit(event) {
    if (this.isLoggingIn) {
      return
    }

    this.isLoggingIn = true

    try {
      const recaptcha = await this.recaptcha.execute()
      const { username, password } = this.props.formValues || {}

      this.props.login({ username, password, recaptcha })
    } catch (error) {}

    this.isLoggingIn = false
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
          />
        </PageContent>
      </Layout>
    )
  }
}

export default withRouter(Login)
