// @flow
import { css } from 'emotion'
import { addStyles } from 'destyle'
import theme from '../theme'
import { ellipsis } from '../globals/utils'
import { styles } from 'brainblocks-components'

addStyles('BB-KeyValue', props => {
  const libStyles = styles.keyValue(props)
  const isDL = !props.hasOwnProperty('keyEl') || props.keyEl === 'dt'
  return {
    root: css`
      ${libStyles.root};
    `,
    key: css`
      ${libStyles.key};
      /* ${ellipsis}; */
      ${props.theme === 'header' &&
        css`
          white-space: nowrap;
          color: rgba(255, 255, 255, 0.35);
          text-transform: uppercase;
          font-size: 9px;
          letter-spacing: 0.1em;
        `};
      ${!isDL &&
        css`
          color: ${theme.color.text.headings};
          line-height: ${theme.type.headingLineHeight};
        `};
    `,
    value: css`
      ${libStyles.value};
      /* ${ellipsis}; */
      margin-top: 6px;
      ${props.theme === 'header' &&
        css`
          white-space: nowrap;
          color: #fff;
          font-size: 24px;
          font-weight: ${theme.type.baseFontWeight};
        `};
      ${!isDL &&
        css`
          font-size: ${theme.type.baseFontSize - 1}px;
          color: ${theme.color.text.light};
        `};
      ${props.size === 'lg' &&
        css`
          font-size: 42px;
          font-weight: 500;
          line-height: 1;
        `};
      ${props.size === 'sm' &&
        css`
          font-size: 18px;
        `};
    `
  }
})
