import { css } from 'emotion'
import { addStyles } from 'destyle'
import theme from '~/theme/theme'

addStyles('SettingsForm', props => ({
  root: css``,
  divider: css`
    border: none;
    border-top: 1px solid ${theme.color.borders.sep};
  `,
  textWrap: css`
    @media (max-width: ${theme.bp.small}px) {
    }
  `,
  avatarChooser: css`
    padding: 12px;
    display: flex;
    align-items: center;
    img {
      border-radius: 100%;
    }
    a {
      margin-left: 18px;
      flex-grow: 1;
    }
  `
}))
