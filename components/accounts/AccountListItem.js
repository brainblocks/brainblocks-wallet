// @flow
import * as React from 'react'
import { destyle } from 'destyle'
import type { NormalizedState } from '~/types'
import AccountTitle from './AccountTitle'
import NanoAddress from '~/bb-components/nano-address/NanoAddress'
import Button from '~/bb-components/button/Button'
import KeyValue from '~/bb-components/key-value/KeyValue'
import { formatNano, formatFiat } from '~/functions/format'
import { convert } from '~/functions/convert'
import SendReceiveIcon from '~/static/svg/icons/send-receive.svg'
import ChevronDownIcon from '~/static/svg/icons/chevron-down.svg'
import MoreIcon from '~/static/svg/icons/more.svg'

type Props = {
  /** Accounts */
  account: Object,
  /** All addresses (not just for this account) */
  nanoAddresses: NormalizedState,
  /** Nano price */
  nanoPrice: number,
  /** Given by destyle. Do not pass this to the component as a prop. */
  styles: Object
}

type State = {
  isExpanded: boolean
}

class AccountListItem extends React.Component<Props, State> {
  state = {
    isExpanded: false
  }

  handleToggleExpand = () => {
    this.setState({
      isExpanded: !this.state.isExpanded
    })
  }

  render() {
    const { styles, account, nanoPrice, nanoAddresses, ...rest } = this.props
    const { isExpanded } = this.state
    return (
      <div className={styles.root}>
        <div className={styles.visible}>
          <div className={styles.row1}>
            <div className={styles.title}>
              <AccountTitle
                sub={true}
                backgroundcolor={account.color}
                destyleNames="AccountListItem--AccountTitle"
                account={account}
              />
            </div>
            <div className={styles.info1}>
              <KeyValue
                label="Balance"
                value={
                  <span>
                    {formatNano(account.balance)}{' '}
                    <small style={{ fontSize: '80%' }}>NANO</small>
                  </span>
                }
                destyleNames="AccountListItem--KeyValue"
                backgroundcolor={account.color}
                theme="header"
              />
            </div>
            <div className={styles.info2}>
              <KeyValue
                label="Value"
                value={formatFiat(convert(account.balance, 'nano', nanoPrice))}
                destyleNames="AccountListItem--KeyValue"
                backgroundcolor={account.color}
                theme="header"
              />
            </div>
            <div className={styles.action1}>
              {account.type === 'vault' && (
                <Button
                  type="icon"
                  size={36}
                  backgroundcolor={account.color}
                  destyleNames="AccountListItem--IconButton"
                  onClick={this.handleToggleExpand}
                >
                  <ChevronDownIcon
                    style={{
                      transform: `translate(-50%, -50%) rotate(${
                        isExpanded ? '180deg' : '0deg'
                      })`,
                      transition: 'transform .3s ease'
                    }}
                  />
                </Button>
              )}
              {account.type === 'nano' && (
                <Button
                  type="icon"
                  size={36}
                  iconSize={24}
                  backgroundcolor={account.color}
                  destyleNames="AccountListItem--IconButton"
                >
                  <SendReceiveIcon />
                </Button>
              )}
            </div>
            <div className={styles.action2}>
              <Button
                type="icon"
                size={36}
                backgroundcolor={account.color}
                destyleNames="AccountListItem--IconButton"
              >
                <MoreIcon />
              </Button>
            </div>
          </div>
        </div>
        {isExpanded &&
          account.type === 'vault' && (
            <div className={styles.dropdown}>
              {account.addresses.map(addr => (
                <div className={styles.subRow} key={`address-${addr}`}>
                  <div className={styles.title}>
                    <NanoAddress address={nanoAddresses.byId[addr].address} />
                  </div>
                  <div className={styles.info1}>
                    <span>
                      {formatNano(nanoAddresses.byId[addr].balance)}{' '}
                      <small style={{ fontSize: '80%' }}>NANO</small>
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
      </div>
    )
  }
}

export default destyle(AccountListItem, 'AccountListItem')
