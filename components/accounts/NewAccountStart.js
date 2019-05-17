// @flow
import React from 'react'
import { destyle } from 'destyle'
import Link from 'next/link'
import WalletIcon from '~/static/svg/icons/wallet.svg'
import HotWalletIcon from '~/static/svg/icons/wallet-hot.svg'
import LockedIcon from '~/static/svg/icons/locked.svg'
import LightningIcon from '~/static/svg/icons/lightning.svg'

type Props = {
  /** Given by destyle. Do not pass this to the component as a prop. */
  styles: Object
}

const NewAccountStart = ({ styles }: Props) => {
  return (
    <div className={styles.root}>
      <div className={styles.optionsContainer}>
        {/* rather than a straight link, this might need to
              be a function that does some redux stuff then uses
              Router.push */}
        <Link prefetch href="/new-account/settings">
          <button className={styles.walletOption}>
            <div className={styles.iconContainer}>
              <HotWalletIcon />
              <div className={styles.walletIconOverlay}>
                <LightningIcon />
              </div>
            </div>
            <h3 className={styles.optionTitle}>Wallet</h3>
            <p className={styles.optionDescription}>
              BrainBlocks controls your funds.
              <br />
              Best for holding your spending money.
            </p>
          </button>
        </Link>
        <Link prefetch href="/new-account/vault">
          <button className={styles.vaultOption}>
            <div className={styles.iconContainer}>
              <WalletIcon />
              <div className={styles.vaultIconOverlay}>
                <LockedIcon />
              </div>
            </div>
            <h3 className={styles.optionTitle}>Vault</h3>
            <p className={styles.optionDescription}>
              Highest security. You control your funds.
              <br />
              Best option for holding your savings.
            </p>
          </button>
        </Link>
      </div>
    </div>
  )
}

export default destyle(NewAccountStart, 'NewAccountStart')
