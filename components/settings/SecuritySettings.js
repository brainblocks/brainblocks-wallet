// @flow
import * as React from 'react'
import { destyle } from 'destyle'
import {
  FormItem,
  FormField,
  Input,
  Grid,
  GridItem,
  Button,
  Typography,
  withSnackbar
} from 'brainblocks-components'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import { wallet } from '~/state/wallet'

const initialSeed =
  '0000000000000000000000000000000000000000000000000000000000000000000000'

type Props = {
  enqueueSnackbar: func,
  /** Given by destyle. Do not pass this to the component as a prop. */
  styles: Object
}

class SecuritySettings extends React.Component {
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
        }, 10 * 1000)
      }
    )
  }

  handleCopySeed = () => {
    this.props.enqueueSnackbar('Seed copied to clipboard', {
      variant: 'info'
    })
  }

  render() {
    const { styles, ...rest }: Props = this.props
    const { seed, password, passwordError, seedInputType } = this.state
    return (
      <div className={styles.root}>
        <Grid>
          <GridItem>
            <Typography el="h3" spaceAbove={0} spaceBelow={1}>
              Save your seed
            </Typography>
            <Typography el="p" spaceBelow={1}>
              Save your seed somewhere where you can't lose it, and no-one else
              can find or access it. As long as you've got your seed saved, you
              can never lose access to your account, BUT if someone else finds
              it, they can use it to steal all your money.
            </Typography>
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
            <Typography el="h3" spaceAbove={0} spaceBelow={1}>
              Two-Factor Authentication (2FA)
            </Typography>
            <Typography el="p" spaceBelow={1}>
              2FA adds a second layer of security to your account. You can use
              Google Authenticator or Authy.
            </Typography>
            <Button>Enable 2FA</Button>
          </GridItem>
          <GridItem>
            <hr className={styles.divider} />
          </GridItem>
          <GridItem>
            <Typography el="h3" spaceAbove={0} spaceBelow={1}>
              IP Authorization
            </Typography>
            <Typography el="p" spaceBelow={1}>
              If activated, every time you log in from a new IP address, we will
              send you a verification email to confirm it's you.
            </Typography>
            <Button>Enable IP Authorization</Button>
          </GridItem>
          <GridItem>
            <hr className={styles.divider} />
          </GridItem>
          <GridItem>
            <Typography el="h3" spaceAbove={0} spaceBelow={1}>
              Account Locking
            </Typography>
            <Typography el="p" spaceBelow={1}>
              If you like to be able to quickly log-in, you can choose to remain
              logged in on known devices, but have your account auto-lock after
              a set time.
            </Typography>
            <Typography el="p" spaceBelow={1}>
              Once your account is locked, your can simply enter a pin-code to
              unlock it. This is much faster than the standard username,
              password and 2FA login process.
            </Typography>
            <Typography el="p" spaceBelow={1}>
              You will still need to complete the standard login process on new
              devices.
            </Typography>
            <Button>Enable Account Locking</Button>
          </GridItem>
        </Grid>
      </div>
    )
  }
}

export default withSnackbar(destyle(SecuritySettings, 'SettingsForm'))
