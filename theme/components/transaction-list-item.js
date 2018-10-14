import { css } from 'emotion'
import { addStyles } from 'destyle'
import theme from '~/theme/theme'

const td = css`
  vertical-align: middle;
`

const styles = {
  imgCol: props => css`
    ${td};
    text-align: left;
    padding-right: 24px;
    width: ${!!props.account ? '11%' : '12%'};
  `,
  accountCol: css`
    ${td};
    text-align: left;
    width: 25%;
  `,
  contactCol: props => css`
    ${td};
    text-align: left;
    width: ${!!props.account ? '24%' : '33%'};
  `,
  noteCol: props => css`
    ${td};
    text-align: left;
    width: ${!!props.account ? '24%' : '35%'};
  `,
  note: css`
    font-size: 12px;
    color: ${theme.color.text.light};
  `,
  noNote: css`
    font-size: 12px;
    color: ${theme.color.text.disabled};
  `,
  valueCol: css`
    ${td};
    text-align: right;
  `,
  amountNano: props => css`
    text-transform: uppercase;
    font-weight: bold;
    font-size: ${theme.type.baseFontSize};
    color: ${theme.color.status.error}; /* send by default */
    ${props.transaction.type === 'receive' &&
      css`
        color: ${theme.color.status.success};
      `} ${props.transaction.type === 'transfer' &&
      css`
        color: ${theme.color.status.info};
      `};
  `,
  timeAgo: css`
    display: block;
    margin-top: 0.2em;
    color: ${theme.color.text.light};
    font-size: ${theme.type.baseFontSize - 2}px;
  `,
  actionCol: css`
    ${td};
    text-align: center;
    padding-left: 12px;
  `
}

addStyles('TransactionListItem', styles)
