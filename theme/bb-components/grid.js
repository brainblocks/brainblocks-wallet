import { css } from 'emotion'
import { addStyles } from 'destyle'
import theme from '../theme'

const styles = {}

addStyles('BB-Grid', props => ({
  root: css`
    grid-gap: ${props.gutter
      ? `${props.gutter}px`
      : `${theme.spacing.paddingLg.mobile}px`};
    ${props.gutter
      ? null
      : css`
          @media (min-width: ${theme.bp.tablet}px) {
            grid-gap: ${theme.spacing.paddingLg.tablet}px;
          }
          @media (min-width: ${theme.bp.desktop}px) {
            grid-gap: ${theme.spacing.paddingLg.desktop}px;
          }
        `};
  `
}))
