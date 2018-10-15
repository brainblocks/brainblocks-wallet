import { css } from 'emotion'
import { addStyles } from 'destyle'
import { backgroundGradient } from '../globals/mixins'
import theme from '../theme'

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

const styles = {
  root: props => css`
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
    background-size: 100% 100%;
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
    &:hover {
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
    path {
      fill: ${theme.color.palette.darkBlue};
    }
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
  change: props => css`
    ${hasLeftBorder};
    svg {
      width: 14px;
      height: 14px;
    }
    path {
      fill: ${props.nano24hChange > 0
        ? theme.color.status.success
        : theme.color.status.error};
    }
  `,
  new: css`
    flex-grow: 1.1;
  `
}

addStyles('DashboardHeader', styles)
