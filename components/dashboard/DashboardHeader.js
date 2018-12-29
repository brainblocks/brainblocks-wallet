/* @flow */
import { formatFiat, formatNano, formatPercent } from '~/functions/format'

import AccountSelector from '~/components/accounts/AccountSelector'
import ArrowDownIcon from '~/static/svg/icons/arrow-down.svg'
import ArrowUpIcon from '~/static/svg/icons/arrow-down.svg'
import Button from '~/bb-components/button/Button'
import FormField from '~/bb-components/form-field/FormField'
import HistoryChart from '~/bb-components/history-chart/HistoryChart'
import KeyValue from '~/bb-components/key-value/KeyValue'
import Link from 'next/link'
import MoreIcon from '~/static/svg/icons/more.svg'
import type { NormalizedState } from '~/types'
import React from 'react'
import Select from '~/bb-components/select/Select'
import SendReceiveIcon from '~/static/svg/icons/send-receive.svg'
import Typography from '~/bb-components/typography/Typography'
import { convert } from '~/functions/convert'
import { destyle } from 'destyle'
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

  const data = [
    { day: '19 Sep', price: 4000 },
    { day: '20 Sep', price: 3000 },
    { day: '21 Sep', price: 2000 },
    { day: '22 Sep', price: 1000 },
    { day: '23 Sep', price: 6000 }
  ]

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
            variant="icon"
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
          query: { tab: 'send', from: account === 'all' ? null : account }
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
      <div className={styles.chart}>
        <Typography
          style={{ paddingLeft: '20px' }}
          el="h3"
          color="heavyOnDark"
          spaceBelow={1}
          spaceAbove={1}
        >
          History
        </Typography>
        <HistoryChart
          data={data}
          xAxisName="day"
          yAxisName="price"
          strokeColor="#fff"
          width={330}
          height={150}
        />
      </div>
    </div>
  )
}

export default destyle(DashboardHeader, 'DashboardHeader')
