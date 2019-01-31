// @flow
import * as React from 'react'
import { destyle } from 'destyle'
import {
  FormItem,
  FormField,
  Input,
  Grid,
  GridItem,
  Button
} from 'brainblocks-components'

import mockState from '~/state/mockState'

type Props = {
  userName: string,
  userEmail: string,
  /** Given by destyle. Do not pass this to the component as a prop. */
  styles: Object
}

const ProfileSettings = ({ userName, userEmail, styles, ...rest }: Props) => (
  <div className={styles.root}>
    <Grid>
      <GridItem>
        <FormItem label="Your Name" fieldId="your-name">
          <FormField>
            <Input readOnly id="your-name" value={userName} />
          </FormField>
        </FormItem>
      </GridItem>
      <GridItem>
        <hr className={styles.divider} />
      </GridItem>
      <GridItem>
        <FormItem label="Avatar" fieldId="your-avatar">
          <FormField>
            <Input readOnly id="your-avatar" value={'@TODO Avatar Chooser'} />
          </FormField>
        </FormItem>
      </GridItem>
      <GridItem>
        <hr className={styles.divider} />
      </GridItem>
      <GridItem>
        <FormItem label="Your Email Address" fieldId="your-email">
          <FormField>
            <Input type="email" readOnly id="your-email" value={userEmail} />
          </FormField>
        </FormItem>
      </GridItem>
    </Grid>
  </div>
)

export default destyle(ProfileSettings, 'SettingsForm')
