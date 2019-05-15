// @flow
import { css } from 'emotion'
import { addStyles } from 'destyle'
import theme from '~/theme/theme'

addStyles('Login', ({ background, pad }) => ({
  // Layout
  root: css`
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    @media (max-width: ${theme.bp.medium - 1}px) {
      flex-wrap: wrap;
    }
  `,
  content: css`
    width: 33%;
    position: relative;
    z-index: 2;
    @media (max-width: ${theme.bp.medium - 1}px) {
      width: 45%;
    }
    @media (max-width: ${theme.bp.medium - 1}px) {
      width: 100%;
    }
  `,
  formContainer: css`
    position: relative;
    justify-self: flex-end;
    width: 52%;
    @media (max-width: ${theme.bp.medium - 1}px) {
      width: calc(100% + ${theme.layout.pagePadding * 2}px);
      margin: 20px -${theme.layout.pagePadding}px 0;
    }
  `,
  // Content
  eyebrow: css`
    position: relative;
    color: #fff;
    text-transform: uppercase;
    font-weight: ${theme.type.headingFontWeight};
    font-family: ${theme.type.headingFontFamily};
    line-height: ${theme.type.headingLineHeight};
    font-size: ${theme.type.sizes.eyebrow}px;
    letter-spacing: ${theme.type.eyebrowLetterSpacing}em;
    margin-bottom: 34px;
    padding-bottom: 34px;
    &:before {
      content: '';
      display: block;
      position: absolute;
      bottom: 0;
      left: 0;
      width: 45px;
      height: 2px;
      background: rgba(255, 255, 255, 0.3);
    }
    @media (max-width: ${theme.bp.mobile - 1}px) {
      margin-bottom: 24px;
      padding-bottom: 24px;
    }
  `,
  title: css`
    color: #fff;
    font-size: 42px;
    line-height: 1.4;
    @media (max-width: ${theme.bp.mobile - 1}px) {
      font-size: 32px;
    }
  `,
  // Visuals
  visuals: css`
    position: absolute;
    top: 0;
    left: 0;
    z-index: 1;
    @media (max-width: ${theme.bp.medium - 1}px) {
      display: none;
    }
  `,
  hex1: css`
    position: absolute;
    transform: translate(-19%, -2%) rotate(38deg);
    svg {
      fill: #7dce23;
      width: 1080px;
      height: 1080px;
      animation: hex-spin 15s infinite alternate ease-in-out;
    }
  `,
  hex2: css`
    position: absolute;
    transform: translate(-14%, -10%) rotate(4deg);
    svg {
      width: 1200px;
      height: 1200px;
      animation: hex-spin 25s infinite alternate ease-in-out;
    }
  `,
  circle1: css`
    position: absolute;
    border-radius: 100%;
    width: 114px;
    height: 114px;
    background: #72cef2;
    left: -340px;
    top: 430px;
    animation: circle-bounce 5s infinite alternate ease-in-out;
  `,
  circle2: css`
    position: absolute;
    border-radius: 100%;
    width: 42px;
    height: 42px;
    background: #4ab49f;
    left: -218px;
    top: 358px;
    animation: circle-bounce 3s infinite alternate ease-in-out;
  `,
  // Form
  formContainerInner: css`
    position: relative;
    z-index: 2;
    border-radius: ${theme.borderRadius.lg}px;
    background: ${theme.color.gray.lightest};
    padding: 40px 10%;
    @media (max-width: ${theme.bp.medium - 1}px) {
      padding: 24px;
    }
  `,
  tabPanels: css`
    margin-top: ${theme.spacing.paddingLg.desktop}px;
  `
}))
