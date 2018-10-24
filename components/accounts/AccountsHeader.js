// @flow
import React from 'react'
import { destyle } from 'destyle'
import { formatNano, formatFiat, formatPercent } from '~/functions/format'
import { convert } from '~/functions/convert'
import KeyValue from '~/bb-components/key-value/KeyValue'
import Button from '~/bb-components/button/Button'
import ArrowUpIcon from '~/static/svg/icons/arrow-up.svg'
import ArrowDownIcon from '~/static/svg/icons/arrow-down.svg'

type Props = {
  balance: number,
  nanoPrice: number,
  nano24hChange: number,
  /** Given by destyle. Do not pass this to the component as a prop. */
  styles: Object
}

const AccountsHeader = ({
  styles,
  balance,
  nanoPrice,
  nano24hChange,
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
        <Button block>Add Account</Button>
      </div>
    </div>
  )
}

export default destyle(AccountsHeader, 'AccountsHeader')