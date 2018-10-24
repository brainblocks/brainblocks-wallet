import { css } from 'emotion'
import { addStyles } from 'destyle'
import theme from '~/theme/theme'
import { pageWidth } from '~/theme/globals/utils'

addStyles('SendReceiveTabs', props => ({
  root: css`
    margin: 0 auto;
    max-width: 800px;
    .react-tabs__tab-list {
      margin-bottom: ${theme.spacing.paddingLg.desktop}px !important;
    }
  `
}))