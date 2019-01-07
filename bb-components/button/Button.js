// @flow
import * as React from 'react'
import { destyle } from 'destyle'
import Spinner from '../spinner/Spinner'

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
  /** Set the button to disabled and show a spinner on top */
  loading?: boolean,
  /** Is the button disabled? */
  disabled?: boolean,
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
  disabled = false,
  block = false,
  el = 'button',
  variant = 'secondary',
  destyleMerge,
  destyleNames,
  loading = false,
  ...rest
}: Props) => {
  const El = el
  if (loading) {
    disabled = true
  }
  return (
    <El className={styles.root} disabled={disabled} {...rest}>
      <span className={styles.children}>{children}</span>
      {loading && (
        <span className={styles.spinnerWrap}>
          <Spinner
            color="#FFF"
            destyleMerge={{ root: styles.spinner }}
            size={24}
          />
        </span>
      )}
    </El>
  )
}

export default destyle(Button, 'BB-Button')
