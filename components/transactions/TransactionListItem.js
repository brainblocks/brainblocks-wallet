// @flow
import * as React from 'react'
import { destyle } from 'destyle'
import { formatTimeAgo, formatNano } from '~/functions/format'
import NanoAddress from 'brainblocks-components/build/NanoAddress'
import KeyValue from 'brainblocks-components/build/KeyValue'
import Spinner from 'brainblocks-components/build/Spinner'
import Button from 'brainblocks-components/build/Button'
import TransactionImage from './TransactionImage'
import AccountTitle from '~/components/accounts/AccountTitle'
import TransactionMenu from './TransactionMenu'
import MoreIcon from '~/static/svg/icons/more.svg'
import type { ReduxTransaction, AccountsState, Trade } from '~/types/reduxTypes'

type Props = {
  styles: Object,
  transaction: ReduxTransaction,
  account?: Object,
  accounts: AccountsState,
  trade?: Trade
}

type State = {
  isExpanded: boolean,
  moreOptionsOpen: boolean,
  moreOptionsAnchorEl: mixed
}

class TransactionListItem extends React.Component<Props, State> {
  state = {
    isExpanded: false,
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

  /**
   * Get the contact info based on the transaction
   */
  getContactInfo = data => {
    const { tx, accounts, trade } = data

    if (trade) {
      return {
        title: 'BrainBlocks',
        subTitle: 'Buy & Sell'
      }
    }

    let contactInfo: { title: string, subTitle: string | React.Node } = {
      title: 'Unknown',
      subTitle: ''
    }
    // console.log('tx: ', tx);

    switch (tx.type) {
      case 'receive':
        if (tx.linkAddress) {
          if (accounts.byId.hasOwnProperty(tx.linkAddress)) {
            contactInfo.title = accounts.byId[tx.linkAddress].label
          }
          contactInfo.subTitle = <NanoAddress address={tx.linkAddress} />
        }
        /* else if (tx.fromType === 'account') {
          // @todo get info by account Id
          contactInfo.title = 'Rahim Sterling'
          contactInfo.subTitle = '@rahim1984'
        }*/
        break
      case 'open':
        if (tx.linkAddress) {
          if (accounts.byId.hasOwnProperty(tx.linkAddress)) {
            contactInfo.title = accounts.byId[tx.linkAddress].label
          }
          contactInfo.subTitle = <NanoAddress address={tx.linkAddress} />
        }
        /* else if (tx.fromType === 'account') {
          // @todo get info by account Id
          contactInfo.title = 'Rahim Sterling'
          contactInfo.subTitle = '@rahim1984'
        }*/
        break
      case 'send':
        if (tx.linkAddress) {
          if (accounts.byId.hasOwnProperty(tx.linkAddress)) {
            contactInfo.title = accounts.byId[tx.linkAddress].label
          }
          contactInfo.subTitle = <NanoAddress address={tx.linkAddress} />
        }
        /* else if (tx.toType === 'account') {
          // @todo get info by account Id
          contactInfo.title = 'Rahim Sterling'
          contactInfo.subTitle = '@rahim1984'
        }*/
        break
    }
    return contactInfo
  }

  /**
   * Render a single transaction as a table row
   */
  render() {
    const { styles, transaction, account, accounts, trade } = this.props
    const { moreOptionsOpen, moreOptionsAnchorEl } = this.state
    const tx = transaction
    const data = { tx, accounts, trade }
    const contactInfo = this.getContactInfo(data)
    const isTrade = trade != null
    let tradeMsg = ''
    if (trade != null) {
      const isSell = trade.fromCurrency === 'nano'
      if (isSell) {
        let buyAmount = 0
        if (typeof trade.amountReceive === 'number') {
          buyAmount = trade.amountReceive
        } else if (typeof trade.expectedReceiveAmount === 'number') {
          buyAmount = trade.expectedReceiveAmount
        }
        tradeMsg = `Buy ${buyAmount} ${trade.toCurrency.toUpperCase()}`
      } else {
        tradeMsg = `Bought NANO with ${trade.fromCurrency.toUpperCase()}`
      }
    }

    return (
      <tr data-hash={tx.id} data-type={tx.type}>
        <td className={styles.imgCol}>
          <TransactionImage transaction={tx} trade={trade} />
        </td>
        {!!account && (
          <td className={styles.accountCol}>
            <AccountTitle account={account} sub />
          </td>
        )}
        <td className={styles.contactCol}>
          <KeyValue
            label={contactInfo.title}
            value={contactInfo.subTitle}
            destyleMerge={{
              key: styles.contactTitle,
              value: styles.contactSubtitle
            }}
            keyEl="h4"
            valueEl="span"
          />
        </td>
        <td className={styles.noteCol}>
          {tx.note ? (
            <span className={styles.note}>{tx.note}</span>
          ) : isTrade ? (
            <span className={styles.note}>{tradeMsg}</span>
          ) : (
            <span className={styles.noNote}>No description</span>
          )}
        </td>
        <td className={styles.valueCol}>
          <span className={styles.amountNano}>
            {tx.type === 'receive' && '+ '}
            {tx.type === 'send' && '- '}
            {formatNano(tx.amountNano)} NANO
          </span>
          <span className={styles.timeAgo}>
            {tx.status === 'pending'
              ? 'Pending...'
              : tx.timestamp === 0
              ? 'Date unknown'
              : formatTimeAgo(tx.timestamp)}
          </span>
        </td>
        <td className={styles.actionCol}>
          {tx.status === 'pending' ? (
            <Spinner size={18} color="#666666" />
          ) : (
            <Button
              variant="icon"
              size="24"
              destyleMerge={{ root: styles.actionBtn }}
              onClick={this.handleMoreOptionsOpen}
            >
              <MoreIcon />
            </Button>
          )}
          <TransactionMenu
            transaction={tx}
            trade={trade}
            id="transaction-more-options"
            open={moreOptionsOpen}
            anchorEl={moreOptionsAnchorEl}
            onClose={this.handleMoreOptionsClose}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right'
            }}
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
          />
        </td>
      </tr>
    )
  }
}

export default destyle(TransactionListItem, 'TransactionListItem')
