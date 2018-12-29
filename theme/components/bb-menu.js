import { addStyles } from 'destyle'
import { css } from 'emotion'
import theme from '../theme'

addStyles('BB-Menu', {
  root: css``
})

addStyles('BB-MenuItem', {
  root: css`
    font-family: ${theme.type.baseFontFamily};
    font-weight: ${theme.type.baseFontWeight};
    line-height: ${theme.type.baseLineHeight};
  `,
  selected: css`
    background-color: ${theme.color.palette.lightBlue} !important;
    color: #fff !important;
  `
})
