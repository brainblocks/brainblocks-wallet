// @flow
import * as React from 'react'
import { destyle } from 'destyle'

type Props = {
  /** Label */
  label?: string | React.Node,
  /** Field ID (used in `<label for={fieldId}>`) */
  fieldId?: string,
  /** Description / hint text */
  description?: string | React.Node,
  /** Extra - sits above the field on the right */
  extra?: React.Node,
  /** Children - usually a `FormField`, but can be anything */
  children: React.Node,
  /** Given by destyle. Do not pass this to the component as a prop. */
  styles: Object,
  error: string | React.Node
}

/**
 * FormItem.
 *
 * FormItem adds optional `label`, `description` and `extra` to `FormField`. It can also wrap arbitrary components for more unique form fields.
 */
export const FormItem = ({
  styles,
  fieldId,
  label,
  description,
  error,
  extra,
  children,
  ...rest
}: Props) => {
  return (
    <div className={styles.root}>
      {!!label && (
        <div className={styles.label}>
          {typeof label === 'string' ? (
            <label htmlFor={fieldId}>{label}</label>
          ) : (
            label
          )}
        </div>
      )}
      {!!extra && <div className={styles.extra}>{extra}</div>}
      <div className={styles.field}>{children}</div>
      {!!description && (
        <div className={styles.description}>
          {typeof description === 'string' ? <p>{description}</p> : description}
        </div>
      )}
      {!!error && (
        <div className={styles.error}>
          {typeof error === 'string' ? <p>{error}</p> : error}
        </div>
      )}
    </div>
  )
}

export default destyle(FormItem, 'BB-FormItem')
