// @flow
import React from 'react'
import { destyle } from 'destyle'
import WalletIcon from '~/static/svg/icons/wallet.svg'
import HotWalletIcon from '~/static/svg/icons/wallet-hot.svg'

type Props = {
  /** Account object */
  account: Object,
  /** Include sub title */
  sub?: boolean,
  /** Given by destyle. Do not pass this to the component as a prop. */
  styles: Object
}

const AccountTitle = ({ styles, account, sub = false, ...rest }: Props) => {
  const Icon = account.type === 'nano' ? HotWalletIcon : WalletIcon

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

export default destyle(AccountTitle, 'AccountTitle')
