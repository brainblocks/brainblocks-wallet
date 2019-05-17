// @flow
import { css } from 'emotion'
import { addStyles } from 'destyle'
import theme from '../theme'

addStyles('AccountsList', props => ({
  root: css`
    margin-top: 10px;
    @media (max-width: ${theme.bp.mobile}px) {
      margin-top: 0;
      margin-left: ${theme.layout.mobile.contentPadding * -1}px;
      margin-right: ${theme.layout.mobile.contentPadding * -1}px;
    }
  `,
  item: css`
    margin-bottom: ${theme.spacing.paddingSm.desktop}px;
  `
}))
