// @flow
import * as React from 'react'
import { destyle } from 'destyle'
import Grid from 'brainblocks-components/build/Grid'
import GridItem from 'brainblocks-components/build/GridItem'
import FormItem from 'brainblocks-components/build/FormItem'
import FormField from 'brainblocks-components/build/FormField'
import Input from 'brainblocks-components/build/Input'
import Button from 'brainblocks-components/build/Button'
import Typography from 'brainblocks-components/build/Typography'
import Checkbox from 'brainblocks-components/build/Checkbox'
import { withSnackbar } from 'brainblocks-components/build/Snackbar'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import { wallet } from '~/state/wallet'
import MFASettings from '~/components/settings/MFASettings'

const initialSeed =
  '0000000000000000000000000000000000000000000000000000000000000000000000'

type Props = {
  user: Object,
  enqueueSnackbar: (string, Object) => void,
  onUpdateUser: () => mixed,
  /** Given by destyle. Do not pass this to the component as a prop. */
  styles: Object
}

type State = {
  seed: string,
  seedInputType: string,
  password: string,
  passwordError: string
}

class SecuritySettings extends React.Component<Props, State> {
  state = {
    seed: initialSeed,
    seedInputType: 'password',
    password: '',
    passwordError: ''
  }

  handleUpdatePassword = e => {
    this.setState({
      password: e.target.value
    })
  }

  handleUnlockSeed = e => {
    let seed
    try {
      seed = wallet.getSeed(this.state.password)
    } catch (e) {
      this.setState({ passwordError: 'Incorrect password' })
      return
    }
    this.setState(
      {
        seed,
        password: '',
        passwordError: '',
        seedInputType: 'input'
      },
      () => {
        this.props.enqueueSnackbar('Seed will be visible for 30 seconds', {
          variant: 'info'
        })
        setTimeout(() => {
          this.setState({
            seed: initialSeed,
            seedInputType: 'password'
          })
        }, 30 * 1000)
      }
    )
  }

  handleCopySeed = () => {
    this.props.enqueueSnackbar('Seed copied to clipboard', {
      variant: 'info'
    })
  }

  render() {
    const {
      styles,
      user,
      onUpdateUser,
      enqueueSnackbar,
      ...rest
    }: Props = this.props
    const { seed, password, passwordError, seedInputType } = this.state
    return (
      <div className={styles.root}>
        <Grid>
          <GridItem>
            <div className={styles.textWrap}>
              <Typography el="h3" spaceAbove={0} spaceBelow={1}>
                Save your seed
              </Typography>
              <Typography el="p" spaceBelow={1.66}>
                Save your seed somewhere where you can't lose it, and no-one
                else can find or access it. As long as you've got your seed
                saved, you can never lose access to your account, BUT if someone
                else finds it, they can use it to steal all your money.
              </Typography>
            </div>
            <Grid>
              <GridItem>
                <FormItem label="Seed" fieldId="wallet-seed">
                  <FormField
                    adornEnd={
                      seed !== initialSeed && (
                        <CopyToClipboard
                          text={seed}
                          onCopy={this.handleCopySeed}
                        >
                          <Button variant="util">Copy</Button>
                        </CopyToClipboard>
                      )
                    }
                  >
                    <Input
                      id="wallet-seed"
                      type={seedInputType}
                      readOnly
                      value={seed}
                    />
                  </FormField>
                </FormItem>
              </GridItem>
              <GridItem>
                <FormItem
                  label="Enter your password to show your seed"
                  fieldId="seed-password"
                  error={passwordError}
                >
                  <FormField
                    adornEnd={
                      password !== '' && (
                        <Button
                          variant="util"
                          color="teal"
                          onClick={this.handleUnlockSeed}
                        >
                          Unlock
                        </Button>
                      )
                    }
                  >
                    <Input
                      id="seed-password"
                      type="password"
                      onChange={this.handleUpdatePassword}
                      value={password}
                    />
                  </FormField>
                </FormItem>
              </GridItem>
            </Grid>
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
                will send you a verification email to confirm it's you.
              </Typography>
            </div>
            <Checkbox checked={true} label="Enable IP Authorization" />
          </GridItem>
        </Grid>
      </div>
    )
  }
}

export default withSnackbar(destyle(SecuritySettings, 'SettingsForm'))
