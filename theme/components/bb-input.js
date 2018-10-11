import { css } from 'emotion'
import { addStyles } from 'destyle'
import theme from '../theme'

export const styles = {
  root: props => css`
    border: none;
    background: transparent;
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
    }
  `
}

addStyles('BB-Input', styles)
