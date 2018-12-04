import { css } from 'emotion'
import { addStyles } from 'destyle'
import theme from '~/theme/theme'

addStyles('AuthPageLayout', ({ background, pad }) => ({
  root: css`
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
  `,
  content: css`
    width: 33%;
  `,
  formContainer: css`
    justify-self: flex-end;
    width: 52%;
    border-radius: ${theme.borderRadius.lg}px;
    background: ${theme.color.gray.lightest};
    padding: 30px 5%;
  `,
  eyebrow: css`
    position: relative;
    color: #fff;
    text-transform: uppercase;
    font-weight: ${theme.type.headingFontWeight};
    font-family: ${theme.type.headingFontFamily};
    line-height: ${theme.type.headingLineHeight};
    font-size: ${theme.type.sizes.eyebrow}px;
    letter-spacing: ${theme.type.eyebrowLetterSpacing}em;
    margin-bottom: 34px;
    padding-bottom: 34px;
    &:before {
      content: '';
      display: block;
      position: absolute;
      bottom: 0;
      left: 0;
      width: 45px;
      height: 2px;
      background: rgba(255, 255, 255, 0.3);
    }
  `,
  title: css`
    color: #fff;
    font-size: 42px;
    line-height: 1.4;
  `
}))
