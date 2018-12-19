// @flow
import React from 'react'
import { destyle } from 'destyle'
import type { NormalizedState } from '~/types'
import { formatNano, formatFiat } from '~/functions/format'
import { convert } from '~/functions/convert'
import FormField from '~/bb-components/form-field/FormField'
import Menu from '~/bb-components/menu/Menu'
import MenuItem from '~/bb-components/menu/MenuItem'
import AccountTitle from '~/components/accounts/AccountTitle'
import ChevronDownIcon from 'mdi-react/ChevronDownIcon'

type Props = {
  /** Currently selected account id */
  account: string,
  /** Accounts */
  accounts: NormalizedState,
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
      balances = 'none',
      twoLine = false,
      nanoPrice = -1,
      theme,
      onChange,
      all = false,
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
                  account={account === 'all' ? 'all' : accounts.byId[account]}
                  sub={twoLine}
                />
              </div>
              {balances === 'all' &&
                account !== 'all' && (
                  <div className={styles.fieldBalances}>
                    <span className={styles.fieldMainBalance}>
                      {formatNano(accounts.byId[account].balance)} NANO
                    </span>
                    {twoLine &&
                      nanoPrice >= 0 && (
                        <span className={styles.fieldSecondaryBalance}>
                          {formatFiat(
                            convert(
                              accounts.byId[account].balance,
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
          PopoverClasses={{ paper: styles.dropdown }}
        >
          {!!all && (
            <MenuItem onClick={() => this.handleSelect('all')}>
              <AccountTitle account="all" />
            </MenuItem>
          )}
          {accounts.allIds.map((acc, i) => (
            <MenuItem
              key={`account-selector-${i}`}
              onClick={() => this.handleSelect(acc)}
            >
              <AccountTitle
                account={accounts.byId[acc]}
                sub={twoLine}
                className={styles.accountTitle}
              />
            </MenuItem>
          ))}
        </Menu>
      </div>
    )
  }
}

export default destyle(AccountSelector, 'AccountSelector')
