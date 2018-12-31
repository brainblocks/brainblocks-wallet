import { Component } from 'react'
import { connect } from 'react-redux'
import { getCurrentAuth } from '~/state/selectors/authSelectors'
import Head from 'next/head'
import Layout from '~/components/layout/Layout'
import AuthPageLayout from '~/components/layout/AuthPageLayout'
import PageContent from '~/components/layout/PageContent'
import Router, { withRouter } from 'next/router'

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

  render() {
    const { styles, router } = this.props

    if (this.props.auth && this.props.auth.isAuthorized) {
      return null
    }

    return (
      <Layout headerVariant="bare" footerVariant="bare">
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

const mapStateToProps = state => ({
  auth: getCurrentAuth(state)
})

export default withRouter(connect(mapStateToProps)(withRouter(Login)))
