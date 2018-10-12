import { css } from 'emotion'
import { addStyles } from 'destyle'
import theme from '../theme'

const styles = {
  root: props => css`
    border: 1px solid #eee;
    ${!!props.multiline &&
      css`
        height: ${(props.rows || 3) * 32}px;
      `};
  `
}

addStyles('BB-Input', styles)
