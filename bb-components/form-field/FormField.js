// @flow
import * as React from 'react'
import { destyle } from 'destyle'

type Props = {
  /** Component to adorn the start (left) of the form field */
  adornStart: React.Node,
  /** Component to adorn the end (right) of the form field */
  adornEnd: React.Node,
  /** Field */
  children: React.Node,
  /** Arbitrary theme which can be used for styling */
  theme?: string,
  /** Given by destyle. Do not pass this to the component as a prop. */
  styles: Object
}

/**
 * FormField.
 */
export const FormField = ({
  styles,
  children,
  adornStart,
  adornEnd,
  theme,
  ...rest
}: Props) => {
  return (
    <div className={styles.root}>
      {!!adornStart && <div className={styles.adornStart}>{adornStart}</div>}
      {children}
      {!!adornEnd && <div className={styles.adornEnd}>{adornEnd}</div>}
    </div>
  )
}

export default destyle(FormField, 'BB-FormField')
