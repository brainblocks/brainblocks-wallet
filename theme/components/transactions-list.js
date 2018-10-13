import { css } from 'emotion'
import { addStyles } from 'destyle'
import theme from '~/theme/theme'

const td = css`
  vertical-align: middle;
`

const styles = {
  root: css`
    padding: 0 0 30px;
  `,
  table: css`
    width: 100%;
    border-collapse: collapse;
    border-spacing: 0;
    th {
      font-family: ${theme.type.baseFontFamily};
      font-size: 10px;
      text-transform: uppercase;
      font-weight: 600;
      color: ${theme.color.text.light};
      padding-top: 12px;
      padding-bottom: 12px;
    }
    td {
      border-top: 1px solid ${theme.color.borders.sep};
      padding-top: 14px;
      padding-bottom: 14px;
    }
  `,
  imgCol: css`
    ${td};
    text-align: left;
    padding-right: 24px;
  `,
  accountCol: css`
    ${td};
    text-align: left;
    width: 23%;
  `,
  contactCol: css`
    ${td};
    text-align: left;
  `,
  noteCol: css`
    ${td};
    text-align: left;
  `,
  note: css`
    font-size: 12px;
    color: ${theme.color.text.light};
  `,
  noNote: css`
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

addStyles('TransactionsList', styles)
