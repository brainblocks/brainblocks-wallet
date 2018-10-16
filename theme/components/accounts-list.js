import { css } from 'emotion'
import { addStyles } from 'destyle'
import theme from '../theme'

addStyles('AccountsList', {
  root: props => css``,
  item: css`
    margin-bottom: ${theme.spacing.paddingSm.desktop}px;
  `
})
