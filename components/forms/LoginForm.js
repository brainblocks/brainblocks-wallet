/* @flow */
import React from 'react'
import { reduxForm, Field } from 'redux-form'
import { Grid, GridItem, Button } from 'brainblocks-components'
import ValidatedInput from '~/components/form/ValidatedInput'
import validatePassword from '~/utils/validatePassword'
import { validate as isEmail } from 'isemail'

export default reduxForm({
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
})(({ handleSubmit, onSubmit, submitting }) => (
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
        <Button
          block
          variant="primary"
          color="green"
          type="submit"
          loading={submitting}
        >
          Login
        </Button>
      </GridItem>
    </Grid>
  </form>
))
