// @flow
import * as React from 'react'
import { destyle } from 'destyle'
import { TabComponents, SwitchTabs } from 'brainblocks-components'
import SendForm from './SendForm'
import ReceiveForm from './ReceiveForm'
import TransferForm from './TransferForm'
import type { NormalizedState } from '~/types'
import { getKeyByValue } from '~/functions/util'

const { Tab, TabList, TabPanel } = TabComponents

const tabIndexMap = {
  send: 0,
  receive: 1,
  transfer: 2
}

type Props = {
  router: Object,
  vaults: Object,
  accounts: NormalizedState,
  defaultAccount: string,
  nanoPrice: number,
  preferredCurrency: string,
  /** Given by destyle. Do not pass this to the component as a prop. */
  styles: Object
}

type State = {
  activeTab: number
}

class SendReceiveTabs extends React.Component<Props, State> {
  state = {
    activeTab: tabIndexMap[this.props.router.query.tab] || 0
  }

  handleSwitchTabs = (index: number, lastIndex: number, event: Event) => {
    this.setState(
      {
        activeTab: index
      },
      () => {
        this.props.router.push({
          pathname: '/send-receive',
          search: `?tab=${getKeyByValue(tabIndexMap, index)}`
        })
      }
    )
  }

  render() {
    const {
      styles,
      accounts,
      defaultAccount,
      nanoPrice,
      preferredCurrency,
      router,
      ...rest
    } = this.props
    const { activeTab } = this.state
    return (
      <div className={styles.root}>
        <SwitchTabs selectedIndex={activeTab} onSelect={this.handleSwitchTabs}>
          <TabList>
            <Tab>Send</Tab>
            <Tab>Receive</Tab>
            {accounts.allIds.length > 1 && <Tab>Transfer</Tab>}
          </TabList>

          <TabPanel>
            <SendForm
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
              <TransferForm
                nanoPrice={nanoPrice}
                preferredCurrency={preferredCurrency}
                accounts={accounts}
                defaultAccount={defaultAccount}
                router={router}
              />
            </TabPanel>
          )}
        </SwitchTabs>
      </div>
    )
  }
}

export default destyle(SendReceiveTabs, 'SendReceiveTabs')
