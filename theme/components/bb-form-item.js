import { css } from 'emotion'
import { addStyles } from 'destyle'
import { backgroundGradient } from '../globals/mixins'
import theme from '../theme'

const pad = theme.forms.itemPadding.desktop

addStyles('BB-FormItem', {
  root: css`
    align-items: baseline;
  `,
  label: css`
    margin-left: 22px;
    margin-bottom: 12px;
    color: ${theme.color.text.headings};
    font-size: 17px;
  `,
  extra: css`
    margin-bottom: 0.5em;
  `,
  field: css`
    input,
    select,
    textarea,
    .formItemPadding {
      padding: ${pad.t}px ${pad.r}px ${pad.b}px ${pad.l}px;
    }
  `,
  description: css`
    margin-top: 12px;
    margin-left: 22px;
    color: ${theme.color.text.light};
    p {
      margin: 0;
    }
  `
})
