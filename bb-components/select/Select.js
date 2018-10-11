// @flow
import * as React from 'react'
import { destyle } from 'destyle'

type Props = {
  /** Change handler for field */
  onChange: (SyntheticEvent<>) => mixed,
  /** Component must always be controlled */
  value: string,
  options: Array<{ value: mixed, title: string, disabled?: boolean }>,
  /** Given by destyle. Do not pass this to the component as a prop. */
  styles: Object
}

/**
 * Select.
 */
export const Select = ({
  styles,
  options,
  onChange,
  value,
  ...rest
}: Props) => {
  return (
    <select value={value} className={styles.root} onChange={onChange} {...rest}>
      {options.map((opt, i) => (
        <option value={opt.value} disabled={opt.disabled} key={`opt-${i}`}>
          {opt.title}
        </option>
      ))}
    </select>
  )
}

export default destyle(Select, 'BB-Select')
