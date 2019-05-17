// @flow
import { css } from 'emotion'
import { setStyles } from 'destyle'
import theme from '../theme'
import { styles } from 'brainblocks-components'

setStyles('BB-Input', props => {
  const libStyles = styles.input(props)
  return {
    root: css`
      ${libStyles.root};
      border: none;
      background: transparent;
      font-family: ${theme.type.baseFontFamily};
      font-size: 15px;
      font-weight: 700;
      padding: 1.5em;
      padding-left: 1.75em;
      ${!!props.multiline &&
        css`
          line-height: ${theme.type.baseLineHeight};
          /* rows * (fontSize * lineHeight) + (fontSize * vPadding * 2) */
          height: ${(props.rows || 3) * 15 * 1.4 + 15 * 1.5 * 2}px;
        `};
      &::placeholder {
        color: ${theme.color.text.light};
        font-weight: 600;
      }
    `
  }
})
