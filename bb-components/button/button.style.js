import { css } from 'emotion'
import { addStyles } from 'destyle'
import theme from '../theme'

const styles = {
  root: props => css`
    background: ${props.color ? props.color : '#eee'};
    display: inline-block;
    padding: 0.75em 1.25em;
    font-size: 16px;
    ${props.type === 'primary' &&
      css`
        background: blue;
        color: #fff;
      `};
    ${props.block === true &&
      css`
        display: block;
        text-align: center;
        width: 100%;
      `};
  `
}

addStyles('BB-Button', styles)
