// @flow
import * as React from 'react'
import { destyle } from 'destyle'
import { TabComponents, SwitchTabs } from 'brainblocks-components'
import SendForm from './SendForm'
import ReceiveForm from './ReceiveForm'
import TransferForm from './TransferForm'

const { Tab, TabList, TabPanel } = TabComponents

const tabIndexMap = {
  send: 0,
  receive: 1,
  transfer: 2
}

type Props = {
  router: Object,
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
    this.setState({
      activeTab: index
    })
  }

  render() {
    const { styles, router, ...rest } = this.props
    const { activeTab } = this.state
    return (
      <div className={styles.root}>
        <SwitchTabs selectedIndex={activeTab} onSelect={this.handleSwitchTabs}>
          <TabList>
            <Tab>Send</Tab>
            <Tab>Receive</Tab>
            <Tab>Transfer</Tab>
          </TabList>

          <TabPanel>
            <SendForm router={router} />
          </TabPanel>
          <TabPanel>
            <ReceiveForm router={router} />
          </TabPanel>
          <TabPanel>
            <TransferForm router={router} />
          </TabPanel>
        </SwitchTabs>
      </div>
    )
  }
}

export default destyle(SendReceiveTabs, 'SendReceiveTabs')
