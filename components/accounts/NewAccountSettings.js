// @flow
import React from 'react'
import { destyle } from 'destyle'
import { withRouter } from 'next/router'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { addAccount } from '~/state/thunks/walletThunks'
import {
  Grid,
  GridItem,
  FormItem,
  FormField,
  Input,
  Button,
  ColorChoice
} from 'brainblocks-components'
import { withSnackbar } from 'notistack'

type Props = {
  addAccount: Object => Promise<Object>,
  router: Object,
  /** Given by destyle. Do not pass this to the component as a prop. */
  styles: Object
}

type State = {
  label: string,
  color: string
}

class NewAccountSettings extends React.Component<Props, State> {
  constructor(props) {
    super(props)
    this.state = {
      label: '',
      color: 'gold'
    }
  }

  createAccountWithSettings = () => {
    const { label, color } = this.state
    this.props.addAccount({ label, color }).then(account => {
      this.props.router.push('/accounts')
    })
  }

  getHandleUpdate = fieldName => e => {
    this.setState({
      [fieldName]: e.target.value
    })
  }

  render() {
    const { styles, ...rest }: Props = this.props
    const { label, color }: State = this.state
    return (
      <div className={styles.root}>
        <Grid>
          <GridItem>
            <FormItem label="Account Name" fieldId="account-name">
              <FormField>
                <Input
                  id="account-name"
                  placeholder="E.g. 'Savings' or 'Spending'"
                  value={label}
                  onChange={this.getHandleUpdate('label')}
                />
              </FormField>
            </FormItem>
          </GridItem>
          <GridItem>
            <FormItem
              label="Account Color"
              fieldId="color"
              description="The color can help you quickly identify this account."
            >
              <FormField>
                <ColorChoice
                  value={color}
                  options={['gold', 'purple', 'pink', 'aqua', 'orange', 'jade']}
                  onChange={() => {}}
                  onChange={this.getHandleUpdate('color')}
                />
              </FormField>
            </FormItem>
          </GridItem>
          <GridItem>
            <Button
              onClick={this.createAccountWithSettings}
              variant="primary"
              color="green"
            >
              Create Account
            </Button>
            {/*<a className={styles.moreSettings} href="#">
              More account settings
            </a>*/}
          </GridItem>
        </Grid>
      </div>
    )
  }
}

export default compose(
  withRouter,
  withSnackbar,
  connect(
    null,
    { addAccount }
  )
)(destyle(NewAccountSettings, 'NewAccountSettings'))
