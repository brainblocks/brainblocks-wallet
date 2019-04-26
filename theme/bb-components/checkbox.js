import { css } from 'emotion'
import { setStyles } from 'destyle'
import theme from '../theme'

setStyles('BB-Checkbox', props => {
  const size = props.size || 26
  return {
    root: css`
      display: flex;
      align-items: center;
    `,
    checkbox: css`
      display: none;
    `,
    faux: css`
      cursor: pointer;
      box-shadow: inset 0 0 1px 0 #fff; /* Shows up when checked */
      border: 1px solid rgba(0, 0, 0, 0.1);
      border-radius: ${size * 0.2}px;
      position: relative;
      width: ${size}px;
      height: ${size}px;
      background: ${props.checked ? theme.color.palette.green : '#FFF'};
      margin-right: 12px;
      flex-shrink: 0;
    `,
    check: css`
      display: ${props.checked ? 'block' : 'none'};
      position: absolute;
      right: 60%;
      bottom: 20%;
      height: ${size * 0.7}px;
      width: ${size * 0.33}px;
      border-bottom: ${size / 8}px solid #fff;
      border-right: ${size / 8}px solid #fff;
      transform: rotate(45deg);
      transform-origin: bottom right;
    `,
    label: css`
      flex-grow: 1;
    `
  }
})
