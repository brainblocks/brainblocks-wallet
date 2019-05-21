// @flow
import * as React from 'react'
import { Formik } from 'formik'
import Grid from 'brainblocks-components/build/Grid'
import GridItem from 'brainblocks-components/build/GridItem'
import FormItem from 'brainblocks-components/build/FormItem'
import FormField from 'brainblocks-components/build/FormField'
import Input from 'brainblocks-components/build/Input'
import Button from 'brainblocks-components/build/Button'
import * as UserAPI from '~/state/api/user'
import { testPassword } from '~/functions/password'

type Props = {
  username: string,
  onCancel: () => void,
  onUpdateUser: Object => mixed
}

type Values = {
  oldPass: string,
  newPass: string,
  newPass2: string
}

type FormikOnSubmitObj = {
  setSubmitting: boolean => void
}

class ChangePassword extends React.Component<Props> {
  validate = ({ oldPass, newPass, newPass2 }: Values) => {
    const errors = {}

    if (!newPass) {
      errors['password'] = 'Please enter a password'
    } else {
      const strength = testPassword(newPass, this.props.username)
      if (strength.score < 3) {
        errors['password'] =
          strength.feedback.warning ||
          "That password is too weak. You're storing money!"
      }
    }

    if (!newPass2) {
      errors['retype'] = 'Please retype your password'
    } else if (newPass !== newPass2) {
      errors['retype'] = "Passwords don't match"
    }

    return errors
  }

  handleSubmit = (values: Values, { setSubmitting }: FormikOnSubmitObj) => {}

  handleCancel = (e: SyntheticMouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    this.props.onCancel()
  }

  render() {
    return (
      <Formik
        initialValues={{
          oldPass: '',
          newPass: '',
          newPass2: ''
        }}
        onSubmit={this.handleSubmit}
      >
        {({ values, handleChange, handleSubmit, isSubmitting }) => (
          <form onSubmit={handleSubmit} method="post">
            <Grid gutter={18}>
              <GridItem>
                <FormItem fieldId="oldPass" label="Your current password">
                  <FormField>
                    <Input
                      id="oldPass"
                      name="oldPass"
                      placeholder="password"
                      value={values.oldPass}
                      onChange={handleChange}
                    />
                  </FormField>
                </FormItem>
              </GridItem>
              <GridItem>
                <FormItem fieldId="newPass" label="Your new password">
                  <FormField>
                    <Input
                      id="newPass"
                      name="newPass"
                      placeholder="password"
                      value={values.newPass}
                      onChange={handleChange}
                    />
                  </FormField>
                </FormItem>
              </GridItem>
              <GridItem>
                <FormItem fieldId="newPass2" label="Confirm new password">
                  <FormField>
                    <Input
                      id="newPass2"
                      name="newPass2"
                      placeholder="password"
                      value={values.newPass2}
                      onChange={handleChange}
                    />
                  </FormField>
                </FormItem>
              </GridItem>
              <GridItem>
                <Button type="submit" loading={isSubmitting}>
                  Change Password
                </Button>
                <a
                  style={{ marginLeft: 12 }}
                  href="#"
                  onClick={this.handleCancel}
                >
                  Cancel
                </a>
              </GridItem>
            </Grid>
          </form>
        )}
      </Formik>
    )
  }
}

export default ChangePassword
