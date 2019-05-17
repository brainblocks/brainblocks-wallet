// @flow
import * as React from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { withRouter } from 'next/router'
import { withBreakpoints } from 'react-breakpoints'
import { destyle } from 'destyle'
import CollapseTabs from 'brainblocks-components/build/CollapseTabs'
import { withSnackbar } from 'brainblocks-components/build/Snackbar'
import BackIcon from '~/static/svg/icons/arrow-left.svg'
import UserIcon from '~/static/svg/icons/user.svg'
import AccountsIcon from '~/static/svg/icons/accounts.svg'
import ShieldIcon from '~/static/svg/icons/security.svg'
import SettingsIcon from '~/static/svg/icons/settings.svg'
import GeneralSettings from './GeneralSettings'
import ProfileSettings from './ProfileSettings'
import SecuritySettings from './SecuritySettings'
import AccountSettings from './AccountSettings'
import {
  getCurrentUser,
  getDefaultAccount
} from '~/state/selectors/userSelectors'
import { getAccounts } from '~/state/selectors/accountSelectors'
import type { WithSnackbar, WithRouter, WithBreakpoints } from '~/types'
import type { AccountsState, UserState } from '~/types/reduxTypes'
import { updateUser, enableIpAuth } from '~/state/thunks/userThunks'
import { getKeyByValue } from '~/functions/util'
import { getSupportedCurrencies } from '~/state/selectors/priceSelectors'
import { ContentHeightContext } from '~/components/layout/PageContent'

const tabIndexMap = {
  general: 0,
  profile: 1,
  security: 2,
  accounts: 3
}
const collapseBreakpoint = 'small'

type Props = WithSnackbar &
  WithRouter &
  WithBreakpoints & {
    user: UserState,
    defaultAccount: string,
    accounts: AccountsState,
    currentBreakpoint: string,
    supportedCurrencies: Array<string>,
    updateUser: Object => void,
    enableIpAuth: () => Promise<void>,
    /** Given by destyle. Do not pass this to the component as a prop. */
    styles: Object
  }

type State = {
  activeTab: number,
  viewingTab: boolean
}

class SettingsTabs extends React.Component<Props, State> {
  static contextType = ContentHeightContext

  constructor(props) {
    super(props)
    this.state = {
      // XSS-safe
      activeTab: tabIndexMap.hasOwnProperty(this.props.router.query.tab)
        ? tabIndexMap[this.props.router.query.tab]
        : 0,
      viewingTab: Boolean(
        typeof tabIndexMap[props.router.query.tab] === 'number'
      )
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
    const tab = getKeyByValue(tabIndexMap, index)
    this.setState(
      {
        activeTab: index,
        viewingTab: this.getCollapsed()
      },
      () => {
        this.props.router.push({
          pathname: '/settings',
          search: tab ? `?tab=${tab}` : ''
        })
      }
    )
  }

  handleUpdateUser = (
    user,
    successMsg = 'User settings updated',
    errorMsg = "Couldn't update user settings"
  ) => {
    // $FlowFixMe
    this.props
      .updateUser(user)
      .then(updatedUser =>
        this.props.enqueueSnackbar(successMsg, {
          variant: 'success'
        })
      )
      .catch(e => this.props.enqueueSnackbar(errorMsg, { variant: 'error' }))
  }

  handleEnableIpAuth = () => {
    this.props
      .enableIpAuth()
      .then(updatedUser =>
        this.props.enqueueSnackbar('IP auth enabled', {
          variant: 'success'
        })
      )
      .catch(e =>
        this.props.enqueueSnackbar("Couldn't enable IP auth.", {
          variant: 'error'
        })
      )
  }

  render() {
    const {
      styles,
      router,
      user,
      defaultAccount,
      accounts,
      supportedCurrencies
    } = this.props
    const { activeTab, viewingTab } = this.state
    const collapsed = this.getCollapsed()
    const contentHeight = this.context
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
                <div
                  className={styles.tabPanel}
                  style={{ minHeight: contentHeight }}
                >
                  <h3 className={styles.tabPanelTitle}>General Settings</h3>
                  <div className={styles.tabPanelContent}>
                    <GeneralSettings
                      user={user}
                      accounts={accounts}
                      supportedCurrencies={supportedCurrencies}
                      defaultAccount={defaultAccount || accounts.allIds[0]}
                      onUpdateUser={this.handleUpdateUser}
                    />
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
                    <ProfileSettings user={user} />
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
                    <SecuritySettings
                      user={user}
                      onUpdateUser={this.handleUpdateUser}
                      onEnableIpAuth={this.handleEnableIpAuth}
                    />
                  </div>
                </div>
              )
            },
            {
              title: (
                <div className={styles.tab}>
                  <span className={styles.tabIcon}>
                    <AccountsIcon user={user} />
                  </span>
                  <span className={styles.tabName}>Accounts</span>
                </div>
              ),
              content: (
                <div className={styles.tabPanel}>
                  <h3 className={styles.tabPanelTitle}>Account Settings</h3>
                  <div className={styles.tabPanelContent}>
                    <AccountSettings router={router} />
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

const mapStateToProps = state => ({
  user: getCurrentUser(state),
  accounts: getAccounts(state),
  defaultAccount: getDefaultAccount(state),
  supportedCurrencies: getSupportedCurrencies(state)
})

const mapDispatchToProps = {
  updateUser,
  enableIpAuth
}

export default compose(
  withSnackbar,
  withRouter,
  withBreakpoints,
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(destyle(SettingsTabs, 'SettingsTabs'))
