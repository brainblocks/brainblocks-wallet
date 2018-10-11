// @flow
import * as React from 'react'
import { destyle } from 'destyle'

type Props = {
  /** Change handler for field */
  onChange: (SyntheticEvent<>) => mixed,
  /** Component must always be controlled */
  value: string,
  /** Given by destyle. Do not pass this to the component as a prop. */
  styles: Object
}

/**
 * TextField.
 */
export const TextField = ({ styles, onChange, value = '', ...rest }: Props) => {
  return (
    <input
      className={styles.root}
      onChange={onChange}
      value={value}
      {...rest}
    />
  )
}

export default destyle(TextField, 'BB-TextField')
