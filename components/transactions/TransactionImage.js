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
          <SendIcon className={styles.sendIcon} />
        )}
        {transaction.type === 'receive' && (
          <ReceiveIcon className={styles.receiveIcon} />
        )}
        {transaction.type === 'transfer' && (
          <TransferIcon className={styles.transferIcon} />
        )}
      </span>
    </div>
  )
}

export default destyle(TransactionImage, 'TransactionImage')
