/* @flow */
import * as React from 'react'
import { Media } from 'react-breakpoints'
import { connect } from 'react-redux'
import { destyle } from 'destyle'
import { getFormValues } from 'redux-form'
import { Alert, SwitchTabs, TabComponents } from 'brainblocks-components'
import LoginForm from '~/components/forms/LoginForm'
import Recaptcha from '~/components/auth/Recaptcha'
import RegisterForm from '~/components/forms/RegisterForm'
import RoundedHexagon from '~/static/svg/rounded-hexagon.svg'
import RoundedHexagonPurple from '~/static/svg/rounded-hexagon-purple.svg'
import { withRouter } from 'next/router'
import { setPassword } from '~/state/password'
import { getKeyByValue } from '~/functions/util'
import { creators as authActions } from '~/state/actions/authActions'
import * as AuthAPI from '~/state/api/auth'
import * as UserAPI from '~/state/api/user'
import { deduceError } from '~/state/errors'
import { createWallet, wallet } from '~/state/wallet'
import { createVault } from '~/state/api/vault'
import { creators as vaultActions } from '~/state/actions/vaultActions'

const { Tab, TabList, TabPanel } = TabComponents

const tabIndexMap = {
  login: 0,
  register: 1
}

type Props = {
  auth: Object,
  router: Object,
  eyebrow?: string,
  title?: string,
  description?: string,
  /** Given by destyle. Do not pass this to the component as a prop. */
  styles: Object,
  children: React.Node,
  loginFormValues: Object,
  registerFormValues: Object,
  updateAuth: Object => mixed,
  updateVault: Object => Promise<Object>
}

type State = {
  activeTab: number,
  loginError?: Object,
  registrationError?: Object,
  isSubmitting: boolean
}

class LoginRegister extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.recaptcha = null
    this.state = {
      isSubmitting: false,
      activeTab: tabIndexMap[props.router.query.tab] || 0,
      loginError: undefined,
      registrationError: undefined
    }
  }

  set isSubmitting(value) {
    this.state.isSubmitting = value
    this.forceUpdate()
  }

  handleLogin = async event => {
    if (this.state.isSubmitting) return

    // synchronous to avoid double-submitting
    this.isSubmitting = true

    try {
      const recaptcha = await this.recaptcha.execute()
      const { username, password } = this.props.loginFormValues || {}

      const authData = await AuthAPI.login(username, password, recaptcha)

      setPassword(password)
      this.props.updateAuth(authData)
    } catch (error) {
      this.setState({ loginError: deduceError(error) })
    }

    this.setState({ isSubmitting: false })
  }

  handleRegister = async event => {
    if (this.state.isSubmitting) return

    // synchronous to avoid double-submitting
    this.isSubmitting = true

    const { username, email, password } = this.props.registerFormValues || {}

    // Register an account
    try {
      const recaptcha = await this.recaptcha.execute()

      const authData = await UserAPI.register({
        username,
        email,
        password,
        recaptcha
      })

      this.props.updateAuth({ ...authData, isRegistering: true })
    } catch (error) {
      this.setState({
        registrationError: deduceError(error),
        isSubmitting: false
      })
      return
    }
    /*
    // Create a vault
    createWallet(password)
    wallet.createWallet()
    const accounts = wallet.getAccounts()
    wallet.setLabel(accounts[0].account, 'Default Vault')
    const hex = wallet.pack()

    // Save the vault to the server
    let vault
    try {
      vault = await createVault(hex)
    } catch (e) {
      this.setState({
        registrationError: 'Could not create a new vault',
        isSubmitting: false
      })
      return
    }

    // Save the server-returned vault to redux
    this.props.updateVault(vault)

    // Let the client bootstrap deal with adding the accounts to redux

    this.props.updateAuth({ isRegistering: false })
    this.setState({ isSubmitting: false })
*/
  }

  handleSwitchTabs = (index: number, lastIndex: number, event: Event) => {
    this.setState(
      {
        activeTab: index
      },
      () => {
        this.props.router.push({
          pathname: '/login',
          search: `?tab=${getKeyByValue(tabIndexMap, index)}`
        })
      }
    )
  }

  render() {
    const { styles } = this.props
    const { isSubmitting } = this.state

    return (
      <div className={styles.root}>
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
                      onSubmit={this.handleLogin}
                      submitting={isSubmitting}
                    />
                  </TabPanel>
                  <TabPanel>
                    {this.state.registrationError && (
                      <Alert variant="error" style={{ marginBottom: 22 }}>
                        {this.state.registrationError.message}
                      </Alert>
                    )}
                    <RegisterForm
                      onSubmit={this.handleRegister}
                      submitting={isSubmitting}
                    />
                  </TabPanel>
                </div>
              </SwitchTabs>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  loginFormValues: getFormValues('login')(state),
  registerFormValues: getFormValues('register')(state)
})

const mapDispatchToProps = dispatch => ({
  updateAuth: payload => dispatch(authActions.update(payload)),
  updateVault: payload => dispatch(vaultActions.updateVault(payload))
})

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(destyle(LoginRegister, 'Login'))
)
