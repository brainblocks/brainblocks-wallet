// @flow
import * as React from 'react'
import Link from 'next/link'
import { destyle } from 'destyle'
import { compose } from 'redux'
import { Menu, MenuItem, withSnackbar } from 'brainblocks-components'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import { withRouter } from 'next/router'

type Props = {
  /** Accounts */
  account: Object,
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

class AccountMenu extends React.Component<Props> {
  handleCopy = () => {
    this.props.onClose()
    this.props.enqueueSnackbar('Address copied to clipboard', {
      variant: 'info'
    })
  }

  handleGoToSend = () => {
    this.props.router.push({
      pathname: '/send-receive',
      search: `?tab=send&from=${this.props.account.account}`
    })
  }

  handleGoToReceive = () => {
    this.props.router.push({
      pathname: '/send-receive',
      search: `?tab=receive&account=${this.props.account.account}`
    })
  }

  handleGoToSettings = () => {
    this.props.router.push({
      pathname: '/settings',
      search: `?tab=accounts&account=${this.props.account.account}`
    })
  }

  handleViewInExplorer = () => {
    this.props.onClose()
    const explorerWindow = window.open(
      `https://nanocrawler.cc/explorer/account/${
        this.props.account.account
      }/history`,
      '_blank'
    )
    explorerWindow.opener = null
  }

  render() {
    const {
      styles,
      account,
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
        <CopyToClipboard text={account.account} onCopy={this.handleCopy}>
          <MenuItem>Copy address</MenuItem>
        </CopyToClipboard>
        <MenuItem onClick={this.handleGoToSend}>
          Send from this account
        </MenuItem>
        <MenuItem onClick={this.handleGoToReceive}>
          Receive to this account
        </MenuItem>
        <MenuItem onClick={this.handleGoToSettings}>Account settings</MenuItem>
        <MenuItem onClick={this.handleViewInExplorer}>
          View in explorer
        </MenuItem>
      </Menu>
    )
  }
}

export default compose(
  withSnackbar,
  withRouter
)(destyle(AccountMenu, 'AccountMenu'))
