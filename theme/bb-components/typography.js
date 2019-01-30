import { css } from 'emotion'
import { addStyles } from 'destyle'
import theme from '../theme'

addStyles(
  'BB-Typography',
  ({ el = 'span', size, color, noWrap, spaceAbove, spaceBelow }) => {
    let root = css``

    // heading or base?
    if (['h1', 'h2', 'h3', 'h4', 'h5', 'h6'].includes(el)) {
      root = css`
        ${root};
        font-family: ${theme.type.headingFontFamily};
        font-weight: ${theme.type.headingFontWeight};
        line-height: ${theme.type.headingLineHeight};
        color: ${theme.color.text.headings};
      `
    } else {
      root = css`
        ${root};
        font-family: ${theme.type.baseFontFamily};
        font-weight: ${theme.type.baseFontWeight};
        font-size: ${theme.type.baseFontSize}px;
        line-height: ${theme.type.baseLineHeight};
        color: ${theme.color.text.base};
      `
    }

    // color
    if (color != null) {
      let textColor
      switch (color) {
        case 'normalOnLight':
          textColor = theme.color.text.base
          break
        case 'lightOnLight':
          textColor = theme.color.text.LightbulbOnOutlineIcon
          break
        case 'heavyOnLight':
          textColor = 'black'
          break
        case 'normalOnDark':
        case 'heavyOnDark':
          textColor = '#FFF'
          break
        case 'lightOnDark':
          textColor = 'rgba(255,255,255,0.6)'
          break
        default:
          textColor = color
      }
      root = css`
        ${root};
        color: ${textColor};
      `
    }

    // size
    root = css`
      ${root};
      font-size: ${size || theme.type.sizes[el] || theme.type.baseFontSize}px;
    `

    // vertical rhythm
    if (typeof spaceAbove === 'number') {
      root = css`
        ${root};
        margin-top: ${spaceAbove * theme.spacing.rhythmUnit}px;
      `
    }
    if (typeof spaceBelow === 'number') {
      root = css`
        ${root};
        margin-bottom: ${spaceBelow * theme.spacing.rhythmUnit}px;
      `
    }

    return { root }
  }
)
