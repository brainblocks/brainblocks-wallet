import { css } from 'emotion'
import { addStyles } from 'destyle'
import theme from '~/theme/theme'

const icon = css`
  width: 16px;
  height: 16px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
`

const styles = {
  root: css`
    position: relative;
    display: inline-block;
  `,
  circle: props => css`
    width: 44px;
    height: 44px;
    border-radius: 100%;
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
        background: ${theme.color.status.errorLight};
      `}
  `,
  sendIcon: css`
    ${icon};
    path {
      fill: ${theme.color.status.error};
    }
  `,
  receiveIcon: css`
    ${icon};
    path {
      fill: ${theme.color.status.success};
    }
  `,
  transferIcon: css`
    ${icon};
    path {
      fill: ${theme.color.status.info};
    }
  `
}

addStyles('TransactionImage', styles)
