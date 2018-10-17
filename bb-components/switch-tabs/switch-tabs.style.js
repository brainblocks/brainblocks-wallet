import { css } from 'emotion'
import { addStyles } from 'destyle'
import theme from '../theme'

addStyles('BB-SwitchTabs', ({ activeTabLeft, activeTabWidth }) => {
  console.log(activeTabLeft, activeTabWidth)

  return {
    tabs: css`
      text-align: center;
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
          left: ${activeTabLeft}px;
          width: ${activeTabWidth}px;
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
})
