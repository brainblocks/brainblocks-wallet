import { css } from 'emotion'
import { addStyles } from 'destyle'
import Color from 'color'
import { backgroundGradient } from '../globals/mixins'
import theme from '../theme'

const styles = {
  root: props => css`
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
    ${backgroundGradient(props.color || theme.color.palette.teal, true)};
    background-position: left top;
    background-size: 200% 150%;
    &:hover {
      color: #fff;
      background-size: 100% 100%;
    }
    ${props.block
      ? css`
          padding-left: 0.5em;
          padding-right: 0.5em;
        `
      : null};
    ${props.type === 'primary'
      ? css`
          text-transform: uppercase;
          font-size: 18px;
        `
      : null};
    ${props.type === 'util'
      ? css`
          text-transform: uppercase;
          font-size: 14px;
          padding: 0.4em 0.8em;
          border-radius: ${theme.borderRadius.sm}px;
          background: ${props.color || theme.color.gray.midLight};
          &:hover {
            background: ${Color(props.color || theme.color.gray.midLight)
              .darken(0.2)
              .toString()};
          }
        `
      : null};
    ${props.type === 'icon'
      ? css`
          padding: 0;
          width: ${props.size || 24}px;
          height: ${props.size || 24}px;
          border-radius: 100%;
          background: transparent;
          color: ${theme.color.text.base};
          position: relative;
          &:hover {
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
          path {
            fill: currentColor;
          }
        `
      : null};
  `
}

addStyles('BB-Button', styles)
