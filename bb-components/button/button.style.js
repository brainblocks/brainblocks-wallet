import { css } from 'emotion'
import { addStyles } from 'destyle'
import theme from '../theme'
import { Hidden } from '@material-ui/core'

addStyles('BB-Button', props => ({
  root: css`
    background: ${props.color ? props.color : '#eee'};
    display: inline-block;
    padding: 0.75em 1.25em;
    font-size: 16px;
    position: relative;
    ${props.type === 'primary' &&
      css`
        background: blue;
        color: #fff;
      `};
    ${props.block === true &&
      css`
        display: block;
        text-align: center;
        width: 100%;
      `};
    &:disabled {
      cursor: default;
      opacity: 0.8;
      transition: opacity 0.2s linear;
      ${props.loading &&
        css`
          > span:first-child {
            opacity: 0;
            visibility: hidden;
          }
        `};
    }
  `,
  children: css``,
  spinnerWrap: css`
    line-height: 0;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  `,
  spinner: css``
}))
