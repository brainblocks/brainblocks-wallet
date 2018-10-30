import { addStyles } from 'destyle'
import { css } from 'emotion'
import theme from '../theme'

addStyles('BB-AmountField', {
  root: css`
    display: inline-block;
  `,
  container: css`
    display: flex;
  `,
  amount: css`
    flex-grow: 2;
  `,
  currency: css`
    flex-grow: 1;
  `
})
