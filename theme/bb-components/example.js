import { css } from 'emotion'
import { addStyles } from 'destyle'
import theme from '../theme'

addStyles('BB-Example', props => ({
  root: css`
    border: 2px solid blue;
  `
}))
