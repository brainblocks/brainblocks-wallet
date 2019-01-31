// @flow
import * as React from 'react'
import { withBreakpoints } from 'react-breakpoints'
import { destyle } from 'destyle'
import { CollapseTabs } from 'brainblocks-components'
import BackIcon from '~/static/svg/icons/arrow-left.svg'
import UserIcon from '~/static/svg/icons/user.svg'
import AccountsIcon from '~/static/svg/icons/accounts.svg'
import ShieldIcon from '~/static/svg/icons/security.svg'
import SettingsIcon from '~/static/svg/icons/settings.svg'
import GeneralSettings from './GeneralSettings'
import ProfileSettings from './ProfileSettings'
import SecuritySettings from './SecuritySettings'
import AccountSettings from './AccountSettings'

const tabIndexMap = {
  general: 0,
  profile: 1,
  security: 2,
  accounts: 3
}
const collapseBreakpoint = 'small'

type Props = {
  breakpoints: {
    mobile?: number,
    small?: number,
    tablet?: number,
    medium?: number,
    desktop?: number,
    large?: number
  },
  currentBreakpoint: string,
  router: Object,
  /** Given by destyle. Do not pass this to the component as a prop. */
  styles: Object
}

type State = {
  activeTab: number,
  viewingTab: boolean
}

class SettingsTabs extends React.Component<Props, State> {
  constructor(props) {
    super()
    this.state = {
      activeTab: tabIndexMap[props.router.query.tab] || 0,
      viewingTab: false
    }
  }

  getCollapsed = () => {
    const { breakpoints, currentBreakpoint } = this.props
    return breakpoints[currentBreakpoint] < breakpoints[collapseBreakpoint]
  }

  handleBack = () => {
    this.setState({
      viewingTab: false
    })
  }

  handleSwitchTabs = (index: number, lastIndex: number, event: Event) => {
    this.setState({
      activeTab: index,
      viewingTab: this.getCollapsed()
    })
  }

  render() {
    const {
      styles,
      router,
      breakpoints,
      currentBreakpoint,
      ...rest
    } = this.props
    const { activeTab, viewingTab } = this.state
    const collapsed = this.getCollapsed()
    return (
      <div className={styles.root}>
        <CollapseTabs
          collapsed={collapsed}
          onSelect={this.handleSwitchTabs}
          onBack={this.handleBack}
          activeTab={activeTab}
          viewingTab={viewingTab}
          backButtonContent={
            <div className={styles.back}>
              <span className={styles.backIcon}>
                <BackIcon />
              </span>
              <span className={styles.backText}>Back</span>
            </div>
          }
          tabsProps={{ variant: 'side' }}
          tabs={[
            {
              title: (
                <div className={styles.tab}>
                  <span className={styles.tabIcon}>
                    <SettingsIcon />
                  </span>
                  <span className={styles.tabName}>General</span>
                </div>
              ),
              content: (
                <div className={styles.tabPanel}>
                  <h3 className={styles.tabPanelTitle}>General Settings</h3>
                  <div className={styles.tabPanelContent}>
                    <GeneralSettings defaultAccount={'abcd'} />
                  </div>
                </div>
              )
            },
            {
              title: (
                <div className={styles.tab}>
                  <span className={styles.tabIcon}>
                    <UserIcon />
                  </span>
                  <span className={styles.tabName}>Profile</span>
                </div>
              ),
              content: (
                <div className={styles.tabPanel}>
                  <h3 className={styles.tabPanelTitle}>Profile Settings</h3>
                  <div className={styles.tabPanelContent}>
                    <ProfileSettings
                      userName={'Angus Russell'}
                      userEmail={'angus@brainblocks.io'}
                    />
                  </div>
                </div>
              )
            },
            {
              title: (
                <div className={styles.tab}>
                  <span className={styles.tabIcon}>
                    <ShieldIcon />
                  </span>
                  <span className={styles.tabName}>Security</span>
                </div>
              ),
              content: (
                <div className={styles.tabPanel}>
                  <h3 className={styles.tabPanelTitle}>Security Settings</h3>
                  <div className={styles.tabPanelContent}>
                    <SecuritySettings />
                  </div>
                </div>
              )
            },
            {
              title: (
                <div className={styles.tab}>
                  <span className={styles.tabIcon}>
                    <AccountsIcon />
                  </span>
                  <span className={styles.tabName}>Accounts</span>
                </div>
              ),
              content: (
                <div className={styles.tabPanel}>
                  <h3 className={styles.tabPanelTitle}>Account Settings</h3>
                  <div className={styles.tabPanelContent}>
                    <AccountSettings account={'abcd'} />
                  </div>
                </div>
              )
            }
          ]}
        />
      </div>
    )
  }
}

export default withBreakpoints(destyle(SettingsTabs, 'SettingsTabs'))
