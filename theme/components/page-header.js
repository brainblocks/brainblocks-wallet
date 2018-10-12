import { css } from 'emotion'
import { addStyles } from 'destyle'
import theme from '~/theme/theme'
import { pageWidth } from '~/theme/globals/utils'

const styles = {
  root: css`
    padding: 0 0 30px;
  `,
  pageWidth,
  inner: css`
    position: relative;
  `,
  title: props => css`
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
}

addStyles('PageHeader', styles)
