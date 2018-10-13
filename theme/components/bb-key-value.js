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
    ${!isDl(props) &&
      css`
        color: ${theme.color.text.headings};
        line-height: ${theme.type.headingLineHeight};
      `};
  `,
  value: props => css`
    margin-top: 0.2em;
    ${!isDl(props) &&
      css`
        font-size: ${theme.type.baseFontSize - 1}px;
        color: ${theme.color.text.light};
      `};
  `
}

addStyles('BB-KeyValue', styles)
