// @flow
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
    @media (max-width: ${theme.bp.mobile - 1}px) {
      padding-left: 16px;
      margin-left: 16px;
    }
  `
  const infoRow = css`
    padding-left: 18px;
    display: flex;
    @media (max-width: ${theme.bp.mobile - 1}px) {
      padding-left: 0;
    }
  `
  // styles
  return {
    root: css`
      display: flex;
      align-items: stretch;
      @media (max-width: ${theme.bp.medium - 1}px) {
        flex-wrap: wrap;
        align-items: auto;
      }
    `,
    // 3 major sections
    info: css`
      flex-basis: 33%;
      flex-grow: 1;
      margin-right: ${theme.spacing.paddingLg.desktop}px;
      @media (max-width: ${theme.bp.small - 1}px) {
        margin-right: 0;
      }
    `,
    sendReceiveBtn: css`
      text-align: left;
      flex-basis: 154px;
      position: relative;
      background-size: 101% 101%;
      border-radius: ${theme.borderRadius.md + 3}px;
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
      @media (max-width: ${theme.bp.small - 1}px) {
        margin: 28px ${theme.layout.mobile.pagePadding * -1}px -50px;
        padding-bottom: 36px;
        padding-top: 20px;
        flex: 1 0 100%;
        border-radius: ${theme.borderRadius.lg}px ${theme.borderRadius.lg}px 0 0;
        svg {
          margin-bottom: 0;
          width: 20px;
          height: 20px;
        }
        .send-receive-button-text {
          flex: 0 0 auto;
          margin-left: 12px;
        }
      }
    `,
    sendReceiveBtnInner: css`
      @media (min-width: ${theme.bp.small}px) {
        position: absolute;
        left: 0;
        right: 0;
        bottom: 0;
        padding: 28px;
      }
      @media (max-width: ${theme.bp.small - 1}px) {
        display: flex;
        justify-content: center;
      }
    `,
    chart: css`
      ${backgroundGradient(theme.color.palette.blue)};
      flex-basis: 33%;
      flex-grow: 1;
      border-radius: ${theme.borderRadius.md + 3}px;
      margin-left: ${theme.spacing.paddingLg.desktop}px;
      @media (max-width: ${theme.bp.medium - 1}px) {
        display: none;
      }
    `,
    // Info section
    selector: css`
      margin-bottom: 32px;
      max-width: 260px;
      @media (max-width: ${theme.bp.mobile - 1}px) {
        max-width: 100%;
        margin-bottom: 20px;
      }
    `,
    infoRow1: css`
      ${infoRow};
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
      ${infoRow};
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
