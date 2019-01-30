import { css } from 'emotion'
import { addStyles } from 'destyle'
import theme from '~/theme/theme'
import Color from 'color'
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
  back: css`
    display: flex;
    align-items: center;
  `,
  backIcon: css`
    margin-right: 12px;
    line-height: 0;
    color: ${theme.color.palette.blue};
    .bb-svg-icon {
      width: 16px;
      height: 16px;
    }
  `,
  backText: css`
    color: black;
    flex-grow: 1;
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
