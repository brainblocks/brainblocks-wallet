// @flow
import * as React from 'react'
import { destyle } from 'destyle'
import { formatTimeAgo, formatNano } from '~/functions/format'
import { Button, NanoAddress, KeyValue } from 'brainblocks-components'
import TransactionImage from './TransactionImage'
import AccountTitle from '~/components/accounts/AccountTitle'
import TransactionMenu from './TransactionMenu'
import MoreIcon from '~/static/svg/icons/more.svg'

type Props = {
  styles: Object,
  transaction: Object,
  account?: Object
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
  getContactInfo = tx => {
    const contactInfo: { title: string, subTitle: string | React.Node } = {
      title: 'Unknown',
      subTitle: ''
    }
    switch (tx.type) {
      case 'receive':
      case 'open':
        if (tx.linkAddress) {
          contactInfo.subTitle = <NanoAddress address={tx.linkAddress} />
        } else if (tx.fromType === 'account') {
          /** @todo get info by account Id */
          contactInfo.title = 'Rahim Sterling'
          contactInfo.subTitle = '@rahim1984'
        }
        break
      case 'send':
        if (tx.linkAddress) {
          contactInfo.subTitle = <NanoAddress address={tx.linkAddress} />
        } else if (tx.toType === 'contact') {
          /** @todo get info by account Id */
          contactInfo.title = 'Rahim Sterling'
          contactInfo.subTitle = '@rahim1984'
        }
        break
    }
    return contactInfo
  }

  /**
   * Render a single transaction as a table row
   */
  render() {
    const { styles, transaction, account } = this.props
    const { moreOptionsOpen, moreOptionsAnchorEl } = this.state
    const tx = transaction
    const contactInfo = this.getContactInfo(tx)

    return (
      <tr>
        <td className={styles.imgCol}>
          <TransactionImage transaction={tx} />
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
            keyEl="h4"
            valueEl="span"
          />
        </td>
        <td className={styles.noteCol}>
          {tx.note ? (
            <span className={styles.note}>{tx.note}</span>
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
          <span className={styles.timeAgo}>{formatTimeAgo(tx.timestamp)}</span>
        </td>
        <td className={styles.actionCol}>
          <Button
            variant="icon"
            size="24"
            style={{ marginRight: -6 }}
            onClick={this.handleMoreOptionsOpen}
          >
            <MoreIcon />
          </Button>
          <TransactionMenu
            transaction={tx}
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
