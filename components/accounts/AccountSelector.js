// @flow
import React from 'react'
import { destyle } from 'destyle'
import { cx } from 'emotion'
import type { NormalizedState } from '~/types'
import { formatNano, formatFiat } from '~/functions/format'
import { convert } from '~/functions/convert'
import { getAccountById, getAccountType } from '~/functions/accounts'
import FormField from '~/bb-components/form-field/FormField'
import Menu from '~/bb-components/menu/Menu'
import MenuItem from '~/bb-components/menu/MenuItem'
import NanoAddress from '~/bb-components/nano-address/NanoAddress'
import AccountTitle from '~/components/accounts/AccountTitle'
import ChevronDownIcon from 'mdi-react/ChevronDownIcon'

type Props = {
  /** Currently selected account id */
  account: string,
  /** Accounts */
  accounts: NormalizedState,
  /** Nano Addresses */
  addresses: NormalizedState,
  /** Can a vault be selected? */
  vaultSelectable?: boolean,
  /** Nano price */
  nanoPrice?: number,
  /** Include an 'all' option */
  all?: false,
  /** Two line version */
  twoLine?: boolean,
  /** Include balances? `dropdown` = only show balances in dropdown */
  balances?: 'all' | 'dropdown' | 'none',
  /** Arbitrary theme passed to `FormField` which can be used in styles */
  theme?: string,
  /** Props to pass to the AccountTitle in the field (not the dropdowns) */
  accountTitleProps?: Object,
  onChange: (SyntheticEvent<>) => mixed,
  /** Given by destyle. Do not pass this to the component as a prop. */
  styles: Object
}

/**
 * AccountSelector
 *
 * @todo twoLine version
 * @todo include balances
 */
class AccountSelector extends React.Component<Props> {
  state = {
    open: false,
    anchorEl: null
  }

  handleOpen = (e, el = null) => {
    this.setState({
      open: true,
      anchorEl: null || e.currentTarget
    })
  }

  handleClose = e => {
    this.setState({
      open: false,
      anchorEl: null
    })
  }

  handleDownArrowOnField = (e, el) => {
    if (e.keyCode === 40) {
      this.handleOpen(e, el)
    }
  }

  handleFieldFocus = e => {
    e.target.addEventListener('keydown', event =>
      this.handleDownArrowOnField(event)
    )
  }

  handleFieldBlur = e => {
    e.target.removeEventListener('keydown', event =>
      this.handleDownArrowOnField(event)
    )
  }

  handleSelect = val => {
    this.setState(
      {
        open: false,
        anchorEl: null
      },
      () => this.props.onChange(val)
    )
  }

  render() {
    const {
      styles,
      account,
      accounts,
      addresses,
      balances = 'none',
      twoLine = false,
      nanoPrice = -1,
      vaultSelectable = true,
      theme,
      onChange,
      all = false,
      accountTitleProps,
      ...rest
    }: Props = this.props
    const { open, anchorEl } = this.state
    const options = accounts.allIds.map(accId => ({
      value: accId,
      title: accounts.byId[accId].name
    }))
    if (all) {
      options.unshift({ value: 'all', title: 'All Accounts' })
    }
    const accountType = getAccountType(account)

    return (
      <div className={styles.root}>
        <div onClick={this.handleOpen}>
          <FormField theme={theme} adornEnd={<ChevronDownIcon />}>
            <div
              className={styles.field}
              tabIndex="0"
              onFocus={this.handleFieldFocus}
              onBlur={this.handleFieldBlur}
            >
              <div className={styles.accountTitle}>
                <AccountTitle
                  account={account === 'all' ? 'all' : getAccountById(account)}
                  sub={twoLine}
                  {...accountTitleProps}
                />
              </div>
              {balances === 'all' &&
                account !== 'all' && (
                  <div className={styles.fieldBalances}>
                    <span className={styles.fieldMainBalance}>
                      {formatNano(getAccountById(account).balance)} NANO
                    </span>
                    {twoLine &&
                      nanoPrice >= 0 && (
                        <span className={styles.fieldSecondaryBalance}>
                          {formatFiat(
                            convert(
                              getAccountById(account).balance,
                              'nano',
                              nanoPrice
                            )
                          )}
                        </span>
                      )}
                  </div>
                )}
            </div>
          </FormField>
        </div>
        <Menu
          id="account-selector"
          open={open}
          anchorEl={anchorEl}
          onClose={this.handleClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left'
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'left'
          }}
          getContentAnchorEl={null}
          transitionDuration={50}
          PopoverClasses={{ paper: cx(styles.dropdown) }}
        >
          {!!all && (
            <MenuItem
              onClick={() => this.handleSelect('all')}
              destyleMerge={{ root: styles.listItem }}
              selected={account === 'all'}
            >
              <AccountTitle
                account="all"
                color={account === 'all' ? 'light' : null}
              />
            </MenuItem>
          )}
          {accounts.allIds.map((acc, i) => {
            if (accounts.byId[acc].type === 'vault') {
              const vaultAndChildren = [
                <MenuItem
                  disabled={!vaultSelectable}
                  key={`account-selector-${i}`}
                  onClick={() => this.handleSelect(acc)}
                  destyleMerge={{
                    root: styles.listItemWithSubs,
                    selected: styles.selectedItem
                  }}
                  selected={account === acc}
                >
                  <div className={styles.itemAccountTitle}>
                    <AccountTitle
                      account={accounts.byId[acc]}
                      color={account === acc ? 'light' : null}
                    />
                  </div>
                </MenuItem>
              ]
              {
                accounts.byId[acc].addresses.map((addr, j) => {
                  vaultAndChildren.push(
                    <MenuItem
                      key={`account-selector-${i}-${j}`}
                      onClick={() => this.handleSelect(addr)}
                      destyleMerge={{
                        root: styles.listSubItem,
                        selected: styles.selectedItem
                      }}
                      selected={account === addr}
                    >
                      <div className={styles.itemAccountTitle}>
                        <span className={styles.itemTitle}>
                          {addresses.byId[addr].name || (
                            <NanoAddress address={addr} />
                          )}
                        </span>
                        {addresses.byId[addr].name &&
                          twoLine && (
                            <span className={styles.itemSubTitle}>
                              <NanoAddress address={addr} />
                            </span>
                          )}
                      </div>
                    </MenuItem>
                  )
                })
              }
              return vaultAndChildren
            } else {
              return (
                <MenuItem
                  key={`account-selector-${i}`}
                  onClick={() => this.handleSelect(acc)}
                  destyleMerge={{
                    root: styles.listItem,
                    selected: styles.selectedItem
                  }}
                  selected={account === acc}
                >
                  <div className={styles.itemAccountTitle}>
                    <AccountTitle
                      account={accounts.byId[acc]}
                      sub={twoLine}
                      color={account === acc ? 'light' : null}
                    />
                  </div>
                  {balances === 'all' && (
                    <div className={styles.itemBalances}>
                      <span className={styles.itemMainBalance}>
                        {formatNano(getAccountById(acc).balance)} NANO
                      </span>
                      {twoLine &&
                        nanoPrice >= 0 && (
                          <span className={styles.itemSecondaryBalance}>
                            {formatFiat(
                              convert(
                                getAccountById(acc).balance,
                                'nano',
                                nanoPrice
                              )
                            )}
                          </span>
                        )}
                    </div>
                  )}
                </MenuItem>
              )
            }
          })}
        </Menu>
      </div>
    )
  }
}

export default destyle(AccountSelector, 'AccountSelector')
