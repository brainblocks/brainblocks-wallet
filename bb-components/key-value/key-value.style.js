import { css } from 'emotion'
import { addStyles } from 'destyle'
import theme from '../theme'

const styles = {
  root: props => css`
    display: block;
    list-style: none;
    margin: 0;
    padding: 0;
  `,
  key: props =>
    css`
      display: block;
      margin: 0;
    `,
  value: props =>
    css`
      display: block;
      margin: 0;
    `
}

addStyles('BB-KeyValue', styles)
