import { css } from 'emotion'
import { addStyles } from 'destyle'
import theme from '../theme'
import { styles } from 'brainblocks-components'

addStyles('BB-Alert', props => {
  const libStyles = styles.alert(props)
  return {
    root: css`
      ${libStyles.root};
      padding: ${theme.spacing.paddingSm.desktop}px;
      border-radius: ${theme.borderRadius.md}px;
      /* default variant = info */
      background: ${theme.color.status.info};
      ${props.variant === 'success' &&
        css`
          background: ${theme.color.status.success};
        `};
      ${props.variant === 'error' &&
        css`
          background: ${theme.color.status.error};
        `};
      ${props.variant === 'warning' &&
        css`
          background: ${theme.color.status.warning};
        `};
    `,
    icon: css`
      ${libStyles.icon};
      margin-right: ${theme.spacing.paddingSm.desktop}px;
      flex: 0 0 40px;
      height: 40px;
      position: relative;
      border-radius: 100%;
      background: rgba(255, 255, 255, 0.7);
      color: ${theme.color.status.info};
      ${props.variant === 'success' &&
        css`
          color: ${theme.color.status.success};
        `};
      ${props.variant === 'error' &&
        css`
          color: ${theme.color.status.error};
        `};
      ${props.variant === 'warning' &&
        css`
          color: ${theme.color.status.warning};
        `};
      .bb-svg-icon {
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
      }
    `,
    message: css`
      ${libStyles.message};
      flex-grow: 1;
      color: #fff;
      :last-child {
        margin-bottom: 0;
      }
      a {
        color: #fff;
        text-decoration: underline;
      }
    `
  }
})
