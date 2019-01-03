import { css } from 'emotion'
import { addStyles } from 'destyle'
import theme from '../theme'

addStyles('BB-ColorChoice', props => ({
  root: css`
    padding: 6px 6px 7px 16px;
  `,
  option: css`
    ${props.options.map(
      (color, i) => css`
        &:nth-child(${i + 1}) {
          background: ${theme.color.palette[color] || color};
        }
      `
    )};
  `,
  label: css``,
  hiddenLabel: css``,
  radioInput: css`
    &:checked + label {
      border: 2px solid #939393;
    }
  `
}))
