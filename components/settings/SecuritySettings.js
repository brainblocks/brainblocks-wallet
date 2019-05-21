// @flow
import * as React from 'react'
import dynamic from 'next/dynamic'
import { destyle } from 'destyle'
import Grid from 'brainblocks-components/build/Grid'
import GridItem from 'brainblocks-components/build/GridItem'
import Button from 'brainblocks-components/build/Button'
import Typography from 'brainblocks-components/build/Typography'
import Spinner from 'brainblocks-components/build/Spinner'
//import Checkbox from 'brainblocks-components/build/Checkbox'
import { withSnackbar } from 'brainblocks-components/build/Snackbar'
import MFASettings from '~/components/settings/MFASettings'
import SaveSeed from '~/components/settings/SaveSeed'

// ChangePassword contains zxcvbn which we want to avoid loading if possible
const LazyChangePassword = dynamic(
  () => import('~/components/settings/ChangePassword'),
  {
    ssr: false,
    // eslint-disable-next-line react/display-name
    loading: () => (
      <div style={{ margin: '50px auto' }}>
        <Spinner />
      </div>
    )
  }
)

type Props = {
  user: Object,
  enqueueSnackbar: (string, Object) => void,
  onUpdateUser: () => mixed,
  /** Given by destyle. Do not pass this to the component as a prop. */
  styles: Object
}

type State = {
  isUpdatingPassword: boolean,
  isSeedFormActive: boolean
}

class SecuritySettings extends React.Component<Props, State> {
  state = {
    isUpdatingPassword: false,
    isSeedFormActive: false
  }

  handleToggleSeedForm = () => {
    this.setState(prevState => ({
      isSeedFormActive: !prevState.isSeedFormActive
    }))
  }

  handleTogglePasswordForm = () => {
    this.setState(prevState => ({
      isUpdatingPassword: !prevState.isUpdatingPassword
    }))
  }

  render() {
    const { styles, user, onUpdateUser, enqueueSnackbar }: Props = this.props
    const { isUpdatingPassword, isSeedFormActive } = this.state
    return (
      <div className={styles.root}>
        <Grid>
          <GridItem>
            <div className={styles.textWrap}>
              <Typography el="h3" spaceAbove={0} spaceBelow={1}>
                Change your password
              </Typography>
              <Typography el="p" spaceBelow={1.66}>
                Computers can quickly test millions of passwords when trying to
                access your account. Choosing a strong, unique password is
                important to secure your funds.
              </Typography>
            </div>
            {isUpdatingPassword ? (
              <LazyChangePassword
                username={user.username}
                onCancel={this.handleTogglePasswordForm}
                onUpdateUser={onUpdateUser}
              />
            ) : (
              <Button onClick={this.handleTogglePasswordForm}>
                Change Password
              </Button>
            )}
          </GridItem>
          <GridItem>
            <hr className={styles.divider} />
          </GridItem>
          <GridItem>
            <div className={styles.textWrap}>
              <Typography el="h3" spaceAbove={0} spaceBelow={1}>
                Save your seed
              </Typography>
              <Typography el="p" spaceBelow={1.66}>
                Save your seed somewhere where you can&apos;t lose it, and
                no-one else can find or access it. As long as you&apos;ve got
                your seed saved, you can never lose access to your account, BUT
                if someone else finds it, they can use it to steal all your
                money.
              </Typography>
            </div>
            {isSeedFormActive ? (
              <SaveSeed
                onCancel={this.handleToggleSeedForm}
                enqueueSnackbar={enqueueSnackbar}
              />
            ) : (
              <Button onClick={this.handleToggleSeedForm}>Save Seed</Button>
            )}
          </GridItem>
          <GridItem>
            <hr className={styles.divider} />
          </GridItem>
          <GridItem>
            <div className={styles.textWrap}>
              <Typography el="h3" spaceAbove={0} spaceBelow={1}>
                Two-Factor Authentication (2FA)
              </Typography>
              <Typography el="p" spaceBelow={1.66}>
                {user.is2FAEnabled
                  ? `2FA is enabled`
                  : `2FA adds a second layer of security to your account. You can use
              Google Authenticator or Authy.`}
              </Typography>
            </div>
            <MFASettings
              enqueueSnackbar={enqueueSnackbar}
              onUpdateUser={onUpdateUser}
              enabled={user.is2FAEnabled}
            />
          </GridItem>
          {/*
          <GridItem>
            <hr className={styles.divider} />
          </GridItem>
          <GridItem>
            <div className={styles.textWrap}>
              <Typography el="h3" spaceAbove={0} spaceBelow={1}>
                IP Authorization
              </Typography>
              <Typography el="p" spaceBelow={1.66}>
                If activated, every time you log in from a new IP address, we
                will send you a verification email to confirm it&apos;s you.
              </Typography>
            </div>
            <Checkbox checked={true} label="Enable IP Authorization" />
          </GridItem>*/}
        </Grid>
      </div>
    )
  }
}

export default withSnackbar(destyle(SecuritySettings, 'SettingsForm'))
