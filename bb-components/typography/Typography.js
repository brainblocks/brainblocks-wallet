// @flow
import * as React from 'react'
import { destyle } from 'destyle'

type Props = {
  /** Element */
  el?: string,
  size?: number,
  color?: string,
  noWrap?: boolean,
  spaceAbove?: number,
  spaceBelow?: number,
  children: React.Node,
  /** Given by destyle. Do not pass this to the component as a prop. */
  styles: Object
}

/**
 * Typography.
 */
export const Typography = ({
  styles,
  el = 'span',
  size,
  color,
  noWrap = false,
  spaceAbove,
  spaceBelow,
  children,
  ...rest
}: Props) => {
  const El = el
  return (
    <El className={styles.root} {...rest}>
      {children}
    </El>
  )
}

export default destyle(Typography, 'BB-Typography')
