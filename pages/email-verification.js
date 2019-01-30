/* @flow */
import React, { Component } from 'react'
import { withRouter } from 'next/router'
import { connect } from 'react-redux'
import Head from 'next/head'
import Layout from '~/components/layout/Layout'
import PageHeader from '~/components/layout/PageHeader'
import PageContent from '~/components/layout/PageContent'
import Authorized from '~/components/auth/Authorized'
import { Alert } from 'brainblocks-components'
//import Alert from '~/bb-components/alert/Alert'

// Import Selectors
import { getCurrentAuth } from '~/state/selectors/authSelectors'

// Import Actions
import * as UserActions from '~/state/actions/userActions'
import * as UserAPI from '~/state/api/user'

// Error handling
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
        this.props.updateAuthorizedUser(userData)
        this.setState({ isVerified: userData.hasVerifiedEmail })
      } catch (error) {
        this.setState({ error: deduceError(error) })
      }
    }

    this.setState({ isLoading: false })
  }

  resendVerificationEmail = async () => {
    const userData = await UserAPI.resendVerificationEmail()
    this.props.updateAuthorizedUser(userData)
  }

  gotoHome = () => {
    this.props.router.push('/')
  }

  render() {
    return (
      <Authorized verifyEmail={false}>
        <Layout>
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
                  to resend verification email
                </Alert>
              ) : this.state.isVerified ? (
                <Alert variant="success">
                  Email Verfied! Click{' '}
                  <a onClick={this.gotoHome} href="#">
                    here
                  </a>{' '}
                  to continue
                </Alert>
              ) : (
                <Alert variant="error">
                  Could not verify email. Click{' '}
                  <a onClick={this.resendVerificationEmail} href="#">
                    here
                  </a>{' '}
                  to resend verification email
                </Alert>
              ))}
          </PageContent>
        </Layout>
      </Authorized>
    )
  }
}

const mapStateToProps = state => ({
  auth: getCurrentAuth(state)
})

const mapDispatchToProps = dispatch => ({
  updateAuthorizedUser: payload =>
    dispatch(UserActions.updateAuthorizedUser(payload))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(EmailVerificationPage))
