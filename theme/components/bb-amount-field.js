import { addStyles } from 'destyle'
import { css } from 'emotion'
import theme from '../theme'

const pad = theme.forms.itemPadding.desktop

addStyles('BB-AmountField', {
  root: css`
    padding-right: ${pad.r}px;
  `,
  content: css``,
  switchButton: css`
    color: ${theme.color.text.light};
  `,
  topRow: css`
    padding-right: 4px;
  `,
  topVal: css``,
  input: css`
    padding-bottom: 6px !important;
    font-size: ${theme.type.baseFontSize + 3}px;
  `,
  topLabel: css`
    color: ${theme.color.text.headings};
    margin-bottom: 6px;
    font-size: ${theme.type.baseFontSize + 3}px;
    line-height: 1;
  `,
  bottomRow: css`
    border-top: 1px solid ${theme.color.borders.sep};
    padding-top: 6px;
    padding-right: 4px;
    margin: 0 0 ${pad.b}px ${pad.l}px;
  `,
  bottomVal: css`
    color: ${theme.color.text.light};
  `,
  bottomLabel: css`
    color: ${theme.color.text.light};
  `
})
