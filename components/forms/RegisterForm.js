/* @flow */
import { reduxForm, Field, getFormValues } from 'redux-form'
import { Grid, GridItem, Button } from 'brainblocks-components'
import ValidatedInput from '~/components/form/ValidatedInput'
import validatePassword from '~/utils/validatePassword'
import { validate as isEmail } from 'isemail'

export default reduxForm({
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
})(({ handleSubmit, onSubmit, isRegistering, submitting }) => (
  <form onSubmit={handleSubmit(onSubmit)} method="post">
    <Grid>
      <GridItem>
        <Field
          name="username"
          type="text"
          label="Username"
          placeholder="Username"
          component={ValidatedInput}
        />
      </GridItem>
      <GridItem>
        <Field
          name="email"
          type="email"
          label="Email"
          placeholder="Email"
          component={ValidatedInput}
        />
      </GridItem>
      <GridItem>
        <Field
          name="password"
          type="password"
          label="Password"
          placeholder="Password"
          component={ValidatedInput}
        />
      </GridItem>
      <GridItem>
        <Field
          name="retype"
          type="password"
          label="Retype Password"
          placeholder="Password"
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
          loading={submitting}
        >
          {isRegistering ? 'Registering...' : 'Register'}
        </Button>
      </GridItem>
    </Grid>
  </form>
))
