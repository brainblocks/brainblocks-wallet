// @flow
import { css } from 'emotion'
import { addStyles } from 'destyle'
import theme from '../theme'
import { styles } from 'brainblocks-components'

addStyles('BB-ColorChoice', props => {
  const libStyles = styles.colorChoice(props)
  return {
    root: css`
      ${libStyles.root};
      padding: 6px 6px 7px 16px;
    `,
    option: css`
      ${libStyles.option};
      ${props.options.map(
        (color, i) => css`
          &:nth-child(${i + 1}) {
            background: ${theme.color.palette[color] || color};
          }
        `
      )};
    `,
    label: css`
      ${libStyles.label};
    `,
    hiddenLabel: css`
      ${libStyles.hiddenLabel};
    `,
    radioInput: css`
      ${libStyles.radioInput};
      &:checked + label {
        border: 2px solid #939393;
      }
    `
  }
})
