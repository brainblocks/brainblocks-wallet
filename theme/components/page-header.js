import { css } from 'emotion'
import { addStyles } from 'destyle'
import theme from '~/theme/theme'
import { pageWidth } from '~/theme/globals/utils'

addStyles('PageHeader', props => ({
  root: css`
    padding: 0 0 30px;
  `,
  pageWidth,
  alert: css`
    padding: 12px 16px;
    margin: -20px 0 30px;
    background: rgb(44, 64, 107);
    font-size: ${theme.type.baseFontSize - 1}px;
    @media (max-width: ${theme.bp.medium - 1}px) {
      margin-top: -10px;
    }
  `,
  alertIcon: css`
    flex: 0 0 34px;
    height: 34px;
  `,
  inner: css`
    position: relative;
  `,
  title: css`
    margin: 0 0 20px;
    color: #fff;
    font-size: 18px;
    font-family: ${theme.type.headingFontFamily};
    font-weight: ${theme.type.headingFontWeight};
    line-height: ${theme.type.headingLineHeight};
    ${!!props.indentTitle &&
      css`
        padding-left: 16px;
        @media (max-width: ${theme.layout.pageWidth}px) {
          padding-left: 0;
        }
      `};
    &:last-child {
      margin-bottom: 0;
    }
  `,
  content: css``
}))
