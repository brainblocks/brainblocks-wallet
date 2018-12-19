import { css } from 'emotion'
import { addStyles } from 'destyle'
import theme from '../theme'

addStyles('AccountSelector', props => {
  return {
    root: css``,
    field: css`
      display: flex;
      align-items: center;
      padding: 24px 18px 24px 26px;
      box-shadow: none !important;
      outline: none !important;
    `,
    accountTitle: css`
      flex-grow: 1;
    `,
    fieldBalances: css`
      text-align: right;
    `,
    fieldMainBalance: css`
      display: block;
      font-weight: bold;
      color: ${theme.color.text.headings};
      font-size: ${theme.type.baseFontSize}px;
    `,
    fieldSecondaryBalance: css`
      display: block;
      font-weight: bold;
      color: ${theme.color.text.light};
      font-size: ${theme.type.baseFontSize - 2}px;
    `,
    dropdown: css`
      margin-top: 10px;
      box-shadow: 4px 4px 20px rgba(0, 0, 0, 0.1);
      border-radius: ${theme.borderRadius.md}px;
    `,
    list: css``,
    listItem: css``
  }
})
