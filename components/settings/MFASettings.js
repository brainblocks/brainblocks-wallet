// @flow
import * as React from 'react'
import { Formik } from 'formik'
import {
  Alert,
  FormItem,
  FormField,
  Input,
  Grid,
  GridItem,
  Button,
  Typography,
  Checkbox,
  withSnackbar
} from 'brainblocks-components'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import * as UserAPI from '~/state/api/user'
import QRCode from 'qrcode.react'

type Props = {
  enabled: boolean,
  onUpdateUser: Object => mixed,
  enqueueSnackbar: (string, Object) => void
}

type State = {
  mfaKey: string,
  mfaURI: string,
  mfaError: string,
  mfaLoading: boolean,
  isDisabling: boolean
}

class MFASettings extends React.Component<Props, State> {
  state = {
    mfaKey: '',
    mfaURI: '',
    mfaError: '',
    mfaLoading: false,
    isDisabling: false
  }

  handleShowDisableForm = () => {
    this.setState({
      isDisabling: true
    })
  }

  handleCopy2faKey = () => {
    this.props.enqueueSnackbar('Key copied to clipboard', {
      variant: 'info'
    })
  }

  handleSet2fa = () => {
    this.setState(
      {
        mfaLoading: true
      },
      async () => {
        try {
          const { key, uri } = await UserAPI.set2fa()
          this.setState({
            mfaKey: key,
            mfaURI: uri,
            mfaLoading: false
          })
        } catch (e) {
          console.error('2fa error', e)
          this.setState({
            mfaError: 'Sorry, something went wrong',
            mfaLoading: false
          })
        }
      }
    )
  }

  handleConfirm2fa = async (values, { setSubmitting }) => {
    try {
      const { status } = await UserAPI.confirm2fa(values.mfaCode)
      if (status !== 'success') throw 'Error confirming 2fa'
      await this.props.onUpdateUser({ is2FAEnabled: true })
      setSubmitting(false)
      this.setState({
        mfaKey: '',
        mfaURI: '',
        mfaError: ''
      })
    } catch (e) {
      console.error('2fa confirmation error', e)
      setSubmitting(false)
      this.setState({
        mfaError: 'Invalid 2fa code'
      })
    }
  }

  handleDisable2fa = async (values, { setSubmitting }) => {
    try {
      const { status } = await UserAPI.disable2fa(values.mfaCode)
      if (status !== 'success') throw 'Error disabling 2fa'
      await this.props.onUpdateUser({ is2FAEnabled: false })
      setSubmitting(false)
      this.setState({
        isDisabling: false,
        mfaError: ''
      })
    } catch (e) {
      console.error('2fa confirmation error', e)
      setSubmitting(false)
      this.setState({
        mfaError: 'Invalid 2fa code'
      })
    }
  }

  render() {
    const { enabled, ...rest }: Props = this.props
    const {
      mfaError,
      mfaKey,
      mfaURI,
      mfaLoading,
      mfaCode,
      mfaBackedUp,
      isDisabling
    } = this.state
    return (
      <div>
        {enabled ? (
          <>
            {isDisabling ? (
              <Formik
                initialValues={{
                  mfaCode: ''
                }}
                onSubmit={this.handleDisable2fa}
              >
                {({ values, handleChange, handleSubmit, isSubmitting }) => (
                  <form onSubmit={handleSubmit} method="post">
                    <Grid>
                      <GridItem>
                        <FormItem
                          fieldId="mfaCode"
                          label="Enter 2FA code to confirm"
                        >
                          <FormField>
                            <Input
                              id="mfaCode"
                              name="mfaCode"
                              placeholder="2FA Code"
                              value={values.mfaCode}
                              onChange={handleChange}
                            />
                          </FormField>
                        </FormItem>
                      </GridItem>
                      {!!mfaError && (
                        <GridItem>
                          <Alert variant="error">{mfaError}</Alert>
                        </GridItem>
                      )}
                      <GridItem>
                        <Button
                          color="red"
                          type="submit"
                          loading={isSubmitting}
                        >
                          Disable 2FA
                        </Button>
                      </GridItem>
                    </Grid>
                  </form>
                )}
              </Formik>
            ) : (
              <Button color="red" onClick={this.handleShowDisableForm}>
                Disable 2FA
              </Button>
            )}
          </>
        ) : (
          <>
            {mfaKey ? (
              <Formik
                initialValues={{
                  mfaCode: '',
                  mfaBackedUp: false
                }}
                onSubmit={this.handleConfirm2fa}
              >
                {({ values, handleChange, handleSubmit, isSubmitting }) => (
                  <form onSubmit={handleSubmit} method="post">
                    <Grid>
                      <GridItem>
                        <FormItem label="Scan with your 2FA app">
                          <FormField>
                            <div
                              className="formItemPadding"
                              style={{ textAlign: 'center' }}
                            >
                              <QRCode value={mfaURI} size={150} />
                            </div>
                          </FormField>
                        </FormItem>
                      </GridItem>
                      <GridItem>
                        <FormItem label="Or enter your key manually">
                          <FormField
                            adornEnd={
                              <CopyToClipboard
                                text={mfaKey}
                                onCopy={this.handleCopy2faKey}
                              >
                                <Button type="button" variant="util">
                                  Copy
                                </Button>
                              </CopyToClipboard>
                            }
                          >
                            <Input readOnly value={mfaKey} />
                          </FormField>
                        </FormItem>
                      </GridItem>
                      <GridItem>
                        <FormItem
                          fieldId="mfaCode"
                          label="Enter the 2FA code from your app to confirm"
                        >
                          <FormField>
                            <Input
                              id="mfaCode"
                              name="mfaCode"
                              placeholder="2FA Code"
                              value={values.mfaCode}
                              onChange={handleChange}
                            />
                          </FormField>
                        </FormItem>
                      </GridItem>
                      <GridItem>
                        <Checkbox
                          checked={values.mfaBackedUp}
                          name="mfaBackedUp"
                          onChange={handleChange}
                          label="I've backed-up my key somewhere other than my phone"
                        />
                      </GridItem>
                      <GridItem>
                        <Button
                          type="submit"
                          loading={isSubmitting}
                          disabled={!values.mfaBackedUp}
                        >
                          Confirm
                        </Button>
                      </GridItem>
                    </Grid>
                  </form>
                )}
              </Formik>
            ) : (
              <Button onClick={this.handleSet2fa} loading={mfaLoading}>
                Enable 2FA
              </Button>
            )}
            {!!mfaError && (
              <Alert variant="error" style={{ marginBottom: 12 }}>
                {mfaError}
              </Alert>
            )}
          </>
        )}
      </div>
    )
  }
}

export default MFASettings
