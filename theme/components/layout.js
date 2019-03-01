import { css } from 'emotion'
import { addStyles } from 'destyle'
import theme from '~/theme/theme'

addStyles('Layout', {
  root: css`
    overflow: hidden;
    min-height: 100vh;
  `,
  header: css`
    position: sticky;
    top: 0;
    z-index: 500;
    background: ${theme.color.palette.darkBlue};
  `,
  footer: css``
})
