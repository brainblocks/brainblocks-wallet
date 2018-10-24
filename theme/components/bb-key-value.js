import { css } from 'emotion'
import { addStyles } from 'destyle'
import theme from '../theme'

addStyles('BB-KeyValue', props => {
  const isDL = !props.hasOwnProperty('keyEl') || props.keyEl === 'dt'
  return {
    root: css``,
    key: css`
      ${props.theme === 'header' &&
        css`
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
      margin-top: 6px;
      ${props.theme === 'header' &&
        css`
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