import { css } from 'emotion'
import { addStyles } from 'destyle'
import theme from '../theme'

addStyles('AccountSelector', (props, state) => {
  const accountTitle = css`
    flex-grow: 1;
  `
  const balances = css`
    text-align: right;
  `
  const mainBalance = css`
    display: block;
    font-weight: bold;
    color: ${theme.color.text.headings};
    font-size: ${theme.type.baseFontSize}px;
  `
  const secondaryBalance = css`
    display: block;
    font-weight: bold;
    color: ${theme.color.text.light};
    font-size: ${theme.type.baseFontSize - 2}px;
  `
  const thinItem = css`
    padding: 12px 26px 12px 26px;
  `
  return {
    root: css``,
    field: css`
      display: flex;
      align-items: center;
      padding: 24px 18px 24px 26px;
      box-shadow: none !important;
      outline: none !important;
      ${props.theme === 'outlined-on-dark' &&
        css`
          padding: 12px 18px 12px 20px;
        `};
    `,
    accountTitle: css`
      ${accountTitle};
    `,
    fieldBalances: css`
      ${balances};
    `,
    fieldMainBalance: css`
      ${mainBalance};
    `,
    fieldSecondaryBalance: css`
      ${secondaryBalance};
    `,
    itemAccountTitle: css`
      ${accountTitle};
    `,
    itemBalances: css`
      ${balances};
    `,
    itemMainBalance: css`
      ${mainBalance};
    `,
    itemSecondaryBalance: css`
      ${secondaryBalance};
    `,
    itemTitle: css`
      ${mainBalance};
      font-size: ${theme.type.baseFontSize - 1}px;
    `,
    itemSubTitle: css`
      ${secondaryBalance};
    `,
    dropdown: css`
      margin-top: 10px;
      box-shadow: 4px 4px 20px rgba(0, 0, 0, 0.15);
      border-radius: ${theme.borderRadius.md}px;
      ${state.anchorEl &&
        css`
          width: ${state.anchorEl.getBoundingClientRect().width}px;
        `};
      ${props.dropdownWidth &&
        css`
          width: ${props.dropdownWidth}px;
        `};
    `,
    list: css``,
    listItem: css`
      padding: 24px 26px 24px 26px;
      display: flex;
      align-items: center;
      ${!props.twoLine && thinItem};
    `,
    listItemWithSubs: css`
      ${thinItem};
      display: flex;
      align-items: center;
      opacity: 1 !important;
    `,
    listSubItem: css`
      ${thinItem};
      padding-left: 58px;
      display: flex;
      align-items: center;
    `,
    selectedItem: css`
      span {
        color: #fff !important;
      }
    `
  }
})
