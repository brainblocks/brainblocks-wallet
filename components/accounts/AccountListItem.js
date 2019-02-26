// @flow
import * as React from 'react'
import Link from 'next/link'
import { destyle } from 'destyle'
import { NanoAddress, Button, KeyValue } from 'brainblocks-components'
import type { NormalizedState } from '~/types'
import AccountTitle from './AccountTitle'
import { formatNano, formatFiat } from '~/functions/format'
import { convert } from '~/functions/convert'
import SendReceiveIcon from '~/static/svg/icons/send-receive.svg'
import ChevronDownIcon from '~/static/svg/icons/chevron-down.svg'
import MoreIcon from '~/static/svg/icons/more.svg'

type Props = {
  /** Accounts */
  account: Object,
  /** Nano price */
  nanoPrice: number,
  /** Given by destyle. Do not pass this to the component as a prop. */
  styles: Object
}

const AccountListItem = ({ styles, account, nanoPrice, ...rest }: Props) => (
  <div className={styles.root}>
    <div className={styles.visible}>
      <div className={styles.row1}>
        <div className={styles.title}>
          <AccountTitle
            sub={true}
            backgroundcolor={account.color}
            destyleMerge={{
              icon: styles.accountTitleIcon,
              title: styles.accountTitleTitle,
              subTitle: styles.accountTitleSubTitle
            }}
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
            destyleMerge={{
              key: styles.keyValueKey,
              value: styles.keyValueValue
            }}
            backgroundcolor={account.color}
            theme="header"
          />
        </div>
        <div className={styles.info2}>
          <KeyValue
            label="Value"
            value={formatFiat(convert(account.balance, 'nano', nanoPrice))}
            destyleMerge={{
              key: styles.keyValueKey,
              value: styles.keyValueValue
            }}
            backgroundcolor={account.color}
            theme="header"
          />
        </div>
        <div className={styles.action1}>
          <Link
            href={{
              pathname: 'send-receive',
              query: { tab: 'send', from: account.id }
            }}
          >
            <Button
              variant="icon"
              size={34}
              iconSize={22}
              backgroundcolor={account.color}
              destyleMerge={{ root: styles.iconButton }}
            >
              <SendReceiveIcon />
            </Button>
          </Link>
        </div>
        <div className={styles.action2}>
          <Button
            variant="icon"
            size={36}
            backgroundcolor={account.color}
            destyleMerge={{ root: styles.iconButton }}
          >
            <MoreIcon />
          </Button>
        </div>
      </div>
    </div>
  </div>
)

export default destyle(AccountListItem, 'AccountListItem')
