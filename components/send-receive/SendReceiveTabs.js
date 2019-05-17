// @flow
import * as React from 'react'
import { destyle } from 'destyle'
import TabComponents from 'brainblocks-components/build/Tabs'
import SwitchTabs from 'brainblocks-components/build/SwitchTabs'
import Button from 'brainblocks-components/build/Button'
import SendForm from './SendForm'
import ReceiveForm from './ReceiveForm'
import type { WithRouter } from '~/types'
import type { AccountsState } from '~/types/reduxTypes'
import { getKeyByValue } from '~/functions/util'
import Message from '~/components/layout/Message'

const { Tab, TabList, TabPanel } = TabComponents

const tabIndexMap = {
  send: 0,
  receive: 1,
  transfer: 2
}

type Props = WithRouter & {
  vaults: Object,
  accounts: AccountsState,
  defaultAccount: string,
  nanoPrice: number,
  preferredCurrency: string,
  /** Given by destyle. Do not pass this to the component as a prop. */
  styles: Object,
  onSend: (from: string, to: string, amount: string | number) => void
}

type State = {
  activeTab: number,
  sendComplete: boolean
}

class SendReceiveTabs extends React.Component<Props, State> {
  state = {
    // XSS-safe
    activeTab: tabIndexMap.hasOwnProperty(this.props.router.query.tab)
      ? tabIndexMap[this.props.router.query.tab]
      : 0,
    sendComplete: false
  }

  handleSwitchTabs = (index: number, lastIndex: number, event: Event) => {
    const tab = getKeyByValue(tabIndexMap, index)
    this.setState(
      {
        activeTab: index
      },
      () => {
        this.props.router.push({
          pathname: '/send-receive',
          search: tab ? `?tab=${tab}` : ''
        })
      }
    )
  }

  handleSendComplete = () => {
    this.setState({ sendComplete: true })
  }

  handleResend = () => {
    this.setState({ sendComplete: false })
  }

  handleGoToDashboard = () => {
    this.props.router.push('/')
  }

  render() {
    const {
      styles,
      accounts,
      defaultAccount,
      nanoPrice,
      preferredCurrency,
      router,
      onSend
    } = this.props
    const { activeTab, sendComplete } = this.state
    return (
      <div className={styles.root}>
        {sendComplete ? (
          <Message
            title="Success"
            subtitle="Your transaction was sent successfully"
            graphic="/static/svg/success.svg"
          >
            <Button
              onClick={this.handleGoToDashboard}
              color="blue"
              style={{ marginBottom: 5 }}
            >
              Back to Dashboard
            </Button>{' '}
            <Button onClick={this.handleResend} color="green">
              New Transaction
            </Button>
          </Message>
        ) : (
          <SwitchTabs
            selectedIndex={activeTab}
            onSelect={this.handleSwitchTabs}
          >
            <TabList>
              <Tab>Send</Tab>
              <Tab>Receive</Tab>
              {accounts.allIds.length > 1 && <Tab>Transfer</Tab>}
            </TabList>

            <TabPanel>
              <SendForm
                onSend={onSend}
                onSendComplete={this.handleSendComplete}
                nanoPrice={nanoPrice}
                defaultAccount={defaultAccount}
                preferredCurrency={preferredCurrency}
                accounts={accounts}
                router={router}
              />
            </TabPanel>
            <TabPanel>
              <ReceiveForm
                accounts={accounts}
                defaultAccount={defaultAccount}
                router={router}
              />
            </TabPanel>
            {accounts.allIds.length > 1 && (
              <TabPanel>
                <SendForm
                  onSend={onSend}
                  onSendComplete={this.handleSendComplete}
                  nanoPrice={nanoPrice}
                  defaultAccount={defaultAccount}
                  preferredCurrency={preferredCurrency}
                  accounts={accounts}
                  router={router}
                  variant="transfer"
                />
              </TabPanel>
            )}
          </SwitchTabs>
        )}
      </div>
    )
  }
}

export default destyle(SendReceiveTabs, 'SendReceiveTabs')
