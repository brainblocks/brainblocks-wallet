import React from 'react'
import Link from 'next/link'
import { withRouter } from 'next/router'
import { destyle } from 'destyle'
import DashboardIcon from '~/static/svg/icons/dashboard.svg'
import AccountsIcon from '~/static/svg/icons/accounts.svg'
import SendReceiveIcon from '~/static/svg/icons/send-receive.svg'
import SecurityIcon from '~/static/svg/icons/shield.svg'
import SettingsIcon from '~/static/svg/icons/settings.svg'
import { connect } from 'react-redux'
import * as Auth from '~/state/actions/authActions'
import { authSelector } from '~/state/selectors/authSelectors'

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

const Header = ({ styles, children, router, auth, logout, ...rest }) => {
  return (
    <div className={styles.root} {...rest}>
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
                  className={router.pathname === item.href ? 'is-active' : ''}
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
          <div className={styles.userMenu}>
            <img
              className={styles.userAvatar}
              src="https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50?s=28"
              alt="User name"
            />
            <span className={styles.userName} onClick={logout}>
              {auth && auth.user && auth.user.username}
            </span>
            {/* @todo Dropdown menu component */}
          </div>
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = state => ({
  auth: authSelector(state)
})

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(Auth.logout())
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(destyle(Header, 'Header')))
