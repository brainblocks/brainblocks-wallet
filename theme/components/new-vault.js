import { css } from 'emotion'
import { addStyles } from 'destyle'
import theme from '~/theme/theme'
import { formPageWidth } from '~/theme/globals/utils'

addStyles('NewVault', props => {
  return {
    root: css`
      ${formPageWidth};
      margin-top: 0;
    `,
    tabs: css`
      margin-bottom: ${theme.spacing.paddingMd.desktop}px;
    `
  }
})
