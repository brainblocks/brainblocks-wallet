import React from 'react'
import { destyle } from 'destyle'
import SendIcon from '~/static/svg/icons/arrow-up.svg'
import ReceiveIcon from '~/static/svg/icons/arrow-down.svg'
import TransferIcon from '~/static/svg/icons/transfer.svg'

const TransactionImage = ({ styles, transaction, ...rest }) => {
  // Profile image
  if (transaction.toType === 'contact' || transaction.fromType === 'account') {
    return <span>image</span>
  }

  // Icon
  return (
    <div className={styles.root}>
      <div className={styles.circle} />
      {transaction.type === 'send' && <SendIcon className={styles.sendIcon} />}
      {transaction.type === 'receive' && (
        <ReceiveIcon className={styles.receiveIcon} />
      )}
      {transaction.type === 'transfer' && (
        <TransferIcon className={styles.transferIcon} />
      )}
    </div>
  )
}

export default destyle(TransactionImage, 'TransactionImage')
