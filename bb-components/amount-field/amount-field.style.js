import { addStyles } from 'destyle'
import { css } from 'emotion'
import theme from '../theme'

addStyles('BB-AmountField', {
  root: css`
    display: flex;
    align-items: center;
  `,
  content: css`
    flex-grow: 1;
  `,
  switchButton: css`
    margin-left: 12px;
  `,
  topRow: css`
    display: flex;
    align-items: flex-end;
  `,
  topVal: css`
    flex-grow: 1;
  `,
  input: css`
    width: 100%;
  `,
  topLabel: css`
    margin-left: 8px;
  `,
  bottomRow: css`
    display: flex;
    align-items: flex-end;
  `,
  bottomVal: css`
    flex-grow: 1;
  `,
  bottomLabel: css`
    margin-left: 8px;
  `
})
