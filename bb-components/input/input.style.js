import { css } from 'emotion'
import { addStyles } from 'destyle'
import theme from '../theme'

addStyles('BB-Input', props => ({
  root: props => css`
    border: 1px solid #eee;
    ${!!props.multiline &&
      css`
        height: ${(props.rows || 3) * 32}px;
      `};
  `
}))
