import React from 'react'
import Link from 'next/link'
import { withRouter } from 'next/router'
import { destyle } from 'destyle'
import DashboardIcon from '~/static/svg/icons/dashboard.svg'
import AccountsIcon from '~/static/svg/icons/accounts.svg'
import SecurityIcon from '~/static/svg/icons/security.svg'
import SettingsIcon from '~/static/svg/icons/settings.svg'

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
    href: '/settings',
    title: 'Security',
    icon: <SecurityIcon />
  },
  {
    href: '/settings',
    title: 'Settings',
    icon: <SettingsIcon />
  }
]

const Header = ({ styles, children, router, ...rest }) => {
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
                  <Link href={item.href}>
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
            <span className={styles.userName}>User name</span>
            {/* @todo Dropdown menu component */}
          </div>
        </div>
      </div>
    </div>
  )
}

export default withRouter(destyle(Header, 'Header'))
