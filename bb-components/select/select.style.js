import { addStyles } from 'destyle'
import { css } from 'emotion'
import theme from '../theme'

addStyles('BB-Select', {
  root: css`
    background-color: transparent;
    color: white;
    text-transform: uppercase;
  `,
  item: css`
    text-transform: uppercase;
  `
})
