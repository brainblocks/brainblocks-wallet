// @flow
import { css } from 'emotion'
import { addStyles } from 'destyle'
import theme from '~/theme/theme'

addStyles('TransactionListItem', props => {
  const td = css`
    vertical-align: middle;
    opacity: ${props.transaction.status === 'pending' ? '0.5' : '1'};
  `

  return {
    imgCol: css`
      ${td};
      text-align: left;
      padding-right: 24px;
      width: ${props.account ? '11%' : '12%'};
      @media (max-width: ${theme.bp.small - 1}px) {
        padding-right: 12px;
      }
    `,
    accountCol: css`
      ${td};
      text-align: left;
      width: 25%;
      @media (max-width: ${theme.bp.medium - 1}px) {
        display: none;
      }
    `,
    contactCol: css`
      ${td};
      text-align: left;
      width: ${props.account ? '24%' : '33%'};
      > div {
        max-width: 100%;
      }
      @media (max-width: ${theme.bp.small - 1}px) {
      }
    `,
    contactTitle: css``,
    contactSubtitle: css`
      @media (max-width: ${theme.bp.small - 1}px) {
        font-size: ${theme.type.baseFontSize - 2}px;
      }
    `,
    noteCol: css`
      ${td};
      text-align: left;
      width: ${props.account ? '24%' : '35%'};
      @media (max-width: ${theme.bp.small - 1}px) {
        display: none;
      }
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
      min-width: 130px;
      @media (max-width: ${theme.bp.small - 1}px) {
        min-width: 85px;
      }
    `,
    amountNano: css`
      text-transform: uppercase;
      font-weight: bold;
      font-size: ${theme.type.baseFontSize}px;
      color: ${theme.color.status.error}; /* send by default */
      ${props.transaction.type === 'receive' &&
        css`
          color: ${theme.color.status.success};
        `} ${props.transaction.type === 'transfer' &&
        css`
          color: ${theme.color.status.info};
        `};
      @media (max-width: ${theme.bp.small - 1}px) {
        font-size: ${theme.type.baseFontSize - 2}px;
      }
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
      padding-right: 4px;
      @media (max-width: ${theme.bp.small - 1}px) {
        width: 38px;
      }
      @media (max-width: ${theme.bp.mobile - 1}px) {
        padding-left: 4px;
        padding-right: 0;
      }
    `,
    actionBtn: css`
      margin-right: -6px;
      @media (max-width: ${theme.bp.small - 1}px) {
        padding: 0.75em 1em !important;
      }
    `
  }
})
