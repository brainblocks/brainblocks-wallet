import { addStyles } from 'destyle'
import { css } from 'emotion'
import theme from '../theme'

const styles = addStyles('BB-Select', {
  root: css`
    border: none;
    background-color: transparent;
    font-size: 12px;
    font-weight: 700;
    padding-left: 10px;
    padding-top: 5px;
    background-position: right 1.25em center;
  `,
  select: css`
    color: white;
  `
})
