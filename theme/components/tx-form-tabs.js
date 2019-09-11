// @flow
import { css } from 'emotion'
import { addStyles } from 'destyle'
import theme from '~/theme/theme'
import { formPageWidth } from '~/theme/globals/utils'

addStyles('BuySellTabs', props => ({
  root: css`
    ${formPageWidth};
    .react-tabs__tab-list {
      margin-bottom: ${theme.spacing.paddingLg.desktop}px !important;
    }
  `
}))
