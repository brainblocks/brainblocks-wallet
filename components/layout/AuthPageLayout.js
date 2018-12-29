import React from 'react'
import { destyle } from 'destyle'
import { connect } from 'react-redux'
import { getCurrentAuth } from '~/state/selectors/authSelectors'
import * as AuthActions from '~/state/actions/authActions'
import * as UserActions from '~/state/actions/userActions'
import Router from 'next/router'
import { getError } from '~/state/selectors/errorSelectors'
import RoundedHexagon from '~/static/svg/rounded-hexagon.svg'
import RoundedHexagonPurple from '~/static/svg/rounded-hexagon-purple.svg'
import TabsComponents from '~/bb-components/tabs/Tabs'
import SwitchTabs from '~/bb-components/switch-tabs/SwitchTabs'
import { reduxForm, Field, getFormValues } from 'redux-form'
import Grid from '~/bb-components/grid/Grid'
import GridItem from '~/bb-components/grid/GridItem'
import Button from '~/bb-components/button/Button'
import Recaptcha from '~/components/auth/Recaptcha'
import Notice, { ERROR_TYPE } from '~/components/alerts/Notice'
import ValidatedInput from '~/components/form/ValidatedInput'
import validatePassword from '~/utils/validatePassword'
import { validate as isEmail } from 'isemail'

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

const LoginForm = reduxForm({
  form: 'login',
  shouldAsyncValidate: () => true,
  initialValues: {
    username: 'mochatest_login',
    password: 'mochatestpassword'
  },
  validate: ({ username, password }) => {
    const errors = {}

    if (!username) {
      errors['username'] = 'Please enter a username'
    }

    if (!password) {
      errors['password'] = 'Please enter a password'
    }

    return errors
  }
})(({ handleSubmit, onSubmit }) => (
  <form onSubmit={handleSubmit(onSubmit)}>
    <Grid>
      <GridItem>
        <Field
          name="username"
          type="text"
          label="Username"
          component={ValidatedInput}
        />
      </GridItem>
      <GridItem>
        <Field
          name="password"
          type="password"
          label="Password"
          component={ValidatedInput}
        />
      </GridItem>
      <GridItem>
        <Button block variant="primary" color="green" type="submit">
          Login
        </Button>
      </GridItem>
    </Grid>
  </form>
))

const RegisterForm = reduxForm({
  form: 'register',
  validate: ({ username, email, password, retype }) => {
    const errors = {}

    if (!username) {
      errors['username'] = 'Please enter a username'
    }

    if (!email) {
      errors['email'] = 'Please enter an email'
    } else if (!isEmail(email)) {
      errors['email'] = 'Please enter a valid email'
    }

    const passwordValidation = validatePassword(password)
    if (passwordValidation) {
      errors['password'] = passwordValidation
    }

    if (!retype) {
      errors['retype'] = 'Please retype your password'
    } else if (password !== retype) {
      errors['retype'] = "Passwords don't match"
    }

    return errors
  }
})(({ handleSubmit, onSubmit, isRegistering }) => (
  <form onSubmit={handleSubmit(onSubmit)}>
    <Grid>
      <GridItem>
        <Field
          name="username"
          type="text"
          label="Username"
          component={ValidatedInput}
        />
      </GridItem>
      <GridItem>
        <Field
          name="email"
          type="email"
          label="Email"
          component={ValidatedInput}
        />
      </GridItem>
      <GridItem>
        <Field
          name="password"
          type="password"
          label="Password"
          component={ValidatedInput}
        />
      </GridItem>
      <GridItem>
        <Field
          name="retype"
          type="password"
          label="Retype Password"
          component={ValidatedInput}
        />
      </GridItem>
      <GridItem>
        <Button
          block
          variant="primary"
          color="green"
          type="submit"
          disabled={isRegistering}
        >
          {isRegistering ? 'Registering...' : 'Register'}
        </Button>
      </GridItem>
    </Grid>
  </form>
))

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
    console.log('Triggered', this.isSubmitting)
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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(destyle(AuthPageLayout, 'AuthPageLayout'))
