import { css } from 'emotion'
import { addStyles } from 'destyle'
import theme from '../theme'

addStyles('BB-NanoAddress', {
  root: css`
    display: inline-flex;
    align-items: center;
    text-transform: lowercase;
    letter-spacing: 0;
    position: relative;
    padding-right: 2.4em;
  `,
  address: css``,
  icon: css`
    position: absolute;
    right: 0;
    top: 50%;
    transform: translateY(-50%);
    opacity: 0.6;
    cursor: pointer;
    &:hover {
      opacity: 1;
    }
  `
})
