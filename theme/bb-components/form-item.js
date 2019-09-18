// @flow
import { css } from 'emotion'
import { addStyles } from 'destyle'
import theme from '../theme'
import { styles } from 'brainblocks-components'

const padD = theme.forms.itemPadding.desktop
const padM = theme.forms.itemPadding.mobile

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
      @media (max-width: ${theme.bp.small}px) {
        margin-left: ${padM.l - 3}px;
        margin-bottom: 8px;
        font-size: 15px;
      }
    `,
    extra: css`
      ${libStyles.extra};
      margin-bottom: 0.5em;
    `,
    field: css`
      ${libStyles.field};
      max-width: 100%;
      input,
      select,
      textarea,
      .formItemPadding {
        padding: ${padD.t}px ${padD.r}px ${padD.b}px ${padD.l}px;
        @media (max-width: ${theme.bp.small}px) {
          padding: ${padM.t}px ${padM.r}px ${padM.b}px ${padM.l}px;
        }
      }
    `,
    description: css`
      ${libStyles.description};
      margin-top: 12px;
      margin-left: 22px;
      color: ${theme.color.text.light};
      @media (max-width: ${theme.bp.small}px) {
        margin-left: ${padM.l - 3}px;
        margin-top: 8px;
      }
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
