// @flow
import * as React from 'react'
import { Formik } from 'formik'
import Alert from 'brainblocks-components/build/Alert'
import Grid from 'brainblocks-components/build/Grid'
import GridItem from 'brainblocks-components/build/GridItem'
import FormItem from 'brainblocks-components/build/FormItem'
import FormField from 'brainblocks-components/build/FormField'
import Input from 'brainblocks-components/build/Input'
import Button from 'brainblocks-components/build/Button'
import { updatePassword } from '~/state/api/user'
import { getWallet, isPasswordCorrect } from '~/state/wallet'
import { testPassword } from '~/functions/password'
import { setPassword, hashPassword, destroyPassword } from '~/state/password'
import log from '~/functions/log'

type Props = {
  username: string,
  onCancel: () => void,
  enqueueSnackbar: (string, ?Object) => void
}

type State = {
  error: string
}

type Values = {
  oldPass: string,
  newPass: string,
  newPass2: string
}

type FormikOnSubmitObj = {
  setSubmitting: boolean => void
}

class ChangePassword extends React.Component<Props, State> {
  state = { error: '' }

  validate = ({ oldPass, newPass, newPass2 }: Values) => {
    const errors = {}

    try {
      if (!isPasswordCorrect(oldPass)) {
        errors['oldPass'] = 'Password is incorrect'
      }
    } catch (e) {
      errors['oldPass'] = 'Something is wrong. Try refreshing.'
    }

    if (!newPass) {
      errors['newPass'] = 'Please enter a password'
    } else {
      const strength = testPassword(newPass, this.props.username)
      if (strength.score < 3) {
        errors['newPass'] =
          strength.feedback.warning ||
          "That password is too weak. You're storing money!"
      }
    }

    if (!newPass2) {
      errors['newPass2'] = 'Please retype your password'
    } else if (newPass !== newPass2) {
      errors['newPass2'] = "Passwords don't match"
    }

    // Formik has no onChange but validate runs onChange
    this.setState({
      error: ''
    })

    return errors
  }

  handleSubmit = async (
    values: Values,
    { setSubmitting }: FormikOnSubmitObj
  ) => {
    const { oldPass, newPass } = values
    const username = this.props.username
    const wallet = getWallet()

    // Change the password in the wallet first
    try {
      wallet.changePass(oldPass, newPass)
    } catch (e) {
      return this.setState(
        {
          error: e
        },
        () => {
          setSubmitting(false)
        }
      )
    }

    // Prepare the request data
    const hex = wallet.pack()
    setPassword(oldPass)
    const hashedOldPassword = hashPassword(username)
    setPassword(newPass)
    const hashedNewPassword = hashPassword(username)
    destroyPassword()

    // Make the request
    try {
      await updatePassword(hashedOldPassword, hashedNewPassword, hex)
    } catch (e) {
      log.error(e)
      return this.setState(
        {
          error: e.response.error
        },
        () => {
          // revert the wallet password
          wallet.changePass(newPass, oldPass)
          setSubmitting(false)
        }
      )
    }

    // Finish
    setSubmitting(false)
    this.props.enqueueSnackbar('Password changed successfully', {
      variant: 'success'
    })
    this.props.onCancel()
  }

  handleCancel = (e: SyntheticMouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    this.props.onCancel()
  }

  render() {
    const { error } = this.state
    return (
      <Formik
        initialValues={{
          oldPass: '',
          newPass: '',
          newPass2: ''
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
        }) => {
          const passStrength = testPassword(values.newPass, this.props.username)
          return (
            <form onSubmit={handleSubmit} method="post">
              <Grid gutter={18}>
                <GridItem>
                  <FormItem
                    fieldId="oldPass"
                    label="Your current password"
                    error={errors.oldPass && touched.oldPass && errors.oldPass}
                  >
                    <FormField valid={touched.oldPass && !errors.oldPass}>
                      <Input
                        type="password"
                        id="oldPass"
                        name="oldPass"
                        placeholder="password"
                        value={values.oldPass}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                    </FormField>
                  </FormItem>
                </GridItem>
                <GridItem>
                  <FormItem
                    fieldId="newPass"
                    label="Your new password"
                    error={errors.newPass && touched.newPass && errors.newPass}
                    description={
                      !!values.newPass && (
                        <p>
                          It would take{' '}
                          <strong>
                            <em>
                              {
                                passStrength.crack_times_display
                                  .offline_slow_hashing_1e4_per_second
                              }
                            </em>
                          </strong>{' '}
                          for a computer to guess your password.
                        </p>
                      )
                    }
                  >
                    <FormField valid={touched.newPass && !errors.newPass}>
                      <Input
                        type="password"
                        id="newPass"
                        name="newPass"
                        placeholder="password"
                        value={values.newPass}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                    </FormField>
                  </FormItem>
                </GridItem>
                <GridItem>
                  <FormItem
                    fieldId="newPass2"
                    label="Confirm new password"
                    error={
                      errors.newPass2 && touched.newPass2 && errors.newPass2
                    }
                  >
                    <FormField valid={touched.newPass2 && !errors.newPass2}>
                      <Input
                        type="password"
                        id="newPass2"
                        name="newPass2"
                        placeholder="password"
                        value={values.newPass2}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                    </FormField>
                  </FormItem>
                </GridItem>
                {!!error && (
                  <GridItem>
                    <Alert variant="error">{error}</Alert>
                  </GridItem>
                )}
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
          )
        }}
      </Formik>
    )
  }
}

export default ChangePassword
