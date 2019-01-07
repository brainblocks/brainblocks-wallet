import { css } from 'emotion'
import { addStyles } from 'destyle'
import theme from '../theme'

addStyles('AccountsHeader', props => {
  const hasLeftBorder = css`
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
  return {
    root: css`
      display: flex;
      align-items: center;
      justify-content: space-between;
    `,
    total: css`
      flex-grow: 0.8;
      @media (max-width: ${theme.bp.tablet - 1}px) {
        display: none;
      }
    `,
    value: css`
      ${hasLeftBorder};
      flex-grow: 0.8;
      @media (max-width: ${theme.bp.tablet - 1}px) {
        display: none;
      }
    `,
    price: css`
      ${hasLeftBorder};
      flex-grow: 0.8;
      @media (max-width: ${theme.bp.tablet - 1}px) {
        display: none;
      }
    `,
    change: css`
      ${hasLeftBorder};
      flex-grow: 0.8;
      color: ${props.nano24hChange > 0
        ? theme.color.status.success
        : theme.color.status.error};
      svg {
        width: 14px;
        height: 14px;
      }
      @media (max-width: ${theme.bp.medium - 1}px) {
        display: none;
      }
    `,
    new: css`
      flex-grow: 1.1;
    `
  }
})
