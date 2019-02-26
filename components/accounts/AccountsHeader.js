// @flow
import React from 'react'
import { destyle } from 'destyle'
import { withSnackbar } from 'notistack'
import { formatNano, formatFiat, formatPercent } from '~/functions/format'
import { convert } from '~/functions/convert'
import Link from 'next/link'
import { KeyValue, Button } from 'brainblocks-components'
import ArrowUpIcon from '~/static/svg/icons/arrow-up.svg'
import ArrowDownIcon from '~/static/svg/icons/arrow-down.svg'

type Props = {
  balance: number,
  nanoPrice: number,
  nano24hChange: number,
  onAddAccount: () => mixed,
  /** Given by destyle. Do not pass this to the component as a prop. */
  styles: Object,
  /** Given by notistack */
  enqueueSnackbar: () => void
}

const AccountsHeader = ({
  styles,
  balance,
  nanoPrice,
  nano24hChange,
  enqueueSnackbar,
  ...rest
}: Props) => {
  return (
    <div className={styles.root}>
      <div className={styles.total}>
        <KeyValue
          theme="header"
          label="Balance"
          value={
            <span>
              {formatNano(balance)}{' '}
              <span style={{ fontSize: '50%', fontWeight: '700' }}>NANO</span>
            </span>
          }
        />
      </div>
      <div className={styles.value}>
        <KeyValue
          theme="header"
          label="Value"
          value={formatFiat(convert(balance, 'nano', nanoPrice))}
        />
      </div>
      <div className={styles.price}>
        <KeyValue
          theme="header"
          label="Nano Price"
          value={formatFiat(nanoPrice)}
        />
      </div>
      <div className={styles.change}>
        <KeyValue
          theme="header"
          label="Last 24h"
          value={
            <span>
              {nano24hChange > 0 ? <ArrowUpIcon /> : <ArrowDownIcon />}{' '}
              {formatPercent(nano24hChange, true)}
            </span>
          }
        />
      </div>
      <div className={styles.new}>
        <Link prefetch href="/new-account/settings">
          <Button block el="a">
            Add Account
          </Button>
        </Link>
      </div>
    </div>
  )
}

export default withSnackbar(destyle(AccountsHeader, 'AccountsHeader'))
