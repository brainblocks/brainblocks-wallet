import { css } from 'emotion'
import { addStyles } from 'destyle'
import theme from '~/theme/theme'
import { pageWidth } from '~/theme/globals/utils'

addStyles('PageContent', ({ background, pad }) => ({
  root: css``,
  pageWidth,
  inner: css`
    margin: auto;
    min-height: 300px;
    ${!!background &&
      css`
        background: ${theme.color.gray.lightest};
        ${background === 'white' &&
          css`
            background: #fff;
          `}
        border-radius: ${theme.borderRadius.lg}px;
        @media (max-width: ${theme.layout.pageWidth -
          theme.layout.pagePadding * 2 -
          1}px) {
          margin-left: ${theme.layout.pagePadding * -1}px;
          margin-right: ${theme.layout.pagePadding * -1}px;
        }
      `};
  `,
  content: css`
    margin: auto;
    ${!!pad &&
      css`
        padding: 36px;
        @media (max-width: ${theme.bp.tablet - 1}px) {
          padding: 30px ${theme.layout.pagePadding}px;
        }
      `};
  `
}))
