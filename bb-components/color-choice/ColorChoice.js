// @flow
import * as React from 'react'
import { destyle } from 'destyle'

type Props = {
  /** Color options */
  options: Array<string>,
  /** onChange event handler */
  onChange: (SyntheticEvent<>) => mixed,
  /** Current value */
  value: string,
  /** Given by destyle. Do not pass this to the component as a prop. */
  styles: Object
}

/**
 * ColorChoice.
 *
 * ColorChoice allows the choice between a handful of pre-defined colours.
 */
export const ColorChoice = ({
  styles,
  options,
  onChange,
  value,
  ...rest
}: Props) => {
  return (
    <div className={styles.root}>
      {options.map((color, i) => (
        <div className={styles.option} key={`color-option-${i}`}>
          <input
            className={styles.radioInput}
            id={`color-option-${i}`}
            type="radio"
            name="color-choice"
            value={color}
            checked={color === value}
            onChange={onChange}
          />
          <label className={styles.label} htmlFor={`color-option-${i}`}>
            <span className={styles.hiddenLabel}>{color}</span>
          </label>
        </div>
      ))}
    </div>
  )
}

export default destyle(ColorChoice, 'BB-ColorChoice')
