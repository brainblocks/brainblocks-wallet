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
  Typography
} from 'brainblocks-components'

import mockState from '~/state/mockState'

type Props = {
  /** Given by destyle. Do not pass this to the component as a prop. */
  styles: Object
}

const SecuritySettings = ({ seed, styles, ...rest }: Props) => (
  <div className={styles.root}>
    <Grid>
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
          logged in on known devices, but have your account auto-lock after a
          set time.
        </Typography>
        <Typography el="p" spaceBelow={1}>
          Once your account is locked, your can simply enter a pin-code to
          unlock it. This is much faster than the standard username, password
          and 2FA login process.
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

export default destyle(SecuritySettings, 'SettingsForm')
