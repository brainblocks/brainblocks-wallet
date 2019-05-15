// @flow
import { css } from 'emotion'
import { addStyles } from 'destyle'
import theme from '~/theme/theme'

addStyles('TransactionsList', props => {
  const imgCol = css`
    text-align: left;
  `
  const accountCol = css`
    text-align: left;
  `
  const contactCol = css`
    text-align: left;
  `
  const noteCol = css`
    text-align: left;
  `
  const valueCol = css`
    text-align: right;
  `
  return {
    root: css`
      padding: 0 0 12px;
      @media (max-width: ${theme.bp.mobile - 1}px) {
        margin: 0 -6px;
      }
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
        @media (max-width: ${theme.bp.medium - 1}px) {
          display: none;
        }
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
    imgCol: css`
      ${imgCol};
    `,
    accountCol: css`
      ${accountCol};
    `,
    contactCol: css`
      ${contactCol};
    `,
    noteCol: css`
      ${noteCol};
    `,
    valueCol: css`
      ${valueCol};
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
