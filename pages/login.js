/* @flow */
import React from 'react'
import { Component } from 'react'
import { connect } from 'react-redux'
import { destyle } from 'destyle'
import { getCurrentAuth } from '~/state/selectors/authSelectors'
import { getError } from '~/state/selectors/errorSelectors'
import { getFormValues } from 'redux-form'
import * as AuthActions from '~/state/actions/authActions'
import * as UserActions from '~/state/actions/userActions'
import Alert from '~/bb-components/alert/Alert'
import Head from 'next/head'
import Layout from '~/components/layout/Layout'
import LoginForm from '~/components/forms/LoginForm'
import PageContent from '~/components/layout/PageContent'
import Recaptcha from '~/components/auth/Recaptcha'
import RegisterForm from '~/components/forms/RegisterForm'
import RoundedHexagon from '~/static/svg/rounded-hexagon.svg'
import RoundedHexagonPurple from '~/static/svg/rounded-hexagon-purple.svg'
import Router, { withRouter } from 'next/router'
import SwitchTabs from '~/bb-components/switch-tabs/SwitchTabs'
import TabComponents from '~/bb-components/tabs/Tabs'

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
  activeTab: number
}

class Login extends Component {
  state
  recaptcha
  isSubmitting

  constructor(props) {
    super()
    this.isSubmitting = false
    this.state = {
      activeTab: tabIndexMap[props.router.query.tab] || 0
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

  tryForceRedirect() {
    if (this.isAuthorized) {
      Router.push('/')
    }
  }

  async onLogin(event) {
    if (this.isSubmitting) {
      return
    }

    this.isSubmitting = true

    try {
      const recaptcha = await this.recaptcha.execute()
      const { username, password } = this.props.loginFormValues || {}

      this.props.login({ username, password, recaptcha })
    } catch (error) {}

    this.isSubmitting = false
  }

  async onRegister(event) {
    if (this.isSubmitting) {
      return
    }

    this.isSubmitting = true

    try {
      const recaptcha = await this.recaptcha.execute()
      const { username, email, password } = this.props.registerFormValues || {}

      this.props.register({ username, email, password, recaptcha })
    } catch (error) {}

    this.isSubmitting = false
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
                      {this.props.loginError && (
                        <Alert variant="error" style={{ marginBottom: 22 }}>
                          {this.props.loginError.message}
                        </Alert>
                      )}
                      <LoginForm onSubmit={this.onLogin.bind(this)} />
                    </TabPanel>
                    <TabPanel>
                      {this.props.registerError && (
                        <Alert variant="error" style={{ marginBottom: 22 }}>
                          {this.props.registerError.message}
                        </Alert>
                      )}
                      <RegisterForm onSubmit={this.onRegister.bind(this)} />
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
  loginError: getError('login')(state),
  loginFormValues: getFormValues('login')(state),
  registerError: getError('register')(state),
  registerFormValues: getFormValues('register')(state)
})

const mapDispatchToProps = dispatch => ({
  login: data => dispatch(AuthActions.login(data)),
  register: accountInfo => dispatch(UserActions.register(accountInfo))
})

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(destyle(Login, 'Login'))
)
