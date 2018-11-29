import { css } from 'emotion'
import { addStyles } from 'destyle'
import theme from '../theme'

addStyles('BB-FormField', {
  root: css`
    display: flex;
    align-items: center;
    background: #fff;
    border: 1px solid #ddd;
    padding: 0.25em 0.5em;
  `,
  adornStart: css`
    margin-right: 0.66em;
  `,
  adornEnd: css`
    margin-left: 0.66em;
  `
})
