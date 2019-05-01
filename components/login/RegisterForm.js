/* @flow */
import {
  Grid,
  GridItem,
  Button,
  FormItem,
  FormField,
  Input
} from 'brainblocks-components'
import { validate as isEmail } from 'isemail'
import { Formik } from 'formik'
import zxcvbn from 'zxcvbn'

const testPassword = (password, username) => {
  return zxcvbn(password, [username, 'brainblocks'])
}

class RegisterForm extends React.Component {
  validate = ({ username, email, password, retype }) => {
    const errors = {}

    if (!username) {
      errors['username'] = 'Please enter a username'
    }

    if (!email) {
      errors['email'] = 'Please enter an email'
    } else if (!isEmail(email)) {
      errors['email'] = 'Please enter a valid email'
    }

    if (!password) {
      errors['password'] = 'Please enter a password'
    } else {
      const strength = testPassword(password, username)
      if (strength.score < 3) {
        errors['password'] =
          strength.feedback.warning ||
          "That password is too weak. You're storing money!"
      }
    }

    if (!retype) {
      errors['retype'] = 'Please retype your password'
    } else if (password !== retype) {
      errors['retype'] = "Passwords don't match"
    }

    return errors
  }

  handleSubmit = async ({ username, email, password }) => {
    this.props.onSubmit(username, email, password)
  }

  render() {
    const { submitting } = this.props
    return (
      <Formik
        initialValues={{
          username: '',
          email: '',
          password: '',
          retype: ''
        }}
        validate={this.validate}
        onSubmit={this.handleSubmit}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting
        }) => (
          <form onSubmit={handleSubmit} method="post">
            <Grid>
              <GridItem>
                <FormItem
                  label="Username"
                  fieldId="username"
                  error={errors.username && touched.username && errors.username}
                >
                  <FormField valid={touched.username && !errors.username}>
                    <Input
                      id="username"
                      name="username"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.username}
                      placeholder="Username"
                    />
                  </FormField>
                </FormItem>
              </GridItem>
              <GridItem>
                <FormItem
                  label="Email"
                  fieldId="email"
                  error={errors.email && touched.email && errors.email}
                >
                  <FormField valid={touched.email && !errors.email}>
                    <Input
                      id="email"
                      type="email"
                      name="email"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.email}
                      placeholder="Email"
                    />
                  </FormField>
                </FormItem>
              </GridItem>
              <GridItem>
                <FormItem
                  label="Password"
                  fieldId="password"
                  error={errors.password && touched.password && errors.password}
                  description={
                    !!values.password &&
                    testPassword(
                      values.password,
                      values.username
                    ).feedback.suggestions.map(suggestion => (
                      <div>{suggestion}</div>
                    ))
                  }
                >
                  <FormField valid={touched.password && !errors.password}>
                    <Input
                      type="password"
                      id="password"
                      name="password"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.password}
                      placeholder="Password"
                    />
                  </FormField>
                </FormItem>
              </GridItem>
              <GridItem>
                <FormItem
                  label="Retype Password"
                  fieldId="retype"
                  error={errors.retype && touched.retype && errors.retype}
                >
                  <FormField valid={touched.retype && !errors.retype}>
                    <Input
                      type="password"
                      id="retype"
                      name="retype"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.retype}
                      placeholder="Password"
                    />
                  </FormField>
                </FormItem>
              </GridItem>
              <GridItem>
                <Button
                  block
                  variant="primary"
                  color="green"
                  type="submit"
                  loading={submitting}
                >
                  Register
                </Button>
              </GridItem>
            </Grid>
          </form>
        )}
      </Formik>
    )
  }
}

export default RegisterForm
