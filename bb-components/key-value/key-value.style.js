import { css } from 'emotion'
import { addStyles } from 'destyle'
import theme from '../theme'

addStyles('BB-KeyValue', {
  root: css`
    display: block;
    list-style: none;
    margin: 0;
    padding: 0;
  `,
  key: css`
    display: block;
    margin: 0;
  `,
  value: css`
    display: block;
    margin: 0;
  `
})
