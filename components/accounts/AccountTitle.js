// @flow
import React from 'react'
import { destyle } from 'destyle'
import WalletIcon from '~/static/svg/icons/wallet.svg'
import WalletsIcon from '~/static/svg/icons/wallets.svg'
import HotWalletIcon from '~/static/svg/icons/wallet-hot.svg'

type Props = {
  /** Account object */
  account?: Object,
  /** Include sub title */
  sub?: boolean,
  /** Given by destyle. Do not pass this to the component as a prop. */
  styles: Object
}

const AccountTitle = ({
  styles,
  account = 'all',
  sub = false,
  ...rest
}: Props) => {
  const Icon = account.type === 'nano' ? HotWalletIcon : WalletIcon

  if (account === 'all') {
    return (
      <div className={styles.root}>
        <div className={styles.icon}>
          <WalletsIcon />
        </div>
        <h4 className={styles.title}>All Accounts</h4>
      </div>
    )
  } else {
    return (
      <div className={styles.root}>
        <div className={styles.icon}>
          <Icon />
        </div>
        <h4 className={styles.title}>{account.name}</h4>
        {!!sub && <p className={styles.subTitle}>@todo-subtitle</p>}
      </div>
    )
  }
}

export default destyle(AccountTitle, 'AccountTitle')
