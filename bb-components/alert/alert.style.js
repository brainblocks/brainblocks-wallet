import { css } from 'emotion'
import { addStyles } from 'destyle'

addStyles('BB-Alert', props => ({
  root: css`
    display: flex;
    padding: 16px;
    align-items: center;
    /* default variant = info */
    background: lightblue;
    ${props.variant === 'success' &&
      css`
        background: lightgreen;
      `};
    ${props.variant === 'error' &&
      css`
        background: red;
      `};
    ${props.variant === 'warning' &&
      css`
        background: orange;
      `};
  `,
  icon: css`
    flex: 0 0 auto;
    margin-right: 16px;
    color: rgba(255, 255, 255, 0.7);
  `,
  message: css`
    flex-grow: 1;
    color: #fff;
    :last-child {
      margin-bottom: 0;
    }
    a {
      color: #fff;
      text-decoration: underline;
    }
  `
}))
