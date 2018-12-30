import React from 'react'
import { destyle } from 'destyle'
import { connect } from 'react-redux'
import * as AuthActions from '~/state/actions/authActions'
import * as UserActions from '~/state/actions/userActions'
import { getError } from '~/state/selectors/errorSelectors'
import RoundedHexagon from '~/static/svg/rounded-hexagon.svg'
import RoundedHexagonPurple from '~/static/svg/rounded-hexagon-purple.svg'
import TabsComponents from '~/bb-components/tabs/Tabs'
import SwitchTabs from '~/bb-components/switch-tabs/SwitchTabs'
import Recaptcha from '~/components/auth/Recaptcha'
import Notice, { ERROR_TYPE } from '~/components/alerts/Notice'
import { getFormValues } from 'redux-form'
import LoginForm from '~/components/forms/LoginForm'
import RegisterForm from '~/components/forms/RegisterForm'

const { Tab, TabList, TabPanel } = TabsComponents

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

class AuthPageLayout extends React.Component<Props, State> {
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
    const {
      eyebrow,
      title,
      description,
      styles,
      children,
      ...rest
    } = this.props
    const { activeTab } = this.state

    return (
      <div className={styles.root}>
        <Recaptcha ref={elm => (this.recaptcha = elm)} />
        <div className={styles.content}>
          {!!eyebrow && <p className={styles.eyebrow}>{eyebrow}</p>}
          {!!title && <h1 className={styles.title}>{title}</h1>}
          {!!description && <p className={styles.description}>{description}</p>}
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
              selectedIndex={activeTab}
              onSelect={this.handleSwitchTabs}
            >
              <TabList>
                <Tab>Login</Tab>
                <Tab>Register</Tab>
              </TabList>

              <div className={styles.tabPanels}>
                <TabPanel>
                  {this.props.loginError && (
                    <Notice type={ERROR_TYPE}>
                      {this.props.loginError.message}
                    </Notice>
                  )}
                  <LoginForm onSubmit={this.onLogin.bind(this)} />
                </TabPanel>
                <TabPanel>
                  {this.props.registerError && (
                    <Notice type={ERROR_TYPE}>
                      {this.props.registerError.message}
                    </Notice>
                  )}
                  <RegisterForm onSubmit={this.onRegister.bind(this)} />
                </TabPanel>
              </div>
            </SwitchTabs>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  loginError: getError('login')(state),
  loginFormValues: getFormValues('login')(state),
  registerError: getError('register')(state),
  registerFormValues: getFormValues('register')(state)
})

const mapDispatchToProps = dispatch => ({
  login: data => dispatch(AuthActions.login(data)),
  register: accountInfo => dispatch(UserActions.register(accountInfo))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(destyle(AuthPageLayout, 'AuthPageLayout'))
