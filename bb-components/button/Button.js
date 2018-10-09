// @flow
import * as React from 'react'
import { destyle } from 'destyle'

type Props = {
  /** Click handler for button */
  onClick?: () => mixed,
  /** Button contents */
  children: React.Node,
  type?: 'primary' | 'secondary',
  styles: Object
}

/**
 * Button component.
 */
export const Button = (props: Props) => {
  return (
    <button className={props.styles.root} onClick={props.onClick}>
      {props.children}
    </button>
  )
}

Button.defaultProps = {
  type: 'primary'
}

export default destyle(Button, 'BB-Button')
