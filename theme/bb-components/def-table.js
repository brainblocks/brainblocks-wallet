// @flow
import { css } from 'emotion'
import { addStyles } from 'destyle'
import theme from '../theme'
import { styles } from 'brainblocks-components'

addStyles('BB-DefTable', props => {
  const libStyles = styles.defTable(props)
  return {
    root: css`
      ${libStyles.root};
      display: block;
      margin: 0;
      padding: 0;
      list-style: none;
    `,
    item: css`
      ${libStyles.item};
      border-top-color: ${theme.color.borders.sep};
      padding-top: 12px;
      padding-bottom: 12px;
    `,
    dt: css`
      ${libStyles.dt};
    `,
    dd: css`
      ${libStyles.dd};
      text-overflow: ellipsis;
      overflow: hidden;
    `
  }
})
