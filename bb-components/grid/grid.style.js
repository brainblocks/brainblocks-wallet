import { css } from 'emotion'
import { addStyles } from 'destyle'
import theme from '../theme'

addStyles('BB-Grid', props => ({
  root: css`
    display: grid;
    grid-template-columns: repeat(12, 1fr);
    grid-gap: ${props.gutter ? `${props.gutter}px` : `${theme.spacing.md}px`};
  `,
  item: css`
    grid-column-end: ${props.span ? `span ${props.span}` : `span 12`};
    ${
      props.spanMobile
        ? css`
            @media (min-width: 480px) {
              grid-column-end: span ${props.spanMobile};
            }
          `
        : null
    }
    ${
      props.spanSm
        ? css`
            @media (min-width: 640px) {
              grid-column-end: span ${props.spanSm};
            }
          `
        : null
    }
    ${
      props.spanTablet
        ? css`
            @media (min-width: 768px) {
              grid-column-end: span ${props.spanTablet};
            }
          `
        : null
    }
    ${
      props.spanDesktop
        ? css`
            @media (min-width: 1020px) {
              grid-column-end: span ${props.spanDesktop};
            }
          `
        : null
    }
    ${
      props.spanLg
        ? css`
            @media (min-width: 1280px) {
              grid-column-end: span ${props.spanLg};
            }
          `
        : null
    }
  `
}))
