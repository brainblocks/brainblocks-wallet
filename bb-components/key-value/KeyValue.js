// @flow
import * as React from 'react'
import { destyle } from 'destyle'
import classNames from 'classnames'

type Props = {
  label: string,
  value: string | React.Node,
  /** Dom element for key */
  keyEl?: string,
  /** Dom element for value */
  valueEl?: string,
  /** Extra classes for wrapper element */
  wrapperClass?: string | Array<string | Object> | Object,
  /** Extra classes for key element */
  keyClass?: string | Array<string | Object> | Object,
  /** Extra classes for value element */
  valueClass?: string | Array<string | Object> | Object,
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
    <Wrapper className={classNames(styles.root, wrapperClass)}>
      <KeyEl className={classNames(styles.key, keyClass)}>{label}</KeyEl>
      <ValueEl className={classNames(styles.value, valueClass)}>
        {value}
      </ValueEl>
    </Wrapper>
  )
}

export default destyle(KeyValue, 'BB-KeyValue')
