Switch tabs _must_ be controlled

```js
const TabComponents = require('../tabs/Tabs').default
const { TabPanel, TabList, Tab } = TabComponents
initialState = { selectedIndex: 0 }
;<SwitchTabs
  selectedIndex={state.selectedIndex}
  onSelect={i => setState({ selectedIndex: i })}
>
  <TabList>
    <Tab>One</Tab>
    <Tab>Two</Tab>
    <Tab>Three</Tab>
  </TabList>

  <TabPanel>One</TabPanel>
  <TabPanel>Two</TabPanel>
  <TabPanel>Three</TabPanel>
</SwitchTabs>
```
