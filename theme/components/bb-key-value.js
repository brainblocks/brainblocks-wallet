import { css } from 'emotion'
import { addStyles } from 'destyle'
import theme from '../theme'

const defaultProps = {
  keyEl: 'dt',
  valueEl: 'dd'
}

function isDl(props) {
  return !props.hasOwnProperty('keyEl') || props.keyEl === 'dt'
}

const styles = {
  root: props => css`
    ${!isDl(props) && css``};
  `,
  key: props => css`
    ${props.theme === 'header' &&
      css`
        color: rgba(255, 255, 255, 0.35);
        text-transform: uppercase;
        font-size: 9px;
        letter-spacing: 0.1em;
      `};
    ${!isDl(props) &&
      css`
        color: ${theme.color.text.headings};
        line-height: ${theme.type.headingLineHeight};
      `};
  `,
  value: props => css`
    margin-top: 6px;
    ${props.theme === 'header' &&
      css`
        color: #fff;
        font-size: 24px;
        font-weight: ${theme.type.baseFontWeight};
      `};
    ${!isDl(props) &&
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

addStyles('BB-KeyValue', styles)
