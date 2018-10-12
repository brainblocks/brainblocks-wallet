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
    &:hover {
      color: #fff;
      background-size: 100% 100%;
    }
  `
}

addStyles('BB-Button', styles)
