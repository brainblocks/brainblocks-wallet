// @flow
import React from 'react'
import moment from 'moment'
import { Media } from 'react-breakpoints'
import { formatFiat, formatNano, formatPercent } from '~/functions/format'
import AccountSelector from '~/components/accounts/AccountSelector'
import ArrowDownIcon from '~/static/svg/icons/arrow-down.svg'
import ArrowUpIcon from '~/static/svg/icons/arrow-down.svg'
import {
  Button,
  FormField,
  KeyValue,
  Select,
  Typography,
  Menu,
  MenuItem
} from 'brainblocks-components'
import AccountMenu from '~/components/accounts/AccountMenu'
import HistoryChart from '~/components/dashboard/HistoryChart'
import Link from 'next/link'
import MoreIcon from '~/static/svg/icons/more.svg'
import type { NormalizedState } from '~/types'
import SendReceiveIcon from '~/static/svg/icons/send-receive.svg'
import { convert } from '~/functions/convert'
import { destyle } from 'destyle'
import theme from '~/theme/theme'

type Props = {
  nanoPrice: number,
  nano24hChange: number,
  accounts: NormalizedState,
  preferredCurrency: string,
  totalBalance: number,
  accountTransactions: Array<string>,
  transactions: NormalizedState,
  /** Account Id */
  account: string,
  /** Handler for changing account */
  onSelectAccount: (SyntheticEvent<>) => mixed,
  /** Given by destyle. Do not pass this to the component as a prop. */
  styles: Object
}

type State = {
  moreOptionsOpen: boolean,
  moreOptionsAnchorEl?: {} | null
}

class DashboardHeader extends React.Component<Props, State> {
  constructor(props) {
    super(props)
    this.state = {
      moreOptionsOpen: false,
      moreOptionsAnchorEl: null
    }
  }

  buildChartData = () => {
    const {
      accountTransactions,
      transactions,
      account,
      totalBalance
    } = this.props

    // create array to hold chart data
    let chartData = []

    // filter out transactions without timestamps
    const txs = accountTransactions.filter(
      tx => transactions.byId[tx].timestamp > 0
    )

    if (!txs.length) {
      return [
        {
          date: Date.now(),
          balance: 0
        }
      ]
    }

    // check every transaction
    // keep track of the latest one
    let latestTx = txs[0]
    let maxTimestamp = 0
    for (let hash of txs) {
      // pull and break down block for hash
      const tx = transactions.byId[hash]
      const dataPoint = {
        date: tx.timestamp,
        balance: tx.balanceNano
      }

      if (tx.timestamp > maxTimestamp) {
        maxTimestamp = tx.timestamp
        latestTx = hash
      }

      /**
       * Calculating 'all' is actually a bit trickier than this.
       * Will leave it as an exercise for another day
       */
      if (account === 'all') {
        dataPoint.balance = totalBalance
      }

      chartData.push(dataPoint)
    }

    // add a data point for the current moment, equal to the latest balance
    // so that the chart doesn't end in the past
    chartData.unshift({
      date: Date.now(),
      balance: transactions.byId[latestTx].balanceNano
    })

    // return a history if we don't have one
    /*
    if (chartData.length <= 7) {
      while (chartData.length <= 7) {
        const today = moment()
          .subtract(chartData.length, 'days')
          .format('YYYY-MM-DD')
        const chartObject = { date: today, balance: 0 }
        chartData.push(chartObject)
      }
    }*/

    // return chart data
    return chartData
  }

  handleMoreOptionsOpen = e => {
    this.setState({
      moreOptionsOpen: true,
      moreOptionsAnchorEl: e.currentTarget
    })
  }

  handleMoreOptionsClose = e => {
    this.setState({
      moreOptionsOpen: false,
      moreOptionsAnchorEl: null
    })
  }

  render() {
    const {
      styles,
      nanoPrice,
      nano24hChange,
      accounts,
      totalBalance,
      account = 'all',
      onSelectAccount,
      preferredCurrency,
      transactions,
      accountTransactions,
      ...rest
    }: Props = this.props
    const { moreOptionsOpen, moreOptionsAnchorEl } = this.state
    const balance =
      account === 'all' ? totalBalance : accounts.byId[account].balance

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
              accountTitleProps={{ color: 'light' }}
              dropdownWidth={345}
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
                    <span style={{ fontSize: 12, fontWeight: '700' }}>
                      NANO
                    </span>
                  </span>
                }
              />
            </div>
            {account !== 'all' && (
              <>
                <Button
                  variant="icon"
                  destyleMerge={{ root: styles.moreButton }}
                  size={26}
                  onClick={this.handleMoreOptionsOpen}
                >
                  <MoreIcon />
                </Button>
                <AccountMenu
                  id="account-more-options"
                  account={accounts.byId[account]}
                  open={moreOptionsOpen}
                  anchorEl={moreOptionsAnchorEl}
                  onClose={this.handleMoreOptionsClose}
                  anchorOrigin={{ horizontal: 'left', vertical: 'top' }}
                  transformOrigin={{ horizontal: 'left', vertical: 'top' }}
                />
              </>
            )}
          </div>
          <div className={styles.infoRow2}>
            <div className={styles.value}>
              <KeyValue
                theme="header"
                size="sm"
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
                size="sm"
                label="Nano Price"
                value={formatFiat(nanoPrice, preferredCurrency)}
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
              <span className="send-receive-button-text">
                Send &amp; Receive
              </span>
            </span>
          </Button>
        </Link>
        <Media>
          {({ breakpoints, currentBreakpoint }) =>
            breakpoints[currentBreakpoint] >= breakpoints.tablet && (
              <div className={styles.chart}>
                <Typography
                  style={{ paddingLeft: '30px' }}
                  el="h3"
                  color="heavyOnDark"
                  spaceBelow={1.5}
                  spaceAbove={1.5}
                >
                  History
                </Typography>
                <HistoryChart
                  data={this.buildChartData()}
                  xAxisName={'date'}
                  yAxisName={'balance'}
                />
              </div>
            )
          }
        </Media>
      </div>
    )
  }
}

export default destyle(DashboardHeader, 'DashboardHeader')
