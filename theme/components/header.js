import { css } from 'emotion'
import { addStyles } from 'destyle'
import theme from '~/theme/theme'
import { pageWidth, resetList } from '~/theme/globals/utils'

addStyles('Header', {
  root: css`
    padding: 44px 0;
  `,
  pageWidth,
  fullWidth: css`
    padding: 0 4%;
  `,
  inner: css`
    display: flex;
    align-items: center;
    @media (min-width: ${theme.bp.large}px) {
      margin: 0 -110px;
    }
  `,
  logo: css`
    margin-right: 44px;
    img {
      width: 44px;
      height: 38px;
      cursor: default;
    }
    @media (min-width: ${theme.bp.large}px) {
      margin-right: ${110 - 44}px;
    }
  `,
  logotype: css`
    width: 216px;
    height: 40px;
  `,
  menu: css`
    flex-grow: 1;
    ul {
      ${resetList};
    }
    li {
      display: inline-block;
      margin-right: 2.2em;
      &.is-active {
        a {
          color: #fff;
        }
      }
    }
    a {
      color: rgba(255, 255, 255, 0.5);
      font-size: ${theme.type.baseFontSize - 1}px;
      display: flex;
      align-items: center;
      &:hover {
        color: #fff;
      }
    }
    svg {
      width: 15px;
      height: 15px;
      margin-right: 10px;
    }
  `,
  user: css`
    display: flex;
    align-items: center;
    cursor: pointer;
    position: relative;
    padding-right: 16px;
    &:after {
      content: '';
      position: absolute;
      border: 4px solid transparent;
      border-top-color: rgba(255, 255, 255, 0.75);
      top: 50%;
      right: 0;
      transform: translateY(-1px);
    }
  `,
  userAvatar: css`
    border-radius: 100%;
    margin-right: 1em;
  `,
  userName: css`
    color: #fff;
    font-size: ${theme.type.baseFontSize - 1}px;
  `,
  userDropdown: css`
    width: 225px;
    margin-top: 10px;
    margin-right: -10px;
    border-radius: ${theme.borderRadius.sm}px;
    box-shadow: 5px 5px 15px rgba(0, 0, 0, 0.1);
  `,
  userDropdownInner: css``,
  userSecurity: css`
    background: ${theme.color.gray.lightest};
    padding: 12px;
    display: flex;
  `,
  userSecurityIcon: css`
    flex: 0 0 36px;
    height: 36px;
    border-radius: 100%;
    background: rgba(0, 0, 0, 0.1);
    margin-right: 12px;
    position: relative;
    .bb-svg-icon {
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      width: 18px;
      height: 18px;
    }
  `,
  userSecurityContent: css`
    flex-grow: 1;
  `,
  userSecurityTitle: css`
    font-size: ${theme.type.baseFontSize}px;
    color: #808080;
    margin: 4px 0 0;
  `,
  userSecurityDescription: css`
    font-size: ${theme.type.baseFontSize - 2}px;
    font-weight: ${theme.type.baseFontWeight};
    color: #b4b4b4;
    margin: 4px 0 8px;
  `,
  userSecurityButtons: css`
    display: flex;
  `,
  userSecurityLockBtn: css`
    flex-grow: 1;
    margin-right: 4px;
    font-size: ${theme.type.baseFontSize - 2}px;
  `,
  userSecuritySettingsBtn: css`
    flex: 0 0 auto;
    .bb-svg-icon {
      line-height: 0;
      width: 14px;
      height: 14px;
    }
  `,
  userMenu: css`
    padding: 12px;
    padding-left: ${12 + 12 + 36}px;
  `,
  userMenuList: css`
    ${resetList};
    li {
      padding: 4px 0;
      cursor: pointer;
      display: flex;
      align-items: center;
      color: #808080;
      &:hover {
        color: #404040;
      }
      i {
        flex: 0 0 26px;
      }
      .bb-svg-icon {
        height: 15px;
        width: 17px;
      }
      span {
        flex-grow: 1;
      }
    }
  `,
  userMenuLogout: css`
    color: ${theme.color.palette.red} !important;
  `
})
