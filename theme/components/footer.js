import { css } from 'emotion'
import { addStyles } from 'destyle'
import theme from '~/theme/theme'
import { pageWidth } from '~/theme/globals/utils'

const styles = {
  root: css`
    padding: 12px 0;
  `,
  pageWidth,
  inner: css`
    text-align: center;
    color: rgba(255, 255, 255, 0.75);
    font-size: ${theme.type.baseFontSize - 2}px;
    p {
      margin: 0;
    }
    a {
      color: rgba(255, 255, 255, 0.75);
      &:hover {
        color: #fff;
      }
    }
  `
}

addStyles('Footer', styles)
