import { css } from 'emotion'
import { addStyles } from 'destyle'
import theme from '../theme'

const styles = {
  root: props => css`
    display: flex;
    align-items: center;
    background: #fff;
    padding: 0.25em 0.5em;
    border: 1px solid #ddd;
  `,
  adornStart: css`
    margin-right: 0.66em;
  `,
  adornEnd: css`
    margin-left: 0.66em;
  `
}

addStyles('BB-FormField', styles)
