import { css } from 'emotion'
import { addStyles } from 'destyle'
import Color from 'color'
import theme from '../theme'

const contrastThreshold = 1.5

function getBackgroundColor(props) {
  return theme.color.palette[props.account.color] || '#FFF'
}

function getWhiteContrast(color) {
  return Color(color).contrast(Color('white'))
}

const row = css`
  padding: ${theme.spacing.paddingMd.desktop}px;
  display: flex;
  align-items: center;
`

const leftPadding = css`
  padding-left: ${theme.spacing.paddingMd.desktop}px;
`

const action = props => css`
  flex-basis: 7%;
  text-align: center;
  path {
    ${getWhiteContrast(props.backgroundColor) > contrastThreshold
      ? css`
          fill: rgba(255, 255, 255, 0.6);
        `
      : css`
          fill: rgba(0, 0, 0, 0.6);
        `};
  }
`

const styles = {
  root: props => css`
    background: ${getBackgroundColor(props)};
    overflow: hidden;
    border-radius: ${theme.borderRadius.md}px;
  `,
  visible: css``,
  row1: css`
    ${row};
  `,
  title: css`
    flex-basis: 44%;
    flex-grow: 1;
  `,
  info1: css`
    ${leftPadding};
    flex-basis: 21%;
    flex-grow: 0.8;
  `,
  info2: css`
    ${leftPadding};
    flex-basis: 21%;
    flex-grow: 0.8;
  `,
  action1: props => css`
    ${leftPadding};
    ${action(props)};
    flex-grow: 1;
  `,
  action2: props => css`
    ${leftPadding};
    ${action(props)};
    flex-basis: auto;
    flex-grow: 0;
    justify-self: flex-end;
  `,
  dropdown: props => css`
    background: ${Color(getBackgroundColor(props))
      .desaturate(0.2)
      .darken(0.1)
      .toString()};
  `,
  subRow: css`
    ${row};
    position: relative;
    &:before {
      content: '';
      position: absolute;
      top: 0;
      left: 3px;
      right: 3px;
      border-top: 1px solid rgba(0, 0, 0, 0.1);
    }
    &:first-child {
      &:before {
        border-top: none;
      }
    }
  `
}

addStyles('AccountListItem', styles)

addStyles('AccountListItem--KeyValue', {
  key: props =>
    css`
      ${getWhiteContrast(props.backgroundcolor) > contrastThreshold
        ? css`
            color: rgba(255, 255, 255, 0.6);
          `
        : css`
            color: rgba(0, 0, 0, 0.5);
          `};
    `,
  value: props =>
    css`
      font-size: 18px;
      margin-top: 4px;
      ${getWhiteContrast(props.backgroundcolor) > contrastThreshold
        ? css`
            color: #fff;
          `
        : css`
            color: #000;
          `};
    `
})

addStyles('AccountListItem--AccountTitle', {
  icon: props =>
    css`
      path {
        ${getWhiteContrast(props.backgroundcolor) > contrastThreshold
          ? css`
              fill: #fff;
            `
          : css`
              fill: #000;
            `};
      }
    `,
  title: props =>
    css`
      ${getWhiteContrast(props.backgroundcolor) > contrastThreshold
        ? css`
            color: #fff;
          `
        : css`
            color: #000;
          `};
    `,
  subTitle: props =>
    css`
      ${getWhiteContrast(props.backgroundcolor) > contrastThreshold
        ? css`
            color: rgba(255, 255, 255, 0.6);
          `
        : css`
            color: rgba(0, 0, 0, 0.6);
          `};
    `
})

addStyles('AccountListItem--IconButton', {
  root: props => css`
    ${getWhiteContrast(props.backgroundcolor) > contrastThreshold
      ? css`
          &:hover {
            background: rgba(255, 255, 255, 0.2);
          }
          path {
            fill: rgba(255, 255, 255, 0.6);
          }
        `
      : css`
          &:hover {
            background: rgba(0, 0, 0, 0.15);
          }
          path {
            fill: rgba(0, 0, 0, 0.6);
          }
        `};
  `
})
