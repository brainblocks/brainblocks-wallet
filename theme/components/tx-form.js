// @flow
import { css } from 'emotion'
import { addStyles } from 'destyle'
import theme from '~/theme/theme'

addStyles('TxForm', props => ({
  root: css``,
  textComponent: css`
    margin-left: 22px;
  `,
  defTableInField: css`
    flex-grow: 1;
    padding: 18px 22px;
  `,
  intermediateHeader: css`
    text-align: center;
    position: relative;
    &:before {
      content: '';
      position: absolute;
      top: 50%;
      left: 0;
      right: 0;
      border-top: 1px solid ${theme.color.borders.sep};
    }
    h2 {
      margin-bottom: 8px;
    }
    p {
      margin: 0;
    }
  `,
  intermediateHeaderInner: css`
    display: inline-block;
    padding: 0 16px;
    position: relative;
    background: ${theme.color.gray.lightest};
  `
}))
