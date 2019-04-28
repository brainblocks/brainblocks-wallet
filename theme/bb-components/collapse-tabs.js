import { css } from 'emotion'
import { setStyles } from 'destyle'
import theme from '../theme'
import Color from 'color'
import { resetList } from '../globals/utils'

setStyles('BB-CollapseTabs', props => {
  return {
    root: css``,
    collapsedRoot: css``,
    collapsedBack: css`
      cursor: pointer;
      margin: ${theme.layout.contentPadding}px;
      @media (max-width: ${theme.bp.small}px) {
        margin: 20px 10px;
      }
    `,
    collapsedTab: css`
      margin: ${theme.layout.contentPadding}px;
      margin-top: 0;
      @media (max-width: ${theme.bp.small}px) {
        margin: 20px 10px;
        margin-top: 0;
      }
    `,
    collapsedList: css`
      ${resetList};
      margin: ${theme.layout.contentPadding}px 0;
      li {
        cursor: pointer;
        padding: ${theme.spacing.paddingSm.mobile}px
          ${theme.layout.mobile.contentPadding +
            theme.forms.itemPadding.mobile.l}px;
        color: ${Color(theme.color.text.light)
          .darken(0.2)
          .toString()};
        font-weight: bold;
        font-size: ${theme.type.baseFontSize}px;
        &:hover {
          background: #fff;
          color: #000;
          .bb-svg-icon {
            color: ${theme.color.palette.blue};
          }
        }
      }
    `,
    tabsRoot: css`
      width: 100%;
      min-height: ${theme.layout.pageMinHeight}px;
      display: grid;
      grid-template-areas: 'sidebar content';
      grid-template-columns: 212px 1fr;
      grid-gap: 0;
    `,
    tabs: css`
      grid-area: sidebar;
      background: #fff;
      padding: ${theme.layout.contentPadding - 8}px
        ${theme.layout.contentPadding}px;
    `,
    tab: css``,
    tabPanels: css`
      grid-area: content;
      background: ${theme.color.gray.lightest};
      padding: ${theme.layout.contentPadding}px;
    `,
    tabPanel: css``
  }
})
