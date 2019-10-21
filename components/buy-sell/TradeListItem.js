// @flow
import * as React from 'react'
import { destyle } from 'destyle'
import Link from 'next/link'
import { formatTimeAgo, formatNano } from '~/functions/format'
import Button from 'brainblocks-components/build/Button'
import GoIcon from '~/static/svg/icons/arrow-right.svg'
import BuyIcon from '~/static/svg/icons/buy.svg'
import SellIcon from '~/static/svg/icons/sell.svg'
import type { Trade } from '~/types/reduxTypes'

type Props = {
  styles: Object,
  trade: Trade
}

class TradeListItem extends React.Component<Props> {
  /**
   * Render a single transaction as a table row
   */
  render() {
    const { styles, trade } = this.props

    return (
      <tr>
        <td className={styles.typeCol}>
          {trade.toCurrency.toUpperCase() === 'NANO' ? (
            <span className={styles.iconBuy}>
              <BuyIcon />
            </span>
          ) : (
            <span className={styles.iconSell}>
              <SellIcon />
            </span>
          )}
        </td>
        <td className={styles.buyCol}>
          {typeof trade.amountReceive === 'number'
            ? formatNano(trade.amountReceive, 3)
            : typeof trade.expectedReceiveAmount === 'number'
            ? formatNano(trade.expectedReceiveAmount, 3)
            : '0'}{' '}
          {trade.toCurrency.toUpperCase()}
        </td>
        <td className={styles.sellCol}>
          {typeof trade.amountSend === 'number'
            ? formatNano(trade.amountSend, 3)
            : typeof trade.expectedSendAmount === 'number'
            ? formatNano(trade.expectedSendAmount, 3)
            : '0'}{' '}
          {trade.fromCurrency.toUpperCase()}
        </td>
        <td className={styles.statusCol}>
          <span className={styles.status}>
            <span className={styles.statusIndicator} />
            <span className={styles.statusText}>{trade.status}</span>
          </span>
        </td>
        <td className={styles.updatedCol}>{formatTimeAgo(trade.updatedAt)}</td>
        <td className={styles.moreCol}>
          <Link
            href={{
              pathname: 'buy-sell/trade',
              query: { tradeId: trade.id }
            }}
          >
            <Button
              variant="icon"
              size={30}
              iconSize={16}
              destyleMerge={{ root: styles.iconButton }}
            >
              <GoIcon />
            </Button>
          </Link>
        </td>
      </tr>
    )
  }
}

export default destyle(TradeListItem, 'TradeListItem')
