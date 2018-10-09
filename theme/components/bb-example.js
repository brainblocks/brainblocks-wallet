import { css } from 'emotion'
import { addStyles } from 'destyle'
import theme from '../theme'

export const styles = {
  root: props => css`
    border: 2px solid blue;
  `
}

addStyles('BB-Example', styles)
