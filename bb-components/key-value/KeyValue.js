// @flow
import * as React from 'react'
import { destyle } from 'destyle'
import type { ClassName } from '~/types'
import { cx } from 'emotion'

type Props = {
  label: string,
  value: string | React.Node,
  /** Dom element for key */
  keyEl?: string,
  /** Dom element for value */
  valueEl?: string,
  /** Extra classes for wrapper element */
  wrapperClass?: ClassName,
  /** Extra classes for key element */
  keyClass?: ClassName,
  /** Extra classes for value element */
  valueClass?: ClassName,
  /** Given by destyle. Do not pass this to the component as a prop. */
  styles: Object
}

/**
 * KeyValue.
 * If you set keyEl to anything other than `"dt"`, you will
 * also need to set valueEl to something like `"p"` or `"span"`
 */
export const KeyValue = ({
  styles,
  label,
  value,
  keyEl = 'dt',
  valueEl = 'dd',
  wrapperClass,
  keyClass,
  valueClass,
  ...rest
}: Props) => {
  const Wrapper = keyEl === 'dt' ? 'dl' : 'div'
  const KeyEl = keyEl
  const ValueEl = valueEl
  return (
    <Wrapper className={cx(styles.root, wrapperClass)}>
      <KeyEl className={cx(styles.key, keyClass)}>{label}</KeyEl>
      <ValueEl className={cx(styles.value, valueClass)}>{value}</ValueEl>
    </Wrapper>
  )
}

export default destyle(KeyValue, 'BB-KeyValue')
