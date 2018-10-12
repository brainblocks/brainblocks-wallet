import { css } from 'emotion'
import { addStyles } from 'destyle'
import theme from '../theme'

const styles = {
  root: props => css`
    display: flex;
    flex-wrap: wrap;
  `,
  label: css`
    flex-grow: 1;
  `,
  extra: css`
    flex: 0 0 auto;
  `,
  field: css`
    flex: 0 0 100%;
  `,
  description: css`
    flex: 0 0 100%;
  `
}

addStyles('BB-FormItem', styles)
