// @flow
import * as React from 'react'
import { destyle } from 'destyle'
import { Tabs as ReactTabs, Tab, TabList, TabPanel } from 'react-tabs'

type Props = {
  children?: React.Node,
  activeTabWidth?: number,
  activeTabLeft?: number,
  /** Used by destyle for styling */
  variant?: string,
  /** Given by destyle. Do not pass this to the component as a prop. */
  styles: Object
}

/**
 * Tabs
 * The Tabs component is a simple wrapper around `react-tabs` that adds
 * destyled classNames. Check the `react-tabs` docs for the full API.
 */
const Tabs = ({
  children,
  activeTabWidth,
  activeTabLeft,
  variant,
  styles,
  ...rest
}: Props) => (
  <ReactTabs className={styles.tabs} {...rest}>
    {children}
  </ReactTabs>
)

export default {
  TabPanel,
  TabList,
  Tab,
  Tabs: destyle(Tabs, 'BB-Tabs')
}
