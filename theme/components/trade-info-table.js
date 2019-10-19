// @flow
import { css } from 'emotion'
import { addStyles } from 'destyle'
import theme from '~/theme/theme'
import type { Trade } from '~/types/reduxTypes'

import { redStatuses, greenStatuses } from '~/components/buy-sell/TradeInfo'

export function getStatusColor(trade: Trade) {
  let statusColor = theme.color.status.warning
  if (typeof trade === 'object' && trade.hasOwnProperty('status')) {
    const { status } = trade
    if (redStatuses.includes(status)) {
      statusColor = theme.color.status.error
    } else if (greenStatuses.includes(status)) {
      statusColor = theme.color.status.success
    }
  }
  return statusColor
}

const code = css`
  font-family: ${theme.type.monoFontFamily};
  font-weight: ${theme.type.monoFontWeight};
  background: ${theme.color.gray.lightest};
  font-size: 94%;
  letter-spacing: -0.05em;
  padding: 0 0.4em;
  word-wrap: break-word;
`
const bold = css`
  color: ${theme.color.text.headings};
  font-weight: 700;
`

addStyles('TradeInfoTable', props => ({
  root: css``,
  tradeId: css`
    ${code};
  `,
  status: css`
    color: ${getStatusColor(props.trade)};
  `,
  statusIndicator: css`
    display: inline-block;
    width: 8px;
    height: 8px;
    border-radius: 100%;
    margin-right: 8px;
    background: ${getStatusColor(props.trade)};
  `,
  buy: css`
    ${bold};
  `,
  sell: css`
    ${bold};
  `,
  rate: css`
    ${bold};
  `,
  payinAddress: css`
    ${code};
  `,
  payoutAddress: css`
    ${code};
  `,
  txHash: css`
    ${code};
  `
}))
