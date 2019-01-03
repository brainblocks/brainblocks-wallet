// @flow
import React from 'react'
import { destyle } from 'destyle'
import Link from 'next/link'
import SwitchTabs from '~/bb-components/switch-tabs/SwitchTabs'
import TabsComponents from '~/bb-components/tabs/Tabs'
import Alert from '~/bb-components/alert/Alert'
import Grid from '~/bb-components/grid/Grid'
import GridItem from '~/bb-components/grid/GridItem'
import FormItem from '~/bb-components/form-item/FormItem'
import FormField from '~/bb-components/form-field/FormField'
import Input from '~/bb-components/input/Input'
import Button from '~/bb-components/button/Button'

const { Tab, TabList, TabPanel } = TabsComponents

type Props = {
  /** Given by destyle. Do not pass this to the component as a prop. */
  styles: Object
}

type State = {
  activeTab: number
}

class NewVault extends React.Component<Props, State> {
  state = {
    activeTab: 0
  }

  handleSwitchTabs = (index: number, lastIndex: number, event: Event) => {
    this.setState({
      activeTab: index
    })
  }

  render() {
    const { styles, ...rest } = this.props
    const { activeTab } = this.state
    return (
      <div className={styles.root}>
        <SwitchTabs selectedIndex={activeTab} onSelect={this.handleSwitchTabs}>
          <div className={styles.tabs}>
            <TabList>
              <Tab>New Vault</Tab>
              <Tab>Import Seed</Tab>
            </TabList>
          </div>

          <TabPanel>
            <Grid>
              <GridItem>
                <Alert variant="warning">
                  <p>
                    When you create a vault, ONLY YOU have access to your funds.
                    There is no way to recover a lost password or seed, so keep
                    them safe!
                  </p>
                </Alert>
              </GridItem>
              <GridItem>
                <FormItem
                  label="Set a password for this vault"
                  fieldId="password"
                >
                  <FormField>
                    <Input type="password" id="password" />
                  </FormField>
                </FormItem>
              </GridItem>
              <GridItem>
                <FormItem label="Re-type your password" fieldId="password2">
                  <FormField>
                    <Input type="password" id="password2" />
                  </FormField>
                </FormItem>
              </GridItem>
              <GridItem>
                <FormItem label="Save your seed" fieldId="seed">
                  <FormField adornEnd={<Button variant="util">Copy</Button>}>
                    <Input
                      readOnly
                      id="seed"
                      value="E4272976AC2B2EDFCBEFAB130EB6F633B0D2A6FA3982861C60709CBEB39B9685"
                    />
                  </FormField>
                </FormItem>
              </GridItem>
              <GridItem>
                <Alert variant="warning">
                  Back up your seed somewhere safe. Anyone who finds it can
                  steal all your money.
                </Alert>
              </GridItem>
              <GridItem>
                <Link prefetch href="/new-account/settings">
                  <Button variant="primary" color="green">
                    Next
                  </Button>
                </Link>
              </GridItem>
            </Grid>
          </TabPanel>
          <TabPanel>
            <Grid>
              <GridItem>
                <Alert>
                  <p>
                    Please note that any additional addresses attached to this
                    seed will need to be <strong>regenerated manually</strong>{' '}
                    once the import is complete.
                  </p>
                </Alert>
              </GridItem>
              <GridItem>
                <FormItem
                  label="Your seed"
                  fieldId="import-seed"
                  description="Back up this seed somewhere safe. Anyone who finds it can steal all your money."
                >
                  <FormField adornEnd={<Button variant="util">Paste</Button>}>
                    <Input
                      readOnly
                      id="import-seed"
                      placeholder="E.g. E4272976AC2B2EDFCBEFAB130EB6F633B0D2A6FA3982861C60709CBEB39B9685"
                    />
                  </FormField>
                </FormItem>
              </GridItem>
              <GridItem>
                <FormItem
                  label="Set a password for this vault"
                  fieldId="password"
                >
                  <FormField>
                    <Input type="password" id="password" />
                  </FormField>
                </FormItem>
              </GridItem>
              <GridItem>
                <FormItem label="Re-type your password" fieldId="password2">
                  <FormField>
                    <Input type="password" id="password2" />
                  </FormField>
                </FormItem>
              </GridItem>

              <GridItem>
                <Link prefetch href="/new-account/settings">
                  <Button variant="primary" color="green">
                    Next
                  </Button>
                </Link>
              </GridItem>
            </Grid>
          </TabPanel>
        </SwitchTabs>
      </div>
    )
  }
}

export default destyle(NewVault, 'NewVault')
