import { injectGlobal } from 'emotion'
import theme from '../theme'
import { pageWidth } from './utils'

injectGlobal`
  *,
  *:before,
  *:after {
    box-sizing: border-box;
  }
  body, html {
    margin: 0;
    padding: 0;
    color: ${theme.color.text.base};
    font-family: ${theme.type.baseFontFamily};
    line-height: ${theme.type.baseLineHeight};
    font-weight: ${theme.type.baseFontWeight};
    font-size: ${theme.type.baseFontSize}px;
    background: ${theme.color.palette.darkBlue};
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
  h1, h2, h3, h4, h5, h6 {
    font-family: ${theme.type.headingFontFamily};
    color: ${theme.color.text.headings};
    line-height: ${theme.type.headingLineHeight};
    letter-spacing: -0.02em;
  }
  pre, code {
    font-family: ${theme.type.monoFontFamily};
    font-weight: ${theme.type.monoFontWeight};
    -webkit-font-smoothing: auto;
    -moz-osx-font-smoothing: auto;
  }
  a {
    color: ${theme.color.links.link};
    transition: color .3s ease;
    &:hover {
      color: ${theme.color.links.hover};
    }
  }
  .pageWidth {
    ${pageWidth};
  }
}
`
