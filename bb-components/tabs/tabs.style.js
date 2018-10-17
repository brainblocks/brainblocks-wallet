import { css } from 'emotion'
import { addStyles } from 'destyle'
import theme from '../theme'

addStyles('BB-Tabs', props => {
  switch (props.variant) {
    case 'switch':
      return {
        tabs: css`
          .react-tabs__tab-list {
            list-style: none;
            display: inline-flex;
            position: relative;
            &:before {
              background: black;
              content: '';
              position: absolute;
              top: 0;
              bottom: 0;
              left: ${props.activeTabLeft}px;
              width: ${props.activeTabWidth}px;
            }
          }
          .react-tabs__tab {
            position: relative;
            cursor: pointer;
            &--selected {
              color: #fff;
            }
          }
          .react-tabs__tab-panel {
          }
        `
      }
    default:
      return {
        tabs: css`
          .react-tabs__tab-list {
          }
          .react-tabs__tab {
          }
          .react-tabs__tab-panel {
          }
        `,
        tabDisabled: css``,
        tabSelected: css``,
        tabPanelSelected: css``
      }
  }
})
