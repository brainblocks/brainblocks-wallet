/* @flow */
import * as React from 'react'
import { connect } from 'react-redux'
import dynamic from 'next/dynamic'
import { destyle } from 'destyle'
import Alert from 'brainblocks-components/build/Alert'
import SwitchTabs from 'brainblocks-components/build/SwitchTabs'
import TabComponents from 'brainblocks-components/build/Tabs'
import Spinner from 'brainblocks-components/build/Spinner'
import LoginForm from '~/components/login/LoginForm'
import Recaptcha from '~/components/auth/Recaptcha'
import RoundedHexagon from '~/static/svg/rounded-hexagon.svg'
import RoundedHexagonPurple from '~/static/svg/rounded-hexagon-purple.svg'
import { withRouter } from 'next/router'
import { setPassword, hashPassword } from '~/state/password'
import { getKeyByValue } from '~/functions/util'
import { creators as authActions } from '~/state/actions/authActions'
import * as AuthAPI from '~/state/api/auth'
import * as UserAPI from '~/state/api/user'
import { deduceError } from '~/state/errors'
import { creators as vaultActions } from '~/state/actions/vaultActions'

const { Tab, TabList, TabPanel } = TabComponents

const tabIndexMap = {
  login: 0,
  register: 1
}

// RegisterForm contains zxcvbn which we want to avoid loading if possible
const LazyRegisterForm = dynamic(
  () => import('~/components/login/RegisterForm'),
  {
    ssr: true,
    // eslint-disable-next-line react/display-name
    loading: () => (
      <div style={{ margin: '50px auto' }}>
        <Spinner />
      </div>
    )
  }
)

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
  isSubmitting: boolean,
  mfaRequired: boolean
}

class LoginRegister extends React.Component<Props, State> {
  recaptcha: ?Object

  constructor(props: Props) {
    super(props)
    this.recaptcha = null
    this.state = {
      isSubmitting: false,
      // XSS-safe
      activeTab: tabIndexMap.hasOwnProperty(this.props.router.query.tab)
        ? tabIndexMap[this.props.router.query.tab]
        : 0,
      loginError: undefined,
      registrationError: undefined,
      mfaRequired: false
    }
  }

  set isSubmitting(value) {
    // eslint-disable-next-line react/no-direct-mutation-state
    this.state.isSubmitting = value
    this.forceUpdate()
  }

  handleLogin = (username, password, mfaCode) => {
    if (this.state.isSubmitting) return

    // synchronous to avoid double-submitting
    this.isSubmitting = true

    this.setState(
      {
        loginError: undefined
      },
      async () => {
        try {
          setPassword(password)
          const hashedPassword = hashPassword(username)

          // $FlowFixMe
          const recaptcha = await this.recaptcha.execute()
          const authData = await AuthAPI.login(
            username,
            hashedPassword,
            recaptcha,
            mfaCode
          )

          this.props.updateAuth(authData)
          this.setState({ isSubmitting: false })
        } catch (error) {
          // check if it's because we need 2fa
          if (
            error.response.data.hasOwnProperty('reason') &&
            error.response.data.reason === '2FA_REQUIRED'
          ) {
            this.setState({
              mfaRequired: true,
              loginError: undefined,
              isSubmitting: false
            })
          } else {
            this.setState({
              loginError: deduceError(error),
              isSubmitting: false
            })
          }
        }
      }
    )
  }

  handleRegister = (username, email, password) => {
    if (this.state.isSubmitting) return

    // synchronous to avoid double-submitting
    this.isSubmitting = true

    // Register an account
    this.setState(
      {
        registrationError: undefined
      },
      async () => {
        try {
          setPassword(password)
          const hashedPassword = hashPassword(username)

          // $FlowFixMe
          const recaptcha = await this.recaptcha.execute()
          const authData = await UserAPI.register({
            username,
            email,
            password: hashedPassword,
            recaptcha
          })

          this.props.updateAuth({ ...authData, isRegistering: true })
          this.setState({ isSubmitting: false })
        } catch (error) {
          this.setState({
            registrationError: deduceError(error),
            isSubmitting: false
          })
          return
        }
      }
    )
  }

  handleSwitchTabs = (index: number, lastIndex: number, event: Event) => {
    const tab = getKeyByValue(tabIndexMap, index)
    this.setState(
      {
        activeTab: index
      },
      () => {
        this.props.router.push({
          pathname: '/login',
          search: tab ? `?tab=${tab}` : ''
        })
      }
    )
  }

  render() {
    const { styles } = this.props
    const { isSubmitting, mfaRequired } = this.state

    return (
      <div className={styles.root}>
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
                    {this.state.loginError && (
                      <Alert variant="error" style={{ marginBottom: 22 }}>
                        {this.state.loginError.message}
                      </Alert>
                    )}
                    <LoginForm
                      onSubmit={this.handleLogin}
                      submitting={isSubmitting}
                      show2fa={mfaRequired}
                    />
                  </TabPanel>
                  <TabPanel>
                    {this.state.registrationError && (
                      <Alert variant="error" style={{ marginBottom: 22 }}>
                        {this.state.registrationError.message}
                      </Alert>
                    )}
                    <LazyRegisterForm
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

const mapStateToProps = state => ({})

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
