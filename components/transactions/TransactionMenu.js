// @flow
import * as React from 'react'
import { destyle } from 'destyle'
import { compose } from 'redux'
import { Menu, MenuItem, withSnackbar } from 'brainblocks-components'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import { withRouter } from 'next/router'

type Props = {
  transaction: Object,
  router: Object,
  open: boolean,
  anchorEl: mixed,
  onClose: () => mixed,
  enqueueSnackbar: (string, ?Object) => void,
  /** Given by destyle. Do not pass this to the component as a prop. */
  styles: Object,
  onPresentSnackbar?: () => mixed,
  destyleMerge?: Object
}

class TransactionMenu extends React.Component<Props> {
  handleCopy = () => {
    this.props.onClose()
    this.props.enqueueSnackbar('Block hash copied to clipboard', {
      variant: 'info'
    })
  }

  handleResend = () => {
    const {
      transaction: { accountId, linkAddress, amountNano }
    } = this.props
    this.props.router.push({
      pathname: '/send-receive',
      search: `?tab=send&from=${accountId}&to=${linkAddress}&amount=${amountNano}`
    })
  }

  handleViewInExplorer = () => {
    this.props.onClose()
    const explorerWindow = window.open(
      `https://nanocrawler.cc/explorer/block/${this.props.transaction.id}`,
      '_blank'
    )
    explorerWindow.opener = null
  }

  render() {
    const {
      styles,
      transaction,
      router,
      open,
      onClose,
      anchorEl,
      enqueueSnackbar,
      onPresentSnackbar,
      destyleMerge,
      ...rest
    }: Props = this.props
    return (
      <Menu open={open} anchorEl={anchorEl} onClose={onClose} {...rest}>
        <MenuItem onClick={this.handleResend}>
          {transaction.type === 'send'
            ? 'Make this payment again'
            : 'Refund this payment'}
        </MenuItem>
        <MenuItem onClick={this.handleViewInExplorer}>
          View in explorer
        </MenuItem>
        <CopyToClipboard text={transaction.id} onCopy={this.handleCopy}>
          <MenuItem>Copy block hash</MenuItem>
        </CopyToClipboard>
      </Menu>
    )
  }
}

export default compose(
  withSnackbar,
  withRouter
)(destyle(TransactionMenu, 'TransactionMenu'))
