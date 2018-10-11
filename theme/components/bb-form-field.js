import { css } from 'emotion'
import { addStyles } from 'destyle'
import Color from 'color'
import { backgroundGradient } from '../globals/mixins'
import theme from '../theme'

export const styles = {
  root: props => css`
    align-items: center;
    border-radius: ${theme.borderRadius.md}px;
    background: #fff;
    /* A border in case it ever appears on a white background */
    border: 1px solid ${theme.color.gray.lightest};
    padding: 0;
    div,
    input,
    select,
    textarea {
      flex-grow: 1;
    }
    &:focus-within {
      box-shadow: 0 0 15px
        ${Color(theme.color.palette.lightBlue)
          .lighten(0.1)
          .toString()};
      input:focus,
      select:focus,
      textarea:focus {
        outline: none;
      }
    }
  `,
  adornStart: css`
    flex-grow: 0 !important;
    margin: 0 0 0 1em;
    & + input,
    & + select {
      padding-left: 1em;
    }
  `,
  adornEnd: css`
    flex-grow: 0 !important;
    margin: 0 1em 0 0;
  `
}

addStyles('BB-FormField', styles)
