import { css } from 'emotion'
import { addStyles } from 'destyle'
import theme from '~/theme/theme'

addStyles('Error', {
  grid: css`
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 24px 0;
  `,
  root: css`
    margin: 60px auto;
    max-width: 500px;
    text-align: center;
  `,
  title: css``,
  graphic: css`
    img {
      width: 70%;
    }
  `,
  info: css``
})
