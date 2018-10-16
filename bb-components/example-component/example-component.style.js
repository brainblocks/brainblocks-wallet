import { css } from 'emotion'
import { addStyles } from 'destyle'
import theme from '../theme'

addStyles('BB-Example', props => ({
  root: css`
    background: #eee;
    ${props.type === 'primary' &&
      css`
        background: blue;
        color: #fff;
      `};
  `
}))
