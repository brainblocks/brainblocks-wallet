import React from 'react'
import Link from 'next/link'
import { withRouter } from 'next/router'
import { destyle } from 'destyle'
import DashboardIcon from '~/static/svg/icons/dashboard.svg'
import AccountsIcon from '~/static/svg/icons/accounts.svg'
import SendReceiveIcon from '~/static/svg/icons/send-receive.svg'
import SecurityIcon from '~/static/svg/icons/shield.svg'
import SettingsIcon from '~/static/svg/icons/settings.svg'
import CogIcon from '~/static/svg/icons/cog.svg'
import UserIcon from '~/static/svg/icons/user.svg'
import ContactsIcon from '~/static/svg/icons/users.svg'
import LogoutIcon from '~/static/svg/icons/logout.svg'
import Popover from '~/bb-components/popover/Popover'
import Button from '~/bb-components/button/Button'
import { connect } from 'react-redux'
import * as Auth from '~/state/actions/authActions'
import { getCurrentAuth } from '~/state/selectors/authSelectors'

const menuItems = [
  {
    href: '/',
    title: 'Dashboard',
    icon: <DashboardIcon />
  },
  {
    href: '/accounts',
    title: 'Accounts',
    icon: <AccountsIcon />
  },
  {
    href: '/send-receive',
    title: 'Send & Receive',
    icon: <SendReceiveIcon />
  },
  {
    href: '/security',
    title: 'Security',
    icon: <SecurityIcon />
  },
  {
    href: '/settings',
    title: 'Settings',
    icon: <SettingsIcon />
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

  render() {
    const {
      styles,
      children,
      router,
      auth,
      logout,
      variant = 'full',
      ...rest
    } = this.props
    const { userDropdownOpen, userDropdownAnchorEl } = this.state

    // variant = varient || 'full';

    return (
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
              <nav className={styles.menu}>
                <ul>
                  {menuItems.map((item, i) => (
                    <li
                      className={
                        router.pathname === item.href ? 'is-active' : ''
                      }
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
              <div
                className={styles.user}
                onClick={this.handleOpenUserDropdown}
              >
                <img
                  className={styles.userAvatar}
                  src="https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50?s=28"
                  alt="User name"
                />
                <span className={styles.userName}>
                  {auth && auth.user && auth.user.username}
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
                        <Button
                          variant="flat"
                          color="#c4c4c4"
                          destyleMerge={{
                            root: styles.userSecuritySettingsBtn
                          }}
                        >
                          <CogIcon />
                        </Button>
                      </div>
                    </div>
                  </div>
                  <div className={styles.userMenu}>
                    <ul className={styles.userMenuList}>
                      <li>
                        <i>
                          <UserIcon />
                        </i>
                        <span>Profile</span>
                      </li>
                      <li>
                        <i>
                          <ContactsIcon />
                        </i>
                        <span>Contacts</span>
                      </li>
                      <li className={styles.userMenuLogout} onClick={logout}>
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
    )
  }
}

const mapStateToProps = state => ({
  auth: getCurrentAuth(state)
})

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(Auth.logout())
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(destyle(Header, 'Header')))
