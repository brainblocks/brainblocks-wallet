// @flow
import * as React from 'react'
import { destyle } from 'destyle'
import TabsComponents from '~/bb-components/tabs/Tabs'

const { Tabs, Tab, TabList, TabPanel } = TabsComponents

type Props = {
  selectedIndex: number,
  children: React.Node
}

/**
 * SwitchTabs simply adds a `variant` property to the
 * Tabs component. It also handles finding the offset and width
 * of the active tab so that you can have a sliding
 * switch behind it.
 */
class SwitchTabs extends React.Component<Props> {
  tabs: ?HTMLElement

  componentDidMount() {
    // immediately re-render with filled refs
    this.forceUpdate()
  }

  render() {
    const { children, selectedIndex, ...rest } = this.props
    let activeTab: ?HTMLElement
    let tabLeft = 0
    let tabWidth = 0
    if (this.tabs) {
      activeTab = this.tabs.querySelectorAll('.react-tabs__tab')[selectedIndex]
      if (activeTab) {
        tabLeft = activeTab.offsetLeft
        tabWidth = activeTab.offsetWidth
      }
    }
    return (
      <Tabs
        variant="switch"
        selectedIndex={selectedIndex}
        domRef={node => (this.tabs = node)}
        activeTabLeft={tabLeft}
        activeTabWidth={tabWidth}
        {...rest}
      >
        {children}
      </Tabs>
    )
  }
}

export default SwitchTabs
