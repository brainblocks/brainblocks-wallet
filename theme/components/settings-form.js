import { css } from 'emotion'
import { addStyles } from 'destyle'
import theme from '~/theme/theme'

addStyles('SettingsForm', props => ({
  root: css``,
  divider: css`
    border: none;
    border-top: 1px solid ${theme.color.borders.sep};
  `
}))
