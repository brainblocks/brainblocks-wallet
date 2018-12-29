import { css } from 'emotion'
import { addStyles } from 'destyle'
import theme from '../theme'

addStyles('BB-NanoAddress', {
  root: css`
    display: inline-flex;
    align-items: center;
  `,
  address: css`
    margin-right: 16px;
  `,
  icon: css`
    opacity: 0.6;
    cursor: pointer;
    &:hover {
      opacity: 1;
    }
  `
})
