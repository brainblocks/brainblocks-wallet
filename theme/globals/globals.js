import { injectGlobal } from 'emotion'
import theme from '../theme'
import { pageWidth } from './utils'

injectGlobal`
  *,
  *:before,
  *:after {
    box-sizing: border-box;
  }
  .js-focus-visible :focus:not([data-focus-visible-added]) {
    outline: none;
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
    text-decoration: none;
    &:hover {
      color: ${theme.color.links.hover};
    }
  }
  .pageWidth {
    ${pageWidth};
  }
  .bb-svg-icon {
    fill: currentColor;
  }

  @keyframes circle-bounce {
    from {
      transform: translate3d(0, -15%, 0) rotate(0.1deg);
    }
    to {
      transform: translate3d(0, 15%, 0) rotate(0.1deg);
    }
  }
  @keyframes hex-spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(14deg);
    }
  }
}
`
