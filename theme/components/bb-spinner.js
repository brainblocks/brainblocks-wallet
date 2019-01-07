import { addStyles } from 'destyle'
import { css } from 'emotion'
import theme from '../theme'

addStyles('BB-Spinner', props => ({
  root: css`
    color: ${theme.color.palette[props.color] || props.color} !important;
  `
}))
