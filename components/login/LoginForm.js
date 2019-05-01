/* @flow */
import React from 'react'
import {
  Grid,
  GridItem,
  Button,
  FormItem,
  FormField,
  Input
} from 'brainblocks-components'
import { Formik } from 'formik'

type Props = {
  submitting: boolean,
  onSubmit: (
    username: string,
    password: string,
    mfaCode?: string
  ) => Promise<void>,
  show2fa: boolean
}

class LoginForm extends React.Component<Props> {
  validate = values => {
    let errors = {}

    if (!values.username) {
      errors['username'] = 'Please enter a username'
    }

    if (!values.password) {
      errors['password'] = 'Please enter a password'
    }

    return errors
  }

  handleSubmit = async values => {
    this.props.onSubmit(values.username, values.password, values.mfaCode)
  }

  render() {
    const { submitting, show2fa } = this.props
    return (
      <Formik
        initialValues={{
          username: '',
          password: '',
          mfaCode: ''
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
              {show2fa ? (
                <GridItem>
                  <FormItem
                    label="Two Factor Authentication"
                    fieldId="mfaCode"
                    description="Enter the code from your 2FA app"
                    error={errors.mfaCode && touched.mfaCode && errors.mfaCode}
                  >
                    <FormField valid={touched.mfaCode && !errors.mfaCode}>
                      <Input
                        id="mfaCode"
                        name="mfaCode"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.mfaCode}
                        placeholder="2FA Code"
                      />
                    </FormField>
                  </FormItem>
                </GridItem>
              ) : (
                <>
                  <GridItem>
                    <FormItem
                      label="Username"
                      fieldId="username"
                      error={
                        errors.username && touched.username && errors.username
                      }
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
                      label="Password"
                      fieldId="password"
                      error={
                        errors.password && touched.password && errors.password
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
                </>
              )}
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
        )}
      </Formik>
    )
  }
}

export default LoginForm
