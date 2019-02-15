// @flow
import React from 'react'
import { destyle } from 'destyle'
import { connect } from 'react-redux'
import Link from 'next/link'
import { Wallet } from 'rai-wallet'
import { addVault } from '~/state/thunks/walletThunks'
import {
  SwitchTabs,
  TabComponents,
  Alert,
  Grid,
  GridItem,
  FormItem,
  FormField,
  Input,
  Button
} from 'brainblocks-components'

const { Tab, TabList, TabPanel } = TabComponents

type Props = {
  createWallet: string => {},
  vaults: {},
  /** Given by destyle. Do not pass this to the component as a prop. */
  styles: Object
}

type State = {
  activeTab: number,
  newPassword: string,
  newPassword2: string,
  importPassword: string,
  importPassword2: string
}

class NewVault extends React.Component<Props, State> {
  state = {
    activeTab: 0,
    newPassword: '',
    newPassword2: '',
    importPassword: '',
    importPassword2: ''
  }

  handleSwitchTabs = (index: number, lastIndex: number, event: Event) => {
    this.setState({
      activeTab: index
    })
  }

  getHandleInput = (input: string) => e => {
    this.setState({
      [input]: e.target.value
    })
  }

  handleNextButton = e => {
    this.props.addVault()
  }

  handleImport = e => {
    const wallet = new Wallet(password)
    wallet.createWallet(importedSeed)
    const hex = wallet.pack()
  }

  render() {
    const { styles, ...rest } = this.props
    const {
      activeTab,
      newPassword,
      newPassword2,
      importPassword,
      importPassword2
    } = this.state
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
                    <Input
                      type="password"
                      id="password"
                      value={newPassword}
                      onChange={this.getHandleInput('newPassword')}
                    />
                  </FormField>
                </FormItem>
              </GridItem>
              <GridItem>
                <FormItem label="Re-type your password" fieldId="password2">
                  <FormField>
                    <Input
                      type="password"
                      id="password2"
                      value={newPassword2}
                      onChange={this.getHandleInput('newPassword2')}
                    />
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
                {/*<Link prefetch href="/new-account/settings">*/}
                <Button
                  variant="primary"
                  color="green"
                  onClick={this.handleNextButton}
                >
                  Next
                </Button>
                {/*</Link>*/}
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
                <Button
                  variant="primary"
                  color="green"
                  onClick={this.handleNextButton}
                >
                  Next
                </Button>
              </GridItem>
            </Grid>
          </TabPanel>
        </SwitchTabs>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  vaults: state.vaults
})

const mapDispatchToProps = {
  addVault
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(destyle(NewVault, 'NewVault'))
