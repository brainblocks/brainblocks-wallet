import { addStyles } from 'destyle'
import { backgroundGradient } from '../globals/mixins'
import { css } from 'emotion'
import theme from '../theme'

addStyles('DashboardHeader', props => {
  // helpers
  const hasLeftBorder = css`
    margin-left: 24px;
    padding-left: 24px;
    position: relative;
    &:before {
      content: '';
      position: absolute;
      top: 4px;
      bottom: 4px;
      left: 0;
      width: 1px;
      background: rgba(255, 255, 255, 0.15);
    }
  `
  // styles
  return {
    root: css`
      display: flex;
      align-items: stretch;
    `,
    // 3 major sections
    info: css`
      flex-basis: 33%;
      flex-grow: 1;
      margin-right: ${theme.spacing.paddingLg.desktop}px;
    `,
    sendReceiveBtn: css`
      text-align: left;
      flex-basis: 154px;
      position: relative;
      background-size: 101% 101%;
      svg {
        margin-bottom: 6px;
        width: 28px;
        height: 28px;
      }
      .send-receive-button-text {
        display: block;
        text-align: left;
        font-size: ${theme.type.baseFontSize + 2}px;
      }
      &:hover:not(:disabled) {
        background-size: 150% 200%;
      }
    `,
    sendReceiveBtnInner: css`
      position: absolute;
      left: 0;
      right: 0;
      bottom: 0;
      padding: 28px;
    `,
    chart: css`
      ${backgroundGradient(theme.color.palette.blue)};
      flex-basis: 33%;
      flex-grow: 1;
      border-radius: ${theme.borderRadius.md + 3}px;
      margin-left: ${theme.spacing.paddingLg.desktop}px;
    `,
    // Info section
    selector: css`
      margin-bottom: 32px;
      max-width: 250px;
    `,
    infoRow1: css`
      padding-left: 18px;
      display: flex;
      margin-bottom: 14px;
      align-items: flex-end;
    `,
    balance: css`
      margin-right: 10px;
    `,
    moreButton: css`
      position: relative;
      bottom: 6px;
      background: rgba(255, 255, 255, 0.15);
      color: ${theme.color.palette.darkBlue};
      &:hover {
        background: rgba(255, 255, 255, 0.4);
      }
    `,
    infoRow2: css`
      padding-left: 18px;
      display: flex;
    `,
    value: css``,
    price: css`
      ${hasLeftBorder};
    `,
    change: css`
      ${hasLeftBorder};
      color: ${props.nano24hChange > 0
        ? theme.color.status.success
        : theme.color.status.error};
      svg {
        width: 14px;
        height: 14px;
      }
    `,
    new: css`
      flex-grow: 1.1;
    `
  }
})
