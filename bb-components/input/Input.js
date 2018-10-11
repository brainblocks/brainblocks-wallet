// @flow
import * as React from 'react'
import { destyle } from 'destyle'

type Props = {
  /** Whether to show a `textarea` instead of an `input` */
  multiline?: boolean,
  rows?: number,
  /** Change handler for field */
  onChange: (SyntheticEvent<>) => mixed,
  /** Component must always be controlled */
  value: string,
  /** Given by destyle. Do not pass this to the component as a prop. */
  styles: Object
}

/**
 * Input.
 */
export const Input = ({
  styles,
  multiline,
  onChange,
  value,
  rows = 3,
  ...rest
}: Props) => {
  const El = multiline ? 'textarea' : 'input'
  return (
    <El className={styles.root} onChange={onChange} value={value} {...rest} />
  )
}

export default destyle(Input, 'BB-Input')
