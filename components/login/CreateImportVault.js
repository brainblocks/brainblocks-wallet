// @flow
import React from 'react'
import { destyle } from 'destyle'
import Link from 'next/link'
import WalletIcon from '~/static/svg/icons/wallet.svg'
import PlusIcon from '~/static/svg/icons/plus.svg'
import DownloadIcon from '~/static/svg/icons/download.svg'

type Props = {
  /** Given by destyle. Do not pass this to the component as a prop. */
  styles: Object
}

const NewAccountStart = ({ styles, ...rest }: Props) => {
  return (
    <div className={styles.root}>
      <div className={styles.optionsContainer}>
        {/* rather than a straight link, this might need to
              be a function that does some redux stuff then uses
              Router.push */}
        <Link prefetch href="/new-account/vault?tab=create">
          <button className={styles.vaultOption}>
            <div className={styles.iconContainer}>
              <WalletIcon />
              <div className={styles.vaultIconOverlay}>
                <PlusIcon />
              </div>
            </div>
            <h3 className={styles.optionTitle}>Create</h3>
            <p className={styles.optionDescription}>
              I want to create a new Nano wallet
            </p>
          </button>
        </Link>
        <Link prefetch href="/new-account/vault?tab=import">
          <button className={styles.walletOption}>
            <div className={styles.iconContainer}>
              <WalletIcon />
              <div className={styles.walletIconOverlay}>
                <DownloadIcon />
              </div>
            </div>
            <h3 className={styles.optionTitle}>Import</h3>
            <p className={styles.optionDescription}>
              I have a Nano wallet seed ready to import
            </p>
          </button>
        </Link>
      </div>
    </div>
  )
}

export default destyle(NewAccountStart, 'NewAccountStart')
