import { css } from 'emotion'
import { addStyles } from 'destyle'
import Color from 'color'
import theme from '../theme'

addStyles('AccountListItem', props => {
  // constants
  const contrastThreshold = 1.55
  const backgroundColor = theme.color.palette[props.account.color] || '#FFF'
  const whiteContrast = Color(backgroundColor).contrast(Color('white'))
  const isLightTextVersion = whiteContrast > contrastThreshold
  const colorPrimary = isLightTextVersion ? '#FFF' : '#000'
  const colorSecondary = isLightTextVersion
    ? 'rgba(255,255,255,0.6)'
    : 'rgba(0,0,0,0.5)'

  // helpers
  const row = css`
    padding: ${theme.spacing.paddingMd.desktop}px;
    display: flex;
    align-items: center;
  `
  const leftPadding = css`
    padding-left: ${theme.spacing.paddingMd.desktop}px;
  `
  const action = css`
    flex-basis: 7%;
    text-align: center;
    color: ${colorSecondary};
  `

  // styles
  return {
    // layout
    root: css`
      background: ${backgroundColor};
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
    action1: css`
      ${leftPadding};
      ${action};
      flex-grow: 1;
    `,
    action2: css`
      ${leftPadding};
      ${action};
      flex-basis: auto;
      flex-grow: 0;
      justify-self: flex-end;
    `,
    dropdown: css`
      background: ${Color(backgroundColor)
        .desaturate(0.2)
        .darken(0.1)
        .toString()};
    `,
    subRow: css`
      ${row};
      padding-top: ${theme.spacing.paddingMd.desktop * 0.66}px;
      padding-bottom: ${theme.spacing.paddingMd.desktop * 0.66}px;
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
    `,
    // child styles
    accountTitleIcon: css`
      color: ${colorPrimary};
    `,
    accountTitleTitle: css`
      color: ${colorPrimary};
    `,
    accountTitleSubTitle: css`
      color: ${colorSecondary};
    `,
    keyValueKey: css`
      color: ${colorSecondary};
    `,
    keyValueValue: css`
      font-size: 18px;
      margin-top: 4px;
      color: ${colorPrimary};
    `,
    iconButton: css`
      color: ${colorSecondary};
      &:hover {
        color: ${colorPrimary};
        background: ${isLightTextVersion
          ? 'rgba(255,255,255,0.2)'
          : 'rgba(0,0,0,0.15)'};
      }
    `,
    nanoAddress: css`
      color: ${colorPrimary};
    `,
    subRowValuePrimary: css`
      font-size: 14px;
      font-weight: 700;
      color: ${colorPrimary};
    `,
    subRowValueSecondary: css`
      font-size: 14px;
      font-weight: 700;
      color: ${colorSecondary};
    `
  }
})
