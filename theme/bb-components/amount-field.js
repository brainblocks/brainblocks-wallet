import { addStyles } from 'destyle'
import { css } from 'emotion'
import theme from '../theme'
import { styles } from 'brainblocks-components'

const padD = theme.forms.itemPadding.desktop
const padM = theme.forms.itemPadding.mobile

addStyles('BB-AmountField', props => {
  const libStyles = styles.amountField(props)
  return {
    root: css`
      ${libStyles.root};
      padding-right: ${padD.r}px;
      @media (max-width: ${theme.bp.small}px) {
        padding-right: ${padM.r}px;
      }
    `,
    content: css`
      ${libStyles.content};
    `,
    switchButton: css`
      ${libStyles.switchButton};
      color: ${theme.color.text.light};
    `,
    topRow: css`
      ${libStyles.topRow};
      padding-right: 4px;
    `,
    topVal: css`
      ${libStyles.topVal};
    `,
    input: css`
      ${libStyles.input};
      padding-bottom: 6px !important;
      font-size: ${theme.type.baseFontSize + 3}px;
    `,
    topLabel: css`
      ${libStyles.topLabel};
      color: ${theme.color.text.headings};
      margin-bottom: 6px;
      font-size: ${theme.type.baseFontSize + 3}px;
      line-height: 1;
    `,
    bottomRow: css`
      ${libStyles.bottomRow};
      border-top: 1px solid ${theme.color.borders.sep};
      padding-top: 6px;
      padding-right: 4px;
      margin: 0 0 ${padD.b}px ${padD.l}px;
      @media (max-width: ${theme.bp.small}px) {
        margin: 0 0 ${padM.b}px ${padM.l}px;
      }
    `,
    bottomVal: css`
      ${libStyles.bottomVal};
      color: ${theme.color.text.light};
    `,
    bottomLabel: css`
      ${libStyles.bottomLabel};
      color: ${theme.color.text.light};
    `
  }
})
