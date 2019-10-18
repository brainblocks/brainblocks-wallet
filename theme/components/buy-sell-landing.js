// @flow
import { css } from 'emotion'
import { addStyles } from 'destyle'
import theme from '~/theme/theme'
import { formPageWidth } from '~/theme/globals/utils'

addStyles('BuySellLanding', props => {
  const option = css`
    flex: 1 1 50%;
    background: transparent;
    border-radius: ${theme.borderRadius.md}px;
    text-align: center;
    padding: 30px ${theme.spacing.paddingLg.desktop}px;
    border: none;
    cursor: pointer;
    transition: background 0.2s ease;
    &:hover {
      background: rgba(255, 255, 255, 0.05);
      box-shadow: 0 0 15px rgba(0, 0, 0, 0.05);
    }
    @media (max-width: ${theme.bp.tablet - 1}px) {
      padding: 16px 10px;
    }
  `
  const iconOverlay = css`
    position: absolute;
    width: 36px;
    height: 36px;
    border-radius: 100%;
    color: #fff;
    z-index: 2;
    .bb-svg-icon {
      width: 18px;
      height: 18px;
      z-index: 3;
    }
    &:before,
    &:after {
      content: '';
      position: absolute;
      width: 250%;
      height: 250%;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%) scale(0.1);
      border-radius: 100%;
      button:hover & {
        animation: radiate 2s linear infinite;
      }
    }
    &:before {
      /*width: 230%;
      height: 230%;
      opacity: 0.15;*/
      button:hover & {
        animation: radiate 2s linear 1s infinite;
      }
    }
    @media (max-width: ${theme.bp.tablet - 1}px) {
      left: -10px;
      top: -10px;
    }
  `
  return {
    root: css`
      ${formPageWidth};
      margin: 0 auto;
    `,
    optionsContainer: css`
      display: flex;
      align-items: flex-start;
    `,
    sellOption: css`
      ${option};
    `,
    buyOption: css`
      ${option};
    `,
    iconContainer: css`
      display: inline-block;
      background: rgba(255, 255, 255, 0.1);
      color: #fff;
      width: 100px;
      height: 100px;
      border-radius: 100%;
      position: relative;
      .bb-svg-icon {
        /* Note this also affects overlay icon */
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        width: 40px;
        height: 40px;
      }
      @media (max-width: ${theme.bp.tablet - 1}px) {
        width: 80px;
        height: 80px;
      }
    `,
    sellIconOverlay: css`
      ${iconOverlay};
      &,
      &:before,
      &:after {
        background: ${theme.color.palette.gold};
      }
    `,
    buyIconOverlay: css`
      ${iconOverlay};
      &,
      &:before,
      &:after {
        background: ${theme.color.palette.green};
      }
    `,
    optionTitle: css`
      font-size: 19px;
      margin: 20px 0 14px;
      color: #fff;
    `,
    optionDescription: css`
      font-size: ${theme.type.baseFontSize - 1}px;
      color: rgba(255, 255, 255, 0.6);
      margin-bottom: 0;
    `
  }
})
