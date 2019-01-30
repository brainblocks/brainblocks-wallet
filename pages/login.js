/* @flow */
import React from 'react'
import { Component } from 'react'
import { Media } from 'react-breakpoints'
import { connect } from 'react-redux'
import { destyle } from 'destyle'
import { getCurrentAuth } from '~/state/selectors/authSelectors'
import { getError } from '~/state/selectors/errorSelectors'
import { getFormValues } from 'redux-form'
import { Alert, SwitchTabs, TabComponents } from 'brainblocks-components'
//import Alert from '~/bb-components/alert/Alert'
import Head from 'next/head'
import Layout from '~/components/layout/Layout'
import LoginForm from '~/components/forms/LoginForm'
import PageContent from '~/components/layout/PageContent'
import Recaptcha from '~/components/auth/Recaptcha'
import RegisterForm from '~/components/forms/RegisterForm'
import RoundedHexagon from '~/static/svg/rounded-hexagon.svg'
import RoundedHexagonPurple from '~/static/svg/rounded-hexagon-purple.svg'
import Router, { withRouter } from 'next/router'
//import SwitchTabs from '~/bb-components/switch-tabs/SwitchTabs'
//import TabComponents from '~/bb-components/tabs/Tabs'

// State Actions
import * as AuthActions from '~/state/actions/authActions'
import * as UserActions from '~/state/actions/userActions'

// API
import * as AuthAPI from '~/state/api/auth'
import * as UserAPI from '~/state/api/user'

// Error handling
import { deduceError } from '~/state/errors'

const { Tab, TabList, TabPanel } = TabComponents

const tabIndexMap = {
  login: 0,
  register: 1
}

type Props = {
  router: Object,
  eyebrow?: string,
  title?: string,
  description?: string,
  /** Given by destyle. Do not pass this to the component as a prop. */
  styles: Object,
  children: React.Node
}

type State = {
  activeTab: number,
  loginError?: Object,
  registrationError?: Object
}

class Login extends Component<Props, State> {
  state
  recaptcha

  constructor(props) {
    super()
    this.state = {
      isSubmitting: false,
      activeTab: tabIndexMap[props.router.query.tab] || 0,
      loginError: undefined,
      registrationError: undefined
    }
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

  set isSubmitting(value) {
    this.state.isSubmitting = value
    this.forceUpdate()
  }

  tryForceRedirect() {
    if (this.isAuthorized) {
      Router.push('/')
    }
  }

  async onLogin(event) {
    if (this.state.isSubmitting) {
      return
    }

    // synchronous to avoid double-submitting
    this.isSubmitting = true

    try {
      const recaptcha = await this.recaptcha.execute()
      const { username, password } = this.props.loginFormValues || {}

      const authData = await AuthAPI.login(username, password, recaptcha)

      this.props.updateAuth(authData)

      this.props.router.push('/')
    } catch (error) {
      this.setState({ loginError: deduceError(error) })
    }

    this.setState({ isSubmitting: false })
  }

  async onRegister(event) {
    if (this.state.isSubmitting) {
      return
    }

    // synchronous to avoid double-submitting
    this.isSubmitting = true

    try {
      const recaptcha = await this.recaptcha.execute()
      const { username, email, password } = this.props.registerFormValues || {}

      const authData = await UserAPI.register({
        username,
        email,
        password,
        recaptcha
      })

      this.props.updateAuth(authData)

      this.props.router.push('/')
    } catch (error) {
      this.setState({ registrationError: deduceError(error) })
    }

    this.setState({ isSubmitting: false })
  }

  handleSwitchTabs = (index: number, lastIndex: number, event: Event) => {
    this.setState({
      activeTab: index
    })
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
          <Recaptcha ref={elm => (this.recaptcha = elm)} />
          <div className={styles.root}>
            <div className={styles.content}>
              <p className={styles.eyebrow}>Welcome</p>
              <h1 className={styles.title}>Log in now or sign up for free</h1>
            </div>
            <div className={styles.formContainer}>
              <Media>
                {({ breakpoints, currentBreakpoint }) =>
                  breakpoints[currentBreakpoint] >= breakpoints.medium && (
                    <div className={styles.visuals}>
                      <span className={styles.hex1}>
                        <RoundedHexagon />
                      </span>
                      <span className={styles.hex2}>
                        <RoundedHexagonPurple />
                      </span>
                      <div className={styles.circle1} />
                      <div className={styles.circle2} />
                    </div>
                  )
                }
              </Media>
              <div className={styles.formContainerInner}>
                <SwitchTabs
                  selectedIndex={this.state.activeTab}
                  onSelect={this.handleSwitchTabs}
                >
                  <TabList>
                    <Tab>Login</Tab>
                    <Tab>Register</Tab>
                  </TabList>

                  <div className={styles.tabPanels}>
                    <TabPanel>
                      {this.state.loginError && (
                        <Alert variant="error" style={{ marginBottom: 22 }}>
                          {this.state.loginError.message}
                        </Alert>
                      )}
                      <LoginForm
                        onSubmit={this.onLogin.bind(this)}
                        submitting={this.state.isSubmitting}
                      />
                    </TabPanel>
                    <TabPanel>
                      {this.state.registrationError && (
                        <Alert variant="error" style={{ marginBottom: 22 }}>
                          {this.state.registrationError.message}
                        </Alert>
                      )}
                      <RegisterForm
                        onSubmit={this.onRegister.bind(this)}
                        submitting={this.state.isSubmitting}
                      />
                    </TabPanel>
                  </div>
                </SwitchTabs>
              </div>
            </div>
          </div>
        </PageContent>
      </Layout>
    )
  }
}

const mapStateToProps = state => ({
  auth: getCurrentAuth(state),
  loginFormValues: getFormValues('login')(state),
  registerFormValues: getFormValues('register')(state)
})

const mapDispatchToProps = dispatch => ({
  updateAuth: payload => dispatch(AuthActions.update(payload))
})

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(destyle(Login, 'Login'))
)
