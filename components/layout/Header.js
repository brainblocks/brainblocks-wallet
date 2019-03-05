import React from 'react'
import Link from 'next/link'
import { withRouter } from 'next/router'
import { destyle } from 'destyle'
import { Media } from 'react-breakpoints'
import { cx } from 'emotion'
import { connect } from 'react-redux'
import { getIsWorking } from '~/state/selectors/uiSelectors'
import DashboardIcon from '~/static/svg/icons/dashboard.svg'
import AccountsIcon from '~/static/svg/icons/accounts.svg'
import SendReceiveIcon from '~/static/svg/icons/send-receive.svg'
import SecurityIcon from '~/static/svg/icons/shield.svg'
import SettingsIcon from '~/static/svg/icons/settings.svg'
import CogIcon from '~/static/svg/icons/cog.svg'
import UserIcon from '~/static/svg/icons/user.svg'
import ContactsIcon from '~/static/svg/icons/users.svg'
import LogoutIcon from '~/static/svg/icons/logout.svg'
import { Popover, Button, Spinner } from 'brainblocks-components'
import { getCurrentUser } from '~/state/selectors/userSelectors'

// Import selectors
import { getCurrentAuth } from '~/state/selectors/authSelectors'

// Import actions
import { creators as authActions } from '~/state/actions/authActions'

// Import API Calls
import * as AuthAPI from '~/state/api/auth'

const menuItems = [
  {
    href: '/',
    title: 'Dashboard',
    icon: <DashboardIcon />,
    mobile: true
  },
  {
    href: '/accounts',
    title: 'Accounts',
    icon: <AccountsIcon />,
    mobile: true
  },
  {
    href: '/send-receive',
    title: 'Send & Receive',
    icon: <SendReceiveIcon />,
    mobile: true
  },
  /* This has some problems - like if I'm already on the settings page, clicking it does nothing (regardless of which tab I'm on)
  {
    href: {
      pathname: '/settings',
      query: { tab: 'security' }
    },
    title: 'Security',
    icon: <SecurityIcon />,
    mobile: false
  },*/
  {
    href: '/settings',
    title: 'Settings',
    icon: <SettingsIcon />,
    mobile: true
  }
]

class Header extends React.Component {
  state = {
    userDropdownOpen: false,
    userDropdownAnchorEl: null
  }

  handleOpenUserDropdown = (e, el = null) => {
    this.setState({
      userDropdownOpen: true,
      userDropdownAnchorEl: null || e.currentTarget
    })
  }

  handleCloseUserDropdown = e => {
    this.setState({
      userDropdownOpen: false,
      userDropdownAnchorEl: null
    })
  }

  logout = async () => {
    await AuthAPI.logout()
    this.props.logout()
  }

  render() {
    const {
      styles,
      children,
      router,
      auth,
      user,
      isWorking,
      variant = 'full',
      logout,
      ...rest
    } = this.props
    const { userDropdownOpen, userDropdownAnchorEl } = this.state

    return (
      <>
        <div className={styles.root} {...rest}>
          {variant === 'bare' && (
            <div className={styles.fullWidth}>
              <div className={styles.logotype}>
                <img
                  src="/static/svg/brainblocks-logotype-white.svg"
                  alt="BrainBlocks Logo"
                />
              </div>
            </div>
          )}
          {variant === 'full' && (
            <div className={styles.pageWidth}>
              <div className={styles.inner}>
                <div className={styles.logo}>
                  <Link href="/">
                    <img
                      src="/static/svg/brainblocks-symbol.svg"
                      alt="BrainBlocks Logo"
                    />
                  </Link>
                </div>
                <Media>
                  {({ breakpoints, currentBreakpoint }) =>
                    breakpoints[currentBreakpoint] >= breakpoints.tablet && (
                      <nav className={styles.menu}>
                        <ul>
                          {menuItems.map((item, i) => (
                            <li
                              className={cx({
                                'is-active': router.pathname === item.href,
                                'hide-mobile': !item.mobile
                              })}
                              key={`menu-item-${i}`}
                            >
                              <Link prefetch href={item.href}>
                                <a>
                                  {item.icon}
                                  <span>{item.title}</span>
                                </a>
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </nav>
                    )
                  }
                </Media>
                {isWorking && (
                  <div className={styles.spinner}>
                    <Spinner size={24} color="#FFF" />
                  </div>
                )}
                <div
                  className={styles.user}
                  onClick={this.handleOpenUserDropdown}
                >
                  <img
                    className={styles.userAvatar}
                    src={`https://robohash.org/${
                      user.email
                    }?gravatar=yes&set=set3&bgset=bg2&size=28x28`}
                    alt={user.username}
                  />
                  <span className={styles.userName}>
                    {user && user.username}
                  </span>
                </div>
                <Popover
                  open={userDropdownOpen}
                  anchorEl={userDropdownAnchorEl}
                  onClose={this.handleCloseUserDropdown}
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right'
                  }}
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right'
                  }}
                  transitionDuration={50}
                  destyleMerge={{ root: styles.userDropdown }}
                >
                  <div className={styles.userDropdownInner}>
                    <div className={styles.userSecurity}>
                      <div className={styles.userSecurityIcon}>
                        <SecurityIcon />
                      </div>
                      <div className={styles.userSecurityContent}>
                        <h4 className={styles.userSecurityTitle}>
                          Wallet Locked
                        </h4>
                        <p className={styles.userSecurityDescription}>
                          Your funds are secure
                        </p>
                        <div className={styles.userSecurityButtons}>
                          <Button
                            variant="flat"
                            color="red"
                            block
                            destyleMerge={{ root: styles.userSecurityLockBtn }}
                          >
                            Unlock
                          </Button>
                          <Link href="/settings?tab=security">
                            <Button
                              variant="flat"
                              color="#c4c4c4"
                              destyleMerge={{
                                root: styles.userSecuritySettingsBtn
                              }}
                              el="a"
                            >
                              <CogIcon />
                            </Button>
                          </Link>
                        </div>
                      </div>
                    </div>
                    <div className={styles.userMenu}>
                      <ul className={styles.userMenuList}>
                        <Link href="/settings?tab=profile">
                          <li>
                            <i>
                              <UserIcon />
                            </i>
                            <span>Profile</span>
                          </li>
                        </Link>
                        {/*<li>
                          <i>
                            <ContactsIcon />
                          </i>
                          <span>Contacts</span>
                        </li>*/}
                        <li
                          className={styles.userMenuLogout}
                          onClick={this.logout}
                        >
                          <i>
                            <LogoutIcon />
                          </i>
                          <span>Logout</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </Popover>
              </div>
            </div>
          )}
        </div>
        {variant === 'full' && (
          <Media>
            {({ breakpoints, currentBreakpoint }) =>
              breakpoints[currentBreakpoint] < breakpoints.tablet && (
                <nav className={styles.bottomTabs}>
                  <ul>
                    {menuItems
                      .filter(item => item.mobile)
                      .map((item, i) => (
                        <li
                          className={cx({
                            'is-active': router.pathname === item.href,
                            'hide-mobile': !item.mobile
                          })}
                          key={`menu-item-${i}`}
                        >
                          <Link prefetch href={item.href}>
                            <a>
                              {item.icon}
                              <span>{item.title}</span>
                            </a>
                          </Link>
                        </li>
                      ))}
                  </ul>
                </nav>
              )
            }
          </Media>
        )}
      </>
    )
  }
}

const mapStateToProps = state => ({
  auth: getCurrentAuth(state),
  user: getCurrentUser(state),
  isWorking: getIsWorking(state)
})

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(authActions.logout())
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(destyle(Header, 'Header')))
