import { css } from 'emotion'
import { addStyles } from 'destyle'
import theme from '~/theme/theme'

addStyles('BB-Snackbar', props => {
  const alert = css`
    /* Until I can figure out how to get this CSS
    to be appended _after_ the MUI styles the !important's
    will have to stay */
    border-radius: 10px !important;
    box-shadow: 5px 5px 15px rgba(0, 0, 0, 0.1) !important;
    font-family: ${theme.type.baseFontFamily} !important;
    font-size: ${theme.type.baseFontSize - 1}px !important;
    font-weight: ${theme.type.baseFontWeight} !important;
    max-width: 90%;
    /* Note - same breakpoint as bottom tabs in Header.js component */
    @media (max-width: ${theme.bp.tablet - 1}px) {
      position: absolute;
      left: 20px;
      right: 20px;
      bottom: 50px;
    }
    > div {
      flex-grow: 1;
    }
  `
  const icon = css`
    flex: 0 0 40px;
    height: 40px;
    margin-right: 15px;
    border-radius: 100%;
    background: rgba(255, 255, 255, 0.7);
    position: relative;
    .bb-svg-icon {
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
    }
  `
  return {
    root: css``,
    success: css`
      ${alert};
      background-color: ${theme.color.status.success} !important;
    `,
    iconSuccess: css`
      ${icon};
      color: ${theme.color.status.success};
    `,
    error: css`
      ${alert};
      background-color: ${theme.color.status.error} !important;
    `,
    iconError: css`
      ${icon};
      color: ${theme.color.status.error};
    `,
    warning: css`
      ${alert};
      background-color: ${theme.color.status.warning} !important;
    `,
    iconWarning: css`
      ${icon};
      color: ${theme.color.status.warning};
    `,
    info: css`
      ${alert};
      background-color: ${theme.color.status.info} !important;
    `,
    iconInfo: css`
      ${icon};
      color: ${theme.color.status.info};
    `
  }
})
