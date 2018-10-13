import { css } from 'emotion'
import { addStyles } from 'destyle'
import theme from '../theme'

const hasLeftBorder = css`
  padding-left: 24px;
  position: relative;
  &:before {
    content: '';
    position: absolute;
    top: 4px;
    bottom: 4px;
    left: 0;
    width: 2px;
    background: rgba(255, 255, 255, 0.15);
  }
`

const styles = {
  root: props => css`
    display: flex;
    align-items: center;
    justify-content: space-between;
  `,
  total: css`
    flex-grow: 0.8;
  `,
  value: css`
    ${hasLeftBorder};
    flex-grow: 0.8;
  `,
  price: css`
    ${hasLeftBorder};
    flex-grow: 0.8;
  `,
  change: props => css`
    ${hasLeftBorder};
    flex-grow: 0.8;
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

addStyles('AccountsHeader', styles)
