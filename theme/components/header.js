import { css } from 'emotion'
import { addStyles } from 'destyle'
import theme from '~/theme/theme'
import { pageWidth, resetList } from '~/theme/globals/utils'

addStyles('Header', {
  root: css`
    padding: 44px 0;
  `,
  pageWidth,
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
  userMenu: css`
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
  `
})
