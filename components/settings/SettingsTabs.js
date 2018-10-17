// @flow
import * as React from 'react'
import { destyle } from 'destyle'
import TabsComponents from '~/bb-components/tabs/Tabs'
import UserIcon from '~/static/svg/icons/user.svg'
import AccountsIcon from '~/static/svg/icons/accounts.svg'
import ShieldIcon from '~/static/svg/icons/security.svg'
import SettingsIcon from '~/static/svg/icons/settings.svg'

const { Tabs, Tab, TabList, TabPanel } = TabsComponents

const tabIndexMap = {
  general: 0,
  profile: 1,
  security: 2,
  accounts: 3
}

type Props = {
  router: Object,
  /** Given by destyle. Do not pass this to the component as a prop. */
  styles: Object
}

type State = {
  activeTab: number
}

class SettingsTabs extends React.Component<Props, State> {
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
        <Tabs
          variant="side"
          selectedIndex={activeTab}
          onSelect={this.handleSwitchTabs}
        >
          <div className={styles.tabs}>
            <div className={styles.sidebar}>
              <TabList>
                <Tab>
                  <div className={styles.tab}>
                    <span className={styles.tabIcon}>
                      <SettingsIcon />
                    </span>
                    <span className={styles.tabName}>General</span>
                  </div>
                </Tab>
                <Tab>
                  <div className={styles.tab}>
                    <span className={styles.tabIcon}>
                      <UserIcon />
                    </span>
                    <span className={styles.tabName}>Profile</span>
                  </div>
                </Tab>
                <Tab>
                  <div className={styles.tab}>
                    <span className={styles.tabIcon}>
                      <ShieldIcon />
                    </span>
                    <span className={styles.tabName}>Security</span>
                  </div>
                </Tab>
                <Tab>
                  <div className={styles.tab}>
                    <span className={styles.tabIcon}>
                      <AccountsIcon />
                    </span>
                    <span className={styles.tabName}>Accounts</span>
                  </div>
                </Tab>
              </TabList>
            </div>
            <div className={styles.content}>
              <TabPanel>
                <div className={styles.tabPanel}>
                  <h3 className={styles.tabPanelTitle}>General</h3>
                  <div className={styles.tabPanelContent}>
                    General settings here. Default account, etc.
                  </div>
                </div>
              </TabPanel>
              <TabPanel>
                <div className={styles.tabPanel}>
                  <h3 className={styles.tabPanelTitle}>Profile</h3>
                  <div className={styles.tabPanelContent}>
                    Profile settings here.
                  </div>
                </div>
              </TabPanel>
              <TabPanel>
                <div className={styles.tabPanel}>
                  <h3 className={styles.tabPanelTitle}>Security</h3>
                  <div className={styles.tabPanelContent}>
                    Security settings here.
                  </div>
                </div>
              </TabPanel>
              <TabPanel>
                <div className={styles.tabPanel}>
                  <h3 className={styles.tabPanelTitle}>Accounts</h3>
                  <div className={styles.tabPanelContent}>
                    Accounts settings here. We need an account selector at the
                    top here to choose which account to change the settings for.
                  </div>
                </div>
              </TabPanel>
            </div>
          </div>
        </Tabs>
      </div>
    )
  }
}

export default destyle(SettingsTabs, 'SettingsTabs')
