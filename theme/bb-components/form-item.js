import { css } from 'emotion'
import { addStyles } from 'destyle'
import { backgroundGradient } from '../globals/mixins'
import theme from '../theme'
import { styles } from 'brainblocks-components'

const pad = theme.forms.itemPadding.desktop

addStyles('BB-FormItem', props => {
  const libStyles = styles.formItem(props)
  return {
    root: css`
      ${libStyles.root};
      align-items: baseline;
    `,
    label: css`
      ${libStyles.label};
      margin-left: 22px;
      margin-bottom: 12px;
      color: ${theme.color.text.headings};
      font-size: 17px;
    `,
    extra: css`
      ${libStyles.extra};
      margin-bottom: 0.5em;
    `,
    field: css`
      ${libStyles.field};
      input,
      select,
      textarea,
      .formItemPadding {
        padding: ${pad.t}px ${pad.r}px ${pad.b}px ${pad.l}px;
      }
    `,
    description: css`
      ${libStyles.description};
      margin-top: 12px;
      margin-left: 22px;
      color: ${theme.color.text.light};
      p {
        margin: 0;
      }
    `,
    error: css`
      ${libStyles.error};
      margin-top: 12px;
      margin-left: 22px;
      color: ${theme.color.status.error};
      p {
        margin: 0;
      }
    `
  }
})
