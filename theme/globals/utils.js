import { css } from 'emotion'
import theme from '../theme'

export const pageWidth = css`
  width: 100%;
  max-width: ${theme.layout.pageWidth}px;
  margin-left: auto;
  margin-right: auto;
`

export const resetList = css`
  margin: 0;
  padding: 0;
  list-style: none;
`

export const cf = css`
  &:after {
    content: '';
    display: table;
    clear: both;
  }
`
