import { css } from 'emotion'
import Color from 'color'
import mixins from '../globals/mixins'

export function backgroundGradient(color, darken = false) {
  const lighterColor = Color(color)
    .lighten(0.2)
    .toString()
  if (darken) {
    color = Color(color)
      .darken(0.2)
      .toString()
  }
  return css`
    background: ${color};
    background: linear-gradient(135deg, ${lighterColor} 0%, ${color} 100%);
  `
}
