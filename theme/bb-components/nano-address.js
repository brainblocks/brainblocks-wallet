import { css } from 'emotion'
import { addStyles } from 'destyle'
import theme from '../theme'
import { styles } from 'brainblocks-components'

addStyles('BB-NanoAddress', props => {
  const libStyles = styles.nanoAddress(props)
  return {
    root: css`
      ${libStyles.root};
      display: inline-flex;
      align-items: center;
      text-transform: lowercase;
      letter-spacing: 0;
      position: relative;
      ${props.hoverable ||
        (props.copyable &&
          css`
            padding-right: 2.4em;
          `)}
    `,
    address: css`
      ${libStyles.address};
    `,
    icon: css`
      ${libStyles.icon};
      position: absolute;
      right: 0;
      top: 50%;
      transform: translateY(-50%);
      opacity: 0.6;
      cursor: pointer;
      &:hover {
        opacity: 1;
      }
    `
  }
})
