// @flow
import { css } from 'emotion'
import { addStyles } from 'destyle'
import theme from '~/theme/theme'
import { formPageWidth } from '~/theme/globals/utils'

addStyles('TxFormTabs', props => ({
  root: css`
    ${formPageWidth};
    position: relative;
    .react-tabs__tab-list {
      margin-bottom: ${theme.spacing.paddingLg.desktop}px !important;
    }
  `,
  back: css`
    position: absolute;
    top: 18px;
    left: 0;
    color: ${theme.color.text.base};
    display: flex;
    align-items: center;
  `,
  backIcon: css`
    margin-right: 10px;
    line-height: 1;
  `,
  backText: css`
    @media (max-width: 400px) {
      display: none;
    }
  `
}))
