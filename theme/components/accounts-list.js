import { css } from 'emotion'
import { addStyles } from 'destyle'
import theme from '../theme'

const styles = {
  root: props => css``,
  item: css`
    margin-bottom: ${theme.spacing.paddingSm.desktop}px;
  `
}

addStyles('AccountsList', styles)
