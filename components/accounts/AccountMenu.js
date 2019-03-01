// @flow
import * as React from 'react'
import Link from 'next/link'
import { destyle } from 'destyle'
import { compose } from 'redux'
import {
  NanoAddress,
  Button,
  KeyValue,
  Menu,
  MenuItem,
  withSnackbar
} from 'brainblocks-components'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import type { NormalizedState } from '~/types'
import AccountTitle from './AccountTitle'
import { formatNano, formatFiat } from '~/functions/format'
import { convert } from '~/functions/convert'
import SendReceiveIcon from '~/static/svg/icons/send-receive.svg'
import ChevronDownIcon from '~/static/svg/icons/chevron-down.svg'
import MoreIcon from '~/static/svg/icons/more.svg'
import { withRouter } from 'next/router'

type Props = {
  /** Accounts */
  account: Object,
  router: Object,
  open: boolean,
  anchorEl: mixed,
  /** Given by destyle. Do not pass this to the component as a prop. */
  styles: Object
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
    window.open(
      `https://nanocrawler.cc/explorer/account/${
        this.props.account.account
      }/history`,
      '_blank'
    )
  }

  render() {
    const {
      styles,
      account,
      router,
      open,
      onClose,
      anchorEl,
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
