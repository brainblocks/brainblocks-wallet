// @flow
import * as React from 'react'
import { destyle } from 'destyle'
import { cx } from 'emotion'
import type { ClassName } from '~/types'

type Props = {
  /** Button contents */
  children?: React.Node,
  el?: 'button' | 'a',
  /** Only used for styling */
  type?: 'primary' | 'secondary' | 'util' | 'icon',
  /** Size - used for `icon` type */
  size?: number,
  /** Whether to fill the available width */
  block?: boolean,
  /** Custom color */
  color?: string,
  /** Extra class(es) for button element */
  buttonClass?: ClassName,
  /** Given by destyle. Do not pass this to the component as a prop. */
  styles: Object
}

/**
 * Button.
 */
export const Button = ({
  styles,
  children,
  block = false,
  el = 'button',
  type = 'secondary',
  buttonClass,
  ...rest
}: Props) => {
  const El = el
  return (
    <El className={cx(styles.root, buttonClass)} {...rest}>
      {children}
    </El>
  )
}

export default destyle(Button, 'BB-Button')
