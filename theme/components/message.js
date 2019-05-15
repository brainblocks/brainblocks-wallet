// @flow
import { css } from 'emotion'
import { addStyles } from 'destyle'
import theme from '~/theme/theme'

addStyles('Message', props => ({
  root: css`
    margin: auto;
    max-width: 500px;
    text-align: center;
  `,
  header: css``,
  title: css`
    margin: 0 0 8px;
  `,
  subtitle: css`
    color: #999;
    margin: 0;
  `,
  graphic: css`
    margin: 22px 0;
    img {
      max-height: 160px;
    }
    @media (max-width: ${theme.bp.medium - 1}px) {
      margin: 18px 0;
      img {
        max-height: 130px;
      }
    }
  `,
  content: css``
}))
