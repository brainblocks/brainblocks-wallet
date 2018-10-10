import { css } from 'emotion'
import { addStyles } from 'destyle'
import theme from '~/theme/theme'

export const styles = {
  root: css`
    background: yellow;
  `,
  header: css`
    background: pink;
  `,
  footer: css`
    background: green;
  `
}

addStyles('Layout', styles)
