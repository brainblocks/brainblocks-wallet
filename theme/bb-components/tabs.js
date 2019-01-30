import { css } from 'emotion'
import { setStyles } from 'destyle'
import Color from 'color'
import theme from '../theme'
import { resetList } from '../globals/utils'
import { backgroundGradient } from '../globals/mixins'

setStyles('BB-Tabs', ({ variant, activeTabLeft, activeTabWidth }) => {
  switch (variant) {
    case 'switch':
      return {
        tabs: css`
          text-align: center;
          .react-tabs__tab-list {
            ${resetList};
            position: relative;
            background: rgba(0, 0, 0, 0.075);
            display: inline-flex;
            border-radius: 50px;
            padding: 6px 8px;
            &:before {
              content: '';
              position: absolute;
              border-radius: 50px;
              ${backgroundGradient(theme.color.palette.blue)};
              top: 6px;
              bottom: 6px;
              left: ${activeTabLeft}px;
              width: ${activeTabWidth}px;
              transition: all 0.4s ease;
            }
          }
          .react-tabs__tab {
            position: relative;
            cursor: pointer;
            padding: 0.75em 1.5em;
            margin: 0 0.2em;
            color: ${Color(theme.color.text.light)
              .darken(0.2)
              .toString()};
            font-weight: bold;
            transition: color 0.2s ease;
            &:first-child {
              margin-left: 0;
            }
            &:last-child {
              margin-right: 0;
            }
            &:hover {
              color: ${Color(theme.color.text.light)
                .darken(0.4)
                .toString()};
            }
            &--selected {
              transition: color 0.2s ease 0.1s;
              color: #fff !important;
            }
          }
          .react-tabs__tab-panel {
            text-align: left;
          }
        `
      }
    case 'side':
      return {
        tabs: css`
          .react-tabs__tab-list {
            ${resetList};
          }
          .react-tabs__tab {
            cursor: pointer;
            display: block;
            padding: 0;
            color: ${Color(theme.color.text.light)
              .darken(0.2)
              .toString()};
            font-weight: bold;
            transition: color 0.2s ease;
            &:hover {
              color: ${Color(theme.color.text.light)
                .darken(0.4)
                .toString()};
            }
            &--selected {
              color: #000 !important;
            }
          }
        `
      }
    default:
      return {}
  }
})
