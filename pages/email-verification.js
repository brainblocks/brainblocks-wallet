/* @flow */
import React, { Component } from 'react'
import { withRouter } from 'next/router'
import { connect } from 'react-redux'
import Link from 'next/link'
import Head from 'next/head'
import Layout from '~/components/layout/Layout'
import PageHeader from '~/components/layout/PageHeader'
import PageContent from '~/components/layout/PageContent'
import ClientBootstrap from '~/components/bootstrap/ClientBootstrap'
import { bootstrapInitialProps } from '~/state/bootstrap'
import { Alert } from 'brainblocks-components'
import { getCurrentAuth } from '~/state/selectors/authSelectors'
import { getCurrentUser } from '~/state/selectors/userSelectors'
import { creators as userActions } from '~/state/actions/userActions'
import * as UserAPI from '~/state/api/user'
import { deduceError } from '~/state/errors'

type State = {
  isLoading: boolean
}

type Props = {
  router: Object,
  auth: Object,
  verifyEmail: Function
}

class EmailVerificationPage extends Component<State, Props> {
  state = {
    isLoading: true,
    isVerified: false,
    didCheck: false,
    error: undefined
  }

  static getInitialProps = async ctx => {
    return await bootstrapInitialProps(ctx)
  }

  componentDidMount() {
    this.tryVerifyEmail()
  }

  get hash() {
    return this.props.router.query.hash
  }

  get verification() {
    return this.props.router.query.verification
  }

  get hasQueryParameters() {
    return !!this.hash || !!this.verification
  }

  async tryVerifyEmail() {
    if (this.hasQueryParameters) {
      this.setState({ isLoading: true })

      try {
        const userData = await UserAPI.verifyEmail(this.hash, this.verification)
        this.props.updateUser(userData)
        this.setState({ isVerified: userData.hasVerifiedEmail })
      } catch (error) {
        this.setState({ error: deduceError(error) })
      }
    }

    this.setState({ isLoading: false })
  }

  resendVerificationEmail = async e => {
    e.preventDefault()
    const userData = await UserAPI.resendVerificationEmail()
    this.props.updateUser(userData)
  }

  render() {
    return (
      <ClientBootstrap verifyEmail={false} getWallet={false} getPrice={false}>
        <Layout headerVariant="logout">
          >
          <Head>
            <title>Email Verification</title>
          </Head>
          <PageHeader />
          <PageContent pad background>
            {!this.state.isLoading &&
              (!this.hasQueryParameters ? (
                <Alert variant="warning">
                  Email verification is required, please check your inbox to
                  continue. Click{' '}
                  <a onClick={this.resendVerificationEmail} href="#">
                    here
                  </a>{' '}
                  to resend verification email.
                </Alert>
              ) : this.state.isVerified ? (
                <Alert variant="success">
                  Email Verfied! Click{' '}
                  <Link href="/">
                    <a>here</a>
                  </Link>{' '}
                  to continue.
                </Alert>
              ) : (
                <Alert variant="error">
                  Could not verify email. Click{' '}
                  <a onClick={this.resendVerificationEmail} href="#">
                    here
                  </a>{' '}
                  to resend verification email.
                </Alert>
              ))}
          </PageContent>
        </Layout>
      </ClientBootstrap>
    )
  }
}

const mapStateToProps = state => ({
  auth: getCurrentAuth(state),
  user: getCurrentUser(state)
})

const mapDispatchToProps = dispatch => ({
  updateUser: payload => dispatch(userActions.updateUser(payload))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(EmailVerificationPage))
