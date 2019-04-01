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
import Loading from '~/pages/loading'
import Message from '~/components/layout/Message'
import { Button, withSnackbar } from 'brainblocks-components'

type State = {
  isLoading: boolean,
  didCheck: boolean,
  error?: mixed,
  isResending: boolean,
  didResend: boolean
}

type Props = {
  user: Object,
  updateUser: Object => void,
  router: Object,
  auth: Object,
  verifyEmail: Function,
  enqueueSnackbar: (string, ?Object) => void
}

class EmailVerificationPage extends Component<Props, State> {
  state = {
    isLoading: true,
    didCheck: false,
    error: undefined,
    isResending: false,
    didResend: false
  }

  componentDidMount() {
    this.tryVerifyEmail()
  }

  get isVerified() {
    return this.props.user.hasVerifiedEmail
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
      try {
        const userData = await UserAPI.verifyEmail(this.hash, this.verification)
        this.props.updateUser(userData)
      } catch (error) {
        console.error('Error verifying email', error)
        this.setState({ error: deduceError(error), isLoading: false })
      }
    }

    this.setState({ isLoading: false })
  }

  resendVerificationEmail = async () => {
    this.setState({ isResending: true }, async () => {
      try {
        const userData = await UserAPI.resendVerificationEmail()
        this.props.updateUser(userData)
        this.props.enqueueSnackbar('Verification email re-sent', {
          variant: 'success'
        })
        this.setState({ isResending: false, didResend: true })
      } catch (e) {
        console.error('Error re-sending email', e)
        this.props.enqueueSnackbar('Could not re-send verification email', {
          variant: 'error'
        })
        this.setState({ isResending: false, didResend: false })
      }
    })
  }

  render() {
    if (this.state.isLoading) return <Loading />
    return (
      <Layout headerVariant="logout">
        <Head>
          <title>Email Verification</title>
        </Head>
        <PageHeader
          title={
            this.isVerified
              ? 'Email successfully verified'
              : 'Please verify your email address'
          }
        />
        <PageContent pad background>
          {!this.isVerified && !this.hasQueryParameters ? (
            <Message
              title="We need to verify your email"
              subtitle="Please check your inbox for the verification link."
              graphic="/static/svg/undraw_emails_6uqr.svg"
            >
              <p>
                Didn't receive the email? Check your spam folder. If you don't
                get it within a few minutes, click below and we will try again.
              </p>
              {!this.state.didResend && (
                <Button
                  onClick={this.resendVerificationEmail}
                  loading={this.state.isResending}
                >
                  Re-send
                </Button>
              )}
            </Message>
          ) : this.isVerified ? (
            <Message
              title="Success!"
              graphic="/static/svg/undraw_mail_cg1t.svg"
            >
              <p>
                Your email has been verified. You can now create a new Vault.
              </p>
              <Link href="/new-account/create-import">
                <Button color="green">Continue</Button>
              </Link>
            </Message>
          ) : (
            <Message
              title="Verification Error"
              graphic="/static/svg/mail_error.svg"
            >
              <p>
                We couldn't verify your email. Click below and we will try
                again.
              </p>
              {!this.state.didResend && (
                <Button
                  onClick={this.resendVerificationEmail}
                  loading={this.state.isResending}
                >
                  Re-send
                </Button>
              )}
            </Message>
          )}
        </PageContent>
      </Layout>
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

const ExportableEmailVerificationPage = connect(
  mapStateToProps,
  mapDispatchToProps
)(withSnackbar(withRouter(EmailVerificationPage)))

ExportableEmailVerificationPage.getInitialProps = async ctx => {
  return await bootstrapInitialProps(ctx)
}

export default ExportableEmailVerificationPage
