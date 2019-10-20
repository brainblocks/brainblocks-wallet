// @flow
import React from 'react'
import { destyle } from 'destyle'
import Link from 'next/link'
import BuyIcon from '~/static/svg/icons/buy.svg'
import SellIcon from '~/static/svg/icons/sell.svg'
import UploadIcon from '~/static/svg/icons/upload.svg'
import DownloadIcon from '~/static/svg/icons/download.svg'

type Props = {
  /** Given by destyle. Do not pass this to the component as a prop. */
  styles: Object
}

const BuySellLanding = ({ styles, ...rest }: Props) => {
  return (
    <div className={styles.root}>
      <div className={styles.optionsContainer}>
        <Link prefetch href="/buy-sell/new-trade?tab=buy">
          <button data-cy="buy-btn" className={styles.buyOption}>
            <div className={styles.iconContainer}>
              <BuyIcon />
              <div className={styles.buyIconOverlay}>
                <DownloadIcon />
              </div>
            </div>
            <h3 className={styles.optionTitle}>Buy NANO</h3>
            <p className={styles.optionDescription}>
              Trade another currency and receive NANO
            </p>
          </button>
        </Link>
        <Link prefetch href="/buy-sell/new-trade?tab=sell">
          <button data-cy="sell-btn" className={styles.sellOption}>
            <div className={styles.iconContainer}>
              <SellIcon />
              <div className={styles.sellIconOverlay}>
                <UploadIcon />
              </div>
            </div>
            <h3 className={styles.optionTitle}>Sell NANO</h3>
            <p className={styles.optionDescription}>
              Use my NANO to buy another currency
            </p>
          </button>
        </Link>
      </div>
    </div>
  )
}

export default destyle(BuySellLanding, 'BuySellLanding')
