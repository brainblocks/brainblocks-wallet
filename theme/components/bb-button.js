import { css } from 'emotion'
import { addStyles } from 'destyle'
import { backgroundGradient } from '../globals/mixins'
import theme from '../theme'

export const styles = {
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
    &:hover {
      color: #fff;
      background-size: 100% 100%;
    }
  `
}

addStyles('BB-Button', styles)
