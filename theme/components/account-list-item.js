// @flow
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
    @media (max-width: ${theme.bp.medium - 1}px) {
      padding: ${theme.spacing.paddingMd.tablet}px;
    }
    @media (max-width: ${theme.bp.small - 1}px) {
      padding: 20px 14px;
    }
  `
  const leftPadding = css`
    padding-left: ${theme.spacing.paddingMd.desktop}px;
    @media (max-width: ${theme.bp.medium - 1}px) {
      padding-left: ${theme.spacing.paddingMd.tablet}px;
    }
    @media (max-width: ${theme.bp.medium - 1}px) {
      padding-left: 14px;
    }
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
      @media (max-width: ${theme.bp.mobile - 1}px) {
        border-radius: 0;
      }
    `,
    visible: css``,
    row1: css`
      ${row};
      position: relative;
      @media (max-width: ${theme.bp.mobile - 1}px) {
        padding-right: 52px;
      }
    `,
    title: css`
      flex-basis: 44%;
      flex-grow: 1;
      position: relative;
      top: -2px;
      @media (max-width: ${theme.bp.mobile}px) {
        /* max-width: 145px; */
      }
    `,
    info1: css`
      ${leftPadding};
      flex-basis: 21%;
      flex-grow: 0.8;
      position: relative;
      top: 2px;
    `,
    info2: css`
      ${leftPadding};
      flex-basis: 21%;
      flex-grow: 0.8;
      position: relative;
      top: 2px;
      @media (max-width: ${theme.bp.tablet - 1}px) {
        display: none;
      }
    `,
    action1: css`
      ${leftPadding};
      ${action};
      flex-grow: 1;
      @media (max-width: ${theme.bp.small - 1}px) {
        position: absolute;
        right: 4px;
        top: calc(50% - 30px);
      }
    `,
    action2: css`
      ${leftPadding};
      ${action};
      flex-basis: auto;
      flex-grow: 0;
      justify-self: flex-end;
      @media (max-width: ${theme.bp.small - 1}px) {
        position: absolute;
        right: 4px;
        bottom: calc(50% - 38px);
      }
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
      @media (max-width: ${theme.bp.mobile}px) {
        font-size: 16px;
      }
    `,
    iconButton: css`
      color: ${colorSecondary};
      &:hover:not(:disabled) {
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
