import React from 'react'
import { destyle } from 'destyle'
import SendIcon from '~/static/svg/icons/arrow-up.svg'
import ReceiveIcon from '~/static/svg/icons/arrow-down.svg'
import TransferIcon from '~/static/svg/icons/transfer.svg'

const TransactionImage = ({ styles, transaction, ...rest }) => {
  return (
    <div className={styles.root}>
      <div className={styles.circle}>
        {!!transaction.image && <img src={transaction.image} alt="Profile" />}
      </div>
      <span className={styles.icon}>
        {transaction.type === 'send' && (
          <span className={styles.sendIcon}>
            <SendIcon />
          </span>
        )}
        {(transaction.type === 'receive' || transaction.type === 'open') && (
          <span className={styles.receiveIcon}>
            <ReceiveIcon />
          </span>
        )}
        {transaction.type === 'transfer' && (
          <span className={styles.transferIcon}>
            <TransferIcon />
          </span>
        )}
      </span>
    </div>
  )
}

export default destyle(TransactionImage, 'TransactionImage')
