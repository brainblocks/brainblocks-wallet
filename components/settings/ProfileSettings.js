// @flow
import * as React from 'react'
import ReactGA from 'react-ga'
import { destyle } from 'destyle'
import Grid from 'brainblocks-components/build/Grid'
import GridItem from 'brainblocks-components/build/GridItem'
import FormItem from 'brainblocks-components/build/FormItem'
import FormField from 'brainblocks-components/build/FormField'
import Input from 'brainblocks-components/build/Input'

type Props = {
  user: Object,
  /** Given by destyle. Do not pass this to the component as a prop. */
  styles: Object
}

const ProfileSettings = ({ user, styles, ...rest }: Props) => (
  <div className={styles.root}>
    <Grid>
      <GridItem>
        <FormItem
          label="User name"
          fieldId="your-name"
          description="Your user name cannot be changed"
        >
          <FormField>
            <Input readOnly id="your-name" value={user.username} />
          </FormField>
        </FormItem>
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
              <ReactGA.OutboundLink
                eventLabel="Change avatar"
                to="https://gravatar.com/"
                target="_blank"
              >
                Create/change your avatar at Gravatar.com
              </ReactGA.OutboundLink>
            </div>
          </FormField>
        </FormItem>
      </GridItem>
    </Grid>
  </div>
)

export default destyle(ProfileSettings, 'SettingsForm')
