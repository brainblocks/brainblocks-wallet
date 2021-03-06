// @flow
import React from 'react'
import { destyle } from 'destyle'
import { connect } from 'react-redux'
import { getWallet, createWallet } from '~/state/wallet'
import { Wallet } from 'rai-wallet'
import { createVault } from '~/state/api/vault'
import { verifyPassword } from '~/state/api/auth'
import { creators as vaultActions } from '~/state/actions/vaultActions'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import { addAccount } from '~/state/thunks/accountsThunks'
import Grid from 'brainblocks-components/build/Grid'
import GridItem from 'brainblocks-components/build/GridItem'
import FormItem from 'brainblocks-components/build/FormItem'
import FormField from 'brainblocks-components/build/FormField'
import Input from 'brainblocks-components/build/Input'
import Button from 'brainblocks-components/build/Button'
import SwitchTabs from 'brainblocks-components/build/SwitchTabs'
import TabComponents from 'brainblocks-components/build/Tabs'
import Alert from 'brainblocks-components/build/Alert'
import Checkbox from 'brainblocks-components/build/Checkbox'
import { withSnackbar } from 'brainblocks-components/build/Snackbar'
import { getKeyByValue } from '~/functions/util'
import { isValidNanoSeed } from '~/functions/validate'
import { setPassword, hashPassword, destroyPassword } from '~/state/password'
import { getUsername } from '~/state/selectors/userSelectors'
import log from '~/functions/log'
import type { WithSnackbar } from '~/types'

const { Tab, TabList, TabPanel } = TabComponents

const tabIndexMap = {
  create: 0,
  import: 1
}

type Props = WithSnackbar & {
  router: Object,
  updateVault: string => mixed,
  /** Given by destyle. Do not pass this to the component as a prop. */
  styles: Object,
  username: string
}

type State = {
  activeTab: number,
  createSeed: string,
  createPassword: string,
  createPasswordValid: boolean,
  createConfirmed: boolean,
  createSubmitting: boolean,
  createError: string,
  importSeed: string,
  importPassword: string,
  importPasswordValid: boolean,
  importConfirmed: boolean,
  importSubmitting: boolean,
  importError: string
}

class NewVault extends React.Component<Props, State> {
  constructor(props) {
    super(props)
    const wallet = new Wallet('')
    wallet.setRandomSeed()
    this.state = {
      activeTab: tabIndexMap.hasOwnProperty(this.props.router.query.tab)
        ? tabIndexMap[this.props.router.query.tab]
        : 0, // XSS-safe
      createSeed: wallet.getSeed(''),
      createPassword: '',
      createPasswordValid: true,
      createConfirmed: false,
      createSubmitting: false,
      createError: '',
      importSeed: '',
      importPassword: '',
      importPasswordValid: true,
      importConfirmed: false,
      importSubmitting: false,
      importError: ''
    }
  }

  submit = async form => {
    const password = this.state[`${form}Password`]
    const seed = this.state[`${form}Seed`]
    // set submitting
    this.setState({
      [`${form}Submitting`]: true
    })
    // verify password
    setPassword(password)
    const hashedPassword = hashPassword(this.props.username)
    destroyPassword()
    try {
      let correct = await verifyPassword(hashedPassword)
      if (!correct) throw new Error('Invalid password')
    } catch (e) {
      log.error('Error verifying password')
      this.setState({
        [`${form}Error`]: 'Incorrect password',
        [`${form}PasswordValid`]: false,
        [`${form}Submitting`]: false
      })
      return
    }
    // create wallet with seed
    createWallet(password)
    const wallet = getWallet()
    wallet.createWallet(seed)
    // name the first account
    const accounts = wallet.getAccounts()
    wallet.setLabel(accounts[0].account, 'Default Vault')
    // pack wallet
    const hex = wallet.pack()
    // send to api
    let vault
    try {
      vault = await createVault(hex)
    } catch (e) {
      this.setState({
        [`${form}Error`]: 'Could not save vault to the server',
        [`${form}Submitting`]: false
      })
      return
    }
    // update redux
    this.props.updateVault(vault)
    // go to dashboard
    this.props.router.push('/')
  }

  handleCreate = () => {
    this.submit('create')
  }

  handleImport = () => {
    this.submit('import')
  }

  handleSwitchTabs = (index: number) => {
    const tab = getKeyByValue(tabIndexMap, index)
    this.setState(
      {
        activeTab: index
      },
      () => {
        this.props.router.push({
          pathname: '/new-account/vault',
          search: tab ? `?tab=${tab}` : ''
        })
      }
    )
  }

  handleInput = e => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleConfirm = e => {
    this.setState({
      [e.target.name]: e.target.checked
    })
  }

  handleCopySeed = () => {
    this.props.enqueueSnackbar('Seed copied to clipboard', {
      variant: 'info'
    })
  }

  render() {
    const { styles } = this.props
    const {
      activeTab,
      createSeed,
      createPassword,
      createPasswordValid,
      createConfirmed,
      createSubmitting,
      createError,
      importSeed,
      importPassword,
      importPasswordValid,
      importConfirmed,
      importSubmitting,
      importError
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
                    ONLY YOU have access to your password and seed. There is no
                    way to recover them if you lose them, so keep them safe!
                    Anyone who finds them can steal all your money.
                  </p>
                </Alert>
              </GridItem>
              {!!createError && (
                <GridItem>
                  <Alert variant="error">
                    <p>{createError}</p>
                  </Alert>
                </GridItem>
              )}
              <GridItem>
                <FormItem
                  label="Save your seed"
                  fieldId="seed"
                  description="It's important to save your seed somewhere safe"
                >
                  <FormField
                    adornEnd={
                      <CopyToClipboard
                        text={createSeed}
                        onCopy={this.handleCopySeed}
                      >
                        <Button variant="util">Copy</Button>
                      </CopyToClipboard>
                    }
                  >
                    <Input readOnly id="seed" value={createSeed} />
                  </FormField>
                </FormItem>
              </GridItem>
              <GridItem>
                <FormItem
                  label="Re-enter your password"
                  fieldId="password"
                  description="We'll use it to encrypt your vault"
                  error={!createPasswordValid && 'Incorrect password'}
                >
                  <FormField>
                    <Input
                      type="password"
                      id="password"
                      value={createPassword}
                      name="createPassword"
                      onChange={this.handleInput}
                    />
                  </FormField>
                </FormItem>
              </GridItem>

              <GridItem>
                <Checkbox
                  checked={createConfirmed}
                  name="createConfirmed"
                  label="I have saved my password and seed in a safe place"
                  onChange={this.handleConfirm}
                />
              </GridItem>
              <GridItem>
                {/*<Link prefetch href="/new-account/settings">*/}
                <Button
                  variant="primary"
                  color="green"
                  disabled={!createConfirmed}
                  onClick={this.handleCreate}
                  loading={createSubmitting}
                >
                  Create
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
              {!!importError && (
                <GridItem>
                  <Alert variant="error">
                    <p>{importError}</p>
                  </Alert>
                </GridItem>
              )}
              <GridItem>
                <FormItem
                  label="Enter your seed"
                  fieldId="import-seed"
                  description="Back up this seed somewhere safe. Anyone who finds it can steal all your money."
                  error={
                    importSeed.length &&
                    !isValidNanoSeed(importSeed) &&
                    'This seed is invalid'
                  }
                >
                  <FormField
                    valid={
                      importSeed.length === 0 || isValidNanoSeed(importSeed)
                    }
                  >
                    <Input
                      id="import-seed"
                      name="importSeed"
                      valie={importSeed}
                      placeholder="E.g. E4272976AC2B2EDFCBEFAB130EB6F633B0D2A6FA3982861C60709CBEB39B9685"
                      onChange={this.handleInput}
                    />
                  </FormField>
                </FormItem>
              </GridItem>
              <GridItem>
                <FormItem
                  label="Re-enter your password"
                  fieldId="password"
                  description="We'll use it to encrypt your vault"
                  error={!importPasswordValid && 'Incorrect password'}
                >
                  <FormField>
                    <Input
                      type="password"
                      id="password"
                      name="importPassword"
                      value={importPassword}
                      onChange={this.handleInput}
                    />
                  </FormField>
                </FormItem>
              </GridItem>
              <GridItem>
                <Checkbox
                  checked={importConfirmed}
                  name="importConfirmed"
                  label="I have saved my password and seed in a safe place"
                  onChange={this.handleConfirm}
                />
              </GridItem>

              <GridItem>
                <Button
                  variant="primary"
                  color="green"
                  disabled={!importConfirmed || !isValidNanoSeed(importSeed)}
                  onClick={this.handleImport}
                  loading={importSubmitting}
                >
                  Import
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
  username: getUsername(state)
})

const mapDispatchToProps = {
  addAccount,
  updateVault: vaultActions.updateVault
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withSnackbar(destyle(NewVault, 'NewVault')))
