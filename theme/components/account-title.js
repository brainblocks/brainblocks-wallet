import { css } from 'emotion'
import { addStyles } from 'destyle'
import theme from '../theme'

const styles = {
  root: props => css`
    display: flex;
    flex-wrap: wrap;
    align-items: baseline;
  `,
  icon: css`
    width: 21px;
    height: 21px;
    margin-right: 10px;
    display: flex;
    align-items: flex-end;
    svg {
      height: auto;
    }
  `,
  title: css`
    flex-grow: 1;
    position: relative;
    bottom: 4px;
    text-transform: uppercase;
    font-weight: 700;
    font-size: ${theme.type.baseFontSize - 2}px;
    letter-spacing: 0.12em;
    margin: 0;
    color: ${theme.color.text.headings};
  `,
  subTitle: css`
    flex-basis: 100%;
    margin: 4px 0 0;
    color: ${theme.color.text.light};
    font-size: ${theme.type.baseFontSize - 2}px;
  `
}

addStyles('AccountTitle', styles)
