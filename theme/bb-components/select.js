// @flow
import { addStyles } from 'destyle'
import { css } from 'emotion'
import theme from '../theme'
import { styles } from 'brainblocks-components'

addStyles('BB-Select', props => {
  const libStyles = styles.select(props)
  return {
    root: css`
      ${libStyles.root};
      border: none;
      background-color: transparent;
      font-family: ${theme.type.baseFontFamily};
      font-size: 15px;
      font-weight: 700;
      padding-left: 10px;
      padding-top: 5px;
      background-position: right 1.25em center;
    `,
    select: css`
      ${libStyles.select};
      color: white;
    `
  }
})
