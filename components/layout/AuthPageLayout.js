import React from 'react'
import { destyle } from 'destyle'
import { connect } from 'react-redux'
import { getCurrentAuth } from '~/state/selectors/authSelectors'
import * as Auth from '~/state/actions/authActions'
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

class AuthPageLayout extends React.Component<Props, State> {
  state
  recaptcha
  isLoggingIn

  constructor(props) {
    super()
    this.isLoggingIn = false
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
    if (this.isLoggingIn) {
      return
    }

    this.isLoggingIn = true

    try {
      console.log('HERE')
      console.log('HERE')
      console.log('HERE')

      const recaptcha = await this.recaptcha.execute()
      const { username, password } = this.props.loginFormValues || {}

      this.props.login({ username, password, recaptcha })
    } catch (error) {
      console.error(error)
    }

    this.isLoggingIn = false
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
                <TabPanel>Register</TabPanel>
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
  loginFormValues: getFormValues('login')(state)
})

const mapDispatchToProps = dispatch => ({
  login: (username, password, twoFactorAuthToken) =>
    dispatch(Auth.login(username, password, twoFactorAuthToken))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(destyle(AuthPageLayout, 'AuthPageLayout'))
