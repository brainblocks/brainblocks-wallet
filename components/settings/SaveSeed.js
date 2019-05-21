// @flow
import * as React from 'react'
import Grid from 'brainblocks-components/build/Grid'
import GridItem from 'brainblocks-components/build/GridItem'
import FormItem from 'brainblocks-components/build/FormItem'
import FormField from 'brainblocks-components/build/FormField'
import Input from 'brainblocks-components/build/Input'
import Button from 'brainblocks-components/build/Button'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import { getWallet } from '~/state/wallet'

const initialSeed =
  '0000000000000000000000000000000000000000000000000000000000000000000000'

type Props = {
  onCancel: () => void,
  enqueueSnackbar: (string, ?Object) => void
}

type State = {
  seed: string,
  seedInputType: string,
  password: string,
  passwordError: string
}

class SaveSeed extends React.Component<Props, State> {
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
    const wallet = getWallet()
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

  handleCancel = (e: SyntheticMouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    this.props.onCancel()
  }

  render() {
    const { seed, password, passwordError, seedInputType } = this.state
    return (
      <Grid gutter={18}>
        <GridItem>
          <FormItem label="Seed" fieldId="wallet-seed">
            <FormField
              adornEnd={
                seed !== initialSeed && (
                  <CopyToClipboard text={seed} onCopy={this.handleCopySeed}>
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
        <GridItem>
          <a href="#" onClick={this.handleCancel}>
            Cancel
          </a>
        </GridItem>
      </Grid>
    )
  }
}

export default SaveSeed
