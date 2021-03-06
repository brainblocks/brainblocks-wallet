// @flow
import React from 'react'
import { destyle } from 'destyle'
import { formatNano, formatFiat /*formatPercent*/ } from '~/functions/format'
import { convert } from '~/functions/convert'
import Link from 'next/link'
import Button from 'brainblocks-components/build/Button'
import KeyValue from 'brainblocks-components/build/KeyValue'
/*
import ArrowUpIcon from '~/static/svg/icons/arrow-up.svg'
import ArrowDownIcon from '~/static/svg/icons/arrow-down.svg'
*/
import type { WithSnackbar } from '~/types'

type Props = WithSnackbar & {
  balance: number,
  nanoPrice: number,
  nano24hChange: number,
  preferredCurrency: string,
  onAddAccount: () => mixed,
  /** Given by destyle. Do not pass this to the component as a prop. */
  styles: Object
}

const AccountsHeader = ({
  styles,
  balance,
  nanoPrice,
  //nano24hChange,
  preferredCurrency
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
          value={formatFiat(
            convert(balance, 'nano', nanoPrice),
            preferredCurrency
          )}
        />
      </div>
      <div className={styles.price}>
        <KeyValue
          theme="header"
          label="Nano Price"
          value={formatFiat(nanoPrice, preferredCurrency)}
        />
      </div>
      {/*<div className={styles.change}>
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
      </div>*/}
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

export default destyle(AccountsHeader, 'AccountsHeader')
