import { css } from 'emotion'
import { addStyles } from 'destyle'
import theme from '~/theme/theme'

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
      vertical-align: middle;
    }
  `,
  imgCol: css`
    text-align: left;
  `,
  accountCol: css`
    text-align: left;
  `,
  contactCol: css`
    text-align: left;
  `,
  noteCol: css`
    text-align: left;
  `,
  valueCol: css`
    text-align: right;
  `
}

addStyles('TransactionsList', styles)
