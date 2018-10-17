// @flow
import * as React from 'react'
import { destyle } from 'destyle'
import TabsComponents from '~/bb-components/tabs/Tabs'
import SwitchTabs from '~/bb-components/switch-tabs/SwitchTabs'
import SendForm from './SendForm'

const { Tab, TabList, TabPanel } = TabsComponents

type Props = {
  /** Given by destyle. Do not pass this to the component as a prop. */
  styles: Object
}

type State = {
  activeTab: number
}

class SendReceiveTabs extends React.Component<Props, State> {
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
          <TabList>
            <Tab>Send</Tab>
            <Tab>Receive</Tab>
            <Tab>Transfer</Tab>
          </TabList>

          <TabPanel>
            <SendForm />
          </TabPanel>
          <TabPanel>Receive</TabPanel>
          <TabPanel>Transfer</TabPanel>
        </SwitchTabs>
      </div>
    )
  }
}

export default destyle(SendReceiveTabs, 'SendReceiveTabs')
