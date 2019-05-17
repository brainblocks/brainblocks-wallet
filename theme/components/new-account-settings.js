// @flow
import { css } from 'emotion'
import { addStyles } from 'destyle'
import { formPageWidth } from '~/theme/globals/utils'

addStyles('NewAccountSettings', props => {
  return {
    root: css`
      ${formPageWidth};
      margin-top: 0;
    `,
    moreSettings: css`
      margin-left: 16px;
    `
  }
})
