import { css } from 'emotion'
import { addStyles } from 'destyle'
import theme from '../theme'

addStyles(
  'BB-Typography',
  ({ el = 'span', size, color, noWrap, spaceAbove, spaceBelow }) => {
    let root = css``

    // color
    if (color != null) {
      root = css`
        ${root};
        color: ${color};
      `
    }

    // nowrap
    if (noWrap) {
      root = css`
        ${root};
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      `
    }

    // vertical rhythm
    root = css`
      ${root};
      margin-top: 0;
      margin-bottom: 0;
    `
    if (typeof spaceAbove === 'number') {
      root = css`
        ${root};
        margin-top: ${spaceAbove * theme.spacing.md}px;
      `
    }
    if (typeof spaceBelow === 'number') {
      root = css`
        ${root};
        margin-bottom: ${spaceBelow * theme.spacing.md}px;
      `
    }

    return { root }
  }
)
