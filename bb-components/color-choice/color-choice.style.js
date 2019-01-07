import { css } from 'emotion'
import { addStyles } from 'destyle'
import theme from '../theme'

addStyles('BB-ColorChoice', props => ({
  root: css`
    display: flex;
  `,
  option: css`
    margin: 10px;
    width: 30px;
    height: 30px;
    border-radius: 100%;
    position: relative;
    ${props.options.map(
      (color, i) => css`
        &:nth-child(${i + 1}) {
          background: ${color};
        }
      `
    )};
  `,
  label: css`
    position: absolute;
    top: -4px;
    left: -4px;
    right: -4px;
    bottom: -4px;
    border-radius: 100%;
    cursor: pointer;
  `,
  hiddenLabel: css`
    display: none;
    visibility: hidden;
  `,
  radioInput: css`
    display: none;
    visibility: hidden;
    &:checked + label {
      border: 2px solid #555;
    }
  `
}))
