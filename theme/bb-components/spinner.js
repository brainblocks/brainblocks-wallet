import { addStyles } from 'destyle'
import { css } from 'emotion'
import theme from '../theme'
import { styles } from 'brainblocks-components'

addStyles('BB-Spinner', props => {
  const libStyles = styles.spinner(props)
  return {
    root: css`
      ${libStyles.root};
      color: ${theme.color.palette[props.color] || props.color} !important;
    `
  }
})
