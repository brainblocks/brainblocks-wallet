// @flow
import { css } from 'emotion'
import { addStyles } from 'destyle'
import theme from '~/theme/theme'

addStyles('Layout', (props, state) => ({
  root: css`
    min-height: 100vh;
    padding-top: 128px;
    @media (max-width: ${theme.bp.desktop - 1}px) {
      padding-top: 106px;
    }
    @media (max-width: ${theme.bp.tablet - 1}px) {
      padding-top: 84px;
    }
  `,
  header: css`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 500;
    padding: 44px 0;
    transition: padding 0.75s ease, background 0s linear;
    @media (max-width: ${theme.bp.desktop - 1}px) {
      padding: 33px 0;
    }
    @media (max-width: ${theme.bp.tablet - 1}px) {
      padding: 22px 0;
    }
    ${state.scrollOffset > 0 &&
      css`
        transition: padding 0.75s ease, background 0.25s linear;
        box-shadow: 0 0 25px rgba(0, 0, 0, 0.3);
        padding: 14px 0 10px !important;
        background: ${theme.color.palette.darkBlue};
      `};
  `,
  footer: css`
    @media (max-width: ${theme.bp.tablet - 1}px) {
      display: none;
    }
  `
}))
