// @flow
import { css } from 'emotion'
import { addStyles } from 'destyle'
import theme from '~/theme/theme'

addStyles('TransactionImage', props => {
  // helpers
  /*
  const icon = css`
    width: 16px;
    height: 16px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  `

  const iconOnImage = css`
    left: auto;
    right: 0;
    top: 0;
    transform: none;
  `*/

  // styles
  return {
    root: css`
      position: relative;
      display: inline-block;
    `,
    circle: css`
      width: 44px;
      height: 44px;
      border-radius: 100%;
      overflow: hidden;
      ${
        props.transaction.type === 'send' && props.trade
          ? css`
              background: ${theme.color.status.warningLight};
            `
          : css`
              background: ${theme.color.status.errorLight};
            `
      }
      ${(props.transaction.type === 'receive' ||
        props.transaction.type === 'open') &&
        css`
          background: ${theme.color.status.successLight};
        `}
      ${props.transaction.type === 'transfer' &&
        css`
          background: ${theme.color.status.infoLight};
        `}
      @media (max-width: ${theme.bp.small - 1}px) {
        width: 36px;
        height: 36px;
      }
      @media (max-width: ${theme.bp.mobile - 1}px) {
        width: 32px;
        height: 32px;
      }
    `,
    icon: css`
      overflow: hidden;
      display: block;
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      ${props.trade
        ? css`
            width: 20px;
            height: 20px;
          `
        : css`
            width: 16px;
            height: 16px;
          `}
      svg {
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        ${props.trade
          ? css`
              width: 20px;
              height: 20px;
            `
          : css`
              width: 16px;
              height: 16px;
            `}
      }
      ${!!props.transaction.image &&
        css`
          ${props.transaction.type === 'send' &&
            css`
              background: ${theme.color.status.errorLight};
            `}
          ${props.transaction.type === 'receive' &&
            css`
              background: ${theme.color.status.successLight};
            `}
          ${props.transaction.type === 'transfer' &&
            css`
              background: ${theme.color.status.infoLight};
            `}
          border: 2px solid #FFF;
          border-radius: 100%;
          left: auto;
          top: auto;
          right: -3px;
          bottom: -3px;
          transform: none;
          svg {
            width: 10px;
            height: 10px;
          }
        `};
    `,
    sendIcon: css`
      color: ${theme.color.status.error};
    `,
    receiveIcon: css`
      color: ${theme.color.status.success};
    `,
    buyIcon: css`
      color: ${theme.color.status.success};
      }
    `,
    sellIcon: css`
      color: ${theme.color.status.warning};
    `,
    transferIcon: css`
      color: ${theme.color.status.info};
    `
  }
})
