import { css } from 'emotion'
import { addStyles } from 'destyle'
import theme from '../theme'
import { ellipsis } from '../globals/utils'

addStyles('AccountTitle', props => {
  return {
    root: css``,
    top: css`
      display: flex;
      align-items: baseline;
    `,
    icon: css`
      width: 21px;
      height: 21px;
      margin-right: 12px;
      display: flex;
      align-items: flex-end;
      color: ${props.color === 'light' ? '#FFF' : '#000'};
      svg {
        height: auto;
      }
      @media (max-width: ${theme.bp.mobile}px) {
        /* display: none; */
        margin-right: 8px;
      }
    `,
    title: css`
      ${ellipsis};
      flex-grow: 1;
      position: relative;
      bottom: 4px;
      text-transform: uppercase;
      font-weight: 700;
      font-size: ${theme.type.baseFontSize - 2}px;
      letter-spacing: 0.12em;
      margin: 0;
      color: ${theme.color.text.headings};
      @media (max-width: ${theme.bp.mobile}px) {
        letter-spacing: 0.03em;
        max-width: 120px;
      }
      ${props.color === 'light' &&
        css`
          color: #fff;
        `};
      ${props.hasOwnProperty('account') &&
        !props.account.label &&
        css`
          letter-spacing: 0.025em;
          font-size: ${theme.type.baseFontSize}px;
          text-transform: none;
        `}
      /*${(props.hasOwnProperty('account') &&
        !props.account.hasOwnProperty('label')) ||
        (props.account.label.length === 0 &&
          css`
            letter-spacing: 0.025em;
            font-size: ${theme.type.baseFontSize}px;
            text-transform: none;
          `)};*/
    `,
    subTitle: css`
      flex-basis: 100%;
      margin: 4px 0 0;
      color: ${theme.color.text.light};
      font-size: ${theme.type.baseFontSize - 2}px;
      ${props.color === 'light' &&
        css`
          color: rgba(255, 255, 255, 0.6);
        `};
    `
  }
})
