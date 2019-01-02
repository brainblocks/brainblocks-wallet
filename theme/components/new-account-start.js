import { css } from 'emotion'
import { addStyles } from 'destyle'
import theme from '~/theme/theme'

addStyles('NewAccountStart', props => {
  const option = css`
    flex: 0 1 48%;
    background: #fff;
    border-radius: ${theme.borderRadius.md}px;
    text-align: center;
    padding: 12% ${theme.spacing.paddingLg.desktop}px;
    border: none;
    cursor: pointer;
    &:hover {
      box-shadow: 0 0 15px rgba(0, 0, 0, 0.05);
    }
  `
  const iconOverlay = css`
    position: absolute;
    width: 44px;
    height: 44px;
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
  `
  return {
    root: css`
      margin: 20px auto;
      max-width: 800px;
    `,
    optionsContainer: css`
      display: flex;
      justify-content: space-between;
    `,
    walletOption: css`
      ${option};
    `,
    vaultOption: css`
      ${option};
    `,
    iconContainer: css`
      display: inline-block;
      background: ${theme.color.gray.lightest};
      width: 126px;
      height: 126px;
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
    `,
    walletIconOverlay: css`
      ${iconOverlay};
      &,
      &:before,
      &:after {
        background: ${theme.color.palette.green};
      }
    `,
    vaultIconOverlay: css`
      ${iconOverlay};
      &,
      &:before,
      &:after {
        background: ${theme.color.palette.gold};
      }
    `,
    optionTitle: css`
      font-size: 19px;
      margin: 20px 0 14px;
    `,
    optionDescription: css`
      font-size: ${theme.type.baseFontSize - 1}px;
      color: ${theme.color.text.light};
      margin-bottom: 0;
    `
  }
})
