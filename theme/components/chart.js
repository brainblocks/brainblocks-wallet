import { addStyles } from 'destyle'
import { css } from 'emotion'
import theme from '../theme'

addStyles('Chart', props => ({
  root: css`
    width: 100%;
    height: 100%;
  `,
  tooltip: css`
    background: #fff;
    border-radius: 6px;
    box-shadow: 2px 2px 12px rgba(0, 0, 0, 0.2);
    padding: 8px;
    font-size: 10px;
  `,
  tooltipLabel: css`
    text-transform: uppercase;
    margin: 0;
  `,
  tooltipBalance: css`
    color: ${theme.color.status.success};
    margin: 0;
  `
}))
