import { css } from 'emotion'
import { addStyles } from 'destyle'
import theme from '../theme'

const styles = {
  root: props => css`
    background: #eee;
    ${props.type === 'primary' &&
      css`
        background: blue;
        color: #fff;
      `};
  `
}

addStyles('BB-Example', styles)
