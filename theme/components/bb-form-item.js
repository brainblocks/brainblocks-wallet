import { css } from 'emotion'
import { addStyles } from 'destyle'
import { backgroundGradient } from '../globals/mixins'
import theme from '../theme'

export const styles = {
  root: props => css`
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
    textarea {
      padding: 24px 18px 24px 26px;
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
}

addStyles('BB-FormItem', styles)
