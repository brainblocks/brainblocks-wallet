// @flow
import React from 'react'
import Link from 'next/link'
import { destyle } from 'destyle'
import type { NormalizedState } from '~/types'
import { formatNano, formatFiat, formatPercent } from '~/functions/format'
import { convert } from '~/functions/convert'
import KeyValue from '~/bb-components/key-value/KeyValue'
import Button from '~/bb-components/button/Button'
import FormField from '~/bb-components/form-field/FormField'
import Select from '~/bb-components/select/Select'
import AccountSelector from '~/components/accounts/AccountSelector'
import ArrowDownIcon from '~/static/svg/icons/arrow-down.svg'
import ArrowUpIcon from '~/static/svg/icons/arrow-down.svg'
import SendReceiveIcon from '~/static/svg/icons/send-receive.svg'
import MoreIcon from '~/static/svg/icons/more.svg'
import theme from '~/theme/theme'

type Props = {
  nanoPrice: number,
  nano24hChange: number,
  accounts: NormalizedState,
  /** Account Id */
  account: string,
  /** Handler for changing account */
  onSelectAccount: (SyntheticEvent<>) => mixed,
  /** Given by destyle. Do not pass this to the component as a prop. */
  styles: Object
}

function allAccountsBalance(accounts) {
  return accounts.allIds.reduce(
    (acc, curr) => acc + accounts.byId[curr].balance,
    0
  )
}

const DashboardHeader = ({
  styles,
  nanoPrice,
  nano24hChange,
  accounts,
  account = 'all',
  onSelectAccount,
  ...rest
}: Props) => {
  const balance =
    account === 'all'
      ? allAccountsBalance(accounts)
      : accounts.byId[account].balance

  return (
    <div className={styles.root} {...rest}>
      <div className={styles.info}>
        <div className={styles.selector}>
          <AccountSelector
            all
            theme="outlined-on-dark"
            accounts={accounts}
            account={account}
            onChange={onSelectAccount}
          />
        </div>
        <div className={styles.infoRow1}>
          <div className={styles.balance}>
            <KeyValue
              theme="header"
              size="lg"
              label="Balance"
              value={
                <span>
                  {formatNano(balance)}{' '}
                  <span style={{ fontSize: 12, fontWeight: '700' }}>NANO</span>
                </span>
              }
            />
          </div>
          <Button
            type="icon"
            destyleMerge={{ root: styles.moreButton }}
            size={26}
          >
            <MoreIcon />
          </Button>
        </div>
        <div className={styles.infoRow2}>
          <div className={styles.value}>
            <KeyValue
              theme="header"
              size="sm"
              label="Value"
              value={formatFiat(convert(balance, 'nano', nanoPrice))}
            />
          </div>
          <div className={styles.price}>
            <KeyValue
              theme="header"
              size="sm"
              label="Nano Price"
              value={formatFiat(nanoPrice)}
            />
          </div>
          <div className={styles.change}>
            <KeyValue
              theme="header"
              size="sm"
              label="Last 24h"
              value={
                <span>
                  {nano24hChange > 0 ? <ArrowUpIcon /> : <ArrowDownIcon />}{' '}
                  {formatPercent(nano24hChange, true)}
                </span>
              }
            />
          </div>
        </div>
      </div>
      <Link
        href={{
          pathname: '/send-receive',
          query: { from: account === 'all' ? null : account }
        }}
      >
        <Button
          destyleMerge={{ root: styles.sendReceiveBtn }}
          color={theme.color.palette.green}
        >
          <span className={styles.sendReceiveBtnInner}>
            <SendReceiveIcon />
            <span className="send-receive-button-text">Send &amp; Receive</span>
          </span>
        </Button>
      </Link>
      <div className={styles.chart} />
    </div>
  )
}

export default destyle(DashboardHeader, 'DashboardHeader')
