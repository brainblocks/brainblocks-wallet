// @flow
import React from 'react'
import { Media } from 'react-breakpoints'
import { formatFiat, formatNano, formatPercent } from '~/functions/format'
import { getAccountById } from '~/functions/accounts'
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
  addresses: NormalizedState,
  preferredCurrency: string,
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

function allAccountsBalance(accounts) {
  return accounts.allIds.reduce(
    (acc, curr) => acc + accounts.byId[curr].balance,
    0
  )
}

const data = [
  { date: '2018-07-19', balance: 100 },
  { date: '2018-07-20', balance: 300 },
  { date: '2018-07-21', balance: 1500 },
  { date: '2018-07-22', balance: 600 },
  { date: '2018-07-23', balance: 400 }
]

class DashboardHeader extends React.Component<Props, State> {
  state = {
    moreOptionsOpen: false,
    moreOptionsAnchorEl: null
  }

  handleMoreOptionsOpen = e => {
    this.setState({
      moreOptionsOpen: true,
      moreOptionsAnchorEl: e.currentTarget
    })
  }

  handleMoreOptionsClose = e => {
    this.setState({ moreOptionsOpen: false, moreOptionsAnchorEl: null })
  }

  render() {
    const {
      styles,
      nanoPrice,
      nano24hChange,
      accounts,
      addresses,
      account = 'all',
      onSelectAccount,
      preferredCurrency,
      ...rest
    }: Props = this.props
    const { moreOptionsOpen, moreOptionsAnchorEl } = this.state
    const balance =
      account === 'all'
        ? allAccountsBalance(accounts)
        : getAccountById(account).balance

    return (
      <div className={styles.root} {...rest}>
        <div className={styles.info}>
          <div className={styles.selector}>
            <AccountSelector
              all
              theme="outlined-on-dark"
              accounts={{ items: [], itemsById: {} }}
              account={account}
              addresses={addresses}
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
              <Button
                variant="icon"
                destyleMerge={{ root: styles.moreButton }}
                size={26}
                onClick={this.handleMoreOptionsOpen}
              >
                <MoreIcon />
                <AccountMenu
                  id="account-more-options"
                  account={account}
                  open={moreOptionsOpen}
                  anchorEl={moreOptionsAnchorEl}
                  onClose={this.handleMoreOptionsClose}
                  anchorOrigin={{ horizontal: 'left', vertical: 'top' }}
                  transformOrigin={{ horizontal: 'left', vertical: 'top' }}
                />
              </Button>
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
                  data={data}
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
