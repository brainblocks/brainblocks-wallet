// @flow
import React from 'react'
import { destyle } from 'destyle'
import { getAccountById } from '~/functions/accounts'
import NanoAddress from '~/bb-components/nano-address/NanoAddress'
import WalletIcon from '~/static/svg/icons/wallet.svg'
import WalletsIcon from '~/static/svg/icons/wallets.svg'
import HotWalletIcon from '~/static/svg/icons/wallet-hot.svg'

type Props = {
  /** Account object */
  account?: Object,
  /** Include sub title */
  sub?: boolean,
  /** Override title */
  overrideTitle?: string,
  /** Override subtitle */
  overrideSubTitle?: string,
  /** Override icon */
  icon?: string,
  /** Given by destyle. Do not pass this to the component as a prop. */
  styles: Object
}

const AccountTitle = ({
  styles,
  account,
  sub = false,
  overrideTitle,
  overrideSubTitle,
  overrideIcon,
  ...rest
}: Props) => {
  // Icon
  let Icon = WalletIcon
  if (account) {
    Icon = account.type === 'nano' ? HotWalletIcon : WalletIcon
  }
  switch (overrideIcon) {
    case 'hot':
      Icon = HotWalletIcon
      break
    case 'wallets':
      Icon = WalletsIcon
      break
    default:
      break
  }
  // Title
  let title = '???'
  if (account) {
    title = account === 'all' ? 'All Accounts' : account.name
    if (account.type === 'nanoAddress' && !account.name) {
      title = <NanoAddress address={account.address} />
    }
  }
  if (overrideTitle) {
    title = overrideTitle
  }
  // Subtitle
  let subtitle = ''
  if (sub) {
    if (account) {
      if (account.type === 'nanoAddress' && account.name) {
        subtitle = <NanoAddress address={account.address} />
      } else {
        subtitle = '@todo-subtitle'
      }
    }
    if (overrideSubTitle) {
      subtitle = overrideSubTitle
    }
  }

  return (
    <div className={styles.root}>
      <div className={styles.icon}>
        <Icon />
      </div>
      <h4 className={styles.title}>{title}</h4>
      {!!sub && !!subtitle && <p className={styles.subTitle}>{subtitle}</p>}
    </div>
  )

  if (account === 'all') {
    return (
      <div className={styles.root}>
        <div className={styles.icon}>
          <WalletsIcon />
        </div>
        <h4 className={styles.title}>{!!title ? title : 'All Accounts'}</h4>
      </div>
    )
  } else {
    return (
      <div className={styles.root}>
        <div className={styles.icon}>
          <Icon />
        </div>
        <h4 className={styles.title}>{!!title ? title : account.name}</h4>
        {!!sub && (
          <p className={styles.subTitle}>
            {!!subTitle ? subTitle : '@todo-subtitle'}
          </p>
        )}
      </div>
    )
  }
}

export default destyle(AccountTitle, 'AccountTitle')
