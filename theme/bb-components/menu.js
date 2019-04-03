import { addStyles } from 'destyle'
import { css } from 'emotion'
import theme from '../theme'
import { styles } from 'brainblocks-components'

addStyles('BB-Menu', props => {
  const libStyles = styles.menu(props)
  return {
    root: css`
      ${libStyles.root};
    `
  }
})

addStyles('BB-MenuItem', props => {
  const libStyles = styles.menuItem(props)
  return {
    root: css`
      ${libStyles.root};
      font-family: ${theme.type.baseFontFamily} !important;
      font-weight: ${theme.type.baseFontWeight} !important;
      line-height: ${theme.type.baseLineHeight} !important;
    `,
    selected: css`
      ${libStyles.selected};
      background-color: ${theme.color.palette.lightBlue} !important;
      color: #fff !important;
    `
  }
})
