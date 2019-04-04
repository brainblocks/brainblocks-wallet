import { css } from 'emotion'
import { addStyles } from 'destyle'
import Color from 'color'
import { backgroundGradient } from '../globals/mixins'
import theme from '../theme'
import { styles } from 'brainblocks-components'

addStyles('BB-Button', props => {
  const libStyles = styles.button(props)
  const backgroundColor =
    theme.color.palette[props.color] || props.color || theme.color.palette.teal
  return {
    root: css`
      ${libStyles.root};
      cursor: pointer;
      border-radius: ${theme.buttons.borderRadius}px;
      border: none;
      padding: 1em 2em;
      text-align: center;
      font-size: ${theme.type.baseFontSize}px;
      font-weight: 700;
      color: #fff;
      transition: all 0.3s ease;
      will-change: background-size;
      transform: translate3d(0, 0, 0);
      ${backgroundGradient(backgroundColor, true)};
      background-position: left top;
      background-size: 200% 150%;
      &:hover:not(:disabled) {
        color: #fff;
        background-size: 101% 101%;
      }
      ${props.block
        ? css`
            padding-left: 0.5em;
            padding-right: 0.5em;
          `
        : null};
      ${props.variant === 'primary'
        ? css`
            padding: 1.2em 2em;
            text-transform: uppercase;
            font-size: 18px;
          `
        : null};
      ${props.variant === 'flat' &&
        css`
          padding: 0.6em 1em;
          border-radius: ${theme.borderRadius.sm}px;
          background: ${backgroundColor};
          &:hover {
            background: ${Color(backgroundColor)
              .darken(0.2)
              .toString()};
          }
        `};
      ${props.variant === 'util'
        ? css`
            text-transform: uppercase;
            font-size: 14px;
            padding: 0.4em 0.8em;
            border-radius: ${theme.borderRadius.sm}px;
            background: ${props.color || theme.color.gray.midLight};
            &:hover:not(:disabled) {
              background: ${Color(props.color || theme.color.gray.midLight)
                .darken(0.2)
                .toString()};
            }
          `
        : null};
      ${props.variant === 'icon'
        ? css`
            padding: 0;
            width: ${props.size || 24}px;
            height: ${props.size || 24}px;
            border-radius: 100%;
            background: transparent;
            color: ${props.color || theme.color.text.base};
            position: relative;
            &:hover:not(:disabled) {
              background: ${theme.color.gray.light};
              color: ${theme.color.text.headings};
            }
            svg {
              width: ${props.iconSize || (props.size || 24) * 0.5}px;
              height: ${props.iconSize || (props.size || 24) * 0.5}px;
              position: absolute;
              left: 50%;
              top: 50%;
              transform: translate(-50%, -50%);
            }
          `
        : null};
      ${props.disabled &&
        css`
          cursor: default;
          opacity: 0.5;
        `};
    `,
    children: css`
      ${libStyles.children};
    `,
    spinnerWrap: css`
      ${libStyles.spinnerWrap};
      line-height: 0;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    `,
    spinner: css`
      ${libStyles.spinner};
    `
  }
})
