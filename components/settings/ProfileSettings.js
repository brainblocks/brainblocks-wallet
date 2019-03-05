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
  user: Object,
  /** Given by destyle. Do not pass this to the component as a prop. */
  styles: Object
}

const ProfileSettings = ({
  user,
  userName,
  userEmail,
  styles,
  ...rest
}: Props) => (
  <div className={styles.root}>
    <Grid>
      <GridItem>
        <FormItem label="Your Name" fieldId="your-name">
          <FormField>
            <Input readOnly id="your-name" value={user.username} />
          </FormField>
        </FormItem>
      </GridItem>
      <GridItem>
        <hr className={styles.divider} />
      </GridItem>
      <GridItem>
        <FormItem
          label="Avatar"
          description="Robots lovingly delivered by Robohash.org"
        >
          <FormField>
            <div className={styles.avatarChooser}>
              <img
                src={`https://robohash.org/${
                  user.email
                }?gravatar=yes&set=set3&bgset=bg2&size=44x44`}
                alt={user.username}
              />
              <a
                href="https://gravatar.com/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Create/change your avatar at Gravatar.com
              </a>
            </div>
          </FormField>
        </FormItem>
      </GridItem>
      <GridItem>
        <hr className={styles.divider} />
      </GridItem>
      <GridItem>
        <FormItem
          label="Your Email Address"
          fieldId="your-email"
          description="Currently there's no way to change this. Contact us if you really need to."
        >
          <FormField>
            <Input type="email" readOnly id="your-email" value={user.email} />
          </FormField>
        </FormItem>
      </GridItem>
    </Grid>
  </div>
)

export default destyle(ProfileSettings, 'SettingsForm')
