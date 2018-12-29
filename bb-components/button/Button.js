// @flow
import * as React from 'react'
import { destyle } from 'destyle'

type Props = {
  /** Button contents */
  children?: React.Node,
  el?: 'button' | 'a',
  /** Only used for styling */
  variant?: 'primary' | 'secondary' | 'util' | 'icon',
  /** Size - used for `icon` type */
  size?: number,
  /** Icon size - some icons appear bigger than others, this lets you manually normalize */
  iconSize?: number,
  /** Whether to fill the available width */
  block?: boolean,
  /** Custom color */
  color?: string,
  /** Given by destyle. Do not pass this to the component as a prop. */
  styles: Object,
  destyleNames: string
}

/**
 * Button.
 */
export const Button = ({
  styles,
  children,
  size,
  iconSize,
  block = false,
  el = 'button',
  variant = 'secondary',
  destyleMerge,
  destyleNames,
  ...rest
}: Props) => {
  const El = el
  return (
    <El className={styles.root} {...rest}>
      {children}
    </El>
  )
}

export default destyle(Button, 'BB-Button')
