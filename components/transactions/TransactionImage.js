// @flow
import React from 'react'
import { destyle } from 'destyle'
import SendIcon from '~/static/svg/icons/arrow-up.svg'
import ReceiveIcon from '~/static/svg/icons/arrow-down.svg'
import BuyIcon from '~/static/svg/icons/buy.svg'
import SellIcon from '~/static/svg/icons/sell.svg'

//import TransferIcon from '~/static/svg/icons/transfer.svg'
import type { ReduxTransaction, Trade } from '~/types/reduxTypes'

type Props = {
  styles: Object,
  transaction: ReduxTransaction,
  trade?: ?Trade
}

const TransactionImage = ({ styles, transaction, trade, ...rest }: Props) => {
  return (
    <div className={styles.root}>
      <div className={styles.circle}>
        {/*
        <img
          src={`https://robohash.org/${
            transaction.linkAddress
          }?gravatar=yes&set=set3&bgset=bg2&size=44x44`}
          alt={transaction.type}
        />
        */}
      </div>
      <span className={styles.icon}>
        {transaction.type === 'send' &&
          (trade ? (
            <span className={styles.sellIcon}>
              <SellIcon />
            </span>
          ) : (
            <span className={styles.sendIcon}>
              <SendIcon />
            </span>
          ))}
        {(transaction.type === 'receive' || transaction.type === 'open') &&
          (trade ? (
            <span className={styles.buyIcon}>
              <BuyIcon />
            </span>
          ) : (
            <span className={styles.receiveIcon}>
              <ReceiveIcon />
            </span>
          ))}
        {/*}
        {transaction.type === 'transfer' && (
          <span className={styles.transferIcon}>
            <TransferIcon />
          </span>
        )}
        */}
      </span>
    </div>
  )
}

export default destyle(TransactionImage, 'TransactionImage')
