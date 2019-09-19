// @flow
import { css } from 'emotion'
import { addStyles } from 'destyle'
import theme from '~/theme/theme'
import { formPageWidth } from '~/theme/globals/utils'

addStyles('TradesList', props => {
  const typeCol = css`
    text-align: left;
    @media (max-width: ${theme.bp.small - 1}px) {
      display: none;
    }
  `
  const buyCol = css`
    text-align: left;
  `
  const sellCol = css`
    text-align: left;
  `
  const statusCol = css`
    text-align: left;
    @media (max-width: ${theme.bp.small - 1}px) {
      text-align: center;
    }
  `
  const updatedCol = css`
    text-align: left;
    @media (max-width: ${theme.bp.small - 1}px) {
      display: none;
    }
  `
  const moreCol = css`
    text-align: right;
  `
  return {
    root: css`
      ${formPageWidth};
      padding: 0 0 12px;
      @media (max-width: ${theme.bp.mobile - 1}px) {
        margin: 0 -6px;
      }
    `,
    header: css`
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 10px;
      height: 32px;
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
        @media (max-width: ${theme.bp.medium - 1}px) {
          padding-top: 10px;
          padding-bottom: 10px;
        }
      }
      tr:first-of-type td {
        @media (max-width: ${theme.bp.medium - 1}px) {
          border-top: none;
        }
      }
    `,
    typeCol: css`
      ${typeCol};
    `,
    buyCol: css`
      ${buyCol};
    `,
    sellCol: css`
      ${sellCol};
    `,
    statusCol: css`
      ${statusCol};
    `,
    updatedCol: css`
      ${updatedCol};
    `,
    moreCol: css`
      ${moreCol};
    `,
    loading: css`
      margin: 40px;
      text-align: center;
    `,
    pagination: css`
      text-align: center;
      margin: 14px 0 0;
    `
  }
})
