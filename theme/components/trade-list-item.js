// @flow
import { css } from 'emotion'
import { addStyles } from 'destyle'
import theme from '~/theme/theme'
import { getStatusColor } from './trade-info-table'

addStyles('TradeListItem', props => {
  const td = css`
    vertical-align: middle;
  `
  const typeIcon = css`
    display: inline-block;
    width: 28px;
    height: 28px;
    border-radius: 100%;
    position: relative;
    svg {
      width: 17px;
      height: 17px;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
  `
  const bold = css`
    color: ${theme.color.text.headings};
    font-weight: 700;
  `

  return {
    typeCol: css`
      ${td};
      text-align: left;
      padding-right: 24px;
      width: 32px;
      @media (max-width: ${theme.bp.small - 1}px) {
        display: none;
      }
    `,
    iconBuy: css`
      ${typeIcon};
      background: ${theme.color.status.successLight};
      color: ${theme.color.status.success};
    `,
    iconSell: css`
      ${typeIcon};
      background: ${theme.color.status.warningLight};
      color: ${theme.color.status.warning};
    `,
    buyCol: css`
      ${td};
      ${bold};
      text-align: left;
    `,
    sellCol: css`
      ${td};
      ${bold};
      text-align: left;
    `,
    statusCol: css`
      ${td};
      text-align: left;
      @media (max-width: ${theme.bp.small - 1}px) {
        text-align: center;
      }
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
      @media (max-width: ${theme.bp.small - 1}px) {
        margin-right: 0;
      }
    `,
    statusText: css`
      @media (max-width: ${theme.bp.small - 1}px) {
        display: none;
      }
    `,
    updatedCol: css`
      ${td};
      text-align: left;
      color: ${theme.color.text.light};
      font-size: ${theme.type.baseFontSize - 2}px;
      @media (max-width: ${theme.bp.small - 1}px) {
        display: none;
      }
    `,
    moreCol: css`
      ${td};
      text-align: center;
      padding-left: 12px;
      padding-right: 4px;
      width: 30px;
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
