import { css } from 'emotion'
import { addStyles } from 'destyle'
import theme from '~/theme/theme'
import { pageWidth } from '~/theme/globals/utils'

addStyles('SettingsTabs', props => ({
  root: css``,
  tabs: css`
    width: 100%;
    min-height: ${theme.layout.pageMinHeight}px;
    display: grid;
    grid-template-areas: 'sidebar content';
    grid-template-columns: 212px 1fr;
    grid-gap: 0;
  `,
  sidebar: css`
    grid-area: sidebar;
    background: #fff;
    padding: ${theme.layout.contentPadding - 8}px
      ${theme.layout.contentPadding}px;
  `,
  content: css`
    grid-area: content;
    background: ${theme.color.gray.lightest};
    padding: ${theme.layout.contentPadding}px;
  `,
  tab: css`
    display: flex;
    align-items: center;
    padding: 6px 0;
  `,
  tabIcon: css`
    margin-right: 14px;
    .bb-svg-icon {
      width: 18px;
      height: 18px;
    }
    .react-tabs__tab--selected & {
      color: ${theme.color.palette.blue};
    }
  `,
  tabName: css`
    flex-grow: 1;
  `,
  tabPanel: css``,
  tabPanelTitle: css`
    font-family: ${theme.type.baseFontFamily};
    font-size: 12px;
    font-weight: bold;
    text-transform: uppercase;
    font-weight: bold;
    margin-top: 2px;
    margin-bottom: ${theme.spacing.rhythmUnit * 2}px;
    letter-spacing: 0.12em;
  `,
  tabPanelContent: css``
}))
