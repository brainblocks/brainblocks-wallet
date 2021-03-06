// @flow
import { css } from 'emotion'
import { addStyles } from 'destyle'
import theme from '../theme'
import { styles } from 'brainblocks-components'

addStyles('BB-FormField', props => {
  const libStyles = styles.formField(props)
  return {
    root: css`
      ${libStyles.root};
      align-items: center;
      border-radius: ${theme.borderRadius.md}px;
      background: #fff;
      /* A border in case it ever appears on a white background */
      border: 1px solid ${theme.color.gray.lightest};
      padding: 0;
      overflow: hidden;
      > div,
      > input,
      > select,
      > textarea {
        flex-grow: 1;
      }
      &:focus-within {
        box-shadow: 2px 4px 15px rgba(0, 0, 0, 0.1);
        input:focus,
        select:focus,
        textarea:focus {
          outline: none;
        }
      }
      ${props.theme === 'outlined-on-dark' &&
        css`
          background: transparent;
          border: 2px solid rgba(255, 255, 255, 0.2);
          input,
          select,
          textarea {
            color: #fff;
            padding-top: 0.8em;
            padding-bottom: 0.8em;
            padding-left: 1em;
          }
          &:focus-within {
            box-shadow: none;
            border-color: rgba(255, 255, 255, 0.4);
          }
          .mdi-icon {
            fill: rgba(255, 255, 255, 0.4);
          }
        `};
      ${props.valid === false &&
        css`
          border-color: ${theme.color.status.error};
          input,
          select,
          textarea {
            /* color: ${theme.color.status.error}; */
          }
        `};
    `,
    adornStart: css`
      ${libStyles.adornStart};
      flex-grow: 0 !important;
      margin: 0 0 0 1em;
      line-height: 0;
      & + input,
      & + select {
        padding-left: 1em;
      }
    `,
    adornEnd: css`
      ${libStyles.adornEnd};
      flex-grow: 0 !important;
      margin: 0 1em 0 0;
      line-height: 0;
    `
  }
})
